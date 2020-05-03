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
        <span>最近记录</span>
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
              <span>浙湖州货35010</span>
              <span>2020-04-03 10:00:00</span>
            </p>
            <p>
              <span>船闸：</span>
              <span>湖州船闸</span>
            </p>
            <p>
              <span>状态：</span>
              <span>审批驳回</span>
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
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { lockApplyKnow } from '@/api/ehyLock'
import { reportList } from '@/api/lockReport'
export default {
  data() {
    return {
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
      showKnow: false,
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  components: {
  },
  created() {
    this.lists()
    setTitle(this.$route.meta.title)
  },
  methods: {
    goKnow() {
      lockApplyKnow('noog').then(res => {
        this.showKnow = true
        this.know = res.data.content
      })
    },
    lists() {
      reportList(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.keyword).then(response => {
        console.log(response)
        this.page.total = response.data.page.total
        this.cardList = this.cardList.concat(response.data.dataList)
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
      }, 500)
    },
    goHistory() {
      this.$router.push({ name: 'lockReportHistory' })
    },
    goLock(value) {
      this.$router.push({ path: '/lockAddReport', query: { direction: value } })
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
      this.$router.push({ name: 'lockReportOne' })
    },
    goInfo(item) {
      this.$router.push({ path: '/lockReportDetail', query: { infos: JSON.stringify(item) } })
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
  padding: 80px 30px 0;
  line-height: 50px;
}
</style>
