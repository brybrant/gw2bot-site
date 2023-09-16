<template>
  <main>
    <div class="encounter-filterer">
      <div v-if="Array.isArray(encounters)" class="filters">
        <!-- ENCOUNTER SELECT -->
        <div class="form__group">
          <label for="encounter-instances" class="form__label">
            Instance:
          </label>
          <select id="encounter-instances" class="form__control">
            <option
              selected
              @click="selectInstance(null)"
            />
            <optgroup
              v-for="(instances, category) in bosses"
              :key="category"
              :label="category"
            >
              <option
                v-for="instance in instances"
                :key="instance.name"
                @click="selectInstance(instance)"
              >
                {{ instance.name }}
              </option>
            </optgroup>
          </select>
        </div>

        <div v-if="selectedInstance !== null" class="form__group">
          <label for="encounter-bosses" class="form__label">
            Encounter:
          </label>
          <select id="encounter-bosses" class="form__control">
            <option
              v-if="selectedInstance && selectedInstance.encounters.length > 1"
              selected
              @click="selectEncounter(null)"
            />
            <option
              v-for="encounter in selectedInstance.encounters"
              :key="encounter.name"
              :selected="selectedEncounter === encounter"
              @click="selectEncounter(encounter)"
            >
              {{ encounter.name }}
            </option>
          </select>
        </div>

        <!-- ENCOUNTER FILTERS -->
        <template v-if="selectedEncounter !== null">
          <hr>

          <div class="form__checkbox">
            <label for="result" class="form__label">
              Successful Only?
            </label>
            <input
              id="result"
              v-model="filters.success"
              type="checkbox"
              @change="applyFilters"
            >
          </div>

          <div class="form__group">
            <label for="dateStart" class="form__label">
              Date Start:
            </label>
            <input
              id="dateStart"
              class="form__control"
              type="date"
              @change="setDateFilter"
            >
          </div>

          <div class="form__group">
            <label for="dateEnd" class="form__label">
              Date End:
            </label>
            <input
              id="dateEnd"
              class="form__control"
              type="date"
              @change="setDateFilter"
            >
          </div>
        </template>
      </div>
    </div>

    <header class="page-width page-padding">
      <h1 v-if="selectedEncounter === null">
        Encounter Browser
      </h1>
      <p v-else class="h3">
        <img
          :src="selectedEncounter.icon"
          alt=""
        >{{ selectedEncounter.name | twoOrphans }}
      </p>

      <template v-if="user">
        <template v-if="Array.isArray(encounters)">
          <template v-if="encounters.length > 0">
            <p>
              Currently viewing encounters of&nbsp;<strong>{{ user }}</strong>
            </p>
            <p v-if="selectedEncounter === null">
              Start browsing your encounter logs by selecting an instance, then selecting an encounter.
            </p>
            <p v-else-if="filteredEncounters.length === 0">
              Cannot find any <strong>{{ selectedEncounter.name | twoOrphans }}</strong> encounter logs associated with&nbsp;<strong>{{ user }}</strong>
            </p>
          </template>
          <p v-else>
            No Encounter Logs Found for&nbsp;<strong>{{ user }}</strong><br>
            <br>
            Add your encounter logs to GW2Bot by using the <code>/evtc</code> command in Discord.
          </p>
        </template>
        <p v-else>
          Loading Encounters... <LoadingInlineSVG />
        </p>
      </template>
      <p v-else>
        Loading User... <LoadingInlineSVG />
      </p>
    </header>

    <!-- ENCOUNTER DISPLAY -->
    <ol
      v-if="activeEncounters.length > 0"
      class="encounter-list"
    >
      <EncounterComponent
        v-for="encounter in activeEncounters"
        :key="encounter._id"
        :details="encounter.details"
        :encounter="encounter"
        :user="user"
      />
    </ol>

    <div v-if="filteredEncounters.length > 10" class="flexbox">
      <div class="flexbox__item">
        <button
          class="button"
          :disabled="encounterPage === 1"
          @click="paginateEncounters(--encounterPage)"
        >
          Previous
        </button>
      </div>

      <div class="flexbox__item">
        <button
          class="button"
          :disabled="encounterPages <= encounterPage"
          @click="paginateEncounters(++encounterPage)"
        >
          Next
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import bosses from '@/static/bossesData'
import LoadingInlineSVG from '@/components/inline-svgs/loading'
import EncounterComponent from '@/components/encounter'

