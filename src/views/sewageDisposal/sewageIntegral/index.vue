<template>
  <div class="container">
    <div class="header">
      <div class="left" @click="selectDateFn">
        {{ selectDate }}
        <img src="../../../assets/img/sewage/down.png" alt="" />
      </div>
      <div class="right">
        <p>累积加分{{ 16 }}</p>
        <p>累积扣分{{ 16 }}</p>
      </div>
    </div>
    <div class="list">
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
      <ul>
        <li>
          <div class="item" v-for="item in itemList" :key="item.id">
            <div class="left">
              <img src="../../../assets/img/sewage/integral.png" alt="" />
              <div class="content">
                <div class="val1">
                  吕山服务区
                </div>
                <div class="val2">
                  生活污水回收
                </div>
                <div class="val3">
                  09-12 22:00
                </div>
              </div>
            </div>
            <div class="right">
              <p>+1</p>
            </div>
          </div>
        </li> 
      </ul> 
    </van-list>
    </van-pull-refresh>
    </div>
    <van-popup v-model="show" round position="bottom">
      <DatetimePicker @sendDate="sendDate" @cancel="cancel" />
    </van-popup>
  </div>
</template>

<script>
import DatetimePicker from './DatetimePicker'
import { parseTime } from '@/utils/index'
import { setTitle } from '@/utils/cache.js'
import { sewageReport } from '@/api/sewageDisposal'
export default {
  components: {
    DatetimePicker
  },
  mounted() {
    setTitle(this.$route.meta.title)
  },
  data() {
    return {
      selectDate: parseTime(new Date(), '{y}-{m}'),
      show: false,
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      itemList: [],
      isLoading: false,
      finished: false,
      loading: false
    }
  },
  methods: {
    selectDateFn() {
      this.show = true
    },
    sendDate(value) {
      this.selectDate = parseTime(value, '{y}-{m}')
      this.show = false
    },
    cancel() {
      this.show = false
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page.pageNum = 1
        this.itemList = []
        this.lists()
        this.isLoading = false
        this.finished = false
      }, 500)
    },
    onLoad() {
      // 异步更新数据
      this.page.pageNum++
      this.lists()
    },
    lists() {
      sewageReport(this.page.pageNum, this.page.pageSize, this.time, this.type).then(response => {
        this.page.total = response.data.page.total
        this.itemList = this.itemList.concat(response.data.dataList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.page.pageNum * this.page.pageSize >= this.page.total) {
          this.finished = true
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .header {
    padding: 22px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 180px;
      height: 54px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(238, 238, 238, 1);
      border-radius: 27px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      img {
        width: 18px;
        margin-left: 10px;
      }
    }
    .right {
      p {
        font-size: 26px;
        font-weight: 500;
        color: rgba(153, 153, 153, 1);
      }
      p:nth-child(2) {
        margin-top: 14px;
      }
    }
  }
  .list {
    ul {
      padding: 0 32px;
      background: #fff;
      li {
        .item {
          padding: 34px 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eeeeee;
          .left {
            display: flex;
            align-items: center;
            img {
              width: 76px;
              height: 76px;
            }
            .content {
              margin-left: 36px;
              .val1 {
                font-size: 34px;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
              }
              .val2 {
                font-size: 26px;
                font-weight: 500;
                color: rgba(51, 51, 51, 1);
                margin-top: 14px;
              }
              .val3 {
                font-size: 26px;
                font-weight: 500;
                color: rgba(153, 153, 153, 1);
                margin-top: 14px;
              }
            }
          }
          .right {
            p {
              font-size: 40px;
              font-weight: 400;
              color: rgba(241, 157, 82, 1);
            }
          }
        }
      }
    }
  }
}
</style>
