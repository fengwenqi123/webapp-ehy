<template>
  <div>
    <div class="selectBtn">
      <span @click="selectShipName">{{shipName}}
        <van-icon name="arrow-down" /></span>
      <span @click="selectStatus">{{status}}
        <van-icon name="arrow-down" /></span>
      <span @click="selectDate">{{date}}
        <van-icon name="arrow-down" /></span>
    </div>
    <van-pull-refresh v-model="isLoading"
                      @refresh="onRefresh">
      <van-list class="main"
                v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="card"
             v-for="item in cardList"
             :key="item.id"
             @click="goInfo(item)">
          <div class="card-header">
            <p>{{item.shipName}}</p>
          </div>
          <div class="card-content">
            <van-row>
              <van-col :span="8">
                <span>{{item.portName}}</span>
              </van-col>
              <van-col :span="8">
                <img src="../../assets/img/ehy/ehyshiplock.png" />
              </van-col>
              <van-col :span="8">
                <span>{{item.nextPortName}}</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col :span="8">
                <span>当前港口</span>
              </van-col>
              <van-col :span="8">
              </van-col>
              <van-col :span="8">
                <span>下一港口</span>
              </van-col>
            </van-row>
            <p>
              <span>{{item.captain}}</span>
              <span>{{item.checkTime}}</span>
              <span>{{item.description}}</span>
            </p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 弹出层 -->
    <van-popup v-model="showStatus"
               position="bottom"
               :style="{ height: '35%' }">
      <van-picker :columns="columnsStatus"
                  v-if="showStatus"
                  show-toolbar
                  title="状态"
                  @cancel="onCancelStatus"
                  @confirm="onChangeStatus" />
    </van-popup>
    <van-popup v-model="showShipName"
               position="bottom"
               :style="{ height: '35%' }">
      <van-picker :columns="columnsShipName"
                  v-if="showShipName"
                  show-toolbar
                  title="状态"
                  @cancel="onCancelShipName"
                  @confirm="onChangeShipName" />
    </van-popup>
    <van-popup v-model="showDate"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker type="date"
                           @cancel="onCancelDate"
                           @confirm="onChangeDate" />
    </van-popup>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { dateToString } from '@/utils'
import { boatList } from '@/api/ehy'
import { reportList } from '@/api/ehyLock'
export default {
  data() {
    return {
      status: '状态',
      date: '日期',
      shipName: '选择船舶',
      page: {
        pageSize: 5,
        pageNum: 0,
        total: 0
      },
      order: '',
      sort: '',
      keyword: '',
      cardList: [
      ],
      showStatus: false,
      columnsStatus: ['待审批', '正在安排过闸批次', '审批驳回'],
      columnsShipName: [],
      showDate: false,
      showShipName: false,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      startTime: '',
      endTime: ''
    }
  },
  components: {
  },
  created() {
    boatList(2).then(res => {
      console.log(res)
      this.columnsShipName = res.data.map(item => item.shipName)
      this.shipName = this.columnsShipName[0]
    })

    setTitle(this.$route.meta.title)
  },
  methods: {
    selectStatus() {
      this.showStatus = true
    },
    selectDate() {
      this.showDate = true
    },
    selectShipName() {
      this.showShipName = true
    },
    onCancelStatus() {
      this.showStatus = false
    },

    onChangeStatus(value, index) {
      console.log(value)
      this.status = value
      this.showStatus = false
      this.lists()
    },
    onChangeDate(value) {
      console.log(value)
      this.date = dateToString(value).split(' ')[0]
      this.startTime = this.date + ' ' + '00:00:00'
      this.endTime = this.date + ' ' + '23:59:59'
      this.showDate = false
      this.lists()
    },
    onCancelDate() {
      this.showDate = false
    },
    onChangeShipName(value) {
      this.shipName = value
      this.showShipName = false
      this.lists()
    },
    onCancelShipName() {
      this.showShipName = false
    },
    lists() {
      // reportList(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.keyword).then(response => {
      //   console.log(response)
      //   this.page.total = response.data.page.total
      //   this.cardList = this.cardList.concat(response.data.dataList)
      //   console.log(this.cardList)
      // })
      reportList(this.page.pageNum, this.page.pageSize, this.status === '状态' ? -1 : this.status, this.shipName, this.startTime, this.endTime).then(res => {
        console.log(res)
      })
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page.pageNum = 1
        this.cardList = []
        this.lists()
        this.isLoading = false
        this.finished = false
      }, 500)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page.pageNum++
        this.lists()
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.cardList.length >= this.page.total) {
          this.finished = true
        }
      }, 500)
    },
    go() {
      this.$router.push({ name: 'lockAddReport' })
    },
    goInfo(item) {
      this.$router.push({ path: '/lockReportDetail', query: { infos: JSON.stringify(item) }})
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .card {
    background-color: #fff;
    border-top: 1px solid #eee;
    .card-header {
      p {
        font-size: 28px;
        color: #333;
        line-height: 100px;
        padding-left: 40px;
      }
    }
    .card-content {
      > p {
        line-height: 150px;
        color: #999;
        text-align: right;
        padding-right: 20px;
        span {
          padding: 0 10px;
        }
      }
      .van-row:nth-child(1) {
        .van-col {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100px;
          span {
            font-size: 34px;
            color: #333;
          }
          img {
            width: 100%;
          }
        }
      }
      .van-row:nth-child(2) {
        .van-col {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 50px;
          span {
            font-size: 28px;
            color: #ccc;
          }
        }
      }
    }
  }
}
.selectBtn {
  span {
    background-color: #fff;
    display: inline-block;
    margin: 10px;
    height: 50px;
    line-height: 50px;
    padding: 0 30px;
    text-align: center;
    font-size: 16px;
    border-radius: 30px;
    .van-icon {
      line-height: 50px;
    }
  }
}
</style>
