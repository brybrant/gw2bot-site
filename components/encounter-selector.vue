<template>
  <div class="encounter-menu">
    <div v-if="tally" class="filters">
      <!-- ENCOUNTER SELECTOR -->
      <div class="form__group">
        <label for="encounter-instances" class="form__label">
          Instance:
        </label>
        <select id="encounter-instances" class="form__control">
          <option
            selected
            @click="$emit('setInstance', null)"
          />
          <optgroup
            v-for="(instances, category) in bosses"
            :key="category"
            :label="category"
          >
            <option
              v-for="instance in instances"
              :key="instance.name"
              :disabled="tally[instance.name] === 0"
              @click="$emit('setInstance', instance)"
            >
              {{ instance.name }} ({{ tally[instance.name] }})
            </option>
          </optgroup>
        </select>
      </div>

      <div v-if="activeInstance" class="form__group">
        <label for="encounter-bosses" class="form__label">
          Encounter:
        </label>
        <select id="encounter-bosses" class="form__control">
          <option
            v-if="activeInstance.encounters.length > 1"
            selected
            @click="$emit('setEncounter', null)"
          />
          <option
            v-for="encounter in activeInstance.encounters"
            :key="encounter.name"
            :disabled="tally[encounter.name] === 0"
            :selected="activeEncounter === encounter"
            @click="tally[encounter.name] && $emit('setEncounter', encounter)"
          >
            {{ encounter.name }} ({{ tally[encounter.name] }})
          </option>
        </select>
      </div>

      <!-- ENCOUNTER FILTERS -->
      <template v-if="activeEncounter !== null">
        <hr>

        <div
          v-if="activeEncounter.name !== 'World vs World'"
          class="form__checkbox"
        >
          <label for="result" class="form__label">
            Successful Only?
          </label>
          <input
            id="result"
            type="checkbox"
            @change="$emit('filterEncounters', $event)"
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
            @change="$emit('filterEncounters', $event)"
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
            @change="$emit('filterEncounters', $event)"
          >
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import bosses from '@/assets/js/bossesData'

export default {
  name: 'EncounterSelectorComponent',
  props: {
    tally: {
      type: Object,
      required: true
    },
    activeInstance: {
      type: Object,
      required: true
    },
    activeEncounter: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      bosses
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/situational/forms';

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
</style>
