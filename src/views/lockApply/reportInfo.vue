<template>
  <div class="ehyReportInfo"
       style="padding-bottom:20px"
       :class="{marginBt:this.status===2}">
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
    <van-cell title="审批编号">
      <template #value>
        {{form.appId}}
      </template>
    </van-cell>
    <van-cell title="船闸名称">
      <template #value>
        {{form.czmc}}
      </template>
    </van-cell>
    <van-cell title="船名">
      <template #value>
        {{form.zwcm}}
      </template>
    </van-cell>
    <van-cell title="过闸方向">
      <template #value>
        {{form.gzfx==='1'?'进':'出'}}
      </template>
    </van-cell>
    <van-cell title="申请人">
      <template #value>
        {{form.cjr}}
      </template>
    </van-cell>
    <van-cell title="联系电话">
      <template #value>
        {{form.lxdh}}
      </template>
    </van-cell>
    <van-cell title="载重">
      <template #value>
        {{form.zz}}
      </template>
    </van-cell>
    <van-cell title="实际载货量"
              v-if="form.zz==='重载'">
      <template #value>
        {{form.zzhwzl}}吨
      </template>
    </van-cell>
    <div v-for="(item,index) in gzhwList"
         :key="item.id"
         v-if="form.zz==='重载'">
      <p style="padding:10px;color:#999">货物明细<span v-if="gzhwList.length>1">{{index+1}}</span></p>
      <van-cell title="货物类型">
        <template #value>
          {{item.hwlx}}
        </template>
      </van-cell>
      <van-cell title="实载货数量">
        <template #value>
          {{item.szhsl}}吨
        </template>
      </van-cell>
    </div>
    <van-cell title="申请理由"
              style="margin-top:10px">
      <template #value>
        {{form.sqly}}
      </template>
    </van-cell>
    <van-steps direction="vertical"
               active-color="#1890ff"
               style="margin-top:20px;padding:10px 0 0 32px"
               active-icon="checked"
               :active="activeProcess">
      <van-step :class="{'errorLine':this.status===2}">
        <h3 class="step-h3">
          <span>{{one.appOperator}} 提交申请</span>
          <span>{{one.approvalTime}}</span>
        </h3>
      </van-step>
      <van-step v-if="process===1">
        <h3><span>待审批</span></h3>
      </van-step>
      <van-step v-if="process===2">
        <h3>审批通过</h3>
      </van-step>
      <van-step v-if="process===2"
                class="ap">
        <h3>安排过闸</h3>
        <p style="margin-top:10px"><span>船闸名称：</span><span>{{three.approvalOrg}}</span></p>
        <p style="margin-top:10px"><span>批次名称：</span><span>{{three?JSON.parse(three.batchInfo).name:''}}</span></p>
        <p style="margin-top:10px"><span>批次顺序：</span><span>今天第{{three?JSON.parse(three.batchInfo).index:''}}批过闸</span></p>
      </van-step>
      <van-step v-if="process===2">
        <h3 class="step-h3">
          <span>过闸完成</span>
          <span>{{four?four.approvalTime:''}}</span>
        </h3>
      </van-step>
      <van-step class="error"
                v-if="process===3">
        <h3 class="error-h3">
          <span>{{two.approvalOrg}} 审批驳回</span>
          <p>{{two.approvalDesc}}</p>
          <p>{{two.approvalTime}}</p>
        </h3>
        <template slot="active-icon">
          <van-icon name="clear"
                    style="color:red" />
        </template>
      </van-step>
    </van-steps>
    <div class="bottom"
         v-if="status===2">
      <van-button @click="reSubmit">重新提交</van-button>
    </div>
  </div>
</template>

<script>
import { reportInfo } from '@/api/ehyLockHS'
import { setTitle } from '@/utils/cache.js'
export default {
  data() {
    return {
      form: {},
      //  审批流程process  1：审批中， 2：审批通过，3，审批不通过
      process: 2,
      // 1，待过闸 2，审批驳回 3 安排过闸 4 过闸完成
      status: 1,
      // 流程：审批中 2步，审核通过：4步，审核不通过：2步
      activeProcess: null,
      one: {},
      two: {},
      three: {},
      four: {},
      gzhwList: [{ id: '123' }, { id: '1232' }]
    }
  },
  created() {
    this.getQuery()
    setTitle(this.$route.meta.title)
  },
  methods: {
    reSubmit() {
      this.$router.push({ path: '/lockAddReport', query: { addInfo: JSON.stringify(this.form) }})
    },
    getQuery() {
      reportInfo(JSON.parse(this.$route.query.infos).id).then(res => {
        console.log(res)
        this.form = res.data
        this.status = this.form.status
        this.gzhwList = this.form.gzhwList // 当前状态 1，待审批 2，审批驳回 3 安排过闸 4 过闸完成
        if (this.form.approvalBeanList) {
          this.one = this.form.approvalBeanList.filter(item => item.status === 1)[0]
          console.log(this.one)
          this.two = this.form.approvalBeanList.filter(item => item.status === 2)[0]
          this.three = this.form.approvalBeanList.filter(item => item.status === 3)[0]
          this.four = this.form.approvalBeanList.filter(item => item.status === 4)[0]
        }
        if (this.status === 1) {
          this.process = 1
          this.activeProcess = '0'
        }
        if (this.status === 2) {
          this.process = 3
          this.activeProcess = 1
        }
        if (this.status === 3) {
          this.process = 2
          this.activeProcess = '2'
        }
        if (this.status === 4) {
          this.process = 2
          this.activeProcess = '3'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.statusShow {
  margin: 10px 0;
}
.ap {
  p {
    span:nth-child(1) {
      font-size: 26px;
      color: #999;
    }
    span:nth-child(2) {
      font-size: 26px;
      font-weight: bold;
    }
  }
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
.van-step {
  padding-bottom: 40px;
  .step-h3 {
    display: flex;
    justify-content: space-between;
    span:nth-child(2) {
      font-size: 24px;
    }
  }
}
.error-h3 {
  p {
    line-height: 50px;
  }
  p:nth-child(3) {
    font-size: 24px;
  }
}
</style>
