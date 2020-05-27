<template>
  <div class="detail">
    <div class="top">
      <div>
        <p>
          <img src="../../assets/img/ehy/time.png" />
          <span>申报时间</span>
        </p>
        <p>
          <span>{{form.checkTime}}</span>
        </p>
      </div>
      <div>
        <p>
          <img src="../../assets/img/ehy/cb.png" />
          <span>船舶名称</span>
        </p>
        <p>
          <span>{{form.shipName}}</span>
        </p>
      </div>
      <div>
        <p>
          <img src="../../assets/img/ehy/cz.png" />
          <span>船长</span>
        </p>
        <p>
          <span>{{form.captain}}</span>
        </p>
      </div>
      <div>
        <p>
          <img src="../../assets/img/ehy/gk.png" />
          <span>当前港口</span>
        </p>
        <p>
          <span>{{form.portName}}</span>
        </p>
      </div>
      <div>
        <p>
          <img src="../../assets/img/ehy/gk.png" />
          <span>下一港口</span>
        </p>
        <p>
          <span>{{form.nextPortName}}</span>
        </p>
      </div>
    </div>
    <div class="content"
         v-for="item in form.checkItemResult"
         :key="item.code">
      <p class="title">
        <span></span>
        <!-- 1000 驾驶台, 1001 救生、消防 ,1002 甲板 ,1003 机舱 -->
        <span>{{item.code==="1000"?"驾驶台":item.code==="1001"?"救生、消防部分":item.code==="1002"?"甲板部分":item.code==="1003"?"机舱部分":""}}</span>
      </p>
      <div v-for="itemChild in item.itemResult"
           :key="itemChild.itemCode">
        <p>{{showType(itemChild.itemCode)}}</p>
        <p>{{itemChild.itemResult==='1'?'是':itemChild.itemResult==='2'?'否':itemChild.itemResult==='3'?'不适用':''}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
export default {
  data() {
    return {
      form: {
      }
    }
  },
  created() {
    this.form = JSON.parse(this.$route.query.infos)
    console.log(this.form)
    setTitle(this.$route.meta.title)
  },
  methods: {
    showType(code) {
      switch (code) {
        case '100001':
          return '1.船舶证书、文书、图书资料、船员证书是否齐全'
        case '100002':
          return '2.船舶证书、文书、图书资料、船员证书是否齐全'
        case '100003':
          return '3.号灯、号型、声响信号等是否功能良好'
        case '100101':
          return '1.救生（助）艇、救生筏及其属具是否配备齐全、登乘装置、应急照明状况是否良好'
        case '100102':
          return '2.个人救生设备（救生圈、救生衣、浸水保温服等）是否配备齐全、是否良好'
        case '100103':
          return '3.探火和报警装置（驾驶台、机舱、控制室等）状况是否良好'
        case '100104':
          return '4.主、应急消防泵及其管系状况是否良好'
        case '100105':
          return '5.固定式、移动式灭火装置、个人消防装备状况是否良好'
        case '100106':
          return '6.防火分隔、防火门、防火挡板、速闭阀等装置状况是否良好'
        case '100201':
          return '1.船体及甲板结构状况是否良好'
        case '100202':
          return '2.风雨密、水密装置、设备、设施状况是否良好'
        case '100203':
          return '3.货物积载、隔离、绑扎、系固是否符合要求'
        case '100204':
          return '4.系泊设备状态是否良好'
        case '100205':
          return '5.载重线和水尺标识清晰、船舶未处于超载状态'
        case '100301':
          return '1.主辅机及其附属系统工作状况是否良好'
        case '100302':
          return '2.锅炉及其附属设备工作状况是否良好'
        case '100303':
          return '3.主电源和应急电源是否工作正常'
        case '100304':
          return '4.操舵装置工作状态是否良好'
        case '100305':
          return '5.防污染设备工作是否正常'
        default: return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background-color: #fff;
  padding-bottom: 100px;
  .top {
    padding: 0 40px;
    border-bottom: 1px solid #ddd;
    div {
      display: flex;
      justify-content: space-between;
      p {
        display: flex;
        align-items: center;
        line-height: 100px;
        img {
          width: 32px;
          height: 32px;
        }
        span {
          font-size: 30px;
          color: #333;
          margin-left: 20px;
        }
      }
      p:nth-child(2) {
        span {
          color: #999;
        }
      }
    }
  }
  .content {
    padding: 0 40px;
    border-bottom: 1px solid #ddd;
    &:last-child {
      border: 0;
    }
    > div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      p {
        display: inline-block;
        line-height: 50px;
        margin: 10px 0;
        font-size: 30px;
        color: #333;
        &:nth-child(1) {
          width: 80%;
        }
        &:nth-child(2) {
          text-align: right;
          width: 20%;
          color: #1890ff;
        }
      }
    }
    .title {
      margin: 30px 0 10px 0;
      span:nth-child(1) {
        display: inline-block;
        width: 8px;
        height: 24px;
        background-color: #1890ff;
      }
      span:nth-child(2) {
        padding: 0 10px;
        color: #333;
        font-weight: bold;
        margin-left: 5px;
        font-size: 34px;
      }
    }
  }
}
</style>