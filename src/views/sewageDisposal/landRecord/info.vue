<template>
  <div class="container">
    <div class="top" v-if="item.status===2">
      <div>
        <img src="../../../assets/img/sewage/wait.png"/>
      </div>
      <div>
        <p>等待审核中</p>
      </div>
      <div>
        <p>工作人员审核后记录及积分生效</p>
      </div>
    </div>
    <ul>
      <li>
        <span>排污类型</span>
        <span>{{item.type===1?'污水':item.type===2?'生活垃圾':item.type===3?'油污':'--'}}</span>
      </li>
      <li>
        <span>船舶名称</span>
        <span>{{item.shipName}}</span>
      </li>
      <li>
        <span>回收点</span>
        <span>{{item.siteName}}</span>
      </li>
      <li>
        <span>排放口</span>
        <span>{{item.outletName}}</span>
      </li>
      <li>
        <span>排放口类型</span>
        <span>{{item.portType===1?'智能':item.portType===2?'普通':"--"}}</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>排放容积（L）</span>
        <span>{{item.amount}}</span>
      </li>
      <li v-if="item.portType===1">
        <span>排放开始时间</span>
        <span>{{item.startTime}}</span>
      </li>
      <li v-if="item.portType===1">
        <span>排放结束时间</span>
        <span>{{item.endTime}}</span>
      </li>
      <li v-if="item.portType===2">
        <span>排放登记时间</span>
        <span>{{item.addTimeString}}</span>
      </li>
      <li v-if="item.portType===2">
        <span>排放审核时间</span>
        <span>{{item.modifyTimeString}}</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>积分记录</span>
      </li>
      <li>
        <span>基础分</span>
        <span>10分</span>
      </li>
      <li>
        <span>定位设备加分</span>
        <span>0分</span>
      </li>
      <li>
        <span>船载生活污水柜加分</span>
        <span>0分</span>
      </li>
      <li>
        <span>合计积分</span>
        <span>10分</span>
      </li>
    </ul>
    <div class="bottom" v-if="item.status===1">
      <van-button type="info">下载排污电子单据</van-button>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
export default {
  data() {
    return {
      item: {}
    }
  },
  created() {
    console.log(this.$route.query.info)
    this.item = this.$route.query.info
    setTitle(this.$route.meta.title)
  }
}
</script>

<style scoped lang="scss">
.container {
  .top {
    display: flex;
    padding: 50px 0;
    background-color: #fff;
    flex-direction: column;
    justify-content: space-around;
    height: 350px;
    text-align: center;
    div:nth-child(1) {
      margin: 0 auto;
      height: 130px;
      width: 130px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    div:nth-child(2) {
      p {
        color: #333;
        font-size: 32px;
      }
    }
    div:nth-child(3) {
      p {
        color: #999;
        font-size: 24px;
      }
    }
  }
  ul {
    width: 96%;
    padding: 2%;
    background-color: #fff;
    li {
      height: 76px;
      width: 100%;
      span {
        display: inline-block;
        line-height: 76px;
        font-size: 28px;
        &:nth-child(1) {
          color: #888888;
          text-align: left;
          width: 40%;
        }
        &:nth-child(2) {
          color: #333333;
          text-align: right;
          width: 52%;
        }
      }
    }
  }
  ul:nth-of-type(2) {
    li:nth-child(1) {
      padding-top: 2%;
      border-top: 1px solid #eeeeee;
    }
  }
  ul:nth-of-type(3) {
    padding-top: 0%;
    margin-top: 3%;
    li:nth-child(1) {
      height: 108px;
      border-bottom: 1px solid #eeeeee;
      span {
        display: inline-block;
        color: #333;
        font-size: 30px;
        line-height: 108px;
      }
    }
  }
  .bottom {
    width: 94%;
    padding: 3%;
    .van-button {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>
