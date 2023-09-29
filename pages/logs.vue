<template>
  <main>
    <header class="page-width page-padding">
      <h1 v-if="currentEncounter === null">
        Encounter Browser
      </h1>
      <p v-else class="h3">
        <img
          :src="currentEncounter.icon"
          alt=""
        >{{ currentEncounter.name | twoOrphans }}
      </p>

      <template v-if="user">
        <template v-if="encounters.tally">
          <p v-if="encounters.tally.total === 0">
            No Encounter Logs Found for&nbsp;<strong>{{ user }}</strong><br>
            <br>
            Add your encounter logs to GW2Bot by using the <code>/evtc</code> command in Discord.
          </p>
          <template v-else>
            <p v-if="currentEncounter === null">
              Found {{ encounters.tally.total }} encounter logs for&nbsp;<strong>{{ user }}</strong>
            </p>
            <p v-else>
              Browsing encounter logs for&nbsp;<strong>{{ user }}</strong>
            </p>
            <EncounterSelectorComponent
              :tally="encounters.tally"
              :current-instance="currentInstance"
              :current-encounter="currentEncounter"
              @setInstance="setInstance"
              @setEncounter="setEncounter"
              @filterEncounters="filterEncounters"
            />
            <p v-if="currentEncounter && encounters.filtered.length === 0">
              No encounters match the specified filters
            </p>
          </template>
        </template>
        <p v-else>
          Loading Encounters... <LoadingInlineSVG />
        </p>
      </template>
      <p v-else>
        Loading User... <LoadingInlineSVG />
      </p>
    </header>

    <PaginationComponent
      v-if="encounters.filtered.length > 10"
      :current-page="currentPage"
      :total-pages="totalPages"
      @paginate="paginateEncounters"
    />

    <ol
      v-if="activeEncounters.length > 0"
      class="encounter-list"
    >
      <EncounterComponent
        v-for="encounter in activeEncounters"
        :key="encounter._id"
        :encounter="encounter"
        :user="user"
      />
    </ol>

    <PaginationComponent
      v-if="encounters.filtered.length > 10"
      :current-page="currentPage"
      :total-pages="totalPages"
      @paginate="paginateEncounters"
    />
  </main>
</template>

<script>
import LoadingInlineSVG from '@/components/inline-svgs/loading'
import EncounterSelectorComponent from '@/components/encounter-selector'
import EncounterComponent from '@/components/encounter'
import PaginationComponent from '@/components/pagination'

const boonIDs = {
  30328: 'alacrity',
  725: 'fury',
  740: 'might',
  717: 'protection',
  1187: 'quickness',
  873: 'resolution',
  726: 'vigor'
}

// https://github.com/baaron4/GW2-Elite-Insights-Parser/blob/master/EncounterIDs.md
const wvwMaps = {
  460544: 'Armistice Bastion',
  459520: 'Blue Alpine Borderlands',
  460288: 'Edge of the Mists',
  459008: 'Eternal Battlegrounds',
  459264: 'Green Alpine Borderlands',
  460032: 'Obsidian Sanctum',
  459776: 'Red Desert Borderlands'
}

