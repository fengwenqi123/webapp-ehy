<template>
  <div class="container">
    <div class="header">
      <div class="content">
        <!-- <img src="../../../assets/img/sewage/success.png"
             alt="" /> -->
        <span class="time">{{count}}</span>
        <p>设备远程启动成功</p>
        <div class="line">
          <span>超过15秒排污将自动取消</span>
        </div>
      </div>
    </div>
    <!-- <div class="middle">
      <img src="../../../assets/img/lifeWater.png"
           alt="" />
    </div> -->
    <!-- <div class="main">
      <div class="title">预计可获得积分</div>
      <ul>
        <li>
          <div class="item">
            <p>基础分</p>
            <p>10<span>分</span></p>
          </div>
        </li>
        <li>
          <div class="item">
            <p>定位设备加分</p>
            <p>10<span>分</span></p>
          </div>
        </li>
        <li>
          <div class="item">
            <p>船载生活污水柜加分</p>
            <p>10<span>分</span></p>
          </div>
        </li>
      </ul>
      <div class="total">
        <p>合计积分</p>
        <p>20<span>分</span></p>
      </div>
    </div> -->
    <div class="submit"
         @click="backHome">
      <van-button class="button"
                  type="info"
                  size="large">返回首页</van-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { setTitle } from '@/utils/cache.js'
export default {
  computed: {
    ...mapGetters(['recoveryInfo'])
  },
  mounted() {
    this.startCount()
    setTitle(this.$route.meta.title)
  },
  data() {
    return {
      count: 15,
      interval: null
    }
  },
  beforeDestroy() {
    clearInterval(this.interval)
    this.interval = null
  },
  methods: {
    startCount() {
      this.interval = setInterval(() => {
        if (this.count > 0) {
          this.count--
          console.log(this.count)
        } else {
          clearInterval(this.interval)
          this.$router.push({
            path: '/sewageDisposal'
          })
        }
      }, 1000)
    },
    backHome() {
      this.$router.push({
        path: '/sewageDisposal'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .header {
    .content {
      padding: 50px 0;
      background: #fff;
      text-align: center;
      .time {
        background: #108ee9;
        color: #fff;
        display: inline-block;
        line-height: 150px;
        font-size: 60px;
        font-weight: bold;
        border-radius: 50%;
        width: 150px;
        height: 150px;
      }
      img {
        width: 130px;
        height: 130px;
      }

      p {
        font-size: 30px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        margin: 36px 0 40px 0;
      }

      .line {
        span {
          font-size: 24px;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
  .middle {
    width: 100%;
    img {
      width: 100%;
      margin-top: 20px;
    }
  }
  .main {
    padding: 0 40px;
    background: #fff;
    margin-top: 20px;

    .title {
      font-size: 32px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      padding: 40px 0;
      border-bottom: 1px solid #eeeeee;
    }

    ul {
      li {
        .item {
          height: 90px;
          display: flex;
          justify-content: space-between;
          align-items: center;

          p:nth-child(1) {
            font-size: 28px;
            font-weight: 500;
            color: rgba(136, 136, 136, 1);
          }

          p:nth-child(2) {
            font-size: 40px;
            font-weight: 400;
            color: rgba(85, 85, 85, 1);

            span {
              font-size: 28px;
              font-weight: 400;
              color: rgba(85, 85, 85, 1);
            }
          }
        }
      }
    }

    .total {
      border-top: 1px solid #eeeeee;
      height: 106px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p:nth-child(1) {
        font-size: 28px;
        font-weight: 500;
        color: rgba(136, 136, 136, 1);
      }

      p:nth-child(2) {
        font-size: 40px;
        font-weight: 400;
        color: rgba(241, 157, 82, 1);

        span {
          font-size: 28px;
          font-weight: 400;
          color: rgba(241, 157, 82, 1);
        }
      }
    }
  }

  .submit {
    .line {
      height: 20px;
    }
  }
}
</style>
