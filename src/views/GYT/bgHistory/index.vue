<template>
<div class="container">
<!--  <pageHeader/>-->
  <div class="list">
    <van-tabs v-model="active" sticky animated swipeable color="#1989FA" title-active-color="#1989FA"	>
      <van-tab title="未确认">
        <history-list :confirmStatus="1" :status="0"/>
      </van-tab>
      <van-tab title="已确认">
        <history-list :confirmStatus="2" :status="0"/>
      </van-tab>
      <van-tab title="已作废">
        <history-list :confirmStatus="0" :status="2"/>
      </van-tab>
    </van-tabs>
  </div>
</div>
</template>

<script>
  import pageHeader from '@/components/navBar'
  import historyList from './historyList'
  import { setTitle } from '@/utils/cache.js'
  export default {
    components: {
      pageHeader,
      historyList
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
