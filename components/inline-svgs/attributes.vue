<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="`0 0 ${attribute === 'Healing Power' ? '45 62' : '64 64'}`"
  >
    <path v-if="attribute === 'Concentration'" d="M55,5H9l-2,2V57l2,2H55l2-2V7l-2-2Zm-19,29l4,3,3,4,2,6,1,2,1,2-1,2H18l-1-2,1-2,1-2,2-6,3-4,4-3,1-1,1-1-1-1-1-1-4-3-3-4-2-6-1-2-1-2,1-2h28l1,2-1,2-1,2-2,6-3,4-4,3-1,1-1,1,1,1,1,1Z" />
    <path v-else-if="attribute === 'Toughness'" d="M32,60l-2-1-11-11-7-9-3-6V15l4-2,4-3,3-5h24l3,5,4,3,4,2v18l-3,6-7,9-11,11-2,1Z" />
    <template v-else-if="attribute === 'Condition Damage'">
      <path d="M32,60l-2-1-10-9-1-2,2-2,2,1,1,1,2,2h2l2-2-3-1-3-3,3-2,5-5,5,5,3,2-3,3-3,1,2,2h2l2-2,1-1,2-1,2,2-1,2-10,9-2,1Z" />
      <path d="M17,46l-12-12-1-2,1-2L30,5l2-1,2,1,25,25,1,2-1,2-12,12-2.03-2.03,1.03-1.97,1-1,2-2v-2l-2-2-1,3-3,3-2-3-5-5,6-6,4-8-8,4-6,6-6-6-8-4,4,8,6,6-5,5-2,3-3-3-1-3-2,2v2l2,2,1,1,1,2-2,2Z" />
    </template>
    <path v-else-if="attribute === 'Healing Power'" d="M31.5,34l3-7,1-4-1-4L26.5,6l-4-2-4,2-8,13-1,4,1,4,3,7-8,4,4,2,6-1,3,10,2,6,2,5,2-5,2-6,3-10,6,1,4-2-8-4Zm-3-8l-6,15-6-15-1-4,2-4,2-3,3-2,3,2,2,3,2,4-1,4Z" />
  </svg>
</template>

<script>
export default {
  name: 'AttributesInlineSVGs',
  props: {
    attribute: {
      type: String,
      default: ''
    }
  }
}
</script>
