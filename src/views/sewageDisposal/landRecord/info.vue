<template>
  <div class="container">
    <div class="top"
         v-if="item.status===2">
      <div>
        <img src="../../../assets/img/sewage/wait.png" />
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
        <span>{{item.type===1?'污水':item.type===2?'油污':item.type===3?'生活垃圾':'--'}}</span>
      </li>
      <li>
        <span>船舶名称</span>
        <span>{{item.shipName}}</span>
      </li>
      <li class="matou">
        <span>回收点</span>
        <span>{{item.siteName}}</span>
      </li>
      <li>
        <span>排放口</span>
        <span>{{item.outletName}}</span>
      </li>
      <li>
        <span>排放口类型</span>
        <span>{{item.portType===1?'智能':item.portType===2?'普通':'--'}}</span>
      </li>
    </ul>
    <ul>
      <li v-if="item.type===1">
        <span>排放容积（L）</span>
        <span>{{item.amount}}</span>
      </li>
      <li v-if="item.type===3">
        <span>排放重量（g）</span>
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
      <li>
        <span>确认不通过原因</span>
        <span>{{item.reason||'--'}}</span>
      </li>
    </ul>
    <ul>
      <li>
        <span>积分记录</span>
      </li>
      <!-- <li v-for="item in jfList"
          :key="item.id"
          v-if="item.name === '上岸排放登记基础分' || item.name === '船舶AIS定位与码头匹配' || item.name === '污水柜北斗监测系统符合' || item.name === '登记信息获得码头方确认'">
        <span>上岸排放登记基础分</span>
        <span>{{item.fraction}}</span>
      </li> -->
      <li>
        <span>上岸排放登记基础分</span>
        <span>{{point.basePoint}}</span>
      </li>
      <li>
        <span>船舶AIS定位与码头匹配</span>
        <span>{{point.positionPoint}}</span>
      </li>
      <li>
        <span>污水柜北斗监测系统符合</span>
        <span>{{point.tankPoint}}</span>
      </li>
      <li>
        <span>登记信息获得码头方确认</span>
        <span>{{point.confirmPoint}}</span>
      </li>
      <li>
        <span>合计积分</span>
        <span>{{point.totalPoint}}分</span>
      </li>
    </ul>
    <div class="bottom"
         @click="download"
         v-if="item.status===3 && item.auditStatus===1">
      <van-button type="info">下载排污电子单据</van-button>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { getPointRecord } from '@/api/sewageDisposal'

export default {
  data() {
    return {
      item: {},
      jfList: [],
      show: false,
      point: {}
    }
  },
  created() {
    console.log(this.$route.query.info)
    this.item = this.$route.query.info
    getPointRecord(this.item.id).then(response => {
      console.log(response)
      this.point = response.data
    })
    setTitle(this.$route.meta.title)
    // getSewagePoint(1).then(response => {
    //   console.log(response)
    //   this.jfList = response.data.filter(item => item.mold === 1).reverse()
    // })
  },
  methods: {
    download() {
      this.$router.push({
        path: '/bill',
        query: {
          item: this.item
        }
      })
    }
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
      display: flex;
      align-items: center;
      span {
        line-height: 76px;
        font-size: 28px;

        &:nth-child(1) {
          color: #888888;
          text-align: left;
          width: 45%;
        }

        &:nth-child(2) {
          color: #333333;
          text-align: right;
          width: 52%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }

    .matou {
      span:nth-child(1) {
        width: 15%;
      }

      span:nth-child(2) {
        width: 83%;
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
