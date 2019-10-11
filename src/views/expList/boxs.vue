<template>
  <div class="list">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      class="list-refresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ul class="item-card">
          <li
            v-for="(item,index) in list"
            :key="index"
          >
            <p class="top">
              <i></i>
              <span>{{item.status ===1?'待付款':'已取件'}}</span>
            </p>
            <div class="content">
              <p>
                <label>订单号{{item.id || '--'}}</label>
                <!-- <span>寄存费：￥{{item.actualAmount}}</span> -->
              </p>
              <p class="total">合计：{{item.amount || '--'}}件</p>
              <p>存放地方：{{item.collectingName}}</p>
              <p>创建时间：{{item.addTimeString}}</p>
              <p v-if="item.status === 5">取件时间：{{item.payTime || '--'}}</p>
              <p>合计： ￥{{item.actualAmount? item.actualAmount: '0'}}</p>
            </div>
            <div class="bottom">
              <!-- <van-button round plain size="small" type="info" @click="pay(item)">查看</van-button> -->
              <van-button
                round
                plain
                size="small"
                type="info"
                @click="pay(item)"
              >{{item.status === 5?'查看':'前往付款'}}</van-button>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
/* eslint-disable prefer-const,object-curly-spacing */

import { Orderlist } from '@/api/exp.js'

export default {
  props: ['type'],
  data() {
    return {
      loading: false,
      finished: false,
      already: require('@/assets/img/already.png'),
      wait: require('@/assets/img/wait.png'),
      list: [],
      page: {
        pageSize: 10,
        pageNum: 0,
        total: 0
      },
      status: this.type,
      refreshing: false
    }
  },
  created() {
  },
  methods: {
    pay(item) {
      this.$router.push(
        {
          path: '/expPay',
          query: {
            id: item.id
          }
        }
      )
    },
    onLoad() {
      this.page.pageNum += 1
      this.getList()
    },
    getList() {
      Orderlist(this.page.pageNum, this.page.pageSize, 1, this.status).then(response => {
        response.data.dataList.forEach(element => {
          if (element.express && element.express.length > 0) {
            element.collectingName = element.express[0].collectingName
            element.company = element.express[0].company
          }
        })
        this.list = this.list.concat(response.data.dataList)
        this.page = response.data.page
        this.refreshing = false
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.page.pageNum * this.page.pageSize >= this.page.total) {
          this.finished = true
        }
      })
        .catch(error => {
          console.log(error)
          this.loading = false
          this.finished = true
        })
    },
    onRefresh() {
      this.page.pageNum = 0
      this.list = []
      this.finished = false
      window.scrollTo(0, 10)
    }
  }
}
</script>

<style scoped lang="scss">
.item-card {
  width: 100%;
  padding: 0 32px;
  box-sizing: border-box;
  li {
    width: 100%;
    margin: 24px auto;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 12px #ebedf0;

    p {
      padding: 16px 36px;
      color: #333333;
      font-size: 32px;
    }
    p:last-child {
      text-align: right;
    }
    .top {
      height: 60px;
      line-height: 60px;
      border-bottom: 1px solid #ddd;
      i {
        width: 150px;
        height: 60px;
        float: left;
        background: url(../../assets/img/ico1.png) no-repeat;
        background-size: contain;
      }
      span:nth-child(2) {
        float: left;
        color: #999999;
      }
      span:last-child {
        float: right;
        color: #108ee9;
      }
    }
    .total {
      color: #999999;
    }
    .content {
      padding: 32px 0;
      label {
        font-size: 32px;
        font-weight: bold;
      }
      span {
        float: right;
      }
    }
    .bottom {
      text-align: right;
      padding: 32px;
      padding-top: 0;
      button {
        margin-left: 24px;
        margin-right: initial;
      }
    }
  }
}
</style>
