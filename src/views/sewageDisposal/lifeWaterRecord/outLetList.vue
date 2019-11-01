<template>
  <div class="main">
    <div class="top">
      <p>您当前位于</p>
      <p>{{item.city}}{{item.area}}{{item.name}}</p>
    </div>
    <div class="middle">
      <h2>码头设备</h2>
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
import { setTitle, getBoat, setOutlet, getOutlet } from '@/utils/cache.js'
import { recoveryInfo } from '@/api/sewageDisposal'
import { Toast } from 'vant'
import { discharge } from '@/api/sewageDisposal'
export default {
  data() {
    return {
      item: null,
      recoveryInfo: null,
      code: null,
      shipName: null
    }
  },
  created() {
    if (this.$route.query.info.outlet) {
      this.item = this.$route.query.info
      setOutlet(this.item)
    } else {
      this.item = getOutlet()
      console.log(this.item)
    }
    setTitle(this.$route.meta.title)
  },
  methods: {
    submitWater() {
      const obj = {
        type: 1,
        shipName: this.recoveryInfo.shipName,
        code: this.code,
        orderWay: 1
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
    getRecoveryInfo(item) {
      this.shipName = getBoat()
      this.code = item.code
      recoveryInfo(this.shipName, this.code).then(response => {
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
            this.$router.push({
              path: '/rubbishSewage'
            })
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
    padding: 20px;
    p {
      color: #fff;
      font-size: 32px;
      line-height: 60px;
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