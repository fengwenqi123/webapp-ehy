<template>
  <div class="container">
    <header>
      <div @click="goBack()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <p>排污记录</p>
    </header>

    <van-pull-refresh v-model="refreshing"
                      @refresh="onRefresh"
                      class="list-refresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <ul class="ul">
          <li v-for="(item,index) in items"
              :key="index">
            <p>
              <span>{{item.status === 1?'待排污':item.status === 2?'排污中':item.status === 3?'排污结束':'排污取消' || '--'}}（{{item.amount || '--'}} L）</span>
              <span>
                <van-button type="info"
                            size="small"
                            v-if="item.status === 2"
                            @click="putClose(item)">结束</van-button>
              </span>
            </p>
            <p>
              <span>{{item.siteName}}</span>
              <span>{{item.outletName}}（{{item.outletId}}）</span>
            </p>
            <p>
              <span>排放时间</span>
              <span>
                <i>{{item.startTime}}</i>
                <i>{{ (item.duration / 60).toFixed(2) + ' 分钟'}}</i>
              </span>
            </p>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { sewageInfo, closeSewage } from '@/api/sewage'

export default {
  name: 'point',
  data() {
    return {
      items: [],
      refreshing: false,
      loading: false,
      finished: false,
      page: {
        pageNum: 0,
        pageSize: 20,
        total: 0
      }
    }
  },
  created() {
  },
  methods: {
    getSewageInfo() {
      sewageInfo(this.page.pageNum, this.page.pageSize).then(response => {
        const rows = response.data.dataList
        this.page = response.data.page

        // 数据全部加载完成
        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true
          return
        }

        if (rows.length < this.page.pageSize) {
          // 最后一页不足20条的情况
          this.finished = true
        }

        // 处理数据
        if (this.page.pageNum === 1) {
          this.items = rows
        } else {
          this.items = this.items.concat(rows)
        }
      }).catch(error => {
        console.log(error)
        this.refreshing = false
        this.loading = false // 加载状态结束
      }).finally(() => {
        this.refreshing = false
        this.loading = false // 加载状态结束
      })
    },
    onRefresh() {
      this.page.pageNum = 1
      this.finished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getSewageInfo()
    },
    onLoad() {
      this.page.pageNum++
      this.getSewageInfo()
    },
    goBack() {
      this.$router.go(-1)
    },
    putClose(value) {
      closeSewage(value.outletId, value.id).then(response => {
        this.onRefresh()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  header {
    width: 100%;
    height: 1.35rem;
    line-height: 1.35rem;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    box-shadow: 0 3px 5px #efefef;
    z-index: 9;

    div:first-child {
      position: absolute;
      left: 0.3rem;
      top: 0;
      font-size: 0.48rem;
      z-index: 999;
      .van-icon {
        top: 0.08rem;
      }
    }
    div:last-child {
      position: absolute;
      right: 0.3rem;
      top: 0;
      font-size: 0.4rem;
      z-index: 999;
    }
    p {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      text-align: center;
      height: 1.35rem;
      line-height: 1.35rem;
      font-size: 0.5rem;
      font-weight: bold;
      z-index: 99;
    }
  }
  .ul {
    background: #fff;
    padding-left: 0.6rem;
    margin-top: 1.35rem;
    // margin-bottom: 1rem;
    li {
      width: 100%;
      height: 2rem;
      padding: 0.4rem 0;
      border-bottom: 1px solid #eeeeee;
      position: relative;
      p {
        float: left;
        width: 100%;
        line-height: 0.7rem;
        color: #333;
        > span:nth-child(1) {
          float: left;
          font-size: 0.4rem;
        }
        > span:nth-child(2) {
          float: right;
          padding-right: 0.4rem;
          font-size: 0.4rem;
        }
      }
      p:nth-child(1) {
        span:nth-child(1) {
          font-size: 0.48rem;
        }
      }
      p:nth-child(3) {
        span:nth-child(1) {
          color: #666;
        }
        span:nth-child(2) {
          i:nth-child(1) {
            padding-right: 0.2rem;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
// .van-pull-refresh__head {
//   height: 0.8rem;
//   line-height: 0.8rem;
//   top: -0.8rem;
// }
</style>