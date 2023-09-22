<template>
  <table class="encounter__table">
    <tr>
      <th
        v-for="heading in columnHeadings"
        :key="heading.label"
        :class="`${heading.column}-col${heading.img ? ' boon-col' : ''}`"
      >
        <button
          class="sort-button"
          :class="sortBy === heading.column ? sortOrder : null"
          title="Sort ascending"
          @click="sortRows(
            heading.column,
            heading.img !== undefined,
            $event
          )"
        >
          <img
            v-if="heading.img !== undefined"
            class="boon-icon"
            :alt="heading.label"
            :src="heading.img"
          >
          <template v-else>
            {{ heading.label }}
          </template>
        </button>
      </th>
    </tr>
    <tr
      v-for="player in (sortedPlayers || details.players)"
      :key="`${encounter._id}: ${player.account}`"
      :class="{ me: user === player.account }"
    >
      <td class="group-col">
        {{ player.group }}
      </td>
      <td class="account-col">
        <span contenteditable>{{ player.account }}</span>
      </td>
      <td class="character-col">
        <picture>
          <source :srcset="require(`@/assets/img/professions/${player.profession}_icon.webp`)" type="image/webp">
          <img
            class="profession-icon"
            :src="require(`@/assets/img/professions/${player.profession}_icon.png`)"
            :title="player.profession"
            :alt="player.profession"
          >
        </picture>{{ player.character }}
      </td>
      <td class="dps-col">
        {{ player.dps.toLocaleString() }}
        <span>({{
          (player.dps / details.dps) * 100 | percentage
        }}%)</span>
      </td>
      <td class="alacrity-col boon-col">
        {{ player.boons.alacrity | percentage }}%
      </td>
      <td class="fury-col boon-col">
        {{ player.boons.fury | percentage }}%
      </td>
      <td class="might-col boon-col">
        {{ player.boons.might | mightStacks }}
      </td>
      <td class="protection-col boon-col">
        {{ player.boons.protection | percentage }}%
      </td>
      <td class="quickness-col boon-col">
        {{ player.boons.quickness | percentage }}%
      </td>
      <td class="resolution-col boon-col">
        {{ player.boons.resolution | percentage }}%
      </td>
      <td class="vigor-col boon-col">
        {{ player.boons.vigor | percentage }}%
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'EncounterTableComponent',
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
      columnHeadings: [
        {
          label: 'Group',
          column: 'group'
        },
        {
          label: 'Account',
          column: 'account'
        },
        {
          label: 'Character',
          column: 'character'
        },
        {
          label: 'DPS',
          column: 'dps'
        },
        {
          label: 'Alacrity uptime',
          column: 'alacrity',
          img: 'https://render.guildwars2.com/file/4FDAC2113B500104121753EF7E026E45C141E94D/1938787.png'
        },
        {
          label: 'Fury uptime',
          column: 'fury',
          img: 'https://render.guildwars2.com/file/96D90DF84CAFE008233DD1C2606A12C1A0E68048/102842.png'
        },
        {
          label: 'Might stacks',
          column: 'might',
          img: 'https://render.guildwars2.com/file/2FA9DF9D6BC17839BBEA14723F1C53D645DDB5E1/102852.png'
        },
        {
          label: 'Protection uptime',
          column: 'protection',
          img: 'https://render.guildwars2.com/file/CD77D1FAB7B270223538A8F8ECDA1CFB044D65F4/102834.png'
        },
        {
          label: 'Quickness uptime',
          column: 'quickness',
          img: 'https://render.guildwars2.com/file/D4AB6401A6D6917C3D4F230764452BCCE1035B0D/1012835.png'
        },
        {
          label: 'Resolution uptime',
          column: 'resolution',
          img: 'https://render.guildwars2.com/file/D104A6B9344A2E2096424A3C300E46BC2926E4D7/2440718.png'
        },
        {
          label: 'Vigor uptime',
          column: 'vigor',
          img: 'https://render.guildwars2.com/file/58E92EBAF0DB4DA7C4AC04D9B22BCA5ECF0100DE/102843.png'
        }
      ],
      sortBy: null,
      sortOrder: null,
      sortedPlayers: null
    }
  },
  methods: {
    sortRows (column, boon, event) {
      if (this.sortBy === column) {
        if (this.sortOrder === 'descending') {
          event.target.title = 'Sort ascending'
          this.sortBy = this.sortOrder = this.sortedPlayers = null
          return
        }
        event.target.title = 'Sort initial'
        this.sortOrder = 'descending'
        this.sortedPlayers.reverse()
      } else {
        event.target.title = 'Sort descending'
        this.sortOrder = 'ascending'
        if (boon) {
          this.sortedPlayers = this.details.players.toSorted((a, b) => {
            if (a.boons[column] < b.boons[column]) { return -1 }
            if (a.boons[column] > b.boons[column]) { return 1 }
            return 0
          })
        } else {
          this.sortedPlayers = this.details.players.toSorted((a, b) => {
            if (a[column] < b[column]) { return -1 }
            if (a[column] > b[column]) { return 1 }
            return 0
          })
        }
      }

      this.sortBy = column
    }
  }
}
</script>

<style lang="scss" scoped>
.encounter__table {
  margin: 0;
  white-space: nowrap;
  min-width: 890px;
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
.group-col {
  border-left: 0;
  padding-left: $baseline-px * .5;
  width: 6%;
  min-width: 75px;
  .sort-button {
    padding-left: 0;
  }
}
td.group-col {
  text-align: right;
}
.account-col {
  width: 20%;
  min-width: 130px;
}
.character-col {
  width: 20%;
  min-width: 160px;
}
.dps-col {
  width: 12%;
  min-width: 125px;
  span {
    display: inline-block;
    width: 57px;
    vertical-align: top;
  }
}
td.dps-col {
  text-align: right;
}
.boon-col {
  width: 6%;
  min-width: 61px;
  text-align: right;
}
th.boon-col {
  text-align: center;
}
.vigor-col {
  border-right: 0;
  padding-right: $baseline-px * .5;
  min-width: 62px + ($baseline-px * .25);
  .sort-button {
    padding-right: 0;
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
  padding: 2px 6px;
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
}
.boon-icon {
  display: inline-block;
  width: $baseline-px;
  height: $baseline-px;
  vertical-align: top;
}

.profession-icon {
  display: inline-block;
  margin-right: 2px;
  width: $p-line-rem;
  height: $p-line-rem;
  vertical-align: top;
}
</style>
