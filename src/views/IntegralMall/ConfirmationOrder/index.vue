<template>
  <div class="container">
    <div class="content">
      <div class="shop-name">
        <div class="img">
          <img
            v-if="goods.goodsImageList.length>0"
            :src="src+goods.goodsImageList[0].originalImg"
            alt=""
          />
          <img v-else src="../../../assets/img/nopic.png" alt="">
        </div>
        <div class="info">
          <div class="name">
            {{goods.name}}
          </div>
          <div class="num">×{{ 1 }}</div>
        </div>
      </div>
      <div class="field">
        <van-cell-group>
          <van-field
            :value="mallShipName"
            label="船舶名称"
            input-align="right"
            disabled
          />
          <van-field
            :value="integral"
            label="可用积分"
            input-align="right"
            disabled
          />
          <van-field
            :value="address"
            label="兑换地点"
            input-align="right"
            disabled
          />
          <van-field
            :value="goods.goodsSkuList[0].price"
            label="兑换积分"
            input-align="right"
            disabled
          />
        </van-cell-group>
      </div>
      <div class="exchange-num">
        <div class="label">
          兑换数量
        </div>
        <div class="value">
          <van-stepper v-model="value" integer :max="goods.amount"/>
        </div>
      </div>
    </div>
    <div class="button" @click="submit()">
      <button>确认兑换</button>
      <div class="total">
        <span>合计</span>
        <p>{{total}}积分</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Toast } from 'vant'
  import { addOrder, confirmexchange } from '@/api/IntegralMall.js'
  import { setTitle } from '@/utils/cache.js'
  export default {
    name: 'index',
    computed: {
      ...mapGetters([
        'goods', 'address', 'mallShipName', 'integral'
      ]),
      total() {
        return this.goods.goodsSkuList[0].price * this.value
      }
    },
    data() {
      return {
        value: 1,
        src: 'https://api.cjbe88.com/storage/storage/',
        orderWay: '1',
        type: '6'
      }
    },
    mounted() {
      setTitle(this.$route.meta.title)
    },
    methods: {
      submit() {
        if (+this.integral >= +this.total) {
          addOrder(this.goods.goodsSkuList[0].id, this.orderWay, this.type, this.address, this.value).then(response => {
            var id = response.data
            confirmexchange(id, this.mallShipName, this.goods.goodsSkuList[0].price, this.value).then(res => {
              Toast.success(res.msg)
              setTimeout(() => {
                this.$router.push({
                  path: '/orderDetails',
                  query: {
                    id: res.data
                  }
                })
              }, 1500)
            })
          })
        } else {
          Toast('积分不足')
        }
        // this.$router.push({
        //   path: '/orderDetails'
        // })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    .content {
      .shop-name {
        padding: 32px;
        display: flex;
        align-items: flex-start;
        background: #fff;
        border-bottom: 1px solid #eeeeee;

        .img {
          img {
            width: 180px;
            height: 180px;
          }
        }

        .info {
          margin-left: 30px;

          .name {
            margin-top: 20px;
            font-size: 34px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }

          .num {
            margin-top: 20px;
            font-size: 30px;
            font-weight: 400;
            color: rgba(136, 136, 136, 1);
          }
        }
      }

      .exchange-num {
        display: flex;
        border-top: 1px solid #eeeeee;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px;
        background: #fff;
        height: 116px;
      }
    }

    .button {
      position: fixed;
      bottom: 0px;
      width: 100%;
      height: 120px;
      background: #fff;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;

      .total {
        /*margin-left: 435px;*/
        text-align: right;

        span {
          font-size: 22px;
          font-weight: 400;
          color: rgba(170, 170, 170, 1);
        }

        p {
          margin-top: 8px;
          font-size: 26px;
          font-weight: 600;
          color: rgba(255, 162, 0, 1);
        }
      }

      button {
        border: none;
        width: 164px;
        height: 60px;
        background: rgba(16, 142, 233, 1);
        border-radius: 6px;
        text-align: center;
        color: #fff;
        line-height: 60px;
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
</style>
