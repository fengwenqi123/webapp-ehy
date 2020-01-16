<template>
  <div class="container">
    <div class="top">
      <div class="time-select" @click="showPicker=true">
        <span>{{time}}</span>
        <img src="../../../assets/img/shop/bottom.png" alt=""/>
      </div>
      <div class="tip">
        <span>本月消费：{{ total }}</span>
      </div>
    </div>
    <div class="content">
      <van-pull-refresh
        v-model="refreshing"
        @refresh="onRefresh"
        class="list-refresh">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad">
          <ul>
            <li v-for="item in dataList">
              <div class="item">
                <div class="left">
                  <img
                    :src="src+item.image"
                    alt=""
                  />
                  <div class="info">
                    <div class="name">{{item.shopName}}</div>
                    <div class="address">兑换地点：{{item.place}}</div>
                    <div class="time">{{item.exchangeTime}}</div>
                  </div>
                </div>
                <div class="price">
                  -{{item.integral}}
                </div>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :max-date="maxDate"
        type="year-month"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
  import { timeChange } from '@/utils/index'
  import { orderList, IntegralTotal } from '@/api/IntegralMall'
  import { getCurrentMonthFirst, getCurrentMonthLast } from '@/utils/time.js'
  import { setTitle } from '@/utils/cache.js'
  export default {
    name: 'index',
    data() {
      return {
        showPicker: false,
        currentDate: new Date(),
        maxDate: new Date(),
        page: {
          pageNum: 0,
          pageSize: 8,
          total: 0
        },
        status: 2,
        starTime: new Date(),
        order: null,
        keyword: null,
        loading: false,
        finished: false,
        dataList: [],
        refreshing: false,
        src: 'https://api.cjbe88.com/storage/storage/',
        total: null
      }
    },
    watch: {
      starTime() {
        this.onRefresh()
        this.findIntegralTotal()
      }
    },
    created() {
      this.findIntegralTotal()
      setTitle(this.$route.meta.title)
    },
    computed: {
      time() {
        return timeChange(this.starTime)
      }
    },
    methods: {
      confirm() {
        this.showPicker = false
        this.starTime = this.currentDate
      },
      cancel() {
        this.showPicker = false
      },
      onLoad() {
        this.page.pageNum += 1
        this.lists()
      },
      onRefresh() {
        this.page.pageNum = 0
        this.dataList = []
        this.finished = false
        window.scrollTo(0, 10)
      },
      lists() {
        orderList(this.page.pageNum, this.page.pageSize, this.status, `${getCurrentMonthFirst(this.starTime)} 00:00:00`, `${getCurrentMonthLast(this.starTime)} 23:59:59`, this.order, this.keyword).then(response => {
          this.dataList = this.dataList.concat(response.data.dataList)
          this.page = response.data.page
          this.refreshing = false
          // 加载状态结束
          this.loading = false
          // 数据全部加载完成
          if (this.page.pageNum * this.page.pageSize >= this.page.total) {
            this.finished = true
          } else {
            this.finished = false
          }
        }).catch(() => {
          this.loading = false
          this.finished = true
        })
      },
      findIntegralTotal() {
        IntegralTotal(`${getCurrentMonthFirst(this.starTime)} 00:00:00`, `${getCurrentMonthLast(this.starTime)} 23:59:59`).then(response => {
          this.total = response.data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    .top {
      padding: 0 32px;
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .time-select {
        display: flex;
        align-items: center;
        width: 180px;
        height: 54px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(238, 238, 238, 1);
        border-radius: 27px;
        justify-content: center;

        span {
          font-size: 24px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }

        img {
          width: 17px;
          margin-left: 10px;
        }
      }

      .tip {
        font-size: 26px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }

    .content {
      position: absolute;
      height: calc(100% - 110px);
      width: 100%;
      background: #fff;
      overflow: auto;

      ul {
        padding: 0 32px;

        li {
          .item {
            padding: 28px 0;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            border-bottom: 1px solid #eeeeee;

            .left {
              display: flex;
              align-items: flex-start;

              img {
                width: 76px;
                height: 76px;
                border-radius: 50%;
              }

              .info {
                margin-left: 32px;

                .name {
                  font-size: 34px;
                  font-weight: 400;
                  color: rgba(51, 51, 51, 1);
                }

                .address {
                  margin-top: 10px;
                  font-size: 26px;
                  font-weight: 400;
                  color: rgba(51, 51, 51, 1);
                }

                .time {
                  margin-top: 10px;
                  font-size: 26px;
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
                }
              }
            }

            .price {
              font-size: 40px;
              font-weight: 500;
              color: rgba(241, 157, 82, 1);
            }
          }
        }
      }
    }
  }
</style>
