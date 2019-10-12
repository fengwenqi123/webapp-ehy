<template>
  <div>
   <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      class="main"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
     >
    <div class="card" v-for="item in cardList" :key="item.id">
        <div class="card-header">
          <van-row>
            <van-col span="5" offset="1"><img src="../../assets/img/insurance.png" alt=""></van-col>
            <van-col span="6" offset="1"><span>{{item.addTimeString.substring(0,10)}}</span></van-col>
            <van-col span="3" offset="7"><span>{{item.status===1?'待处理':item.status===2?'待上传':item.status===3?'生效中':item.status===4?'已失效':item.status===5?'已关闭':'--'}}</span></van-col>
          </van-row>
        </div>
        <div class="card-content">
           <p>{{item.shipName}}</p>
           <p>
             <span>保险人：</span>
             <span>{{item.contacts}}</span>
           </p>
           <p v-if="item.status ===2||item.status ===3||item.status ===4">
             <span>保险类型：</span>
             <span>{{item.type||'--'}}</span>
           </p>
           <p v-if="item.status ===2||item.status ===3||item.status ===4">
             <span>保单金额：</span>
             <span>{{item.actualAmount||'--'}}</span>
           </p>
           <p v-if="item.status ===2||item.status ===3||item.status ===4">
             <span>预约时间：</span>
             <span>{{item.appointmentTime||'--'}}</span>
           </p>
           <p v-if="item.status ===2||item.status ===3||item.status ===4">
             <span>有效时间：</span>
             <span>{{item.startTime||'--'}} 至 {{item.endTime||'--'}}</span>
           </p>
           <p v-if="item.status ===2||item.status ===3||item.status ===4">
             <van-button plain type="primary" round @click="goInfo(item)">查看保单</van-button>
             <div style="clear:both"></div>
           </p>
        </div>
    </div>
    </van-list>
   </van-pull-refresh>
   <div class="bottom">
    <van-button  type="primary" round class="bottom-button" @click="go">预约保险</van-button>
   </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { insuranceList } from '@/api/insurance'
export default {
  data() {
    return {
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      order: '',
      sort: '',
      keyword: '',
      cardList: [],
      list: [],
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  components: {
  },
  created() {
    this.lists()
    setTitle(this.$route.meta.title)
  },
  methods: {
    lists() {
      insuranceList(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.keyword).then(response => {
        // console.log(response)
        this.page.total = response.data.page.total
        this.cardList = this.cardList.concat(response.data.dataList)
        // console.log(this.cardList)
      })
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page.pageNum = 1
        this.cardList = []
        this.lists()
        this.isLoading = false
        this.finished = false
      }, 500)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page.pageNum++
        this.lists()
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.cardList.length >= this.page.total) {
          this.finished = true
        }
      }, 500)
    },
    go() {
      this.$router.push({ name: 'addInsurance' })
    },
    goInfo(item) {
      this.$router.push({ path: '/insuranceInfo', query: { infos: JSON.stringify(item) }})
    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 0 24px;
  margin-bottom: 100px;
  .card {
    background-color: #fff;
    margin: 20px 0;
    .card-header {
      height: 68px;
      border-bottom: 1px solid #eeeeee;
      .van-col {
        line-height: 68px;
        img {
          vertical-align: middle;
        }
        span {
          font-size: 26px;
        }
        &:nth-child(2) {
          span {
            color: #999999;
          }
        }
        &:nth-child(3) {
          span {
            color: #108ee9;
          }
        }
      }
    }
    .card-content {
      padding: 30px;
      p {
        color: #666666;
        font-size: 24px;
        line-height: 50px;
        &:nth-child(1) {
          font-size: 40px;
          line-height: 70px;
          color: #333333;
        }
        span:nth-child(1) {
          display: inline-block;
          width: 30%;
        }
        .van-button {
          margin-top: 20px;
          float: right;
          height: 40px;
          line-height: 40px;
          font-size: 18px;
          color: #108ee9;
          span {
            display: inline;
          }
        }
        .van-button--primary {
          border: 2px solid #108ee9;
        }
      }
    }
  }
}
.bottom {
  position: fixed;
  bottom: 20px;
  width: 100%;
  text-align: center;
  .bottom-button {
    width: 80%;
    margin: 0;
    font-size: 38px;
    background-color: #108ee9;
  }
  .van-button--primary {
    border: 2px solid #108ee9;
  }
}
</style>
