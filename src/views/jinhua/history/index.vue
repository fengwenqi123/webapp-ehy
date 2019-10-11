<template>
  <div class="container">
    <!-- <header>
      <div @click="goBack()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <p>申报历史</p>
    </header> -->

    <div class="port-content">
      <van-pull-refresh v-model="refreshing"
                        @refresh="onRefresh"
                        class="list-refresh">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="onLoad">
          <ul class="item-card">
            <li v-for="(item,index) in items"
                :key="index">
              <div class="top">
                <span>编号：{{item.numberId}}</span>
                <span>{{item.reportTime}}</span>
              </div>
              <div class="content">
                <p>
                  <span>{{item.reportStart}}</span>
                  <i>→</i>
                  <span>{{item.reportEnd}}</span>
                </p>
                <p>
                  <label>总金额￥{{item.amount}}</label>
                  <van-button type="info"
                              size="small"
                              @click="deatils(item)">详情</van-button>
                </p>
              </div>
            </li>
          </ul>
        </van-list>
      </van-pull-refresh>
    </div>

    <van-dialog v-model="historyShow"
                title="申报详情"
                :show-confirm-button="false"
                :close-on-click-overlay="true">
      <van-tabs v-model="active"
                color="#1989fa"
                title-active-color="#1989fa">
        <van-tab title="报港信息">
          <ul class="port-info">
            <li>
              <span>船名</span>
              <span>{{historyData.shipname}}</span>
            </li>
            <li>
              <span>报港编号</span>
              <span>{{historyData.numberId}}</span>
            </li>
            <li>
              <span>起始港</span>
              <span>{{historyData.reportStart}}</span>
            </li>
            <li>
              <span>目的港</span>
              <span>{{historyData.reportEnd}}</span>
            </li>
            <li>
              <span>时间</span>
              <span>{{historyData.reportTime}}</span>
            </li>
            <li class="list-title">载货信息</li>
            <li>
              <span>实际吃水</span>
              <span>{{historyData.chishui}}米</span>
            </li>
            <li>
              <span>申报干舷</span>
              <span>{{historyData.sbgx}}米</span>
            </li>
            <li>
              <span>拖泥深度</span>
              <span>{{historyData.tnsd}}米</span>
            </li>
            <li>
              <span>净空高度</span>
              <span>{{historyData.jkgd}}米</span>
            </li>
            <li class="list-title"
                v-if="historyData.goodList && historyData.goodList.length !== 0">货种</li>
            <li v-if="historyData.goodList && historyData.goodList.length !== 0">
              <div v-for="(item,index) in historyData.goodList"
                   :key="index">
                <em>{{item.goodTypeId}}<i v-if="item.goodTypeMark">（{{item.goodTypeMark}}）</i></em>
                <em>{{item.zhdw}}吨</em>
              </div>
            </li>
          </ul>
        </van-tab>
        <van-tab title="过闸信息">
          <ul class="gate-info">
            <li v-for="(item,index) in guoZhaInfo.lockJFList"
                :key="index">
              <div>
                <span>船闸</span>
                <span>{{item.lockName}}</span>
              </div>
              <div>
                <span>缴费金额</span>
                <span>￥{{item.amount}}</span>
              </div>
              <div>
                <span>缴费状态</span>
                <span v-if="item.jfstatus === '1'"
                      style="color: #1989fa;">已缴费</span>
                <span v-if="item.jfstatus === '0'"
                      style="color: #888">未缴费</span>
              </div>
              <div>
                <span>过闸状态</span>
                <span v-if="item.guoStatus === 0"
                      style="color: #888">未到</span>
                <span v-if="item.guoStatus === 1"
                      style="color: #1989fa;">已排队</span>
                <span v-if="item.guoStatus === 2"
                      style="color: #1989fa;">预备过闸</span>
                <span v-if="item.guoStatus === 3"
                      style="color: #1989fa;">进闸</span>
                <span v-if="item.guoStatus === 4"
                      style="color: #1989fa;">已过闸</span>

              </div>
              <div v-if="!!item.throughDate">
                <span>过闸时间</span>
                <span style="color: #1989fa;">{{item.throughDate}}</span>
              </div>
            </li>
            <li>
              <span>总金额</span>
              <span>￥{{guoZhaInfo.amount}}</span>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
      <div class="login-click padding">
        <van-button type="info"
                    size="large"
                    @click="hide">确定</van-button>
      </div>
    </van-dialog>

  </div>
</template>
<script>
import { getBangGangHistoryByShipName, getGuoZhaInfoByBaoGangId } from '@/api/JHport'
import { setTitle } from '@/utils/cache'
import Vue from 'vue'

