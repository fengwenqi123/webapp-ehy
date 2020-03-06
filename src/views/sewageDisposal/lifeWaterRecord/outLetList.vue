<template>
  <div class="main">
    <div class="top">
      <van-row type="flex"
               style="color:#fff"
               align="center">
        <van-col :span="2">
          <van-icon name="location-o"
                    class="location" />
        </van-col>
        <van-col :span="22">
          <p>{{item.city}}{{item.area}}{{item.name}}</p>
        </van-col>
      </van-row>
      <div class="top-box">
        <div>
          <span>船舶名称</span>
          <span>{{shipName}}</span>
        </div>
        <div>
          <span>AIS定位距离</span>
          <span style="display:flex;align-items:center">{{distance}}
            <van-icon name="checked"
                      class="yes"
                      v-if="positionStatus" />
            <van-icon name="clear"
                      class="close"
                      v-if="!positionStatus" />
          </span>
        </div>
        <div>
          <span>最新定位时间</span>
          <span>{{receiveTimeString||'--'}}</span>
        </div>
      </div>
    </div>
    <div class="middle">
      <!-- <h2>码头设备</h2> -->
      <div v-for="item in item.outlet"
           :key="item.id">
        <p>
          <span>{{item.name}}</span>
          <span>{{item.attribute===1?'智能':item.attribute===2?'普通':item.attribute===3?'综合':"不明"}}</span>
        </p>
        <p> <span @click="getRecoveryInfo(item)">点击开始排放</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { setTitle, getBoat, setOutlet, getOutlet, getLng, getLat } from '@/utils/cache.js'
import { recoveryInfo } from '@/api/sewageDisposal'
import { Toast } from 'vant'
import { discharge, boatPosition } from '@/api/sewageDisposal'
export default {
  data() {
    return {
      item: null,
      recoveryInfo: null,
      code: null,
      distance: null,
      positionStatus: null,
      receiveTimeString: null,
      shipName: getBoat()
    }
  },
  created() {
    if (this.$route.query.info.outlet) {
      this.item = this.$route.query.info
      console.log(this.item)
      setOutlet(this.item)
      this.getBoatPosition()
    } else {
      this.item = getOutlet()
      console.log(this.item)
    }
    setTitle(this.$route.meta.title)
  },
  methods: {
    getBoatPosition() {
      // this.item.id = '6'
      // this.shipName = '浙安吉货1860'
      console.log('123', this.shipName)
      boatPosition(this.item.id, this.shipName).then(response => {
        console.log(response)
        this.positionStatus = response.data.positionStatus
        this.distance = response.data.distance
        this.receiveTimeString = response.data.receiveTimeString
      })
    },
    submitWater() {
      const obj = {
        type: 1,
        shipName: this.recoveryInfo.shipName,
        code: this.code,
        orderWay: 1,
        currentLon: getLng(),
        currentLat: getLat()
      }
      discharge(obj).then(response => {
        Toast.success({
          message: `${response.msg}，请稍等...`,
          duration: 1000
        })
        setTimeout(() => {
          this.$router.push({
            path: '/successWaterAuto'
          })
        }, 2000)
      })
    },
    submitRubbish() {
      const obj3 = {
        type: 3,
        shipName: this.recoveryInfo.shipName,
        code: this.code,
        refuseType: parseFloat(this.recoveryInfo.type) - 2,
        orderWay: 1,
        currentLon: getLng(),
        currentLat: getLat()
      }
      // alert(JSON.stringify(obj3))
      discharge(obj3).then(response => {
        Toast.success({
          message: `${response.msg}，请稍等...`,
          duration: 2000
        })
        setTimeout(() => {
          this.$router.push({
            path: '/successRubbishAuto'
          })
        }, 2000)
      })
    },
    getRecoveryInfo(item) {
      this.shipName = getBoat()
      this.code = item.code
      recoveryInfo(this.shipName, this.code, getLng(), getLat()).then(response => {
        this.recoveryInfo = response.data
        this.$store.commit('setRecoveryInfo', response.data)
        this.$store.commit('setrecoveryCode', this.code)
        switch (response.data.type) {
          case 1:
            switch (response.data.attribute) {
              case 1:
                this.submitWater()
                break
              case 2:
                this.$router.push({
                  path: '/lifeSewage'
                })
                break
              default:
                this.$router.push({
                  path: '/lifeSewage'
                })
            }
            break
          case 2:
            this.$router.push({
              path: '/oilSewage'
            })
            break
          default:
            switch (response.data.attribute) {
              case 1:
                this.submitRubbish()
                break
              case 2:
                this.$router.push({
                  path: '/rubbishSewage'
                })
                break
              default:
                this.$router.push({
                  path: '/rubbishSewage'
                })
            }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .top {
    background-color: #108ee9;
    padding: 40px 20px;
    p {
      color: #fff;
      font-size: 32px;
      line-height: 60px;
    }
    .location {
      font-weight: bold;
      font-size: 36px;
    }
    .top-box {
      color: #fff;
      padding: 0 50px;
      .yes {
        font-size: 36px;
        margin-left: 5px;
        color: #09bb07;
      }
      .close {
        font-size: 36px;
        margin-left: 5px;
        color: #f76260;
      }
      div {
        display: flex;
        height: 80px;
        font-size: 28px;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  .middle {
    background-color: #fff;
    h2 {
      padding: 0 20px;
      line-height: 100px;
      font-size: 36px;
      border-bottom: 1px solid #eee;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eee;
      p:nth-child(1) {
        padding: 0 20px;
        line-height: 150px;
        span:nth-child(1) {
          color: #888;
          font-size: 32px;
        }
        span:nth-child(2) {
          padding: 4px 15px;
          border-radius: 20px;
          color: #fff;
          font-size: 24px;
          background-color: #108ee9;
        }
      }
      p:nth-child(2) {
        padding: 0 20px;
        line-height: 150px;
        span {
          font-size: 32px;
          color: #108ee9;
        }
      }
    }
  }
}
</style>