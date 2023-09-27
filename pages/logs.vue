<template>
  <main>
    <EncounterSelectorComponent
      v-if="encounters.tally"
      :tally="encounters.tally"
      :active-instance="activeInstance"
      :active-encounter="activeEncounter"
      @setInstance="setInstance"
      @setEncounter="setEncounter"
      @filterEncounters="filterEncounters"
    />

    <header class="page-width page-padding">
      <h1 v-if="activeEncounter === null">
        Encounter Browser
      </h1>
      <p v-else class="h3">
        <img
          :src="activeEncounter.icon"
          alt=""
        >{{ activeEncounter.name | twoOrphans }}
      </p>

      <template v-if="user">
        <template v-if="encounters.tally">
          <p v-if="encounters.tally.total === 0">
            No Encounter Logs Found for&nbsp;<strong>{{ user }}</strong><br>
            <br>
            Add your encounter logs to GW2Bot by using the <code>/evtc</code> command in Discord.
          </p>
          <template v-else>
            <p v-if="activeEncounter === null">
              Found {{ encounters.tally.total }} encounter logs for&nbsp;<strong>{{ user }}</strong><br>
              <br>
              Start browsing your encounter logs by selecting an instance, then selecting an encounter.
            </p>
            <p v-else-if="encounters.filtered.length === 0">
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
      activeInstance: null,
      activeEncounter: null,
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
      if (this.activeInstance === instance) { return }

      this.encounters.filtered.splice(0)

      this.activeEncounter = null

      this.activeInstance = instance

      if (instance === null) { return }

      if (instance.encounters.length === 1) {
        this.setEncounter(instance.encounters[0])
      }
    },
    async setEncounter (encounter) {
      if (this.activeEncounter === encounter) { return }

      this.encounters.filtered.splice(0)

      this.activeEncounter = encounter

      if (encounter === null) { return }

      this.encounters.array = await this.$axios.$get(
        `api/encounters/${encounter.name}`
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
    filterEncounters (event) {
      clearTimeout(this.filterDebounce)

      if (event) {
        if (event.target.type === 'checkbox') {
          this.filters.success = event.target.checked
        } else if (event.target.type === 'date') {
          this.filters[event.target.id] = event.target.valueAsDate || (
            event.target.id === 'dateStart' ? -Infinity : Infinity
          )
        }
      }

      this.filterDebounce = setTimeout((nuxt) => {
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
  position: relative;
  border-bottom: 1px solid $grey-1000;
  padding-left: $nav-mobile-width;
  min-height: 480px;
  .dark-mode & {
    border-bottom-color: $grey-200;
  }
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
