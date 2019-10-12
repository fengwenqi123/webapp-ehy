<template>
  <div class="boatInfo">
    <van-row>
      <van-col :span="12">
        <p>AIS是否安装</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>MMSI（九位码）</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>最后一次定位时间</p>
        <p>123</p>
      </van-col>
    </van-row>
    <van-button type="default">查询船舶实时位置</van-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoObj: {}
    }
  },
  created() {
    this.infoObj = this.$route.query.info
    console.log(this.infoObj)
  }
}
</script>

<style scoped lang="scss">
.boatInfo {
  background-color: #fff;
  .van-row {
    padding: 40px 40px 0 40px;
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
  .van-button {
    width: 100%;
    color: #0064e0;
  }
}
</style>