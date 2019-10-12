<template>
<div class="container">
  <div class="list">
    <van-tabs v-model="active" sticky animated swipeable color="#1989FA" title-active-color="#1989FA">
      <van-tab title="适任证">
        <Competence :name="name" :idCard="idCard" :xb="xb" :dataList="dataList"></Competence>
      </van-tab>
      <van-tab title="任解职">
        <dismission :name="name"></dismission>
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
        active: 0,
        dataList: null,
        name: null,
        idCard: null,
        xb: null
      }
    },
    components: {
      Competence,
      dismission
    },
    created() {
      setTitle(this.$route.meta.title)
      this.getQuery()
    },
    methods: {
      getQuery() {
        this.dataList = this.$route.query.data
        this.name = this.$route.query.data[0].xm
        this.idCard = this.$route.query.data[0].sfzhm
        this.xb = this.$route.query.data[0].xb
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
