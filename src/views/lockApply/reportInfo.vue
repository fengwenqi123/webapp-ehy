<template>
  <div class="ehyReportInfo"
       :class="{'marginBt':status===4}">
    <van-cell title="正在审核中，请耐心等待..."
              icon="clock-o"
              v-if="process===1"
              style="background-color:#FFD700;color:#fff"
              class="statusShow" />
    <van-cell title="审核通过，请耐心等待调度..."
              icon="passed"
              v-if="process===2"
              style="background-color:#00BFFF;color:#fff"
              class="statusShow" />
    <van-cell title="审核不通过，请重新提交申请"
              icon="close"
              v-if="process===3"
              style="background-color:#F08080;color:#fff"
              class="statusShow" />
    <van-cell title="审批编号"
              value="内容" />
    <van-cell title="船闸名称"
              value="内容" />
    <van-cell title="船名"
              value="内容" />
    <van-cell title="船舶识别号"
              value="内容" />
    <van-cell title="申请人"
              value="内容" />
    <van-cell title="联系电话"
              value="内容" />
    <van-cell title="载重"
              value="内容" />
    <p style="padding:10px;color:#999">货物明细</p>
    <van-cell title="货物类型"
              value="内容" />
    <van-cell title="实载货数量"
              value="内容" />
    <van-cell title="申请理由"
              value="内容" />
    <van-steps direction="vertical"
               active-color="#1890ff"
               style="margin-top:20px;"
               active-icon="checked"
               :active="activeProcess">
      <van-step :class="{'errorLine':this.status===4}">
        <h3>提交申请</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step v-if="process===1">
        <h3>待审批</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step v-if="process===2">
        <h3>审批通过</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step v-if="process===2">
        <h3>待安排过闸批次</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
      <van-step v-if="process===2">
        <h3>已安排过闸批次</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step class="error"
                v-if="process===3">
        <h3>审批驳回</h3>
        <template slot="active-icon">
          <van-icon name="clear"
                    style="color:red" />
        </template>
        <p>2016-07-11 10:00</p>
      </van-step>
    </van-steps>
    <div class="bottom"
         v-if="status===4">
      <van-button>重新提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //  审批结果  1：审批中， 2：审批通过，3，审批不通过
      process: 2,
      // 审批状态 0：待缴费检查，1：未缴费，2：已缴费（待审核），3：通过，4：不通过；11：待安排，12：已安排，13：待过闸，14：过闸中，15：完成过闸
      status: 2,
      // 流程：审批中 2步，审核通过：4步，审核不通过：2步
      activeProcess: null
    }
  },
  created() {
    console.log(this.status)
    if (this.status === 2) {
      this.process = 1
    }
    if (this.status === 3) {
      this.process = 2
      this.activeProcess === '1'
    }
    if (this.status === 11) {
      this.process = 2
      this.activeProcess = '2'
      console.log(this.activeProcess)
    }
    if (this.status === 12) {
      this.process = 2
      this.activeProcess = '3'
    }
    if (this.status === 4) {
      this.process = 3
      this.activeProcess = '1'
    }
  }
}
</script>

<style lang="scss" scoped>
.statusShow {
  margin: 10px 0;
}
.marginBt {
  margin-bottom: 100px;
}
.van-step--finish {
  color: #1890ff;
  .van-step__line {
    background-color: #1890ff;
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  .van-button {
    width: 100%;
  }
}
</style>