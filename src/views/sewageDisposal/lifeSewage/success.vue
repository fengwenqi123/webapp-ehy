<template>
  <div class="container">
    <div class="header">
      <div class="content">
        <img src="../../../assets/img/sewage/success.png"
             alt="" />
        <p>回收成功</p>
        <div class="line"
             v-if="recoveryInfo.attribute === 1">
          <span v-if="recoveryInfo.type === 1">请开启回收设备完成回收作业</span>
          <span v-else-if="recoveryInfo.type === 2">请工作人员确认开始回收作业</span>
          <span v-else>请开启回收设备完成回收作业</span>
        </div>
        <div class="line"
             v-else>
          <span>工作人员审核后记录及积分生效</span>
        </div>
        <!--        <span v-if="recoveryInfo.attribute === 1">请开启回收设备完成回收作业</span>-->
        <!--        <span v-else>工作人员审核后记录及积分生效</span>-->
      </div>
    </div>
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
    setTitle(this.$route.meta.title)
  },
  methods: {
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
