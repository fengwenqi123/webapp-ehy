<template>
  <div>
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
    <div class="bottom">
      <van-button type="primary"
                  class="bottom-button"
                  @click="go">立即申报</van-button>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
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
.main {
  margin-bottom: 100px;
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
.bottom {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 20px 0;
  background-color: #fff;
  text-align: center;
  .bottom-button {
    width: 94%;
    margin: 0;
    font-size: 38px;
    background-color: #108ee9;
  }
  .van-button--primary {
    border: 2px solid #108ee9;
  }
}
</style>
