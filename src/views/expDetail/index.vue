<template>
  <div class="container expDetail">
    <!-- <div class="header">
      <div class="qrcode">
        <img :src="qrcode"
             alt="">
      </div>
    </div> -->
    <div class="details">
      <ul>
        <li>
          <span>快递公司</span>
          <span>{{expInfo.company}}</span>
        </li>
        <li>
          <span>快递单号</span>
          <span>{{expInfo.courierNumber}}</span>
        </li>
        <li>
          <span>收货人姓名</span>
          <span>{{expInfo.consignee}}</span>
        </li>
        <li>
          <span>收货人手机</span>
          <span>{{expInfo.telephone}}</span>
        </li>
        <li>
          <span>快递类型</span>
          <span>{{expInfo.expressType ===1?'小件':expInfo.expressType ===2? '中件':expInfo.expressType ===3?'大件':expInfo.expressType ===4?'超大件':'无'}}</span>
        </li>
        <li>
          <span>货架</span>
          <span>{{expInfo.shelfNumber}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable object-curly-spacing,prefer-const,no-unused-vars */

import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data() {
    return {
      // src: require('@/assets/img/st.png'),
      // qrcode: ''
    }
  },
  computed: {
    ...mapGetters([
      'expInfo'
    ])
  },
  created() {
    // if (this.expInfo.id) {
    //   this.qrcode = 'https://api.cjbe88.com/express/express/qrcode?content=' + this.expInfo.id
    // }
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
.container {
  .header {
    width: 347px;
    height: 347px;
    margin: 38px auto 30px;
    .qrcode {
      img {
        width: 100%;
      }
    }
  }

  .details {
    display: flex;
    justify-content: center;

    ul {
      width: 100%;

      li {
        background: #fff;
        border-bottom: 2px solid #eeeeee;
        width: 100%;
        height: 100px;
        line-height: 100px;
        padding: 0 32px;
        box-sizing: border-box;
        span {
          float: left;
          font-size: 32px;
          color: #333333;
        }
        span:nth-child(2) {
          float: right;
          color: #999999;
        }
      }

      li:nth-child(3) {
        margin-top: 24px;
      }
    }
  }
}
</style>
