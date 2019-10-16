<template>
  <div class="container">
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
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="value"
              :options="option"
              @change="cityChange"
            />
          </van-dropdown-menu>
          <!-- <p>{{address}}</p> -->
          <ul>
            <li
              v-for="(item,index) in items"
              :key="index"
              :class="{danger:item.status !== 1}"
            >
              <div class="box">
                <div>
                  <span>{{item.name}}</span>
                  <span>{{item.modifyTimeString}}</span>
                </div>
                <div>
                  <i>当前水位</i>
                  <i>警戒水位</i>
                  <i>保障水位</i>
                </div>
                <div>
                  <label :class="{red:item.status !== 1}">{{item.depth || '--'}}</label>
                  <label>{{item.depthMin || '--'}}</label>
                  <label>{{item.depthMax || '--'}}</label>
                </div>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
/* eslint-disable object-curly-spacing,prefer-const,no-undef */
import { setTitle, getCity } from '@/utils/cache.js'
import { waterList } from '@/api/ehy.js'
export default {
  data() {
    return {
      province: '浙江省',
      city: getCity() || '杭州市',
      value: '杭州市',
      option: [
        { text: '杭州市', value: '杭州市' },
        { text: '宁波市', value: '宁波市' },
        { text: '温州市', value: '温州市' },
        { text: '绍兴市', value: '绍兴市' },
        { text: '湖州市', value: '湖州市' },
        { text: '嘉兴市', value: '嘉兴市' },
        { text: '金华市', value: '金华市' },
        { text: '衢州市', value: '衢州市' },
        { text: '台州市', value: '台州市' },
        { text: '丽水市', value: '丽水市' },
        { text: '舟山市', value: '舟山市' }
      ],
      loading: false,
      finished: false,
      refreshing: false,
      items: [],
      page: {
        pageSize: 20,
        pageNum: 0,
        total: 0
      }
    }
  },
  created() {
    setTitle(this.$route.meta.title)
  },
  methods: {
    cityChange(city) {
      this.city = city
      this.onRefresh()
    },
    getList() {
      waterList(this.page.pageNum, this.page.pageSize, this.province, this.city).then(response => {
        this.items = this.items.concat(response.data.dataList)
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
    onLoad() {
      this.page.pageNum++
      this.getList()
    },
    onRefresh() {
      this.page.pageNum = 0
      this.items = []
      this.finished = false
      window.scrollTo(0, 10)
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  p {
    height: 96px;
    line-height: 96px;
    color: #858585;
    padding-left: 32px;
    font-size: 30px;
  }
  .list {
    ul {
      background: #fff;
      li {
        height: 163px;
        padding-left: 32px;

        .box {
          height: 100%;
          width: 100%;
          border-bottom: 1px solid #d8d8d8;
          div {
            padding-right: 32px;
          }
          div:first-child {
            height: 68px;
            line-height: 68px;
            span:first-child {
              float: left;
              color: #333333;
              font-size: 30px;
            }
            span {
              float: right;
              font-size: 26px;
              color: #666666;
            }
          }
          div:nth-child(2),
          div:nth-child(3) {
            float: left;
            width: 100%;
            i,
            label {
              height: 25px;
              line-height: 25px;
              width: 33.33333%;
              float: left;
              color: #555555;
              font-size: 26px;
            }
            label {
              height: 57px;
              line-height: 57px;
              color: #108ee9;
              font-size: 30px;
            }
          }
        }
      }
      .danger {
        background: #fff0f0;
        .red {
          color: red !important;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