export default {
  name: 'point',
  data() {
    return {
      historyShow: false,
      active: 2,
      historyData: '',
      items: [],
      guoZhaInfo: {
        amount: 0,
        jfje: 0,
        lockJFList: []
      },
      shipName: localStorage.shipName || '',
      userID: '',
      sfwxp: 0, // 是否危险品
      refreshing: false,
      loading: false,
      finished: false,
      page: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  created() {
    setTitle('申报历史')
    Vue.prototype.jhType = 'jh'
  },
  methods: {
    deatils(value) {
      console.log(value)
      this.historyShow = true
      this.historyData = value
      this.guoZhaInfoByBaoGangId(value.id)
    },
    hide() {
      this.historyShow = false
    },
    guoZhaInfoByBaoGangId(id) {
      getGuoZhaInfoByBaoGangId(id).then(response => {
        this.guoZhaInfo = response.obj
        if (response.obj.lockJFList.length !== 0) {
          this.location = response.obj.lockJFList[0].location
        }
        if (response.obj.jfje === 0) {
          this.isPay = '请缴费'
        } else {
          this.isPay = '缴费成功'
        }
        if (response.obj.jfje === 0) {
          this.isPay = '请缴费'
        } else {
          this.isPay = '缴费成功'
        }
      }).catch(error => {
        console.log(error)
        // this.refreshing = false
        // this.loading = false // 加载状态结束
      })
    },
    bangGangHistoryByShipName() {
      getBangGangHistoryByShipName(this.userID, this.shipName, this.page.pageNum, this.page.pageSize, 0).then(response => {
        const rows = response.obj
        // 数据全部加载完成
        if (rows == null || rows.length === 0) {
          // 加载结束
          this.finished = true
          return
        }

        // 最后一页不足20条的情况
        if (rows.length < this.page.pageSize) {
          this.finished = true
        }

        // 处理数据
        // console.log(this.page.pageNum)
        if (this.page.pageNum === 1) {
          this.items = rows
        } else {
          this.items = this.items.concat(rows)
        }
        this.page.pageNum++
      }).catch(error => {
        console.log(error)
        // this.refreshing = false
        // this.loading = false // 加载状态结束
      }).finally(() => {
        this.refreshing = false
        this.loading = false // 加载状态结束
      })
    },
    onRefresh() {
      this.page.pageNum = 0
      this.finished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.bangGangHistoryByShipName()
    },
    onLoad() {
      this.bangGangHistoryByShipName()
    }
    // goBack() {
    //   this.$router.go(-1)
    // }
  }
}
</script>

<style scoped lang="scss">
.container {
  .port-content {
    background: #f2f2f2;
    .item-card {
      padding: 24px;
      li {
        background: #fff;
        border-radius: 6px;
        border-top: 8px solid #1989fa;
        padding: 24px;
        margin-top: 24px;
        box-shadow: 0 4px 10px #dddada;
        > div {
          width: 100%;
          min-height: 70px;
          line-height: 70px;
        }
        .top {
          border-bottom: 1px solid #ddd;

          span {
            float: left;
          }
          span:nth-child(2) {
            float: right;
          }
        }
        .content {
          label {
            color: #1989fa;
          }
          .van-button {
            float: right;
          }
        }
      }
    }
  }
  .port-info,
  .gate-info {
    height: 600px;
    overflow: auto;
    li {
      width: 100%;
      min-height: 70px;
      line-height: 70px;
      padding: 0 24px;
      box-sizing: border-box;
      > div {
        width: 100%;
        height: 70px;
        line-height: 70px;
      }
      span,
      em {
        float: left;
      }
      span:nth-child(2),
      em:nth-child(2) {
        float: right;
      }
    }
  }
  .gate-info {
    padding: 0;
    li {
      padding: 0 24px;
      box-sizing: border-box;
      background: #f2f2f2;
      > div {
        width: 100%;
        height: 70px;
        line-height: 70px;
      }
    }
    li:last-child {
      background: #fff;
      span {
        font-weight: bold;
      }
      span:last-child {
        color: #1989fa;
      }
    }
  }
}
.list-title {
  min-height: initial;
  height: 70px !important;
  line-height: 70px !important;
  background: #f2f2f2 !important;
  color: #1989fa;
  font-size: 32px;
}
</style>

<style lang="scss">
// .van-pull-refresh__head {
//   height: 0.8rem;
//   line-height: 0.8rem;
//   top: -0.8rem;
// }
</style>