<template>
  <main>
    <div class="encounter-menu">
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

        <div v-if="selectedInstance" class="form__group">
          <label for="encounter-bosses" class="form__label">
            Encounter:
          </label>
          <select id="encounter-bosses" class="form__control">
            <option
              v-if="selectedInstance.encounters.length > 1"
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

          <div
            v-if="selectedEncounter.name !== 'World vs World'"
            class="form__checkbox"
          >
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

    <div v-if="totalPages > 1" class="page-width page-padding">
      <PaginationComponent
        :current-page="currentPage"
        :total-pages="totalPages"
        @paginate="paginateEncounters"
      />
    </div>

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

    <div v-if="totalPages > 1" class="page-width page-padding">
      <PaginationComponent
        :current-page="currentPage"
        :total-pages="totalPages"
        @paginate="paginateEncounters"
      />
    </div>
  </main>
</template>

<script>
import bosses from '@/static/bossesData'
import LoadingInlineSVG from '@/components/inline-svgs/loading'
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
    EncounterComponent,
    PaginationComponent
  },
  middleware: 'auth',
  data () {
    return {
      user: null,
      bosses,
      currentPage: 1,
      totalPages: 1,
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
  // computed: {
  //   middlePages () {
  //     const middlePage = Math.min(Math.max(this.currentPage, 4), this.totalPages - 3)
  //     return [
  //       middlePage - 1,
  //       middlePage,
  //       middlePage + 1
  //     ]
  //   }
  // },
  head () {
    return {
      title: 'Encounter Browser | GW2Bot'
    }
  },
  async mounted () {
    this.user = await this.$axios.$get('api/user')

    if (!this.user) { return }

    this.encounters = await this.$axios.$get('api/encounters/test')
  },
  methods: {
    selectInstance (instance) {
      this.activeEncounters.splice(0)
      this.filteredEncounters.splice(0)

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
      this.filteredEncounters.splice(0)

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
    paginateEncounters (page) {
      this.currentPage = Math.min(Math.max(page, 1), this.totalPages)

      this.activeEncounters = this.filteredEncounters.slice(
        (page - 1) * 10, page * 10
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

        nuxt.totalPages = Math.ceil(nuxt.filteredEncounters.length / 10)

        nuxt.paginateEncounters(nuxt.currentPage = 1)
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

.encounter-menu {
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

// .button[disabled] {
//   &, &:hover, &:active {
//     background: $grey-500;
//   }
//   &, &:active, .dark-mode &:active {
//     color: $grey-1150;
//   }
// }

// .pagination-buttons {
//   display: inline-flex;
//   flex-flow: row nowrap;
//   // margin-left: -($baseline-px * .5);
//   padding: $baseline-rem 0;
//   .button {
//     // margin-left: $baseline-px * .5;
//     border-radius: 0;
//     width: 8px + $p-line-px;
//     height: 8px + $p-line-px;
//     font-size: $small-font-rem;
//     &, .dark-mode & {
//       box-shadow: none;
//     }
//     &, &[disabled]:active {
//       padding: 4px 0;
//     }
//     &:active {
//       padding: 5px 0 3px 0;
//     }
//   }
// }

// .pagination-ellipsis {
//   position: relative;
//   margin: (2px + ($p-line-px * .5)) 14px 0 (/*($baseline-px * .5) + */14px);
//   &, &:before, &:after {
//     width: 4px;
//     height: 4px;
//     background: currentColor;
//     // border-radius: 2px;
//   }
//   &:before, &:after {
//     @extend %Psuedo-element;
//     position: absolute;
//     top: 0;
//     display: block;
//   }
//   &:before {
//     left: -7px;
//   }
//   &:after {
//     right: -7px;
//   }
// }

// .button--prev:after, .button--next:after {
//   @extend %Psuedo-element;
//   position: relative;
//   display: block;
//   width: 0;
//   height: 0;
//   border-top: 6px solid transparent;
//   border-bottom: 6px solid transparent;
// }
// .button--prev:after {
//   left: 6px;
//   border-right: 8px solid currentColor;
// }
// .button--next:after {
//   left: 9px;
//   border-left: 8px solid currentColor;
// }
</style>
