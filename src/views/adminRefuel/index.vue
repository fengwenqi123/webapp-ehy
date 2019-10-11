<template>
  <div>

   <div class="list">
      <van-tabs v-model="active" sticky animated swipeable color="#1989FA" title-active-color="#1989FA">
        <van-tab title="待加油">
          <van-pull-refresh v-model="isLoading1" @refresh="onRefresh1">
            <van-list
              class="main"
              v-model="loading1"
              :finished="finished1"
              finished-text="没有更多了"
              @load="onLoad1"
            >
            <div class="card" v-for="item in cardList1" :key="item.id">
                <div class="card-header">
                  <van-row>
                    <van-col span="5" offset="1"><img src="../../assets/img/refuel.png" alt=""></van-col>
                    <van-col span="13" offset="1"><span>{{item.addTimeString}}</span></van-col>
                    <van-col span="3" ><span>{{item.status===1?'待加油':item.status===2?'待支付':item.status===3?'已完成 ':item.status===4?'待退款':item.status===5?'已退款':item.status===6?'已关闭':'--'}}</span></van-col>
                  </van-row>
                </div>
                <div class="card-content">
                  <p>{{item.shipName}}</p>
                  <p>
                    <span>加油地点：</span>
                    <span>{{item.refuelingPoint}}</span>
                  </p>
                  <p>
                    <span>加油时间：</span>
                    <span>{{item.refuelingTime||'--'}}</span>
                  </p>
                  <p>
                    <span>加油量(L)：</span>
                    <span>{{item.capacity||'--'}}</span>
                  </p>
                  <p class="rmb">
                    <span>合计：{{item.price||'--'}}元</span>
                    <div style="clear:both"></div>
                  </p>
                  <p>
                    <van-button plain type="primary" round @click="goRefuel(item)">加油</van-button>
                    <div style="clear:both"></div>
                  </p>
                </div>
            </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="已加油">
          <van-pull-refresh v-model="isLoading2" @refresh="onRefresh2">
            <van-list
              class="main"
              v-model="loading2"
              :finished="finished2"
              finished-text="没有更多了"
              @load="onLoad2"
            >
            <div class="card" v-for="item in cardList2" :key="item.id">
                <div class="card-header">
                  <van-row>
                    <van-col span="5" offset="1"><img src="../../assets/img/refuel.png" alt=""></van-col>
                    <van-col span="13" offset="1"><span>{{item.addTimeString}}</span></van-col>
                    <van-col span="3" ><span>{{item.status===1?'待加油':item.status===2?'待支付':item.status===3?'已完成 ':item.status===4?'待退款':item.status===5?'已退款':item.status===6?'已关闭':'--'}}</span></van-col>
                  </van-row>
                </div>
                <div class="card-content">
                  <p>{{item.shipName}}</p>
                  <p>
                    <span>加油地点：</span>
                    <span>{{item.refuelingPoint}}</span>
                  </p>
                  <p>
                    <span>加油时间：</span>
                    <span>{{item.refuelingTime||'--'}}</span>
                  </p>
                  <p>
                    <span>加油量(L)：</span>
                    <span>{{item.capacity||'--'}}</span>
                  </p>
                  <p class="rmb">
                    <span>合计：{{item.price}}元</span>
                    <div style="clear:both"></div>
                  </p>
                  <p>
                    <van-button plain type="primary" round @click="goPay(item)" v-if="item.status===3">退款</van-button>
                    <div style="clear:both"></div>
                  </p>
                </div>
            </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
        <van-tab title="退款">
          <van-pull-refresh v-model="isLoading3" @refresh="onRefresh3">
            <van-list
              class="main"
              v-model="loading3"
              :finished="finished3"
              finished-text="没有更多了"
              @load="onLoad3"
            >
            <div class="card" v-for="item in cardList3" :key="item.id">
                <div class="card-header">
                  <van-row>
                    <van-col span="5" offset="1"><img src="../../assets/img/refuel.png" alt=""></van-col>
                    <van-col span="13" offset="1"><span>{{item.addTimeString}}</span></van-col>
                    <van-col span="3" ><span>{{item.status===1?'待加油':item.status===2?'待支付':item.status===3?'已完成 ':item.status===4?'待退款':item.status===5?'已退款':item.status===6?'已关闭':'--'}}</span></van-col>
                  </van-row>
                </div>
                <div class="card-content">
                  <p>{{item.shipName}}</p>
                  <p>
                    <span>加油地点：</span>
                    <span>{{item.refuelingPoint}}</span>
                  </p>
                  <p>
                    <span>加油时间：</span>
                    <span>{{item.refuelingTime||'--'}}</span>
                  </p>
                  <p>
                    <span>加油量(L)：</span>
                    <span>{{item.capacity||'--'}}</span>
                  </p>
                  <p class="rmb">
                    <span>合计：{{item.price}}元</span>
                    <div style="clear:both"></div>
                  </p>
                  <p>
                    <van-button plain type="primary" round @click="goPayInfo(item)">查看</van-button>
                    <div style="clear:both"></div>
                  </p>
                </div>
            </div>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </div>

   <div class="bottom">
    <van-button  type="primary" round class="bottom-button" @click="go">申请加油</van-button>
   </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { refuelList } from '@/api/adminRefuel'
