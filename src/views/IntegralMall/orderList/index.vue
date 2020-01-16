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
        <all/>
      </van-tab>
      <van-tab title="待兑换">
        <all :active="1"/>
      </van-tab>
      <van-tab title="已完成">
        <all :active="2"/>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import all from './all'
  import { setTitle } from '@/utils/cache.js'
  export default {
    components: {
      all
    },
    data() {
      return {
        active: this.$route.query.index
      }
    },
    mounted() {
      setTitle(this.$route.meta.title)
    }
  }
</script>

<style scoped lang="scss"></style>
