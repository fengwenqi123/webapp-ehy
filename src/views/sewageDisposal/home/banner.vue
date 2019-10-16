<template>
 <div>
  <div class="shipList">
    <img src="../../../assets/img/ehyShip.png">
    <span>{{shipName}}</span>
    <van-icon name="exchange" @click="selectShipName" />
  </div>
  <van-popup
  v-model="showShipName"
  round
  position="bottom"
  :style="{ height: '30%' }"
>
<van-picker :columns="shipColumn" show-toolbar @cancel="onCancel"
  @confirm="onConfirm"/>
</van-popup>
  <div class="container">
    <p @click="pathTo">
      排污积分：<span>{{point}}</span><span>></span>
    </p>
    <div class="sys">
      <img
        @click="getCode"
        src="../../../assets/img/sewage/sys.png"
        alt="扫一扫"
      />
    </div>
  </div>
 </div> 
</template>

<script>
import { recoveryInfo, allPoints } from '@/api/sewageDisposal'
import { getGoQr } from '@/utils/cache.js'
import { boatList } from '@/api/ehy'

export default {
  data() {
    return {
      point: 0,
      code: null,
      shipName: null,
      showShipName: false,
      shipColumn: []
      // shipName: getShipName()
    }
  },
  mounted() {
    this.getAllPoint()
    this.list()
    window.callBackCode = this.callBackCode
  },
  methods: {
    selectShipName() {
      this.showShipName = true
    },
    onConfirm(value, index) {
      console.log(value)
      this.shipName = value
      this.showShipName = false
    },
    onCancel() {
      this.showShipName = false
    },
    list() {
      boatList(2).then(response => {
        console.log(response)
        this.shipList = response.data
        this.shipName = this.shipList[0].shipName
        this.shipColumn = this.shipList.map(item => item.shipName)
      })
    },
    pathTo() {
      this.$router.push({
        path: '/shipIntegral'
      })
    },
    getAllPoint() {
      allPoints().then(response => {
        this.point = response.data
      })
    },
    callBackCode(code) {
      this.code = code
      this.$store.commit('setrecoveryCode', this.code)
      this.getRecoveryInfo()
    },
    getCode() {
      getGoQr()
    },
    getRecoveryInfo() {
      recoveryInfo(this.shipName, this.code).then(response => {
        this.$store.commit('setRecoveryInfo', response.data)
        switch (response.data.type) {
          case 1:
            this.$router.push({
              path: '/lifeSewage'
            })
            break
          case 2:
            this.$router.push({
              path: '/oilSewage'
            })
            break
          default:
            this.$router.push({
              path: '/rubbishSewage'
            })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.shipList {
  background: rgba(16, 142, 233, 1);
  height: 80px;
  line-height: 80px;
  padding: 20px;
  color: #fff;
  img {
    height: 100%;
    float: left;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    font-size: 40px;
    line-height: 80px;
    margin-left: 20px;
  }
  .van-icon {
    float: right;
    line-height: 80px;
    font-size: 40px;
  }
}
.container {
  position: relative;
  height: 380px;
  background: rgba(16, 142, 233, 1);
  p {
    padding-top: 24px;
    padding-left: 32px;
    font-size: 30px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);

    span {
      font-size: 48px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }

  .sys {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -110px;
    margin-left: -110px;

    img {
      width: 220px;
      height: 220px;
    }
  }
}
</style>
