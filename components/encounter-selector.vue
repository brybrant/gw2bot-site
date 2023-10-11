<template>
  <div class="form form--inline">
    <!-- ENCOUNTER SELECTOR -->
    <div class="flexbox flexbox--form">
      <div class="flexbox__item">
        <div class="form__group">
          <label for="encounter-instances" class="form__label">
            Instance:
          </label>
          <select
            id="encounter-instances"
            class="form__control"
            @change="selectInstance($event.target.selectedOptions[0])"
          >
            <option selected />
            <optgroup
              v-for="(instances, category) in bosses"
              :key="category"
              :label="`${category} (${tally[category]})`"
            >
              <option
                v-for="(encounters, instance) in instances"
                :key="instance"
                :disabled="tally[instance] === 0"
                :data-category="category"
                :value="instance"
              >
                {{ instance }} ({{ tally[instance] }})
              </option>
            </optgroup>
          </select>
        </div>
      </div>

      <div v-if="currentInstance" class="flexbox__item">
        <div class="form__group">
          <label for="encounter-bosses" class="form__label">
            Encounter:
          </label>
          <select
            id="encounter-bosses"
            class="form__control"
            @change="selectEncounter($event.target.selectedOptions[0])"
          >
            <option v-if="currentInstance.length > 1" selected />
            <option
              v-for="(encounter, index) in currentInstance"
              :key="encounter.name"
              :disabled="tally[encounter.name] === 0"
              :selected="currentEncounter === encounter"
              :value="tally[encounter.name] ? index : ''"
            >
              {{ encounter.name }} ({{ tally[encounter.name] }})
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- ENCOUNTER FILTERS -->
    <template v-if="currentEncounter">
      <hr>

      <div class="flexbox flexbox--form">
        <div
          v-if="currentEncounter.api_name !== 'wvw'"
          class="flexbox__item"
        >
          <div class="form__checkbox">
            <label for="result" class="form__label">
              Successful Only?
            </label>
            <input
              id="result"
              type="checkbox"
              @change="$emit('filterEncounters', $event.target)"
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
              pattern="\d{4}-\d{2}-\d{2}"
              @change="$emit('filterEncounters', $event.target)"
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
              pattern="\d{4}-\d{2}-\d{2}"
              @change="$emit('filterEncounters', $event.target)"
            >
          </div>
        </div>
      </div>
    </template>
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
    currentInstance: {
      type: Array,
      default: null
    },
    currentEncounter: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      bosses
    }
  },
  methods: {
    selectInstance (option) {
      const category = bosses[option.dataset.category]

      if (category) {
        this.$emit('setInstance', category[option.value])
      } else {
        this.$emit('setInstance', null)
      }
    },
    selectEncounter (option) {
      if (option.value && this.currentInstance) {
        this.$emit('setEncounter', this.currentInstance[option.value])
      } else {
        this.$emit('setEncounter', null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/situational/forms';

select.form__control {
  width: 250px;
}
</style>
