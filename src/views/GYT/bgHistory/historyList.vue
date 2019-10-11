<template>
  <div class="list">
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
          <li v-for="(item,index) in list" :key="index">
            <div class="item">
              <div class="item1">
                <div class="name">{{item.shipName}}</div>
                <div class="code">报港编号:{{item.code}}</div>
              </div>
              <div class="item2">
                <div class="div">
                  <p>起运港</p>
                  <p>{{item.startPortName}}</p>
                </div>
                <div class="div">
                  <p>装卸货</p>
                  <p>{{item.operationType===1?'装':'卸'}}</p>
                </div>
                <div class="div">
                  <p>目的港</p>
                  <p>{{item.targetPortName}}</p>
                </div>
                <div class="div">
                  <p>作业码头</p>
                  <p>{{item.pierName}}</p>
                </div>
                <div class="div">
                  <p>货种</p>
                  <p>{{item.goodsName}}</p>
                </div>
                <div class="div">
                  <p>载重吨(t)</p>
                  <p>{{item.weight}}</p>
                </div>
              </div>
              <div class="item3">
                <p>报港时间：<span>{{item.reportTimeString}}</span></p>
                <div class="button" v-if="confirmStatus==1">
                  <input @click="cancel(item.id)" type="button" value="取消报港">
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
  import { list, cancelbg } from '@/api/bgHistory'
  import { mapGetters } from 'vuex'
  import { Toast } from 'vant'

  export default {
    name: 'historyList',
    props: ['confirmStatus', 'status'],
    computed: {
      ...mapGetters([
        'shipName'
      ])
    },
    data() {
      return {
        loading: false,
        finished: false,
        refreshing: false,
        list: [],
        page: {
          pageSize: 10,
          pageNum: 0,
          total: 0
        }
      }
    },
    methods: {
      onLoad() {
        this.page.pageNum += 1
        this.getList()
      },
      getList() {
        list({
          pageNum: this.page.pageNum,
          pageSize: this.page.pageSize,
          shipName: this.shipName,
          confirmStatus: this.confirmStatus,
          status: this.status
        }).then(response => {
          this.list = this.list.concat(response.data.dataList)
          this.page = response.data.page
          if (this.page.pageNum === 0) {
            this.page.pageNum = 1
          }
          this.refreshing = false
          // 加载状态结束
          this.loading = false
          // 数据全部加载完成
          if (this.page.pageNum * this.page.pageSize >= this.page.total) {
            this.finished = true
          }
        }).catch(error => {
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
      },
      cancel(id) {
        cancelbg(id).then(response => {
          Toast.success({
            message: response.msg,
            duration: 2000
          })
          this.page.pageNum = 0
          this.list = []
          this.onLoad()
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    ul {
      padding: 0 40px;

      li {
        margin-top: 40px;
        padding-bottom: 40px;
        background: #fff;

        .item {
          .item1 {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100px;
            border-bottom: 1px solid #ccc;
            padding: 0 40px;
          }

          .item2 {
            margin-top: 20px;
            padding-bottom: 30px;
            border-bottom: 1px solid #ccc;
            display: flex;
            flex-wrap: wrap;

            .div {
              width: 33%;
              height: 100px;

              p {
                text-align: center;
                margin-top: 10px;
                color: #696969;
                font-size: 28px;
              }

              p:nth-child(2) {
                font-size: 26px;
                color: #000;
              }
            }
          }

          .item3 {
            padding: 30px 30px 0 40px;

            p {
              margin-bottom: 30px;
            }

            .button {

              input {
                width: 100%;
                height: 80px;
                line-height: 80px;
                color: #fff;
                background: rgb(57, 141, 238);
                outline: none;
                border: none;
              }
            }
          }
        }
      }
    }
  }
</style>
