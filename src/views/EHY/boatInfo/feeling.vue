<template>
  <div class="boatInfo">
    <van-row>
      <van-col :span="12">
        <p>AIS是否安装</p>
        <p>{{isAis}}</p>
      </van-col>
      <van-col :span="12">
        <p>MMSI（九位码）</p>
        <p>{{feelObj.no||'--'}}</p>
      </van-col>
      <van-col :span="24">
        <p>最后一次定位时间</p>
        <p>{{feelObj.receiveTimeString||'--'}}</p>
      </van-col>
    </van-row>
    <!-- <van-button type="default">查询船舶实时位置</van-button> -->
  </div>
</template>

<script>
import { feeling } from '@/api/ehy'
export default {
  data() {
    return {
      infoObj: {},
      feelObj: {},
      isAis: '是'
    }
  },
  created() {
    this.infoObj = this.$route.query.info
    this.feel()
    console.log(this.infoObj)
  },
  methods: {
    feel() {
      feeling(2, this.infoObj.shipName).then(response => {
        console.log(response)
        if (response.data) {
          this.feelObj = response.data
          this.isAis = '是'
        } else {
          this.isAis = '否'
          this.feelObj = {}
        }
      })
    }
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