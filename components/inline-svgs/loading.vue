<template>
  <svg class="inline-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="30" />
  </svg>
</template>

<script>
export default {
  name: 'LoadingInlineSVG'
}
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(270deg);
    stroke-dashoffset: 188.5;
  }
  40% {
    transform: rotate(270deg);
    stroke-dashoffset: 0;
  }
  80% {
    transform: rotate(630deg);
    stroke-dashoffset: 188.5;
  }
}

circle {
  transform: rotate(270deg);
  transform-origin: 50% 50%;
  fill: none;
  stroke: currentColor;
  stroke-width: 15;
  stroke-dasharray: 188.5;
  stroke-dashoffset: 188.5;
  animation: spin 2s ease-in-out infinite;
}
</style>
