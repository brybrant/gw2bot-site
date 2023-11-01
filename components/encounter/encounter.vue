<template>
  <li class="encounter">
    <div class="encounter__info small-text">
      <div class="encounter__info-cell">
        <span class="encounter__info-label">Date:</span>
        <span class="encounter__info-value">
          {{ new Date(encounter.date).toLocaleString() }}
        </span>
      </div>
      <div class="encounter__info-cell">
        <span class="encounter__info-label">Duration:</span>
        <span class="encounter__info-value">
          {{ encounter.duration | duration }}
        </span>
      </div>
      <div
        v-if="encounter.details"
        class="encounter__info-cell"
      >
        <template v-if="encounter.details.boss_health !== undefined">
          <span class="encounter__info-label">Boss health:</span>
          <div class="boss-health">
            <div
              v-if="encounter.details.boss_health > 0"
              :style="`width: ${encounter.details.boss_health}%`"
            />
            <span>{{ encounter.details.boss_health | percentage }}%</span>
          </div>
        </template>
        <template v-else-if="encounter.details.wvw_map !== undefined">
          <span class="encounter__info-label">Map:</span>
          <span class="encounter__info-value">
            {{ encounter.details.wvw_map }}
          </span>
        </template>
      </div>
      <div class="encounter__info-cell">
        <span class="encounter__link">
          <ExternalLink :href="encounter.permalink">Full details</ExternalLink>
        </span>
      </div>
    </div>

    <div
      v-if="encounter.details"
      class="table-container"
      :class="encounter.boss_id !== 1 ? (encounter.success ? 'success' : 'failure') : null"
    >
      <EncounterTableComponent
        :details="encounter.details"
        :encounter="encounter"
        :user="user"
      />
    </div>
    <p v-else class="h4">
      Loading Encounter Details... <LoadingInlineSVG />
    </p>
  </li>
</template>

<script>
import EncounterTableComponent from '@/components/encounter/encounter-table'
import LoadingInlineSVG from '@/components/inline-svgs/loading'

export default {
  name: 'EncounterComponent',
  components: {
    EncounterTableComponent,
    LoadingInlineSVG
  },
  props: {
    encounter: {
      type: Object,
      required: true
    },
    user: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.encounter {
  position: relative;
  margin: 0;
  border-top: 1px solid $grey-1000;
  padding: 0;
  .dark-mode & {
    border-top-color: $grey-200;
  }
}

.encounter__info {
  display: inline-flex;
  flex-flow: column nowrap;
  margin-left: -$baseline-px;
  @include media-query('gt-800') {
    flex-flow: row nowrap;
  }
}

.encounter__info-cell {
  display: flex;
  flex-flow: row nowrap;
  margin-top: $baseline-rem * .25;
  padding-left: $baseline-px;
}

.encounter__info-label {
  font-weight: 700;
  width: 90px;
  padding-right: 4px;
  text-align: right;
  @include media-query('gt-800') {
    width: auto;
  }
}

.encounter__info-value {
  width: 180px;
  text-align: left;
  @include media-query('gt-800') {
    width: auto;
  }
}

.boss-health {
  position: relative;
  width: 100px;
  height: $small-line-rem;
  background: $grey-1100;
  vertical-align: top;
  .dark-mode & {
    background: $grey-250;
  }
  &:after {
    @extend %Psuedo-element;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid $grey-1000;
    .dark-mode & {
      border-color: $grey-200;
    }
  }
  div, span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  div {
    background: $white;
    .dark-mode & {
      background: $grey-350;
    }
  }
}

.encounter__link {
  width: 270px;
  @include media-query('gt-800') {
    width: auto;
  }
}

.table-container {
  margin-top: 6px;
  border-top: 4px solid gray;
  overflow-x: scroll;
  &.success {
    border-top-color: green;
  }
  &.failure {
    border-top-color: firebrick;
  }
}

.h4 {
  margin-top: ($baseline-rem * 2) - $h4-line-rem;
  margin-bottom: $baseline-rem;
  .inline-svg {
    width: $h4-line-rem;
    height: $h4-line-rem;
  }
}
</style>
