<template>
  <div class="container">
    <div class="header">
      <img :src="error" alt="">
      <div class="p1">取件失败</div>
      <div class="p2">请联系技术人员</div>
    </div>
    <div class="button">
      <div class="again">
        <van-button type="info" size="large">返回快件列表</van-button>
      </div>
      <div class="close">
        <van-button size="large">关闭</van-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        error: require('@/assets/img/error.png')
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    .header {
      width: 750px;
      background: rgba(255, 255, 255, 1);
      text-align: center;
      padding-bottom: 60px;

      img {
        margin-top: 40px;
        width: 130px;
        height: 130px;
      }

      .p1 {
        margin-top: 33px;
        height: 56px;
        font-size: 40px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 56px;
      }

      .p2 {
        margin-top: 18px;
        height: 40px;
        font-size: 28px;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
        line-height: 40px;
      }
    }

    .button {
      margin-top: 60px;
      .again, .close {
        width: 686px;
        height: 94px;
        border-radius: 4px;
        margin: 0 auto;
      }
      .close{
        margin-top: 30px;
      }
    }
  }

</style>
