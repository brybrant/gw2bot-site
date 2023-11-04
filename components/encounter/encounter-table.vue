<template>
  <table class="encounter__table">
    <tr>
      <th
        v-for="(column, columnName) in columns"
        :key="`column-${columnName}`"
        :class="`${columnName}-col${column.img ? ' align-center' : ''}`"
        :colspan="column.colspan || null"
      >
        <button
          v-tooltip="column.img ? column.label : null"
          class="sort-button"
          :class="sortBy === columnName ? sortOrder : null"
          title="Sort ascending"
          @click="sortRows(columnName, $event)"
        >
          <picture v-if="column.img" class="table-icon">
            <source
              :data-srcset="`${require(`~/assets/img/icons/${column.img}.png?size=24&format=webp`)} 1x, ${require(`~/assets/img/icons/${column.img}.png?format=webp`)} 2x`"
              type="image/webp"
            >
            <img
              :alt="column.label"
              class="lazyload"
              width="48"
              height="48"
              :data-src="require(`~/assets/img/icons/${column.img}.png?size=24`)"
              :data-srcset="`${require(`~/assets/img/icons/${column.img}.png`)} 2x`"
            >
          </picture>
          <template v-else>
            {{ column.label }}
          </template>
        </button>
      </th>
    </tr>
    <tr
      v-for="(player, index) in players"
      :key="`player-${index}`"
      :class="{ me: user === player.account }"
    >
      <keep-alive>
        <td class="group-col align-right">
          <div
            v-if="player.commander"
            class="table-icon table-icon--small"
            title="Commander"
          >
            <CommanderInlineSVG />
          </div>
          {{ player.group }}
        </td>
      </keep-alive>
      <td>{{ player.account }}</td>
      <td>
        <picture class="table-icon">
          <source
            :data-srcset="`${require(`~/assets/img/professions/${player.profession}.png?size=24&format=webp`)} 1x, ${require(`~/assets/img/professions/${player.profession}.png?format=webp`)} 2x`"
            type="image/webp"
          >
          <img
            :alt="player.profession"
            class="lazyload"
            width="48"
            height="48"
            :data-src="require(`~/assets/img/professions/${player.profession}.png?size=24`)"
            :data-srcset="`${require(`~/assets/img/professions/${player.profession}.png`)} 2x`"
            :title="player.profession"
          >
        </picture>
        {{ player.character }}
        <div
          v-for="attribute in player.attributes"
          :key="`attribute-${attribute}`"
          class="table-icon table-icon--small"
          :class="{
            'table-icon--narrow': attribute === 'Healing Power'
          }"
          :title="attribute"
        >
          <AttributesInlineSVGs :attribute="attribute" />
        </div>
      </td>
      <td class="align-right">
        <div class="weapons">
          <template v-for="(weapon, index2) in player.weapons">
            <div
              v-if="index2 < 2 && weapon !== '2Hand'"
              :key="`weapon-${index2}`"
              class="table-icon weapon"
              :title="weapon"
            >
              <WeaponsInlineSVGs :weapon="weapon" />
            </div>
          </template>
        </div>
      </td>
      <td>
        <div class="weapons">
          <template v-for="(weapon, index2) in player.weapons">
            <div
              v-if="index2 >= 2"
              :key="`weapon-${index2}`"
              class="table-icon weapon"
              :title="weapon"
            >
              <WeaponsInlineSVGs :weapon="weapon" />
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
import CommanderInlineSVG from '@/components/inline-svgs/commander'
import AttributesInlineSVGs from '@/components/inline-svgs/attributes'
import WeaponsInlineSVGs from '@/components/inline-svgs/weapons'

export default {
  name: 'EncounterTableComponent',
  components: {
    CommanderInlineSVG,
    AttributesInlineSVGs,
    WeaponsInlineSVGs
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
  img {
    width: $baseline-px;
    height: $baseline-px;
  }
  svg {
    display: inline-block;
    vertical-align: top;
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
.vigor-col,
.blocked-col,
.absorbed-col,
.evades-col,
.cleanses-col,
.strips-col,
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

.weapons {
  display: inline-flex;
  flex-flow: row nowrap;
  margin-left: -1px;
  vertical-align: top;
}

.weapon {
  margin-left: 1px;
  background: $white;
  .dark-mode & {
    background: $grey-350;
  }
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
</style>
