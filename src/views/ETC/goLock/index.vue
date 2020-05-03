<template>
<div class="container">
<div class="button" @click="dec">
  <van-button type="info" plain hairline size="large">申 报</van-button>
</div>
  <div class="list">
    <ul>
      <li v-for="(item,index) in lockList" :key="index" @click="goDetails(item)">
        <div class="item">
          <div class="line line1">
            <div class="left">{{item.shipname}}</div>
          </div>
          <div class="line line2">
            {{item.lock}}
          </div>
          <div class="line line3">
            报港时间：{{item.reportTime}}
          </div>
          <div class="line line4">
            <div class="left">
              状态：已过闸
            </div>
            <div class="right">
              金额：0
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  import { lists } from '@/api/etc.js'
  import { setTitle } from '@/utils/cache.js'
  export default {
    name: 'index',
    data() {
      return {
        lockList: []
      }
    },
    created() {
      setTitle(this.$route.meta.title)
      this.list()
    },
    methods: {
      list() {
        var type = 1
        lists(type).then(response => {
          this.lockList = response.data
        })
      },
      dec() {
        this.$router.push({
          path: '/declare'
        })
      },
      goDetails(item) {
        this.$router.push({
          name: 'lockDetails',
          params: {
            obj: item
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.container{
  .button{
    width: 600px;
    margin: 20px auto;
  }
  .list{
    padding: 0 40px;
    ul{
      li{
        padding-bottom: 30px;
        border-bottom: 1px solid #ccc;
        .item{
          .line{
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>
