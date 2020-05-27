<template>
  <div class="main">
    <div class="shipList">
      <img src="../../../assets/img/ehyShip.png">
      <span>{{shipName}}</span>
      <p @click="selectShipName">
        <span>切换</span>
        <img src="../../../assets/img/qh.png" />
      </p>
      <div style="clear:both"></div>
    </div>
    <van-popup v-model="showShipName"
               round
               position="bottom"
               :style="{ height: '30%' }">
      <van-picker :columns="shipColumn"
                  show-toolbar
                  @cancel="onCancel"
                  @confirm="onConfirm" />
    </van-popup>
    <!-- <div class="container">
      <p @click="pathTo">
        排污积分：<span>{{point}}</span><span>></span>
      </p>
      <div class="sys">
        <img @click="getCode"
             src="../../../assets/img/sewage/sys.png"
             alt="扫一扫" />
      </div>
    </div> -->
    <div class="container">
      <div @click="getCode">
        <img src="../../../assets/img/sm.png" />
        <div>
          <p>扫码排放</p>
        </div>
      </div>
      <div @click="goPoint">
        <img src="../../../assets/img/ls.png" />
        <div>
          <p>可用绿水分</p>
          <p>{{point}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { recoveryInfo, allPoints } from '@/api/sewageDisposal'
import { getGoQr, setBoat, getBoat, getLat, getLng, getCity } from '@/utils/cache.js'
import { boatList } from '@/api/ehy'
import { Toast } from 'vant'
import { discharge } from '@/api/sewageDisposal'

export default {
  data() {
    return {
      recoveryInfo: null,
      point: 0,
      code: null,
      shipName: null,
      showShipName: false,
      shipColumn: []
      // shipName: getShipName()
    }
  },
  mounted() {
    this.list()
    window.callBackCode = this.callBackCode
    this.getAllPoint()
  },
  methods: {
    goPoint() {
      this.$router.push('/sewageIntegral')
    },
    selectShipName() {
      this.showShipName = true
    },
    onConfirm(value, index) {
      console.log(value)
      this.shipName = value
      setBoat(this.shipName)
      this.showShipName = false
    },
    onCancel() {
      this.showShipName = false
    },
    list() {
      boatList(2).then(response => {
        console.log(response)
        this.shipList = response.data
        console.log('船舶', getBoat())
        // if (getBoat().length > 0) {
        //   this.shipName = getBoat()
        // } else {
        this.shipName = this.shipList[0].shipName
        setBoat(this.shipName)
        // }
        this.shipColumn = this.shipList.map(item => item.shipName)
      })
    },
    pathTo() {
      this.$router.push({
        path: '/shipIntegral'
      })
    },
    getAllPoint() {
      allPoints(getCity(), this.shipName).then(response => {
        this.point = response.data
      })
    },
    callBackCode(code) {
      if (/^[0-9]+$/.test(code) && code.length === 20) {
        this.code = code
        this.$store.commit('setrecoveryCode', this.code)
        this.getRecoveryInfo()
      } else if (code.split('?')[1].split('=')[0] === 'locationID') {
        this.code = code
        this.$store.commit('setrecoveryCode', this.code.split('?')[1].split('=')[1])
        this.getSbRecoveryInfo()
      } else {
        this.$router.push({ path: '/unrecognized' })
      }
    },
    getCode() {
      getGoQr()
    },
    submitWater() {
      const obj1 = {
        type: 1,
        shipName: this.recoveryInfo.shipName,
        code: this.code,
        orderWay: 1,
        currentLon: getLng(),
        currentLat: getLat()
      }
      discharge(obj1).then(response => {
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
    getSbRecoveryInfo() {
      recoveryInfo(this.shipName, this.code, getLng(), getLat()).then(response => {
        this.recoveryInfo = response.data
        this.$store.commit('setRecoveryInfo', response.data)
        Toast.success({
          message: `${response.msg}，请稍等...`,
          duration: 2000
        })
        setTimeout(() => {
          this.$router.push({
            path: '/successWaterAuto'
          })
        }, 2000)
      })
    },
    getRecoveryInfo() {
      recoveryInfo(this.shipName, this.code, getLng(), getLat()).then(response => {
        this.recoveryInfo = response.data
        this.$store.commit('setRecoveryInfo', response.data)
        // alert('类型', response.data.type)
        // alert('属性', response.data.attribute)
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

<style scoped lang="scss">
.main {
  background: rgba(16, 142, 233, 1);
  margin: 24px;
  border-radius: 15px;
  .shipList {
    height: 60px;
    line-height: 60px;
    padding: 20px;
    color: #fff;
    img {
      height: 100%;
      float: left;
      vertical-align: middle;
    }
    > span {
      display: inline-block;
      font-size: 34px;
      line-height: 60px;
      margin-left: 20px;
    }
    > p {
      float: right;
      display: flex;
      align-items: center;
      img {
        width: 25px;
      }
      span {
        display: inline-block;
        font-size: 28px;
        margin-right: 10px;
      }
    }
  }
  .container {
    display: flex;
    width: 95%;
    margin: 0 auto;
    border-top: 1px solid #88b8ff;
    > div {
      width: 50%;
      padding: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 232px;
      img {
        width: 72px;
        height: 72px;
      }
      div {
        height: 72px;
        align-items: center;
        display: flex;
        flex-direction: column;
        p {
          margin-top: 15px;
          color: #fff;
        }
      }
    }
  }
  // .container {
  //   position: relative;
  //   height: 380px;
  //   > p {
  //     padding-top: 24px;
  //     padding-left: 32px;
  //     font-size: 30px;
  //     font-weight: 500;
  //     color: rgba(255, 255, 255, 1);

  //     span {
  //       font-size: 48px;
  //       font-weight: 400;
  //       color: rgba(255, 255, 255, 1);
  //     }
  //   }

  //   .sys {
  //     position: absolute;
  //     left: 50%;
  //     top: 50%;
  //     margin-top: -110px;
  //     margin-left: -110px;

  //     img {
  //       width: 220px;
  //       height: 220px;
  //     }
  //   }
  // }
}
</style>
