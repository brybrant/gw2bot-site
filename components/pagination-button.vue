<template>
  <button
    class="button"
    :class="{ active: currentPage === page }"
    :title="`Page ${page}`"
    :aria-label="`${currentPage === page ? 'Current page,' : 'Go to'} page ${page}`"
    :aria-current="currentPage === page"
    @click="$emit('clicked', page)"
  >{{ page }}</button>
</template>

<script>
export default {
  name: 'PaginationButtonComponent',
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    page: {
      type: Number,
      required: true
    }
  }
}
</script>
