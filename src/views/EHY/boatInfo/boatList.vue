<template>
  <div class="boatList">
    <van-row>
      <van-col :span="24">
          <ul>
            <li v-for="item in shipList" :key="item.id" @click="goInfo(item)">
              <div>
                <img src="../../../assets/img/ehyShip.png">
              </div>
              <div>
                <p>{{item.shipName}}</p>
                <p>船舶识别号：{{item.cbsbh}}</p>
                <p>添加时间：{{item.addTimeString}}</p>
              </div>     
              <span :class="{one:item.auditStatus===1,two:item.auditStatus===2,three:item.auditStatus===3}">{{item.auditStatus===1?'待审核':item.auditStatus===2?'通过':item.auditStatus===3?'未通过':'--'}}</span>
            </li>
          </ul>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { boatList } from '@/api/ehy'
export default {
  data() {
    return {
      shipList: []
    }
  },
  created() {
    this.list()
    setTitle(this.$route.meta.title)
  },
  methods: {
    list() {
      boatList(2).then(response => {
        console.log(response)
        this.shipList = response.data
      })
    },
    goInfo(item) {
      this.$router.push({ path: '/boatInfo', query: { info: item }})
    }
  }
}
</script>

<style scoped lang="scss">
.boatList {
  .van-row {
    .van-col {
      ul {
        padding: 20px;
        li {
          padding: 10px;
          margin-bottom: 20px;
          background-color: #fff;
          height: 224px;
          border-radius: 10px;
          span {
            font-size: 30px;
            margin-right: 10px;
            display: inline-block;
            line-height: 90px;
            float: right;
          }
          .one {
            color: #ffbe00;
          }
          .two {
            color: #09bb07;
          }
          .three {
            color: #f76260;
          }
          div {
            height: 180px;
            display: inline-block;
            img {
              height: 50%;
              float: left;
            }
            p {
              margin-left: 20px;
            }
            p:nth-of-type(1) {
              color: #333;
              font-size: 34px;
              line-height: 60px;
            }
            p:nth-of-type(2) {
              color: #333;
              font-size: 28px;
              line-height: 60px;
            }
            p:nth-of-type(3) {
              color: #888;
              font-size: 28px;
              line-height: 60px;
            }
          }
        }
      }
    }
  }
}
</style>