<template>
<div class="container">
  <div class="list">
    <van-tabs v-model="active" sticky animated swipeable color="#1989FA" title-active-color="#1989FA">
      <van-tab title="适任证">
        <Competence></Competence>
      </van-tab>
      <van-tab title="任解职">
        <dismission></dismission>
      </van-tab>
    </van-tabs>
  </div>
</div>
</template>

<script>
  import { setTitle } from '@/utils/cache.js'
  import Competence from './Competence'
  import dismission from './dismission'
  export default {
    data() {
      return {
        active: 1
      }
    },
    components: {
      Competence,
      dismission
    },
    created() {
      setTitle(this.$route.meta.title)
    }
  }
</script>

<style scoped lang="scss">

</style>
