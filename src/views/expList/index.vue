<template>
  <div class="container exp-list">
    <van-tabs v-model="active"
              :color="color"
              :title-active-color="color"
              :sticky="sticky"
              swipeable
              @click="onClick">
      <van-tab title="待取件">
        <lists :type="type0"></lists>
      </van-tab>
      <van-tab title="待付款">
        <boxs :type="type1"></boxs>
      </van-tab>
      <van-tab title="已取件">
        <boxs :type="type5"></boxs>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import lists from './list.vue'
import boxs from './boxs.vue'
import Vue from 'vue'

export default {
  components: {
    lists, boxs
  },
  data() {
    return {
      color: '#108EE9',
      active: 0,
      type0: 0,
      type1: 1,
      type5: 5,
      sticky: true
    }
  },
  created() {
    this.active = this.expActive
  },
  methods: {
    onClick(id, title) {
      Vue.prototype.expActive = id
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  background: #f2f2f2;
  width: 100%;
}
</style>
<style lang="scss">
.exp-list {
  .van-tabs--line .van-tabs__wrap {
    // position: fixed;
  }
}
</style>
