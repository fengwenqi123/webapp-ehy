<template>
  <div>
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
          v-for="item in cardList"
          :key="item.id"
        >
          <div>
            <div
              class="card-header"
              @click="goInfo(item)"
            >
              <van-row>
                <van-col
                  span="5"
                  offset="1"
                ><img
                    src="../../assets/img/refuel.png"
                    alt=""
                  ></van-col>
                <van-col
                  span="13"
                  offset="1"
                ><span>{{item.addTimeString}}</span></van-col>
                <van-col span="3"><span>{{item.status===1?'待加油':item.status===2?'待支付':item.status===3?'已完成 ':item.status===4?'待退款':item.status===5?'已退款':item.status===6?'已关闭':'--'}}</span></van-col>
              </van-row>
            </div>
            <div class="card-content">
              <p>{{item.shipName}}</p>
              <p>
                <span>加油地点：</span>
                <span>{{item.refuelingPoint}}</span>
              </p>
              <p>
                <span>加油时间：</span>
                <span>{{item.refuelingTime||'--'}}</span>
              </p>
              <p>
                <span>加油量(L)：</span>
                <span>{{item.capacity||'--'}}</span>
              </p>
              <p class="rmb">
                <span>合计：{{item.price||'--'}}元</span>
                <div style="clear:both"></div>
              </p>
              <p>
                <van-button
                  plain
                  type="primary"
                  round
                  v-if="item.status===2"
                  @click="goPay(item)"
                >立即支付</van-button>
                <div style="clear:both"></div>
              </p>
            </div>
          </div>

        </div>
      </van-list>
    </van-pull-refresh>
    <div class="bottom">
      <van-button
        type="primary"
        round
        class="bottom-button"
        @click="go"
      >申请加油</van-button>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { refuelList } from '@/api/refuel'
import { getAliPay } from '@/utils/cache'
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
      cardList: [],
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  components: {
  },
  created() {
    setTitle(this.$route.meta.title)
    this.lists()
  },
  methods: {
    lists() {
      refuelList(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.keyword).then(response => {
        // console.log(response.data)
        this.page.total = response.data.page.total
        this.cardList = this.cardList.concat(response.data.dataList)
        // console.log(this.cardList)
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
      this.$router.push({ path: '/addRefuel' })
    },
    goInfo(item) {
      this.$router.push({ path: '/refuelInfo', query: { infos: JSON.stringify(item) }})
    },
    goPay(item) {
      console.log(item)
      getAliPay(item.orderId)
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 0 24px;
  margin-bottom: 100px;
  .card {
    background-color: #fff;
    margin: 20px 0;
    .card-header {
      height: 68px;
      border-bottom: 1px solid #eeeeee;
      .van-col {
        line-height: 68px;
        img {
          vertical-align: middle;
        }
        span {
          font-size: 26px;
        }
        &:nth-child(2) {
          span {
            color: #999999;
          }
        }
        &:nth-child(3) {
          span {
            color: #108ee9;
          }
        }
      }
    }
    .card-content {
      padding: 30px;
      p {
        color: #666666;
        font-size: 24px;
        line-height: 50px;
        &:nth-child(1) {
          font-size: 40px;
          line-height: 70px;
          color: #333333;
        }
        span:nth-child(1) {
          display: inline-block;
          width: 30%;
        }
        .van-button {
          float: right;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          color: #108ee9;
          span {
            display: inline;
          }
        }
        .van-button--primary {
          border: 2px solid #108ee9;
        }
      }
      .rmb {
        width: 100%;
        span {
          margin: 20px 0;
          float: right;
        }
      }
    }
  }
}
.bottom {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  .bottom-button {
    width: 80%;
    margin: 0;
    font-size: 38px;
    background-color: #108ee9;
  }
  .van-button--primary {
    border: 2px solid #108ee9;
  }
}
</style>
