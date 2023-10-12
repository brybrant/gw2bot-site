<template>
  <table class="encounter__table">
    <tr>
      <th
        v-for="(column, columnName) in columns"
        :key="column.label"
        v-tooltip="column.img ? column.label : null"
        :class="`${columnName}-col${column.img ? ' align-center' : ''}`"
        :colspan="column.colspan || null"
      >
        <button
          class="sort-button"
          :class="sortBy === columnName ? sortOrder : null"
          title="Sort ascending"
          @click="sortRows(columnName, $event)"
        >
          <picture v-if="column.img" class="table-icon">
            <source
              :srcset="require(`@/assets/img/icons/${column.img}.webp`)"
              type="image/webp"
            >
            <img
              :alt="column.label"
              :src="require(`@/assets/img/icons/${column.img}.png`)"
            >
          </picture>
          <template v-else>
            {{ column.label }}
          </template>
        </button>
      </th>
    </tr>
    <tr
      v-for="player in players"
      :key="`${encounter._id}: ${player.account}`"
      :class="{ me: user === player.account }"
    >
      <td class="group-col align-right">
        <CommanderInlineSVG
          v-if="player.commander"
          v-tooltip="`Commander`"
          class="table-icon table-icon--small"
        />
        {{ player.group }}
      </td>
      <td>{{ player.account }}</td>
      <td>
        <picture v-tooltip="player.profession" class="table-icon">
          <source
            :srcset="require(`@/assets/img/professions/${player.profession}_icon.webp`)"
            type="image/webp"
          >
          <img
            :alt="player.profession"
            :src="require(`@/assets/img/professions/${player.profession}_icon.png`)"
          >
        </picture>
        {{ player.character }}
        <ConcentrationInlineSVG
          v-if="player.attributes.concentration"
          v-tooltip="`Concentration`"
          class="table-icon table-icon--small"
        />
        <ConditionInlineSVG
          v-if="player.attributes.condition"
          v-tooltip="`Condition Damage`"
          class="table-icon table-icon--small"
        />
        <HealingInlineSVG
          v-if="player.attributes.healing"
          v-tooltip="`Healing Power`"
          class="table-icon table-icon--small table-icon--narrow"
        />
        <ToughnessInlineSVG
          v-if="player.attributes.toughness"
          v-tooltip="`Toughness`"
          class="table-icon table-icon--small"
        />
      </td>
      <td class="align-right">
        <div class="weapons">
          <template v-for="(weapon, index) in player.weapons">
            <div
              v-if="index < 2 && weapon !== '2Hand'"
              :key="`${encounter._id}: ${player.account}: weapon ${index}`"
              class="table-icon weapon"
            >
              <WeaponsInlineSVGs v-tooltip="weapon" :weapon="weapon" />
            </div>
          </template>
        </div>
      </td>
      <td>
        <div class="weapons">
          <template v-for="(weapon, index) in player.weapons">
            <div
              v-if="index >= 2"
              :key="`${encounter._id}: ${player.account}: weapon ${index}`"
              class="table-icon weapon"
            >
              <WeaponsInlineSVGs v-tooltip="weapon" :weapon="weapon" />
            </div>
          </template>
        </div>
      </td>
      <td class="align-right">
        {{ player.dps.toLocaleString() }}
      </td>
      <td class="align-right">
        {{ (player.dps / details.dps) * 100 | percentage }}%
      </td>
      <td class="alacrity-col align-right">
        {{ player.alacrity | percentage }}%
      </td>
      <td class="fury-col align-right">
        {{ player.fury | percentage }}%
      </td>
      <td class="might-col align-right">
        {{ player.might | mightStacks }}
      </td>
      <td class="protection-col align-right">
        {{ player.protection | percentage }}%
      </td>
      <td class="quickness-col align-right">
        {{ player.quickness | percentage }}%
      </td>
      <td class="resistance-col align-right">
        {{ player.resistance | percentage }}%
      </td>
      <td class="resolution-col align-right">
        {{ player.resolution | percentage }}%
      </td>
      <td class="vigor-col align-right">
        {{ player.vigor | percentage }}%
      </td>
      <td class="blocked-col align-right">
        {{ player.blocked.toLocaleString() }}
      </td>
      <td class="absorbed-col align-right">
        {{ player.absorbed.toLocaleString() }}
      </td>
      <td class="evades-col align-right">
        {{ player.evades.toLocaleString() }}
      </td>
      <td class="cleanses-col align-right">
        {{ player.cleanses.toLocaleString() }}
      </td>
      <td class="strips-col align-right">
        {{ player.strips.toLocaleString() }}
      </td>
      <td class="resurrects-col align-right">
        {{ player.resurrects.toLocaleString() }}
      </td>
    </tr>
  </table>
