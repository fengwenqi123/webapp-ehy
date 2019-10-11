<template>
  <div class="container">
    <div class="content">
      <van-popup
        v-model="show"
        position="top"
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
      <div class="dateBtn">
        <span @click="showPopup">{{dateBtn}} <van-icon name="arrow-down"/></span>
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
        <div
          class="card"
          v-for="item in itemList"
          :key="item.id"
        >
          <div @click="goInfo(item)">
            <van-row>
              <van-col span="8" :offset="1">
                <p>{{item.place}}</p>
              </van-col>
              <van-col span="3">
                <span>{{item.portType===1?'智能':item.portType===2?'普通':"--"}}</span>
              </van-col>
              <van-col span="6" :offset="5">
               <p>{{item.amount}}</p>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="8" :offset="1">
                <p>{{item.outletName}}</p>
              </van-col>           
            </van-row>
            <van-row>
              <van-col span="8" :offset="1">
                <p>{{item.startTime}}-{{item.endTime}}</p>
              </van-col>
              <van-col span="5" :offset="10">
                <p :class="{status1:item.status===1,status2:item.status===2,status3:item.status===3}">{{item.status===1?'生效':item.status===2?'审核中':item.status===3?'失效':"--"}}</p>
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
import { setTitle } from '@/utils/cache.js'
import { sewageReport } from '@/api/sewageDisposal'
export default {
  data() {
    return {
      value1: 0,
      show: false,
      dateBtn: '选择日期',
      currentDate: new Date(),
      value2: '排污类型',
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
      // itemList: [{
      //   id: '1',
      //   status: '生效',
      //   contact: '张三',
      //   mobile: '13100000000',
      //   name: '收集点1（码头）',
      //   type: '智能',
      //   address: '余杭区',
      //   fomesType: '生活垃圾',
      //   distance: '980m',
      //   ammount: '500L',
      //   time: '09-12 20:00',
      //   life: '生活污水回收'
      // },
      // {
      //   id: '2',
      //   status: '审核中',
      //   contact: '张三',
      //   mobile: '13100000000',
      //   name: '收集点1（码头）',
      //   type: '智能',
      //   address: '余杭区',
      //   fomesType: '生活污水',
      //   distance: '970m',
      //   ammount: '500L',
      //   time: '09-12 20:00',
      //   life: '生活污水排放'
      // }],
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
    this.lists()
    setTitle(this.$route.meta.title)
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page.pageNum = 1
        this.itemList = []
        this.lists()
        this.isLoading = false
        this.finished = false
      }, 500)
    },
    onLoad() {
      // 异步更新数据
      this.page.pageNum++
      this.lists()
    },
    lists() {
      sewageReport(this.page.pageNum, this.page.pageSize, this.time, this.type).then(response => {
        this.page.total = response.data.page.total
        this.itemList = this.itemList.concat(response.data.dataList)
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
    goInfo(item) {
      this.$router.push({ name: 'lifeWaterRecordInfo', query: { info: item }})
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .content {
    .dateBtn {
      padding: 28px;
      display: table;
      span {
        display: table-cell;
        height: 54px;
        width: 180px;
        vertical-align: middle;
        background-color: #fff;
        font-size: 24px;
        text-align: center;
        line-height: 54px;
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
