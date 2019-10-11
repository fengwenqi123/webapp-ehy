<template>
  <div>
    <div class="main">
      <van-nav-bar
        title="订单详情"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      ></van-nav-bar>
      <div class="content-show">
        <p>
          <span>订单号</span>
          <span>{{item.orderId}}</span>
        </p>
        <p v-if="item.status===2"><span>你已完成加油</span></p>
        <p v-if="item.status===2"><span>请您尽快付款</span></p>

        <p v-if="item.status===1"><span>订单创建成功，待加油</span></p>
        <p v-if="item.status===1"><span>请您在一周内完成加油</span></p>

        <p v-if="item.status===3"><span>订单已完成，您已完成付款</span></p>
        <p v-if="item.status===3"><span>谢谢</span></p>

        <p v-if="item.status===5"><span>订单已退款</span></p>
        <p v-if="item.status===5"><span>欢迎下次再来</span></p>

        <p v-if="item.status===6"><span>订单已关闭</span></p>
        <p v-if="item.status===6"><span>欢迎下次再来</span></p>
      </div>
      <ul class="content-cell">
        <li>
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/sj.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>申请时间</span></van-col>
            <van-col span="17"><span>{{item.addTimeString||'--'}}</span></van-col>
          </van-row>
        </li>
        <li v-if="item.status===2">
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/sj.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>加油时间</span></van-col>
            <van-col span="17"><span>{{item.refuelingTime||'--'}}</span></van-col>
          </van-row>
        </li>
        <li v-if="item.status===2">
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/payway.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>支付方式</span></van-col>
            <van-col span="17"><span>{{item.payWay===1?'账号余额购买':item.payWay===2?'支付宝':item.payWay===3?'微信':'--'}}</span></van-col>
          </van-row>
        </li>
        <li>
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/chuan.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>船名</span></van-col>
            <van-col span="17"><span>{{item.shipName||'--'}}</span></van-col>
          </van-row>
        </li>
        <li>
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/person.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>联系人</span></van-col>
            <van-col span="17"><span>{{item.contacts||'--'}}</span></van-col>
          </van-row>
        </li>
        <li>
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/dh.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>联系电话</span></van-col>
            <van-col span="17"><span>{{item.telephone||'--'}}</span></van-col>
          </van-row>
        </li>
        <li>
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/jyd.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>加油点</span></van-col>
            <van-col span="17"><span>{{item.refuelingPoint||'--'}}</span></van-col>
          </van-row>
        </li>
        <li v-if="item.status===2">
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/jyl.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>加油量</span></van-col>
            <van-col span="17"><span>{{item.capacity||'--'}}</span></van-col>
          </van-row>
        </li>
        <li v-if="item.status===2">
          <van-row>
            <van-col
              span="1"
              offset="1"
            ><img
                src="../../assets/img/qian.png"
                alt=""
              ></van-col>
            <van-col
              span="4"
              offset="1"
            ><span>总价</span></van-col>
            <van-col span="17"><span>{{item.price||'--'}}</span></van-col>
          </van-row>
        </li>
      </ul>
    </div>
    <div
      class="bottom"
      v-if="item.status===2"
    >
      <van-button
        type="primary"
        round
        class="bottom-button"
        @click="goPay"
        v-if="payShow"
      >立即支付</van-button>
    </div>
  </div>
</template>

<script>
import { refuelInfo } from '@/api/refuel'
import { beforePay } from '@/api/refuel.js'
import { getOrderId, getFinishWeb, getAliPay } from '@/utils/cache'
export default {
  data() {
    return {
      item: null,
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      orderId: null,
      order: '',
      sort: '',
      keyword: '',
      payShow: false
    }
  },
  components: {
  },
  created() {
    this.orderId = getOrderId()
    // this.orderId = '49002956576522240'
    this.getOrderInfo()
  },
  mounted() {
  },
  methods: {
    getOrderInfo() {
      refuelInfo(this.orderId).then(response => {
        console.log(response)
        this.item = response.data.dataList[0]
        this.isPaid()
      })
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page.pageNum++
        this.lists()
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.cardList.length >= this.page.total) {
          this.finished = true
        }
      }, 500)
    },
    isPaid() {
      // console.log(this.item)
      beforePay(this.item.orderId).then(response => {
        console.log(response)
        if (response.data.status === 1) {
          this.payShow = true
        } else {
          this.payShow = false
        }
      })
    },
    onClickLeft() {
      // console.log('111')
      getFinishWeb()
    },
    goPay() {
      console.log(this.item)
      getAliPay(this.item.orderId)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .content-show {
    padding: 80px;
    background: #108ee9;
    p {
      color: #fff;
      line-height: 50px;
    }
    p:nth-child(1) {
      span {
        font-size: 40px;
      }
    }
  }
  .content-cell {
    margin-top: 20px;
    background-color: #fff;
    li {
      height: 88px;
      border-bottom: 1px solid #eeeeee;
      .van-col {
        line-height: 88px;
        img {
          vertical-align: middle;
        }
        span {
          font-size: 26px;
        }
        &:nth-child(2) {
          span {
            color: #999999;
          }
        }
        &:nth-child(3) {
          span {
            width: 95%;
            display: inline-block;
            text-align: right;
          }
        }
      }
    }
  }
}
.bottom {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  .bottom-button {
    width: 80%;
    margin: 0;
    font-size: 38px;
    background-color: #108ee9;
  }
  .van-button--primary {
    border: 2px solid #108ee9;
  }
}
</style>
