<template>
<div class="container">
  <div class="header">
    <vheader></vheader>
  </div>
  <div class="main">
    <shopList v-if="active===0"></shopList>
    <personal v-if="active===1"></personal>
  </div>
  <div class="tabbar">
    <van-tabbar v-model="active">
      <van-tabbar-item>商城</van-tabbar-item>
      <van-tabbar-item>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</div>
</template>

<script>
  import personal from './personal'
  import shopList from './shopList'
  import vheader from './vheader'
  export default {
    name: 'index',
    data() {
      return {
        active: 0
      }
    },
    components: {
      personal,
      shopList,
      vheader
    }
  }
</script>

<style scoped lang="scss">

</style>
