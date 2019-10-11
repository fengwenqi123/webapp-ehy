<template>
  <div class="container">
    <!--    <pageHeader/>-->
    <div class="list">
      <van-tabs v-model="active" sticky animated swipeable color="#1989FA" title-active-color="#1989FA">
        <van-tab title="我的待闸">
          <lock-list-my/>
        </van-tab>
        <van-tab title="所有待闸">
          <lock-list-all/>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import pageHeader from '@/components/navBar'
  import lockListMy from './lockListMy'
  import lockListAll from './lockListAll'
  import { setTitle } from '@/utils/cache.js'

  export default {
    components: {
      pageHeader,
      lockListMy,
      lockListAll
    },
    data() {
      return {
        active: 0
      }
    },
    created() {
      setTitle(this.$route.meta.title)
    }
  }
</script>

<style scoped lang="scss">

</style>
