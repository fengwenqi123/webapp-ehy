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
export default {
  components: {
    boatInfo,
    card,
    feeling,
    breakRules
  },
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>

<style>
</style>
