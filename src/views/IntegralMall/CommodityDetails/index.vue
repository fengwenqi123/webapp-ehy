<template>
  <div class="container" v-if="flag">
    <div class="banner">
      <van-swipe :autoplay="3000" indicator-color="white">
        <template v-if="goods.goodsImageList.length>0">
          <van-swipe-item v-for="(item,index) in goods.goodsImageList" :key="index">
            <img :src="src+item.originalImg" alt="">
          </van-swipe-item>
        </template>
        <van-swipe-item v-else>
          <img src="../../../assets/img/nopic.png" alt="">
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="main">
      <div class="name">{{skuList.goodsName}}</div>
      <div class="bottom">
        <div class="left">
          <img src="../../../assets/img/shop/coin.png" alt="">
          <span>{{skuList.price}}</span>
        </div>
        <div class="right">
          月销{{goods.salesVolume}}件
        </div>
      </div>
      <div class="tip">库存{{goods.goodsSkuList[0].amount}}件</div>
    </div>
    <div class="address">
      <div class="label">选择兑换地点</div>
      <div class="value" @click="showPicker=true">
        <span>{{address}}</span>
        <img src="../../../assets/img/shop/bottom.png" alt="">
      </div>
    </div>
    <div class="button" @click="exchange">
      <van-button type="info" size="large">立即兑换</van-button>
    </div>
    <van-popup
      v-model="showPicker"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import { GoodsDetail, place } from '@/api/shopList'
  import { setTitle } from '@/utils/cache.js'
  export default {
    data() {
      return {
        id: this.$route.query.id,
        parentCategoryId: null,
        goods: null,
        src: 'https://api.cjbe88.com/storage/storage/',
        flag: false,
        address: null,
        skuList: null,
        showPicker: false,
        columns: null
      }
    },
    created() {
      this.findGoodsDetail()
      setTitle(this.$route.meta.title)
    },
    watch: {
      address() {
        this.$store.commit('setAddress', this.address)
      }
    },
    methods: {
      // 查找商品详情
      findGoodsDetail() {
        GoodsDetail(this.id).then(response => {
          this.goods = response.data
          this.flag = true
          this.skuList = response.data.goodsSkuList[0]
          this.parentCategoryId = response.data.parentCategoryId
          this.findPlace(this.parentCategoryId)
        })
      },
      // 查找兑换地址
      findPlace(parentCategoryId) {
        place(parentCategoryId).then(response => {
          this.address = response.data[0].name
          this.columns = response.data
          this.columns.forEach((item) => {
            item.text = item.name
          })
        })
      },
      exchange() {
        this.$store.commit('setGoods', this.goods)
        this.$router.push({
          path: '/ConfirmationOrder'
        })
      },
      onConfirm(value) {
        this.address = value.name
        this.showPicker = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    .banner {
      img {
        width: 100%;
        height: 550px;
      }
    }

    .main {
      padding: 0 32px;
      background: #fff;

      .name {
        padding-top: 30px;
        font-size: 34px;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }

      .tip {
        padding-top: 10px;
        padding-bottom: 20px;
        font-size: 28px;
        font-weight: 400;
        color: #888888;
      }

      .bottom {
        margin-top: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
          display: flex;
          align-items: center;

          img {
            width: 20px;
            height: 20px;
          }

          span {
            margin-left: 10px;
            font-size: 60px;
            font-weight: 400;
            color: rgba(255, 162, 0, 1);
          }
        }

        .right {
          font-size: 28px;
          font-weight: 400;
          color: rgba(136, 136, 136, 1);
        }
      }
    }

    .address {
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      height: 96px;
      background: #fff;

      .label {
        font-size: 30px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }

      .value {
        display: flex;
        align-items: center;

        span {
          font-size: 30px;
          font-weight: 400;
          color: rgba(136, 136, 136, 1);
        }

        img {
          margin-left: 10px;
          width: 16px;
          transform: rotate(270deg);
        }
      }
    }

    .button {
      position: fixed;
      bottom: 0px;
      width: 100%;
    }
  }

</style>
