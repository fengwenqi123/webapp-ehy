<template>
  <van-tabs v-model="activeName" color="#0064E0">
    <van-tab title="基本信息" name="1">
      <boatInfo></boatInfo>
    </van-tab>
    <van-tab title="证书" name="2">
      <card></card>
    </van-tab>
    <van-tab title="违章" name="3">
      <breakRules></breakRules>
    </van-tab>
    <van-tab title="感知" name="4">
      <feeling></feeling>
    </van-tab>
  </van-tabs>
</template>

<script>
import boatInfo from './boatInfo.vue'
import card from './card.vue'
import feeling from './feeling.vue'
import breakRules from './breakRules.vue'
import { setTitle, isWz } from '@/utils/cache.js'
export default {
  components: {
    boatInfo,
    card,
    feeling,
    breakRules
  },
  created() {
    if (isWz() === '1') {
      this.activeName = '3'
    } else {
      this.activeName = '1'
    }
  },
  mounted() {
    setTitle(this.$route.meta.title)
  },
  data() {
    return {
      activeName: '3'
    }
  }
}
</script>

<style>
</style>
