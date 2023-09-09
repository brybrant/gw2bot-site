<template>
  <main>
    <div class="page-width page-padding">
      <header>
        <template v-if="user">
          <template v-if="Array.isArray(encounters)">
            <p v-if="encounters.length > 0">
              Currently viewing encounters of&nbsp;<strong>{{ user }}</strong>
            </p>
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

      <template v-if="Array.isArray(encounters) && encounters.length > 0">
        <!-- ENCOUNTER SELECT -->
        <div class="form form--inline">
          <div class="encounter-select">
            <div class="flexbox">
              <div class="flexbox__item">
                <div class="form__group">
                  <label for="encounter-instances" class="form__label">
                    Instance:
                  </label>
                  <select id="encounter-instances" class="form__control">
                    <option selected @click="selectedInstance = null" />
                    <optgroup
                      v-for="(instances, category) in bosses"
                      :key="category"
                      :label="category"
                    >
                      <option
                        v-for="(instance, index) in instances"
                        :key="index"
                        :data-index="index"
                        @click="selectedInstance = instance.encounters"
                      >
                        {{ instance.name }}
                      </option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div v-if="selectedInstance !== null" class="flexbox__item">
                <div class="form__group">
                  <label for="encounter-bosses" class="form__label">
                    Boss:
                  </label>
                  <select id="encounter-bosses" class="form__control">
                    <option selected @click="selectedEncounter = null" />
                    <option
                      v-for="(encounter, index) in selectedInstance"
                      :key="index"
                      :data-value="encounter.ids"
                      @click="selectedEncounter = encounter; applyFilters()"
                    >
                      {{ encounter.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <hr v-if="selectedEncounter !== null">

          <!-- ENCOUNTER FILTERS -->
          <div v-if="selectedEncounter !== null" class="encounter-filters">
            <div class="flexbox">
              <div class="flexbox__item">
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
              </div>

              <div class="flexbox__item">
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
              </div>

              <div class="flexbox__item">
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
              </div>
            </div>
          </div>
        </div>

        <!-- ENCOUNTER DISPLAY -->
        <div v-if="user" class="encounter-display">
          <template v-if="Array.isArray(encounters)">
            <template v-if="selectedEncounter === null">
              <p>Start browsing your encounter logs by selecting an instance, then selecting a boss from the dropdown menus&nbsp;above.</p>
            </template>
            <template v-else>
              <p class="h3">
                <img :src="selectedEncounter.icon" alt="">{{ selectedEncounter.name | twoOrphans }}
              </p>

              <p v-if="activeEncounters.length === 0">
                Cannot find any <strong>{{ selectedEncounter.name | twoOrphans }}</strong> encounter logs associated with&nbsp;<strong>{{ user }}</strong>
              </p>
            </template>
            <ol v-if="activeEncounters.length > 0" class="encounter-list">
              <li
                v-for="encounter in activeEncounters"
                :key="encounter._id"
                :data-value="encounter.triggerID"
                class="encounter"
              >
                <div class="encounter__info small-text">
                  <span>
                    <strong>Date:</strong> {{ encounter.dateString }}
                  </span>
                  <span>
                    <strong>Duration:</strong> {{ encounter.duration }}
                  </span>
                  <span>
                    <strong>Result:</strong> {{ encounter.success?'Success':'Failure' }}
                  </span>
                </div>

                <table class="encounter__table">
                  <tr>
                    <th>Account</th>
                    <th>Character</th>
                    <th>DPS</th>
                  </tr>
                  <tr
                    v-for="(player, accountName) in encounter.details"
                    :key="accountName"
                    :class="{ me: user === accountName }"
                  >
                    <td>{{ accountName }}</td>
                    <td>
                      <picture>
                        <source :srcset="require(`@/assets/img/professions/${player.profession.toLowerCase()}_icon.webp`)" type="image/webp">
                        <img
                          class="profession-icon"
                          :src="require(`@/assets/img/professions/${player.profession.toLowerCase()}_icon.png`)"
                          :title="player.profession"
                          :alt="player.profession"
                        >
                      </picture>{{ player.name }}
                    </td>
                    <td>
                      {{ player.damage }} ({{ player.dps }} dps)
                    </td>
                  </tr>
                </table>
                <p>
                  <ExternalLink :href="encounter.permalink">View full encounter details</ExternalLink>
                </p>
              </li>
            </ol>
            <!-- <template v-if="encounters.length > detailedEncounters.length">
              <p class="h4">
                Loading Encounters... <LoadingInlineSVG />
              </p>

              <div class="progressbar">
                <div :style="{'width': `${detailedEncounters.length / encounters.length * 100}%`}" />
              </div>
            </template> -->
          </template>
          <p v-else class="h4">
            Loading Encounters... <LoadingInlineSVG />
          </p>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import bosses from '@/static/bossesData'
import LoadingInlineSVG from '@/components/inline-svgs/loading'

export default {
  name: 'LogsPage',
  components: {
    LoadingInlineSVG
  },
  middleware: 'auth',
  data () {
    return {
      user: null,
      bosses,
      filterDebounce: null,
      selectedInstance: null,
      selectedEncounter: null,
      encounters: [],
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
    // document.getElementById('encounter-instances').selectedIndex = 0

    this.user = await this.$axios.$get('api/user')

    if (!this.user) { return }

    this.encounters = await this.$axios.$get('api/encounters')

    if (!Array.isArray(this.encounters)) { return }

    for (const encounter of this.encounters) {
      encounter.date = new Date(encounter.date)
      encounter.dateString = encounter.date.toLocaleString()

      if (encounter.details !== undefined) { continue }

      const details = await fetch(
        `https://dps.report/getJson?permalink=${encounter.permalink}`
      ).then((response) => {
        if (response.ok) {
          return response.json()
        }
        return 0
      }).catch((error) => {
        console.error(error)
        return 0
      })

      if (details === 0) { continue }

      encounter.details = {}

      for (const player of details.players) {
        encounter.details[player.account] = {
          name: player.name,
          profession: player.profession,
          damage: player.dpsTargets[0][0].damage,
          dps: player.dpsTargets[0][0].dps
        }
      }

      await this.$axios.post(
        `api/encounters/${encounter._id}`,
        encounter.details
      )
    }
  },
  methods: {
    encounterFilter (encounter) {
      if (!this.selectedEncounter.ids.includes(encounter.boss_id)) {
        return false
      }

      if (this.filters.success === true && encounter.success !== true) {
        return false
      }

      if (this.filters.dateStart >= encounter.date) {
        return false
      }

      if (this.filters.dateEnd <= encounter.date) {
        return false
      }

      return true
    },
    applyFilters () {
      clearTimeout(this.filterDebounce)

      this.filterDebounce = setTimeout((nuxt) => {
        nuxt.activeEncounters = nuxt.encounters.filter(nuxt.encounterFilter)
      }, 500, this)
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

.encounter-display {
  margin-top: $baseline-rem;
  padding-bottom: ($baseline-rem * .5);
  height: 675px;
  overflow-y: scroll;
}
.h3 {
  margin: 0;
  line-height: 64px;
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
  padding: 0 6px;
  width: 100%;
  min-width: 460px;
  list-style: none;
  text-align: center;
}
.encounter {
  margin: $baseline-rem 0 0 0;
  padding: ($baseline-px * .5);
  border-radius: 6px;
  background: $white;
  box-shadow: $card-shadow;
  .dark-mode & {
    background: $grey-350;
    box-shadow: $card-shadow--dark;
  }
}
.encounter__info {
  display: flex;
  justify-content: space-evenly;
}
.encounter__table {
  margin-top: ($baseline-rem * .5);
  th, td {
    padding: 2px 6px;
    width: 40%;
    border-width: 0;
    &:last-child {
      width: 20%;
    }
  }
  td {
    font-size: $small-font-rem;
  }
  th~th, th~td, td~td {
    border-left-width: 1px;
  }
  tr ~ tr {
    th, td {
      border-top-width: 1px;
    }
  }
  .me {
    font-weight: 700;
  }
}
.profession-icon {
  display: inline-block;
  margin-right: 2px;
  width: $p-line-rem;
  height: $p-line-rem;
  vertical-align: top;
}
.h4 .inline-svg {
  width: $h4-line-rem;
  height: $h4-line-rem;
}
.progressbar {
  margin: $baseline-rem auto 0 auto;
  width: 100%;
  height: ($baseline-rem * .5);
  max-width: 460px;
  border-radius: ($baseline-rem * .25);
  background: $white;
  box-shadow: $button-shadow;
  overflow: hidden;
  div {
    height: 100%;
    background: $red-700;
  }
  .dark-mode & {
    background: $grey-350;
    box-shadow: $button-shadow--dark;
    div {
      background: $red-400;
    }
  }
}
</style>
