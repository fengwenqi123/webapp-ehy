<template>
<div class="nav-bar">
  <van-nav-bar :title="title" left-text="返回" left-arrow @click-left="onClickLeft">
  </van-nav-bar>
</div>
</template>

<script>
  import { getFinishWeb } from '@/utils/cache.js'
  export default {
    computed: {
      title() {
        return this.$route.meta.title
      }
    },
    methods: {
      onClickLeft() {
        getFinishWeb()
      }
    }
  }
</script>

<style scoped lang="scss">
.nav-bar{
}
</style>
