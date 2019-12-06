<template>
  <div class="container">
    <div class="content">
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="year-month"
          @confirm="confirmDate"
          @cancel="cancelDate"
          :formatter="formatter"
        />
      </van-popup>
      <van-popup
        v-model="showStatus"
        position="bottom"
        :style="{ height: '40%' }"
      >
        <van-picker
          show-toolbar
          title="确认状态"
          :columns="columnStatus"
          @confirm="confirmStatus"
          @cancel="cancelStatus"
        />
      </van-popup>
      <div class="dateBtn">
        <span @click="showPopup">{{dateBtn}}
          <van-icon name="arrow-down" /></span>
        <span
          @click="showPopupStatus"
          style="margin-left:10px;"
        >{{statusBtn}}
          <van-icon name="arrow-down" /></span>
      </div>
      <van-pull-refresh
        v-model="isLoading"
        @refresh="onRefresh"
      >
        <van-list
          class="main"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <!-- <van-checkbox name="a">复选框 a</van-checkbox> -->
          <div
            class="card"
            name="item.id"
            v-for="item in itemList"
            v-if="item.status!==4"
            :key="item.id"
          >
            <div @click="goInfo(item)">
              <van-row>
                <van-col
                  span="13"
                  :offset="1"
                >
                  <p>{{item.siteName}}</p>
                </van-col>
                <van-col span="3">
                  <span>{{item.portType===1?'智能':item.portType===2?'普通':"--"}}</span>
                </van-col>
                <van-col span="6">
                  <p>{{item.amount||'--'}} L</p>
                </van-col>
              </van-row>
              <van-row>
                <van-col
                  span="8"
                  :offset="1"
                >
                  <p>{{item.outletName}}</p>
                </van-col>
              </van-row>
              <van-row>
                <van-col
                  span="18"
                  :offset="1"
                >
                  <p v-if="item.portType===1">{{item.startTime}}-{{item.endTime}}</p>
                  <p v-else>{{item.addTimeString}}</p>
                </van-col>
                <van-col span="5">
                  <p :class="{status1:item.auditStatus===1,status2:item.auditStatus===2,status3:item.auditStatus===3}">{{item.auditStatus===1?'确认通过':item.auditStatus===2?'待确认':item.auditStatus===3?'确认不通过':"--"}}</p>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { timeChange } from '@/utils/index'
import { setTitle, getWharfId } from '@/utils/cache.js'
import { sewageReport } from '@/api/sewageDisposalNo'
export default {
  data() {
    return {
      value1: 0,
      show: false,
      showStatus: false,
      dateBtn: '选择日期',
      statusBtn: '待确认',
      auditStatus: 2,
      currentDate: new Date(),
      value2: '排污类型',
      columnStatus: ['确认通过', '待确认', '确认不通过'],
      option1: [
        { text: '地区', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      option2: [
        { text: '排污类型', value: '排污类型' },
        { text: '生活垃圾', value: '生活垃圾' },
        { text: '生活污水', value: '生活污水' }
      ],
      itemList: [],
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      type: 1,
      isLoading: false,
      finished: false,
      loading: false
    }
  },
  created() {
    this.shipName = ''
    this.wharfId = getWharfId()
    this.lists()
  },
  mounted() {
    setTitle(this.$route.meta.title)
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page.pageNum = 1
        this.itemList = []
        this.lists()
        this.loading = true
        this.isLoading = false
        this.finished = false
      }, 500)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page.pageNum += 1
        this.lists()
      }, 1000)
    },
    lists() {
      // this.wharfId = '4'
      sewageReport(this.page.pageNum, this.page.pageSize, this.time, this.type, this.shipName, this.auditStatus, this.wharfId).then(response => {
        this.page.total = response.data.page.total
        this.itemList = this.itemList.concat(response.data.dataList)
        console.log('列表', this.itemList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.page.pageNum * this.page.pageSize >= this.page.total) {
          this.finished = true
        }
      })
    },
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    showPopup() {
      this.show = true
      this.showStatus = false
    },
    showPopupStatus() {
      this.show = false
      this.showStatus = true
    },
    cancelDate() {
      this.time = ''
      this.dateBtn = '选择日期'
      this.page.pageNum = 1
      this.itemList = []
      this.lists()
      this.finished = false
      this.show = false
    },
    confirmDate(value) {
      console.log(timeChange(value))
      this.dateBtn = timeChange(value)
      this.time = timeChange(value)
      this.page.pageNum = 1
      this.itemList = []
      this.lists()
      this.finished = false
      this.show = false
    },
    cancelStatus() {
      this.auditStatus = 2
      this.statusBtn = '待确认'
      this.page.pageNum = 1
      this.itemList = []
      this.lists()
      this.finished = false
      this.showStatus = false
    },
    confirmStatus(value) {
      console.log(value)
      this.statusBtn = value
      this.auditStatus = value === '待确认' ? 2 : value === '确认通过' ? 1 : value === '确认不通过' ? 3 : ''
      this.page.pageNum = 1
      this.itemList = []
      this.lists()
      this.finished = false
      this.showStatus = false
    },
    goInfo(item) {
      this.$router.push({ name: 'portCheckInfo', query: { info: item }})
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .content {
    .dateBtn {
      display: flex;
      padding: 28px;
      span {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-left: 20px;
        padding: 15px 28px;
        background-color: #fff;
        font-size: 24px;
        border-radius: 80px;
      }
    }
    .card {
      padding: 20px 0 40px 0;
      background-color: #fff;
      border-bottom: 1px solid #eeeeee;
      div {
        .van-row {
          p {
            line-height: 50px;
          }
        }
        .van-row:nth-child(1) {
          .van-col:nth-child(1) {
            p {
              font-size: 34px;
            }
          }
          .van-col:nth-child(3) {
            p {
              font-size: 34px;
              text-align: right;
            }
          }
          .van-col:nth-child(2) {
            height: 50px;
            span {
              padding: 5px 10px;
              font-size: 24px;
              color: #fff;
              display: inline-block;
              vertical-align: middle;
              background-color: #1890ff;
            }
          }
        }
        .van-row:nth-child(2) {
        }
        .van-row:nth-child(3) {
          .van-col:nth-child(1) {
            p {
              color: #999999;
              font-size: 28px;
            }
          }
          .van-col:nth-child(2) {
            p {
              font-size: 28px;
              text-align: center;
            }
            .status1 {
              color: #09bb07;
            }
            .status2 {
              color: #ffbe00;
            }
            .status3 {
              color: red;
            }
          }
        }
      }
    }
  }
}
</style>
