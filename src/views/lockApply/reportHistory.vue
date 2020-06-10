<template>
  <div>
    <div class="selectBtn">
      <span @click="selectShipName">{{shipName}}
        <van-icon name="arrow-down" /></span>
      <span @click="selectStatus">{{statusName}}
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
          <p>
            <span>{{item.zwcm}}</span>
            <span>{{item.modifyTimeString}}</span>
          </p>
          <p>
            <span>船闸：</span>
            <span>{{item.czmc}}</span>
          </p>
          <p>
            <span>状态：</span>
            <span>{{item.status===1?'待审批':item.status===2?'审批驳回':item.status===3?'安排过闸':item.status===4?'过闸完成':'--'}}</span>
          </p>
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
                  title="船舶名称"
                  @cancel="onCancelShipName"
                  @confirm="onChangeShipName" />
    </van-popup>
    <van-popup v-model="showDate"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker type="year-month"
                           @cancel="onCancelDate"
                           @confirm="onChangeDate" />
    </van-popup>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { dateToString } from '@/utils'
import { boatList } from '@/api/ehy'
import { reportList } from '@/api/ehyLockHS'
export default {
  data() {
    return {
      status: '',
      statusName: '状态',
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
      columnsStatus: ['待审批', '审批驳回', '安排过闸', '过闸完成'],
      columnsShipName: [],
      showDate: false,
      showShipName: false,
      list: [],
      loading: false,
      finished: false,
      isLoading: false
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
      this.date = '日期'
    },
    selectShipName() {
      this.showShipName = true
    },
    onCancelStatus() {
      this.showStatus = false
      this.status = ''
      this.statusName = '状态'
    },

    onChangeStatus(value, index) {
      console.log(value)
      this.statusName = value
      this.showStatus = false
      this.page.pageNum = 0
      this.cardList = []
      this.lists()
    },
    onChangeDate(value) {
      this.date = dateToString(value).substr(0, 7)
      this.showDate = false
      this.page.pageNum = 0
      this.cardList = []
      this.lists()
    },
    onCancelDate() {
      this.showDate = false
    },
    onChangeShipName(value) {
      this.shipName = value
      this.showShipName = false
      this.page.pageNum = 0
      this.cardList = []
      this.lists()
    },
    onCancelShipName() {
      this.showShipName = false
    },
    lists() {
      if (this.statusName === '状态') {
        this.status = ''
      } else if (this.statusName === '待审批') {
        this.status = 1
      } else if (this.statusName === '审批驳回') {
        this.status = 2
      } else if (this.statusName === '安排过闸') {
        this.status = 3
      } else if (this.statusName === '过闸完成') {
        this.status = 4
      }
      console.log(this.status)
      reportList(this.page.pageNum, this.page.pageSize, this.shipName, this.status, this.date === '日期' ? '' : this.date).then(res => {
        console.log(res)
        this.page.total = res.data.page.total
        this.cardList = this.cardList.concat(res.data.dataList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.cardList.length >= this.page.total) {
          this.finished = true
        }
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
      }, 0)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page.pageNum++
        this.lists()
      }, 500)
    },
    go() {
      this.$router.push({ name: 'lockAddReport' })
    },
    goInfo(item) {
      this.$router.push({ path: '/lockReportInfo', query: { infos: JSON.stringify(item) }})
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  .card {
    padding: 20px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    p {
      line-height: 50px;
      padding: 0 10px;
      span {
        font-size: 28px;
      }
    }
    p:first-child {
      display: flex;
      justify-content: space-between;
      span:nth-child(1) {
        font-size: 32px;
        color: #333;
      }
      span:nth-child(2) {
        font-size: 28px;
        color: #888;
      }
    }
    p:nth-child(2) {
      span {
        color: #888;
      }
    }
    p:nth-child(3) {
      span {
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
