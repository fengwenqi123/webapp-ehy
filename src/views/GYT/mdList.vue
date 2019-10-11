<template>
  <div class="container">
<!--    <div class="header">-->
<!--      <pageHeader />-->
<!--    </div>-->
    <div class="main">
      <van-index-bar>
        <template v-for="(item,index) in indexBar">
          <van-index-anchor :index="item" />
          <template v-for="(item1,index1) in list">
            <van-cell :title="item1.name"
                      v-if="validate(item1,item)"
                      @click="selectItem(item1)" />
          </template>
        </template>
      </van-index-bar>
    </div>
  </div>
</template>

<script>
import { list } from '@/api/gytPort'
import pageHeader from '@/components/navBar'
import { setTitle } from '@/utils/cache.js'
export default {
  components: {
    pageHeader
  },
  data() {
    return {
      list: [],
      indexBar: null
    }
  },
  created() {
    this._list()
    setTitle(this.$route.meta.title)
  },
  methods: {
    selectItem(item) {
      this.$store.commit('set_mdg', item)
      this.$router.go(-1)
    },
    _list() {
      list().then(response => {
        const number = []
        this.list = response.data
        // 获取索引列表
        response.data.forEach(item => {
          const i = item.pinyin.substring(0, 1).toUpperCase()
          if (!number.includes(i)) {
            number.push(i)
          }
        })
        this.indexBar = number.sort()
      })
    },
    // 验证
    validate(item1, item) {
      return item1.pinyin.substring(0, 1).toUpperCase() === item
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
  /*.main {*/
  /*  padding-top: 100px;*/
  /*}*/
}
</style>
