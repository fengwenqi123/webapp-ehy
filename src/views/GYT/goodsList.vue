<template>
  <div class="container">
<!--    <div class="header">-->
<!--      <pageHeader/>-->
<!--    </div>-->
    <div class="content">
      <van-cell-group>
        <van-field
          v-for="(item,index) in list"
          :key="index"
          :label="item.name"
          clickable
          disabled
          label-width="9rem"
          @click="selectItem(item)"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import { findPierById } from '@/api/pier'
  import pageHeader from '@/components/navBar'
  import { setTitle } from '@/utils/cache.js'

  export default {
    components: {
      pageHeader
    },
    data() {
      return {
        id: null,
        list: []
      }
    },
    created() {
      this.getQuery()
      setTitle(this.$route.meta.title)
    },
    methods: {
      selectItem(item) {
        this.$store.commit('set_goods', item)
        this.$router.go(-1)
      },
      getQuery() {
        if (this.$route.query.id) {
          this.id = this.$route.query.id
        }
        this.findPier()
      },
      findPier() {
        findPierById(this.id).then(response => {
          this.list = response.data.goodsBeanList
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 750px;
    background: #fff;

    /*.header {*/
    /*  position: fixed;*/
    /*  width: 100%;*/
    /*  z-index: 9;*/
    /*}*/

    /*.content {*/
    /*  padding-top: 100px;*/
    /*}*/
  }
</style>
