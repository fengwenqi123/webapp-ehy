<template>
  <div class="container">
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
          <li v-for="item in dataList" :key="item.id">
            <div class="item" @click="orderDetails(item.id)">
              <div class="title">
                <div class="left">
                  <img src="../../../assets/img/shop/jifen-icon.png" alt=""/>
                  <div class="time">{{item.exchangeTime}}</div>
                </div>
                <div class="right">
                  {{item.status===1?'待兑换':item.status===2?'已完成':item.status===3?'已取消':''}}
                </div>
              </div>
              <div class="main">
                <div class="name">{{item.shopName}}</div>
                <div class="total">合计{{ item.count }}件</div>
                <div class="address">兑换地点：{{item.place}}</div>
                <div class="time">兑换时间：{{item.exchangeTime}}</div>
              </div>
              <div class="bottom">
                <div class="con">
                  <div class="total"> 合计：{{ item.integral }}</div>
                  <div class="watch">查看</div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { orderList } from '@/api/IntegralMall'

  export default {
    props: ['active'],
    data() {
      return {
        showPicker: false,
        page: {
          pageNum: 0,
          pageSize: 8,
          total: 0
        },
        starTime: null,
        endTime: null,
        order: null,
        keyword: null,
        loading: false,
        finished: false,
        dataList: [],
        refreshing: false
      }
    },
    methods: {
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
        orderList(this.page.pageNum, this.page.pageSize, this.active, this.starTime, this.endTime, this.order, this.keyword).then(response => {
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
      orderDetails(id) {
        this.$router.push({
          path: '/orderDetails',
          query: {
            id
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    ul {
      li {
        margin: 20px 24px 0;
        background: #fff;

        .item {
          .title {
            padding: 0 24px 0 15px;
            height: 70px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
              display: flex;
              align-items: center;

              img {
                width: 136px;
                height: 46px;
              }

              .time {
                margin-left: 24px;
                font-size: 24px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
            }

            .right {
              font-size: 24px;
              font-weight: 400;
              color: rgba(16, 142, 233, 1);
            }
          }

          .main {
            padding: 0 32px 0 48px;

            .name {
              margin-top: 42px;
              font-size: 34px;
              font-weight: 500;
              color: rgba(51, 51, 51, 1);
            }

            .total {
              margin-top: 10px;
              font-size: 26px;
              font-weight: 400;
              color: rgba(136, 136, 136, 1);
            }

            .address {
              margin-top: 10px;
              font-size: 26px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
            }

            .time {
              margin-top: 10px;
              font-size: 26px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
            }
          }

          .bottom {
            display: flex;
            margin-top: 36px;
            padding-bottom: 30px;
            flex-direction: row-reverse;

            .con {
              display: flex;
              align-items: center;
              margin-right: 32px;
              .total {
                font-size: 26px;
                font-weight: 400;
                color: rgba(102, 102, 102, 1);
              }

              .watch {
                margin-left: 40px;
                width: 120px;
                height: 50px;
                border: 2px solid rgba(16, 142, 233, 1);
                border-radius: 25px;
                text-align: center;
                line-height: 50px;
                color: #108EE9;
              }
            }
          }
        }
      }
    }
  }
</style>
