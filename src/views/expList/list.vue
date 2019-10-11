<template>
  <div class="list">
    <van-pull-refresh v-model="refreshing"
                      @refresh="onRefresh"
                      class="list-refresh">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <ul>
          <li v-for="(item,index) in list"
              :key="index">
            <div class="item">
              <div class="left">
                <img :src="item.status===2?already:wait"
                     alt="">
              </div>
              <div class="active">
                <p class="p1">{{item.company}}</p>
                <p class="p2">快递单号：{{item.courierNumber}}</p>
              </div>
              <div class="xq"
                   @click="details(item)">
                查看详情
                <i class="el-icon-third-xiangyou"></i>
              </div>
            </div>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
/* eslint-disable prefer-const,object-curly-spacing */

import { expList } from '@/api/exp.js'
import { getToken } from '@/utils/cache'

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
      Token: getToken(),
      status: this.type,
      refreshing: false
    }
  },
  created() {
  },
  methods: {
    details(item) {
      this.$store.commit('setExpInfo', item)
      this.$router.push(
        {
          path: '/expDetail'
        }
      )
    },
    onLoad() {
      this.page.pageNum += 1
      this.getList()
    },
    getList() {
      expList(this.page.pageNum, this.page.pageSize, this.Token).then(response => {
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
.list {
  height: 100%;
  // margin-top: 20px;
  .list-refresh {
    height: 100%;
  }
  ul {
    background: #fff;

    li {
      padding: 24px 36px;
      border-bottom: 1px solid #eeeeee;

      .item {
        height: 110px;
        display: flex;
        align-items: center;

        .left {
          width: 70px;
          height: 70px;

          img {
            width: 100%;
          }
        }

        .active {
          flex-grow: 1;
          margin-left: 30px;
          .p1 {
            display: inline-block;
            text-align: center;
            border-radius: 5px;
            border: 2px solid #389e0d;
            color: #389e0d;
            padding: 6px 20px;
            margin: 0;
            margin-top: 20px;
          }

          .actives {
            border: 2px solid red;
            color: red;
          }

          .p2 {
            font-size: 26px;
            font-weight: 400;
            color: #999999;
            margin-top: 10px;
          }
        }

        .xq {
          font-size: 27px;
          font-weight: 400;
          color: #999999;

          i {
            font-size: 27px;
          }
        }
      }
    }
  }
}
</style>