</template>

<script>
import { VTooltip } from 'floating-vue'

import CommanderInlineSVG from '@/components/inline-svgs/commander'
import ConcentrationInlineSVG from '@/components/inline-svgs/concentration'
import ConditionInlineSVG from '@/components/inline-svgs/condition'
import HealingInlineSVG from '@/components/inline-svgs/healing'
import ToughnessInlineSVG from '@/components/inline-svgs/toughness'
import WeaponsInlineSVGs from '@/components/inline-svgs/weapons'

export default {
  name: 'EncounterTableComponent',
  components: {
    CommanderInlineSVG,
    ConcentrationInlineSVG,
    ConditionInlineSVG,
    HealingInlineSVG,
    ToughnessInlineSVG,
    WeaponsInlineSVGs
  },
  directives: {
    tooltip: VTooltip
  },
  props: {
    details: {
      type: Object,
      default: undefined
    },
    encounter: {
      type: Object,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      columns: {
        group: {
          img: 'group',
          label: 'Subgroup'
        },
        account: {
          label: 'Account'
        },
        character: {
          label: 'Character',
          colspan: 3
        },
        dps: {
          label: 'DPS',
          colspan: 2
        },
        alacrity: {
          img: 'alacrity',
          label: 'Alacrity uptime'
        },
        fury: {
          img: 'fury',
          label: 'Fury uptime'
        },
        might: {
          img: 'might',
          label: 'Average Might stacks'
        },
        protection: {
          img: 'protection',
          label: 'Protection uptime'
        },
        quickness: {
          img: 'quickness',
          label: 'Quickness uptime'
        },
        resistance: {
          img: 'resistance',
          label: 'Resistance uptime'
        },
        resolution: {
          img: 'resolution',
          label: 'Resolution uptime'
        },
        vigor: {
          img: 'vigor',
          label: 'Vigor uptime'
        },
        blocked: {
          img: 'aegis',
          label: 'Blocks'
        },
        absorbed: {
          img: 'barrier',
          label: 'Damage absorbed'
        },
        evades: {
          img: 'evade',
          label: 'Evades'
        },
        cleanses: {
          img: 'cleanse',
          label: 'Conditions cleansed'
        },
        strips: {
          img: 'strip',
          label: 'Boons stripped'
        },
        resurrects: {
          img: 'resurrect',
          label: 'Resurrects'
        }
      },
      sortBy: '',
      sortOrder: ''
    }
  },
  computed: {
    players () {
      if (!this.sortBy) { return this.details.players }

      const sortedPlayers = this.details.players.toSorted(this.sort)

      if (this.sortOrder === 'descending') {
        sortedPlayers.reverse()
      }

      return sortedPlayers
    }
  },
  methods: {
    sortRows (columnName, event) {
      if (this.sortBy === columnName) {
        if (this.sortOrder === 'descending') {
          event.target.title = 'Sort ascending'
          this.sortBy = this.sortOrder = ''
          return
        }
        event.target.title = 'Sort initial'
        this.sortOrder = 'descending'
      } else {
        event.target.title = 'Sort descending'
        this.sortOrder = 'ascending'
      }

      this.sortBy = columnName
    },
    sort (a, b) {
      if (a[this.sortBy] < b[this.sortBy]) { return -1 }
      if (a[this.sortBy] > b[this.sortBy]) { return 1 }
      return 0
    }
  }
}
</script>

