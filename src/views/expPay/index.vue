<template>
  <div class="container expDetail">
    <div class="header">
      <p>订单号：{{orderBean.id || '--'}}</p>
      <p v-if="orderBean.status !== 5">等待支付快递寄出费用</p>
      <p v-if="orderBean.status !== 5">完成付款后即可取件</p>
      <p v-if="orderBean.status === 5">订单已完成</p>
    </div>
    <div class="details">
      <ul>
        <li>
          <div class="item">
            <div class="label"><img src="../../assets/img/pay1.png"
                   alt=""> 订单创建时间</div>
            <div class="val">{{orderBean.addTimeString || '--'}}</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label"><img src="../../assets/img/pay2.png"
                   alt=""> 收货人</div>
            <div class="val">{{orderBean.userName || '--'}}</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label"><img src="../../assets/img/pay3.png"
                   alt=""> 联系电话</div>
            <div class="val">{{orderBean.userMobile || '--'}}</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label"><img src="../../assets/img/pay4.png"
                   alt=""> 快递数量</div>
            <div class="val">{{orderBean.amount || '--'}}</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label"><img src="../../assets/img/pay5.png"
                   alt=""> 寄出费</div>
            <div class="val">￥{{orderBean.actualAmount? orderBean.actualAmount: '0'}}</div>
          </div>
        </li>
        <li class="title"
            v-if="expressList && expressList.length">
          <div>订单内快递</div>
        </li>
        <li v-for="(item,index) in expressList"
            :key="index">
          <div class="list">
            <div class="left">
              <img :src="item.status===2?wait:already"
                   alt="">
            </div>
            <div class="active">
              <p class="p1">{{item.status === 2?'待取件':'已取件'}}</p>
              <p class="p2">快递单号：{{item.courierNumber}}</p>
            </div>
            <div class="xq"
                 @click="details(item)">
              查看详情
              <i class="el-icon-third-xiangyou"></i>
            </div>
          </div>
        </li>
      </ul>
      <div class="pay"
           v-if="orderBean.status === 1">
        <van-button round
                    plain
                    size="small"
                    type="info"
                    @click="pay()">支付宝付款</van-button>
      </div>
      <!-- <van-popup v-model="show"
                 position="bottom"
                 :style="{ height: '3rem' }">
        <div class="pay-popup">
          <div>
            <img src="@/assets/img/alipay.png"
                 alt="">
          </div>
          <div>
            <img src="@/assets/img/wechatpay.png"
                 alt="">
          </div>
        </div>
      </van-popup> -->
    </div>
    <!-- 遮罩 -->
    <div v-if="loadingSpinner">
      <cjb-loading></cjb-loading>
    </div>
  </div>
</template>

<script>
/* eslint-disable object-curly-spacing,prefer-const,no-unused-vars */

import { mapGetters } from 'vuex'
import { findExpressorderInfo, orderInfo } from '@/api/exp.js'
import { getToken, getAliPay } from '@/utils/cache'
import cjbLoading from '@/components/cjbLoading'

export default {
  data() {
    return {
      show: false,
      loadingSpinner: true,
      Token: getToken(),
      expressList: [],
      orderBean: {},
      already: require('@/assets/img/already.png'),
      wait: require('@/assets/img/wait.png')
    }
  },
  created() {
    this.getFindExpressorderInfo()
    // this.getOrderInfo()
  },
  components: {
    cjbLoading
  },
  methods: {
    goExp() {
      this.$router.push({ name: 'exp' })
    },
    pay(orderId) {
      getAliPay(this.orderBean.id)

      // this.show = true // 显示付款方式
    },
    details(item) {
      this.$store.commit('setExpInfo', item)
      this.$router.push(
        {
          path: '/expDetail'
        }
      )
    },
    getFindExpressorderInfo() {
      findExpressorderInfo(this.$route.query.id).then(response => {
        this.expressList = response.data.expressList
        this.orderBean = response.data.orderBean
        this.loadingSpinner = false
      })
        .catch(error => {
          console.log(error)
        })
    },
    getOrderInfo() {
      orderInfo(this.$route.query.id).then(response => {
        // if (response.status === 5) {
        // }
      })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .header {
    width: 100%;
    height: 220px;
    background: url("../../assets/img/pay.png") no-repeat;
    background-size: 100% 100%;
    p {
      color: #fff;
      padding: 20px 0 0 105px;
      font-size: 32px;
    }
    p:first-child {
      padding-top: 60px;
      font-size: 36px;
    }
  }

  .details {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    ul {
      width: 100%;
      margin-bottom: 110px;
      li {
        border-bottom: 2px solid #eeeeee;
        background: #fff;

        .item {
          height: 100px;
          line-height: 100px;
          background: rgba(255, 255, 255, 1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 32px;

          .label {
            font-size: 34px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            position: relative;
            padding-left: 60px;

            img {
              width: 38px;
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              margin: auto;
            }
          }

          .val {
            font-size: 32px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
          }
        }
        .list {
          height: 150px;
          display: flex;
          align-items: center;
          padding: 0 32px;

          .left {
            width: 64px;
            height: 64px;

            img {
              width: 100%;
            }
          }

          .active {
            flex-grow: 1;
            margin-left: 30px;

            .p1 {
              display: inline-block;
              text-align: center;
              border-radius: 5px;
              border: 2px solid #389e0d;
              color: #389e0d;
              padding: 6px 20px;
              margin: 0;
              margin-top: 10px;
            }

            .actives {
              border: 2px solid red;
              color: red;
            }

            .p2 {
              font-size: 26px;
              font-weight: 400;
              color: #999999;
              margin-top: 10px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

          .xq {
            font-size: 27px;
            font-weight: 400;
            color: #999999;

            i {
              font-size: 27px;
            }
          }
        }
      }

      .title {
        div {
          margin: 0 !important;
          height: 70px;
          line-height: 70px;
          padding-left: 32px;
          color: #999999;
          background: #ecf0f5;
          font-size: 30px;
        }
      }
    }
  }
  .pay {
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 110px;
    line-height: 110px;
    border-top: 1px solid #ddd;
    text-align: right;
    button {
      margin-right: 32px;
    }
  }
  .pay-popup {
    div {
      width: 50%;
      height: 3rem;
      float: left;
      text-align: center;
      line-height: 4rem;
      img {
        width: 70%;
        height: 42%;
      }
    }
  }
}
</style>
