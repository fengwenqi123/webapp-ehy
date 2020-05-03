<template>
  <div class="container">
    <div class="search">
      <search @sendKeyWord="sendKeyWord"></search>
    </div>
    <div class="city">
      <van-index-bar :index-list="indexBar"
                     :sticky="false">
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
import { list } from '@/api/portList'
import search from './search'
import { commonPorts } from '../../api/lockReport'
export default {
  name: 'city',
  components: {
    search
  },
  data() {
    return {
      indexBar: [],
      list: [],
      keyword: ''
    }
  },
  mounted() {
    // this.init()
    this._list()
  },
  methods: {
    // 获取常用港口
    getHotPort() {
      commonPorts().then(response => {
        response.data.forEach(item => {
          item.code = item.id
          item.name = item.label
          this.hotPort.push(item)
        })
      })
    },
    sendKeyWord(keyword) {
      this.keyword = keyword
      console.log(this.keyword)
      this._list()
    },
    _list() {
      list(this.keyword).then(response => {
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
        console.log(this.indexBar)
      })
    },
    init() {
      // this.indexList = []
      // this.list = []
      // this.city.forEach(item => {
      //   item.lists.forEach(listItem => {
      //     if (listItem.includes(this.keyword)) {
      //       if (!this.indexList.includes(item.title)) {
      //         this.indexList.push(item.title)
      //       }
      //       this.list.push(listItem)
      //     }
      //   })
      // })
    },
    // 验证
    validate(item1, item) {
      return item1.pinyin.substring(0, 1).toUpperCase() === item
    },
    selectItem(city) {
      this.$emit('send', city)
    }
  }
}
</script>

<style scoped lang='scss'>
.city {
  position: fixed;
  top: 108px;
  width: 100%;
  height: calc(100% - 108px);
  overflow-y: auto;
  z-index: 0;
}
</style>