<style lang="scss" scoped>
.encounter__table {
  margin: 0;
  white-space: nowrap;
}
.me {
  background: $white;
  font-weight: 700;
  .dark-mode & {
    background: $grey-350;
  }
}
th {
  padding: 0;
  background: $grey-1100;
  .dark-mode & {
    background: $grey-250;
  }
}
td {
  padding: 2px 6px;
  font-size: $small-font-rem;
}

.align-center {
  text-align: center;
}
.align-right {
  text-align: right;
}

.group-col {
  border-left: 0;
  padding-left: $baseline-px * .5;
  width: 4%;
  min-width: 46px + ($baseline-px * .25);
  .sort-button {
    padding-left: 0;
  }
}
.account-col {
  width: 16%;
  min-width: 100px;
}
.character-col {
  width: 16%;
  min-width: 200px;
}
.dps-col {
  width: 12%;
  min-width: 100px;
}
.alacrity-col,
.fury-col,
.might-col,
.protection-col,
.quickness-col,
.resistance-col,
.resolution-col,
.vigor-col {
  width: 4%;
  min-width: 46px;
}
.blocked-col {
  width: 4%;
  min-width: 46px;
}
.absorbed-col {
  width: 4%;
  min-width: 46px;
}
.evades-col {
  width: 4%;
  min-width: 46px;
}
.cleanses-col {
  width: 4%;
  min-width: 46px;
}
.strips-col {
  width: 4%;
  min-width: 46px;
}
.resurrects-col {
  width: 4%;
  min-width: 46px;
}
.resurrects-col {
  border-right: 0;
  padding-right: $baseline-px * .5;
  min-width: 46px + ($baseline-px * .25);
  .sort-button {
    padding-right: 16px - ($baseline-px * .25);
    &:before, &:after {
      transform: none;
    }
  }
}

.sort-button {
  position: relative;
  display: block;
  margin: 0;
  border: 0;
  padding: 2px 16px 2px 6px;
  width: 100%;
  height: 28px;
  background: none;
  text-align: inherit;
  outline: 0;
  &:before, &:after {
    @extend %Psuedo-element;
    position: absolute;
    top: 50%;
    right: 0;
    width: 0;
    height: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    transform: translateX(-6px);
    opacity: 0.5;
  }
  &:before {
    margin-top: -4px;
    border-bottom: 4px solid currentColor;
  }
  &:after {
    margin-top: 2px;
    border-top: 4px solid currentColor;
  }
  &.ascending {
    &:before {
      margin-top: -2px;
      border-bottom-width: 5px;
      opacity: 1;
    }
    &:after {
      display: none;
    }
  }
  &.descending {
    &:before {
      display: none;
    }
    &:after {
      margin-top: -2px;
      border-top-width: 5px;
      opacity: 1;
    }
  }
  .table-icon {
    pointer-events: none;
  }
}

.weapons {
  display: inline-flex;
  flex-flow: row nowrap;
  margin-left: -1px;
  vertical-align: top;
}

.weapon {
  margin-left: 1px;
  svg {
    display: inline-block;
    vertical-align: top;
  }
  &:after {
    @extend %Psuedo-element;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid currentColor;
    opacity: .25;
  }
}

.table-icon {
  position: relative;
  display: inline-block;
  width: $baseline-px;
  height: $baseline-px;
  vertical-align: top;
  color: $grey-350;
  fill: currentColor;
  stroke: currentColor;
  .dark-mode & {
    color: $grey-1150;
    fill: currentColor;
    stroke: currentColor;
  }
}
.table-icon--small {
  margin: ($baseline-px * .125) 0;
  width: $baseline-px * .75;
  height: $baseline-px * .75;
}
.table-icon--narrow {
  width: $baseline-px * .5
}
</style>
