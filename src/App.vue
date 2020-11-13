<template>
  <div style="display: flex;flex-direction:column;min-height:100%">
    <div id="app">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <eFooter></eFooter>
  </div>
</template>

<script>
import eFooter from '@/views/eFooter'
export default {
  components: {
    eFooter
  }
}
</script>

<style lang="scss">
#app {
  font-family: Noto Sans SC;
  font-style: normal;
  font-weight: 400;
  flex: 1;
}
</style>
