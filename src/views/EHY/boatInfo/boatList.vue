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
                <van-button type="warning" size="mini" @click.stop="clearBoat(item)">解绑</van-button>
            </li>
          </ul>
      </van-col>
    </van-row>
    <van-dialog
        v-model="showShip"
        title="解绑船舶"
        show-cancel-button
        @confirm="removeShip"
        @cancel="noRemove"
      >
        <p style="line-height:80px;text-align:center;color:red">确定解绑船舶：{{shipName}} ?</p>
      </van-dialog>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { boatList, removeShip } from '@/api/ehy'
export default {
  data() {
    return {
      shipList: [],
      showShip: false,
      shipName: null,
      id: null
    }
  },
  mounted() {
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
    },
    clearBoat(item) {
      console.log('啥时', item)
      this.showShip = true
      this.shipName = item.shipName
      this.id = item.id
    },
    removeShip() {
      removeShip(this.id).then(response => {
        console.log(response)
        this.list()
      })
    },
    noRemove() {
      this.showShip = false
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
          position: relative;
          padding: 10px;
          margin-bottom: 20px;
          background-color: #fff;
          height: 224px;
          border-radius: 10px;
          > span {
            font-size: 30px;
            margin-right: 10px;
            display: inline-block;
            line-height: 90px;
            float: right;
          }
          .van-button {
            position: absolute;
            top: 90px;
            right: 20px;
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