export default {
  data() {
    return {
      page1: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      page2: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      page3: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      page4: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      active: 0,
      order: '',
      sort: '',
      keyword: '',
      cardList1: [],
      cardList2: [],
      cardList3: [],
      cardList4: [],
      list: [],
      loading1: false,
      loading2: false,
      loading3: false,

      finished1: false,
      finished2: false,
      finished3: false,

      isLoading1: false,
      isLoading2: false,
      isLoading3: false

    }
  },
  components: {

  },
  created() {
    this.lists1()
    this.lists2()
    this.lists3()
    setTitle(this.$route.meta.title)
  },
  methods: {
    lists1() {
      refuelList(this.page1.pageNum, this.page1.pageSize, this.order, this.sort, this.keyword, 1).then(response => {
        // console.log(response.data)
        this.page1.total = response.data.page.total
        this.cardList1 = this.cardList1.concat(response.data.dataList)
        // console.log(this.cardList)
      })
    },
    lists2() {
      refuelList(this.page2.pageNum, this.page2.pageSize, this.order, this.sort, this.keyword, 2).then(response => {
        // console.log(response.data)
        this.page2.total = response.data.page.total
        this.cardList2 = this.cardList2.concat(response.data.dataList)
        // console.log(this.cardList)
      })
    },
    lists3() {
      refuelList(this.page3.pageNum, this.page3.pageSize, this.order, this.sort, this.keyword, 3).then(response => {
        // console.log(response.data)
        this.page3.total = response.data.page.total
        this.cardList3 = this.cardList3.concat(response.data.dataList)
        // console.log(this.cardList)
      })
    },
    onRefresh1() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page1.pageNum = 1
        this.cardList1 = []
        this.lists1()
        this.isLoading1 = false
        this.finished1 = false
      }, 500)
    },
    onLoad1() {
      // 异步更新数据
      setTimeout(() => {
        this.page1.pageNum++
        this.lists1()
        // 加载状态结束
        this.loading1 = false
        // 数据全部加载完成
        if (this.cardList1.length >= this.page1.total) {
          this.finished1 = true
        }
      }, 500)
    },
    onRefresh2() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page2.pageNum = 1
        this.cardList2 = []
        this.lists2()
        this.isLoading2 = false
        this.finished2 = false
      }, 500)
    },
    onLoad2() {
      // 异步更新数据
      setTimeout(() => {
        this.page2.pageNum++
        this.lists2()
        // 加载状态结束
        this.loading2 = false
        // 数据全部加载完成
        if (this.cardList2.length >= this.page2.total) {
          this.finished2 = true
        }
      }, 500)
    },
    onRefresh3() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page3.pageNum = 1
        this.cardList3 = []
        this.lists3()
        this.isLoading3 = false
        this.finished3 = false
      }, 500)
    },
    onLoad3() {
      // 异步更新数据
      setTimeout(() => {
        this.page3.pageNum++
        this.lists3()
        // 加载状态结束
        this.loading3 = false
        // 数据全部加载完成
        if (this.cardList3.length >= this.page3.total) {
          this.finished3 = true
        }
      }, 500)
    },
    go() {
      this.$router.push({ path: '/addAdminRefuel' })
    },
    goPayInfo(item) {
      this.$router.push({ path: '/adminPayRefuelInfo', query: { infos: JSON.stringify(item) }})
    },
    goRefuel(item) {
      this.$router.push({ path: '/adminRefuelInfo', query: { infos: JSON.stringify(item) }})
    },
    goPay(item) {
      this.$router.push({ path: '/adminPayRefuelInfo', query: { infos: JSON.stringify(item) }})
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  padding:0 24px;
  margin-bottom:100px;
    .card{
      background-color:#fff;
      margin:20px 0;
      .card-header{
        height:68px;
        border-bottom:1px solid #EEEEEE;
        .van-col{
          line-height:68px;
          img{
            vertical-align: middle;
          }
          span{
            font-size:26px;
          }
          &:nth-child(2){
            span{
              color:#999999;
            }
          }
          &:nth-child(3){
            span{
              color:#108EE9;
            }
          }
        }
      }
      .card-content{
        padding:30px;
        p{
          color:#666666;
          font-size:24px;
          line-height:50px;
          &:nth-child(1){
            font-size:40px;
            line-height:70px;
            color:#333333;
          }
          span:nth-child(1){
            display:inline-block;
            width:30%;
          }
          .van-button{
            float:right;
            height:40px;
            line-height:40px;
            font-size:18px;
            color:#108EE9;
            span{
              display:inline;
            }
          }
          .van-button--primary{
              border:2px solid #108EE9;
          }
        }
        .rmb{
          width:100%;
          span{
            margin:20px 0;
            float:right;
          }
        }
      }
    }
}
.bottom{
  position:fixed;
  bottom:20px;
  width:100%;
  text-align:center;
 .bottom-button{
  width:80%;
  margin:0;
  font-size:38px;
  background-color:#108EE9;
  }
  .van-button--primary{
  border:2px solid #108EE9;
  }
}

</style>
