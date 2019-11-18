<template>
  <div class="container">
    <div class="content">
      <van-cell-group>
        <van-field v-model="form.questionName"
                   label="问题类型"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择问题类型"
                   @click="questionShow = true" />
        <van-field v-model="form.deviceType"
                   label="设备类型"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择设备类型"
                   @click="deviceShow = true"
                   v-show="form.questionType === 2" />
        <van-field v-model="form.siteName"
                   label="回收点"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择回收点"
                   @click="siteShow = true" />
        <van-field v-model="form.outletName"
                   label="排放口"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择排放口"
                   @click="outletShow = true"
                   v-show="form.questionType === 2" />
        <van-field v-model="form.describe"
                   label="问题描述"
                   input-align="right"
                   placeholder="请输入问题描述" />
      </van-cell-group>
      <div class="submit"
           @click="submit">
        <van-button class="button"
                    type="info"
                    size="large">确认上报</van-button>
      </div>
    </div>
    <van-action-sheet v-model="questionShow"
                      :actions="actions"
                      round
                      close-on-click-action
                      @select="onSelect"
                      cancel-text="取消" />
    <van-action-sheet v-model="deviceShow"
                      :actions="deviceActions"
                      round
                      close-on-click-action
                      @select="onSelectDevice"
                      cancel-text="取消" />
    <van-popup v-model="siteShow"
               style="background:#F2F3F4"
               :style="{ height: '100%' }"
               position="bottom">
      <van-field v-model="keyword"
                 style="margin-bottom:5px"
                 clearable
                 label="关键字"
                 @input="searchSite"
                 placeholder="请输入关键字查询" />
      <van-picker show-toolbar
                  class="siteColumns"
                  title="回收点"
                  :columns="siteColumns"
                  @cancel="siteShow = false"
                  @confirm="siteOnConfirm" />
    </van-popup>
    <van-popup v-model="outletShow"
               round
               position="bottom">
      <van-picker show-toolbar
                  title="排放口"
                  :columns="outletColumns"
                  @cancel="outletShow = false"
                  @confirm="outletOnConfirm" />
    </van-popup>
  </div>
</template>

<script>
import {
  recoveryPointList,
  outLetList,
  questionReport
} from '@/api/sewageDisposal'
import { setTitle } from '@/utils/cache.js'
import { Toast } from 'vant'
export default {
  data() {
    return {
      form: {
        questionType: null,
        questionName: null,
        deviceType: null,
        outletName: null,
        siteName: null,
        describe: null
      },
      actions: [
        {
          name: '排污点拒收',
          value: 1
        },
        {
          name: '设备故障',
          value: 2
        }
      ],
      deviceActions: [
        {
          name: '智能生活污水'
        },
        {
          name: '普通生活污水'
        },
        {
          name: '智能生活垃圾'
        },
        {
          name: '普通生活垃圾'
        },
        {
          name: '智能油污'
        },
        {
          name: '普通油污'
        }
      ],
      keyword: '',
      siteColumns: [],
      outletColumns: [],
      questionShow: false,
      deviceShow: false,
      siteShow: false,
      outletShow: false
    }
  },
  created() {
    this.getRecoveryPointList()
    console.log('11',
      Object.keys(this.$route.query).length > 0)
    if (Object.keys(this.$route.query).length > 0) {
      console.log(this.$route.query)
      this.form.siteName = this.$route.query.infos.siteName
      // this.form.siteName = this.$route.query.infos.siteName
    }
  },
  mounted() {
    setTitle(this.$route.meta.title)
  },
  methods: {
    onSelect(item) {
      this.form.questionName = item.name
      this.form.questionType = item.value
    },
    onSelectDevice(item) {
      this.form.deviceType = item.name
    },
    searchSite() {
      console.log(this.keyword)
      this.getRecoveryPointList()
    },
    // 获取回收点
    getRecoveryPointList() {
      this.siteColumns = []
      recoveryPointList(this.keyword).then(response => {
        response.data.map(item => {
          this.siteColumns.push(item.name)
        })
      })
    },
    // 确认回收点
    siteOnConfirm(value) {
      this.form.siteName = value
      this.siteShow = false
      this.getOutLetList()
    },
    // 获取排污口
    getOutLetList() {
      this.outletColumns = []
      outLetList(this.form.siteName).then(response => {
        response.data.map(item => {
          this.outletColumns.push(item.name)
        })
      })
    },
    // 确认排污口
    outletOnConfirm(value) {
      this.form.outletName = value
      this.outletShow = false
    },
    submit() {
      if (!this.form.questionType) {
        Toast('请选择问题类型')
        return
      }
      if (this.form.questionType === 1) {
        if (!this.form.siteName) {
          Toast('请选择回收点')
          return
        }
        if (!this.form.describe) {
          Toast('请选择问题描述')
          return
        }
        let {
          questionName: questionType,
          siteName,
          describe: describes
        } = this.form
        questionReport({ questionType, siteName, describes }).then(response => {
          Toast.success({
            message: response.msg,
            duration: 1000
          })
          setTimeout(() => {
            this.goBack()
          }, 1000)
        })
      } else {
        if (!this.form.deviceType) {
          Toast('请选择设备类型')
          return
        }
        if (!this.form.siteName) {
          Toast('请选择回收点')
          return
        }
        if (!this.form.outletName) {
          Toast('请选择排放口')
          return
        }
        if (!this.form.describe) {
          Toast('请选择问题描述')
          return
        }
        let {
          questionName: questionType,
          siteName,
          deviceType,
          outletName,
          describe: describes
        } = this.form
        questionReport({
          questionType,
          siteName,
          deviceType,
          outletName,
          describes
        }).then(response => {
          Toast.success({
            message: response.msg,
            duration: 1000
          })
          setTimeout(() => {
            this.goBack()
          }, 1000)
        })
      }
    },
    goBack() {
      this.$router.push({
        path: '/sewageDisposal'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .content {
    .submit {
      width: 90%;
      margin: 20px auto;
      .van-button__text {
        font-size: 36px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
.siteColumns {
  .van-picker__columns {
    height: 100% !important;
  }
}
</style>
