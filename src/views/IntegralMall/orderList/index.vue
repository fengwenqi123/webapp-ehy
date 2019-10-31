<template>
  <div class="container">
    <van-tabs
      v-model="active"
      swipeable
      sticky
      color="#108EE9"
      title-active-color="#108EE9"
    >
      <van-tab title="全部">
        <all></all>
      </van-tab>
      <van-tab title="待兑换"><all/></van-tab>
      <van-tab title="已完成"><all/></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import all from './all'
export default {
  name: 'index',
  components: {
    all
  },
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="scss"></style>
