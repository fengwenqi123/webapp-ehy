<template>
  <div class="content">
    <dropdown></dropdown>
    <div class="shop-list">
      <list></list>
    </div>
  </div>
</template>

<script>
  import dropdown from './dropdown'
  import list from './list'

  export default {
    components: {
      dropdown,
      list
    }
  }
</script>

<style scoped lang="scss">
  .content {

  }
</style>
