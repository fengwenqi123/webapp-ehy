<template>
  <div class="content">
    <div class="top">
      <div class="ship-name">
        <img src="../../../assets/img/ehyShip.png" alt="">
        <div class="name">{{shipName}}</div>
      </div>
      <div class="zdlist" @click="Exchange">
        兑换账单
      </div>
    </div>
    <div class="middle">
      <img src="../../../assets/img/jifen.png" alt="">
      <div class="integral">
        {{availablePoint}}
      </div>
    </div>
    <div class="bottom" @click="showPicker=true">
      切换船舶
    </div>
    <van-popup v-model="showPicker" position="bottom" round>
      <van-picker
        show-toolbar
        title="船名"
        :columns="shopList"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import { boatList } from '@/api/ehy.js'
  import { findIntegralByShipName } from '@/api/IntegralMall.js'

  export default {
    data() {
      return {
        shopInfo: null,
        shopList: null,
        shipName: null,
        availablePoint: null,
        showPicker: false
      }
    },
    watch: {
      shopInfo: {
        handler(value, oldValue) {
          this.shipName = value.shipName
          this.$store.commit('setMallShipName', this.shipName)
          this.findIntegral()
        },
        deep: true
      }
    },
    created() {
      this.findShipList()
    },
    activated() {
      this.findIntegral()
    },
    methods: {
      Exchange() {
        this.$router.push({
          path: '/exchangeList'
        })
      },
      // 查船舶列表
      findShipList() {
        let tags = 2
        boatList(tags).then(response => {
          this.shopInfo = response.data[0]
          this.shopList = response.data
          this.shopList.forEach((item) => {
            item.text = item.shipName
          })
        })
      },
      // 查船舶积分
      findIntegral() {
        if (this.shipName) {
          findIntegralByShipName(this.shipName).then(response => {
            this.availablePoint = response.data.availablePoint
            this.$store.commit('setIntegral', this.availablePoint)
          })
        }
      },
      // 关闭popup
      onConfirm(value) {
        this.shopInfo = value
        this.showPicker = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    color: #fff;
    padding: 30px 40px 0;
    background: url("../../../assets/img/jifen_background.png") no-repeat;
    background-size: 100% 100%;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ship-name {
        display: flex;
        align-items: center;

        img {
          width: 80px;
          height: 80px;
        }

        .name {
          margin-left: 20px;
        }
      }
    }

    .middle {
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 30px;
        height: 30px;
      }

      .integral {
        margin-left: 20px;
        font-size: 50px;
        font-weight: bold;
      }
    }

    .bottom {
      text-align: center;
      margin-top: 40px;
      height: 80px;
      line-height: 80px;
    }
  }
</style>