const boonIDs = {
  30328: 'alacrity',
  725: 'fury',
  740: 'might',
  717: 'protection',
  1187: 'quickness',
  873: 'resolution',
  726: 'vigor'
}

export default {
  name: 'LogsPage',
  components: {
    LoadingInlineSVG,
    EncounterComponent
  },
  middleware: 'auth',
  data () {
    return {
      user: null,
      bosses,
      encounterPage: 1,
      encounterPages: 1,
      filterDebounce: null,
      filteredEncounters: [null],
      selectedInstance: null,
      selectedEncounter: null,
      encounters: null,
      activeEncounters: [],
      filters: {
        success: false,
        dateStart: -Infinity,
        dateEnd: Infinity
      }
    }
  },
  head () {
    return {
      title: 'Encounter Browser | GW2Bot'
    }
  },
  async mounted () {
    this.user = await this.$axios.$get('api/user')

    if (!this.user) { return }

    this.encounters = await this.$axios.$get('api/encounters')
  },
  methods: {
    selectInstance (instance) {
      this.activeEncounters.splice(0)

      this.selectedEncounter = null

      this.selectedInstance = instance

      if (instance === null) { return }

      if (instance.encounters.length === 1) {
        this.selectedEncounter = instance.encounters[0]

        this.applyFilters()
      }
    },
    selectEncounter (encounter) {
      this.activeEncounters.splice(0)

      this.selectedEncounter = encounter

      if (encounter === null) { return }

      this.applyFilters()
    },
    async fetchDetails (timeoutID) {
      // console.log(timeoutID)

      for (const encounter of this.activeEncounters) {
        // console.log(timeoutID, this.filterDebounce)

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
          boss_health: 100 - dpsReport.targets[0].healthPercentBurned,
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
    paginateEncounters (page) {
      this.activeEncounters = this.filteredEncounters.slice(
        (page * 10) * (page - 1), (page * 10) * page
      )

      this.fetchDetails(this.filterDebounce)
    },
    encounterFilter (encounter) {
      if (!this.selectedEncounter.ids.includes(encounter.boss_id)) {
        return false
      }

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
    applyFilters () {
      clearTimeout(this.filterDebounce)

      this.filterDebounce = setTimeout((nuxt) => {
        nuxt.filteredEncounters = nuxt.encounters.filter(nuxt.encounterFilter)

        nuxt.encounterPage = 1

        nuxt.encounterPages = Math.ceil(nuxt.filteredEncounters / 10)

        nuxt.paginateEncounters(1)
      }, 50, this)
    },
    setDateFilter (event) {
      this.filters[event.target.id] = event.target.valueAsDate || (
        event.target.id === 'dateStart' ? -Infinity : Infinity
      )
      this.applyFilters()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/situational/forms';

main {
  position: relative;
  border-bottom: 1px solid $grey-1000;
  padding-left: $nav-mobile-width;
  min-height: 480px;
  .dark-mode & {
    border-bottom-color: $grey-200;
  }
}

.encounter-filterer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  border-right: 1px solid $grey-1000;
  padding: 0 ($baseline-px * .5);
  width: $nav-mobile-width;
  background: $white;
  z-index: 1;
  .dark-mode & {
    border-right-color: $grey-200;
    background: $grey-350;
  }
}

.filters {
  position: sticky;
  top: $nav-height;
  bottom: 0;
  padding: $baseline-rem 0;
  text-align: left;
}

// .form__checkbox {
//   display: inline-block;
//   padding: (($form__height - $baseline-rem) * .5) 0;
//   label {
//     display: inline-block;
//     padding-right: 4px;
//     vertical-align: top;
//   }
//   input[type="checkbox"] {
//     margin: 0;
//   }
// }

.encounter-select {
  display: flex;
  justify-content: center;
  align-items: center;
}

.encounter-filters {
  display: flex;
  justify-content: center;
  align-items: center;
}

.h3 {
  margin: $baseline-rem 0 0 0;
  line-height: 64px;
  white-space: nowrap;
  img {
    display: inline-block;
    margin-right: ($baseline-px * .5);
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
