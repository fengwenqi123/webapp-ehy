<template>
  <div class="boatInfo">
    <van-row>
      <van-col :span="12">
        <p>船名号</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船籍港</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船检登记号</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船舶登记号</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船舶种类</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船舶识别号</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>主机功率（千瓦）</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>参考载货量</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>总吨位</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>净吨位</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>吃水空载（米）</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>吃水满载（米）</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>总长</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>型宽（米）</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>型深（米）</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船舶所有人</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>船舶经营人</p>
        <p>123</p>
      </van-col>
      <van-col :span="12">
        <p>经营人电话</p>
        <p>123</p>
      </van-col>
    </van-row>
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