<template>
  <div class="boatInfo">
    <van-row>
      <van-col :span="12">
        <p>中文船名</p>
        <p>{{infoObj.shipName}}</p>
      </van-col>
      <van-col :span="12">
        <p>违章录入单位</p>
        <p>{{infoObj.dockName||'--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>违章处理状态</p>
        <p>{{infoObj.status||'--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>违章时间</p>
        <p>{{infoObj.violationDate.substring(0,10)}}</p>
      </van-col>
      <van-col :span="12">
        <p>违章标记</p>
        <p>{{infoObj.flag||'--'}}</p>
      </van-col>
      <van-col :span="24">
        <p>违章录入时间</p>
        <p>{{infoObj.addDate||'--'}}</p>
      </van-col>
      <van-col :span="24">
        <p>违章类型</p>
        <p>{{infoObj.gcvTypeName||'--'}}</p>
      </van-col>
      <van-col :span="24">
        <p>违法内容</p>
        <p>{{infoObj.content||'--'}}</p>
      </van-col>
      <van-col :span="24">
        <p>违章处理结果</p>
        <p>{{infoObj.whyRemove||'--'}}</p>
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