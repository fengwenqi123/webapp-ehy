<template>
  <div class="container">
    <div class="header">
      <div class="content">
        <img src="../../../assets/img/sewage/unrecognized.png"
             alt="" />
        <p>无法识别</p>
        <span>
          设备二维码无法识别，请确认是否正确扫
          描二维码，请尝试手动输入设备码或报修
        </span>
      </div>
    </div>
    <div class="submit">
      <van-button class="button"
                  type="info"
                  size="large"
                  @click="goHome">返回首页</van-button>
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
  },
  methods: {
    goHome() {
      this.$router.push({ name: 'sewageDisposal' })
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  .header {
    background: #fff;
    .content {
      padding: 50px 140px;

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
