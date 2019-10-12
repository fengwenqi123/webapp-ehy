<template>
  <div class="boatInfo">
    <van-row>
      <van-col :span="12">
        <p>船名号</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船长</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船检登记号</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>案件类别</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>案件来源</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>发案时间</p>
        <p>123</p>
      </van-col>
      <van-col :span="24">
        <p>是否结案</p>
        <p>123</p>
      </van-col>
      <van-col :span="24">
        <p>案由</p>
        <p>123</p>
      </van-col>
      <van-col :span="24">
        <p>违法内容</p>
        <p>123</p>
      </van-col>
      <van-col :span="24">
        <p>违法条例</p>
        <p>123</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.boatInfo {
  padding: 40px;
  .van-row {
    .van-col {
      margin: 10px 0;
      p {
        line-height: 50px;
        &:nth-child(1) {
          color: #888;
          font-size: 32px;
        }
        &:nth-child(2) {
          color: #333;
          font-size: 40px;
        }
      }
    }
  }
}
</style>