export default {
  name: 'LogsPage',
  components: {
    LoadingInlineSVG,
    EncounterSelectorComponent,
    EncounterComponent,
    PaginationComponent
  },
  middleware: 'auth',
  data () {
    return {
      currentInstance: null,
      currentEncounter: null,
      currentPage: 1,
      encounters: {
        array: [],
        filtered: [],
        tally: null
      },
      filterDebounce: null,
      filters: {
        success: false,
        dateStart: -Infinity,
        dateEnd: Infinity
      },
      user: null
    }
  },
  head () {
    return {
      title: 'Encounter Browser | GW2Bot'
    }
  },
  computed: {
    activeEncounters () {
      return this.encounters.filtered.slice(
        (this.currentPage - 1) * 10, this.currentPage * 10
      )
    },
    totalPages () {
      return Math.ceil(this.encounters.filtered.length / 10) || 1
    }
  },
  async mounted () {
    this.user = await this.$axios.$get('api/user')

    if (!this.user) { return }

    this.encounters.tally = await this.$axios.$get('api/encounters')
  },
  methods: {
    setInstance (instance) {
      if (instance === this.currentInstance) { return }

      this.encounters.filtered.splice(0)

      this.currentEncounter = null

      this.currentInstance = instance

      if (instance === null) { return }

      if (instance.length === 1) {
        this.setEncounter(instance[0])
      }
    },
    async setEncounter (encounter) {
      if (encounter === this.currentEncounter) { return }

      this.encounters.filtered.splice(0)

      this.currentEncounter = encounter

      if (encounter === null) { return }

      this.encounters.array = await this.$axios.$get(
        `api/encounters/${encounter.api_name}`
      )

      this.filterEncounters()
    },
    async paginateEncounters (page) {
      this.currentPage = Math.min(Math.max(page, 1), this.totalPages)

      // fetch encounter details
      const timeoutID = this.filterDebounce

      for (const encounter of this.activeEncounters) {
        if (timeoutID !== this.filterDebounce) { return }

        if (encounter.details !== undefined) { continue }

        const dpsReport = await fetch(
          `https://dps.report/getJson?permalink=${encounter.permalink}`
        ).then((response) => {
          if (response.ok) {
            return response.json()
          }
          return 0
        }).catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
          return 0
        })

        if (dpsReport === 0) { continue }

        const details = {
          dps: 0,
          ...(encounter.boss_id === 1 && {
            wvw_map: wvwMaps[dpsReport.eiEncounterID]
          }),
          ...(encounter.boss_id !== 1 && {
            boss_health: 100 - dpsReport.targets[0].healthPercentBurned
          }),
          players: []
        }

        for (const player of dpsReport.players) {
          const boons = {
            alacrity: 0,
            fury: 0,
            might: 0,
            protection: 0,
            quickness: 0,
            resolution: 0,
            vigor: 0
          }

          for (const boon of player.buffUptimes) {
            if (boonIDs[boon.id] === undefined) { continue }

            boons[boonIDs[boon.id]] = boon.buffData[0].uptime
          }

          details.players.push({
            account: player.account,
            boons,
            dps: player.dpsTargets[0][0].dps,
            group: player.group,
            character: player.name,
            profession: player.profession
          })

          details.dps += player.dpsTargets[0][0].dps
        }

        await this.$axios.post(`api/encounters/${encounter._id}`, details)

        this.$set(encounter, 'details', details)
      }
    },
    encounterFilter (encounter) {
      if (this.filters.success === true && encounter.success !== true) {
        return false
      }

      if (this.filters.dateStart > encounter.date) {
        return false
      }

      if (this.filters.dateEnd < encounter.date) {
        return false
      }

      return true
    },
    filterEncounters (element) {
      clearTimeout(this.filterDebounce)

      this.filterDebounce = setTimeout((nuxt) => {
        if (element) {
          if (element.type === 'checkbox') {
            nuxt.filters.success = element.checked
          } else if (element.type === 'date') {
            nuxt.filters[element.id] = element.value || (
              element.id === 'dateStart' ? -Infinity : Infinity
            )
          }
        }

        nuxt.encounters.filtered = nuxt.encounters.array.filter(
          nuxt.encounterFilter
        )

        nuxt.paginateEncounters(1)
      }, 50, this)
    }
  }
}
</script>

<style lang="scss" scoped>
main {
  min-height: 360px;
}

.h3 {
  margin: $baseline-rem 0 0 0;
  line-height: 64px;
  white-space: nowrap;
  img {
    display: inline-block;
    margin-right: $baseline-px * .5;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    vertical-align: top;
  }
}

.encounter-list {
  padding: 0;
  list-style: none;
  text-align: center;
}
</style>
