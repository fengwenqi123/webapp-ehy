<template>
  <div>
    <div class="top-box">
      <van-cell title="过闸管理须知"
                is-link
                @click="goKnow"
                class="top-box-title" />
      <div class="top">
        <div @click="goLock('进')">
          <img src="../../assets/img/ehy/ehyin.png" />
          <p>过闸申请（进港）</p>
        </div>
        <div @click="goLock('出')">
          <img src="../../assets/img/ehy/ehyout.png" />
          <p>过闸申请（出港）</p>
        </div>
      </div>
      <p class="title">
        <span @click="showShip">{{shipName}}
          <van-icon name="arrow-down" /></span>
        <span @click="goHistory">更多</span>
      </p>
    </div>
    <div class="content">
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
    </div>
    <van-popup v-model="showKnow"
               position="left"
               closeable
               style="width:100%;height:100%">
      <div v-html="know"
           class="know"></div>
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
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { lockApplyKnow } from '@/api/ehyLock'
import { reportList } from '@/api/ehyLockHS'
import { boatList } from '@/api/ehy'
export default {
  data() {
    return {
      shipName: '选择船舶',
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      order: '',
      sort: '',
      keyword: '',
      cardList: [
      ],
      list: [],
      know: '',
      columnsShipName: [],
      showShipName: false,
      showKnow: false,
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  components: {
  },
  created() {
    this.getBoat()
    setTitle(this.$route.meta.title)
  },
  methods: {
    goKnow() {
      lockApplyKnow('noog').then(res => {
        this.showKnow = true
        this.know = res.data.content
      })
    },
    showShip() {
      this.showShipName = true
    },
    getBoat() {
      boatList(2).then(res => {
        console.log(res)
        this.columnsShipName = res.data.map(item => item.shipName)
        this.shipName = this.columnsShipName[0]
        this.lists()
      })
    },
    lists() {
      reportList(this.page.pageNum, this.page.pageSize, this.shipName).then(response => {
        console.log(response)
        this.page.total = response.data.page.total
        this.cardList = this.cardList.concat(response.data.dataList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.cardList.length >= this.page.total) {
          this.finished = true
        }
        console.log(this.cardList)
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
    goHistory() {
      this.$router.push({ name: 'lockReportHistory' })
    },
    goLock(value) {
      this.$router.push({ path: '/lockAddReport', query: { direction: value }})
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page.pageNum++
        this.lists()
      }, 100)
    },
    goInfo(item) {
      this.$router.push({ path: '/lockReportInfo', query: { infos: JSON.stringify(item) }})
    },
    onChangeShipName(value) {
      this.shipName = value
      this.showShipName = false
      this.page.pageNum = 1
      this.cardList = []
      this.lists()
    },
    onCancelShipName() {
      this.showShipName = false
    }
  }
}
</script>

<style lang="scss" scoped>
.top-box {
  height: 300px;
  position: fixed;
  background-color: #f2f3f4;
  top: 0;
  width: 100%;
  z-index: 99;
  .top-box-title {
    height: 85px;
  }
  .top {
    z-index: 999;
    height: 250px;
    padding: 20px;
    display: flex;
    box-sizing: border-box;
    background-color: #f2f3f4;
    justify-content: space-between;
    div {
      width: 50%;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 30px;
      cursor: pointer;
      img {
        width: 100px;
        height: 100px;
      }
      p {
        margin: 30px 20px 0 20px;
      }
    }
  }
  .title {
    height: 80px;
    line-height: 80px;
    z-index: 999;
    /* margin: 0 20px; */
    padding: 0 20px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    color: #1890ff;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
}

.content {
  z-index: 9;
  /* margin: 0 20px; */
  margin-top: 415px;
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
.know {
  padding: 80px 30px 40px;
  line-height: 50px;
}
</style>
