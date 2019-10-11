<template>
  <div class="container">
    <!-- <header>
      <div @click="goBack()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <p>预缴费详情</p>
    </header> -->

    <div class="pay-content">
      <ul>
        <li>
          <span>船名</span>
          <span>{{guoZhaInfo.shipname}}</span>
        </li>
        <li>
          <span>报港编号</span>
          <span>{{guoZhaInfo.numberId}}</span>
        </li>
        <li>
          <span>报港地点</span>
          <span>洋港服务区</span>
        </li>
        <li>
          <span>始发港</span>
          <span>{{guoZhaInfo.reportStart}}</span>
        </li>
        <li>
          <span>目的港</span>
          <span>{{guoZhaInfo.reportEnd}}</span>
        </li>
        <li>
          <span>已缴费金额</span>
          <span>￥{{guoZhaInfo.jfje}}</span>
        </li>
        <li>
          <span>总金额</span>
          <span>￥{{guoZhaInfo.amount}}</span>
        </li>
        <li class="list-title">船闸</li>
        <li v-for="(item,index) in guoZhaInfo.lockJFList"
            :key="index">
          <div>
            <label>{{item.lockName}}</label>
          </div>
          <div>
            <span>缴费金额</span>
            <span>￥{{item.amount}}</span>
          </div>
          <div>
            <span>缴费状态</span>
            <span v-if="item.jfstatus === '0'"
                  style="color: #888">未缴费</span>
            <span v-if="item.jfstatus === '1'"
                  style="color: #1c81d3">已缴费</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 遮罩1 -->
    <div v-if="loadingSpinner">
      <cjb-loading></cjb-loading>
    </div>
  </div>
</template>
<script>
import { getGuoZhaInfoByBaoGangId } from '@/api/JHport'
import cjbLoading from '@/components/cjbLoading'
import { setTitle } from '@/utils/cache'

export default {
  name: 'point',
  data() {
    return {
      loadingSpinner: false,
      items: [],
      guoZhaInfo: {},
      shipName: localStorage.shipName
    }
  },
  created() {
    setTitle('预缴费详情')
    this.guoZhaInfoByBaoGangId()
  },
  components: {
    cjbLoading
  },
  methods: {
    // goBack() {
    //   this.$router.go(-1)
    // },
    guoZhaInfoByBaoGangId(value) {
      this.loadingSpinner = true
      getGuoZhaInfoByBaoGangId(localStorage.gateSowId).then(response => {
        this.loadingSpinner = false
        this.guoZhaInfo = response.obj
        this.guoZhaInfo.numberId = response.obj.reportId.substring(0, 5)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .pay-content {
    background: #f2f2f2;
    ul {
      li {
        min-height: 80px;
        line-height: 80px;
        padding: 0 36px;
        border-bottom: 1px solid #ddd;
        background: #fff;
        span {
          float: left;
        }
        span:nth-child(2) {
          float: right;
        }
        div {
          height: 80px;
          line-height: 80px;
          label {
            font-size: 34px;
            font-weight: bold;
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