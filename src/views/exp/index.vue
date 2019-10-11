<template>
  <div class="container">
    <div
      class="top"
      @click="qrcode"
    >
      <div class="logo"></div>
      <p class="font">收件二维码</p>
    </div>

    <ul class="tabs">
      <li @click="watchs(0)">
        <div><img
            src="../../assets/img/e2.png"
            alt=""
          ></div>
        <p>待取件</p>
      </li>
      <li @click="watchs(1)">
        <div><img
            src="../../assets/img/e1.png"
            alt=""
          ></div>
        <p>待付款</p>
      </li>
      <li @click="watchs(2)">
        <div><img
            src="../../assets/img/e3.png"
            alt=""
          >
        </div>
        <p>已取件</p>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable object-curly-spacing,prefer-const,no-undef */
import Vue from 'vue'

export default {
  data() {
    return {
      already: require('@/assets/img/already.png'),
      wait: require('@/assets/img/wait.png'),
      list: [],
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      consignee: null,
      token: null
    }
  },
  created() {
  },
  methods: {
    watchs(id) {
      Vue.prototype.expActive = id
      this.$router.push(
        {
          path: '/expList'
        }
      )
    },
    qrcode() {
      this.$router.push(
        {
          path: '/expQrcode'
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;

  .top {
    width: 100%;
    height: 323px;
    background: url("../../assets/img/background_top.png");
    background-size: 100% 100%;
    text-align: center;
    padding-top: 1px;

    .logo {
      margin: 75px auto 30px;
      background: url("../../assets/img/exp_ico.png");
      background-size: 100% 100%;
      width: 120px;
      height: 90px;
    }

    .font {
      font-size: 37px;
      color: #fff;
      font-weight: 600;
    }
  }
  .tabs {
    width: 100%;
    float: left;
    margin-top: 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 2px #ddd;

    li {
      width: 33.333%;
      height: auto;
      float: left;
      text-align: center;
      padding: 40px 0;

      div {
        width: 100%;
        height: 100px;
        float: left;
        img {
          height: 100px;
          max-width: 120px;
        }
      }
      p {
        float: left;
        width: 100%;
        margin-top: 24px;
        color: #696969;
        font-size: 32px;
      }
    }
  }

  .list {
    width: 100%;
    margin-top: 20px;

    .title {
      border-bottom: 1px solid #e0eee0;
      height: 64px;
      line-height: 64px;
      text-indent: 48px;
      font-size: 26px;
      color: rgba(153, 153, 153, 1);
      background: #fff;
    }

    ul {
      background: #fff;

      li {
        padding: 0 30px;
        border-bottom: 1px solid #e0eee0;

        .item {
          height: 110px;
          display: flex;
          align-items: center;

          .left {
            width: 64px;
            height: 64px;

            img {
              width: 100%;
            }
          }

          .active {
            width: 380px;
            margin-left: 30px;

            .p1 {
              width: 105px;
              text-align: center;
              height: 40px;
              line-height: 40px;
              border-radius: 5px;
              border: 2px solid rgba(56, 158, 13, 1);
              color: #389e0d;
            }

            .actives {
              border: 2px solid red;
              color: red;
            }

            .p2 {
              height: 33px;
              font-size: 24px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 33px;
              margin-top: 6px;
            }
          }

          .xq {
            flex: 1;
            font-size: 24px;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);

            i {
              font-size: 27px;
            }
          }
        }
      }
    }

    .bottom {
      height: 74px;
      line-height: 74px;
      text-align: center;
      background: #fff;
      color: rgba(24, 144, 255, 1);
      font-size: 24px;
    }
  }
}
</style>
