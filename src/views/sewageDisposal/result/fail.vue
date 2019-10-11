<template>
  <div class="container">
    <div class="header">
      <div class="content">
        <img src="../../../assets/img/sewage/fail.png" alt="" />
        <p>申请失败</p>
        <span>接收设备可能故障，请联系管理人员或报修</span>
      </div>
    </div>
    <div class="submit">
      <van-button class="button" type="info" size="large">返回首页</van-button>
    </div>
    <errors></errors>
  </div>
</template>

<script>
import errors from '@/views/sewageDisposal/errorTip'
import { setTitle } from '@/utils/cache.js'
export default {
  components: {
    errors
  },
  mounted() {
    setTitle(this.$route.meta.title)
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
      span {
        font-size: 24px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
}
</style>
