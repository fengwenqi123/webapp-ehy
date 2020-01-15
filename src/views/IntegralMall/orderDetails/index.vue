<template>
  <div class="container" v-if="form">
    <div class="header">
      <div class="img">
        <img src="../../../assets/img/shop/order-logo.png" alt="">
      </div>
      <div class="code">
        <div class="item" v-if="form.status==1">
          <span>兑换码</span>
          <p>{{form.exchangeCode}}</p>
        </div>
        <div class="item" v-if="form.status==2">
          <span class="other">兑换成功</span>
        </div>
        <div class="item" v-if="form.status==3">
          <span class="other">兑换已取消</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="shop-name">
        <div class="img">
          <img
            v-if="form.image"
            :src="src+form.image"
            alt=""
          />
          <img v-else src="../../../assets/img/nopic.png" alt="">
        </div>
        <div class="info">
          <div class="name">
            {{form.shopName}}
          </div>
          <div class="num">×{{ form.count }}</div>
        </div>
      </div>
      <div class="field">
        <van-cell-group>
          <van-field
            :value="form.userShipName"
            label="船舶名称"
            input-align="right"
            disabled
          />
          <van-field
            :value="form.orderId"
            label="兑换订单号"
            input-align="right"
            disabled
          />
          <van-field
            :value="form.integral"
            label="兑换积分"
            input-align="right"
            disabled
          />
          <van-field
            :value="form.place"
            label="兑换地点"
            input-align="right"
            disabled
          />
          <van-field
            :value="form.addTimeString"
            label="下单时间"
            input-align="right"
            disabled
          />
          <van-field
            :value="form.effectiveTime"
            label="有效期至"
            input-align="right"
            disabled
          />
        </van-cell-group>
      </div>
    </div>
    <div class="button" v-if="form.status==1" @click="refund">
      <van-button type="default" plain size="large">申请退款</van-button>
    </div>
  </div>
</template>

<script>
  import { timeToString } from '@/utils/index'
  import { mapGetters } from 'vuex'
  import { findOrderDetail, cancelexchange } from '@/api/IntegralMall'
  import { Dialog, Toast } from 'vant'

  export default {
    computed: {
      ...mapGetters([
        'goods'
      ])
    },
    data() {
      return {
        src: 'https://api.cjbe88.com/storage/storage/',
        time: timeToString(new Date().getTime()),
        id: this.$route.query.id,
        form: null
      }
    },
    created() {
      this.findOrderDetails()
    },
    methods: {
      findOrderDetails() {
        findOrderDetail(this.id).then(response => {
          this.form = response.data
        })
      },
      // 申请退款
      refund() {
        var _this = this
        Dialog.confirm({
          title: '提示',
          message: '确定要执行该操作吗？',
          beforeClose(action, done) {
            if (action === 'confirm') {
              cancelexchange(_this.form.orderId, _this.form.userShipName, _this.form.integral).then(response => {
                Toast.success(response.msg)
                done()
                setTimeout(() => {
                  _this.$router.push({
                    path: '/orderList'
                  })
                }, 1500)
              })
            } else {
              done()
            }
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    .header {
      height: 240px;
      background: url("../../../assets/img/shop/order-details.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .img {
        img {
          width: 210px;
          height: 210px;
        }
      }

      .code {
        .item{
          span {
            display: inline-block;
            font-size: 26px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }

          p {
            margin-top: 20px;
            font-size: 50px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          .other{
            font-size: 34px;
          }
        }
      }
    }

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
    }

    .button {
      width: 90%;;
      margin: 40px auto;

      .van-button__text {
        font-size: 30px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
    }
  }
</style>
