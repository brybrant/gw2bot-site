<template>
  <div class="permissions">
    <p class="small-text">
      {{ `Required API key permission${permissions.length>1 ? 's:' : ':'}` }}<br>
      <code
        v-for="(permission, index) in permissions"
        :key="`permission-${index}`"
        class="smaller"
      >
        {{ permission }}
      </code>
    </p>
  </div>
</template>

<script>
export default {
  name: 'CommandPermissionsComponent',
  props: {
    permissions: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.permissions {
  display: inline-block;
  margin: 4px 0 0;
  padding: 4px 8px 0;
  border-top: 1px solid $grey-1100;
  code ~ code {
    margin-left: 6px;
  }
  .dark-mode & {
    border-color: $grey-250;
  }
}
</style>
