<template>
  <div class="container">
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
          <li v-for="(item,index) in dataList" :key="index">
            <div class="item">
              <img
                v-if="item.goodsImageList.length>0"
                :src="src+item.goodsImageList[0].originalImg"
                alt=""
              />
              <img v-else src="../../../../assets/img/nopic.png" alt="">
              <div class="name">{{item.name}}</div>
              <div class="bottom">
                <div class="price">
                  <img src="../../../../assets/img/shop/coin.png" alt=""/>
                  <span>{{item.price}}</span>
                </div>
                <div class="exchange" @click="exchange(item)">
                  去兑换
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
  import { list } from '@/api/shopList'
  import { mapGetters } from 'vuex'
  export default {
    name: 'list',
    data() {
      return {
        loading: false,
        finished: false,
        refreshing: false,
        dataList: [],
        page: {
          pageNum: 0,
          pageSize: 8,
          total: 0
        },
        order: null,
        sort: null,
        keyword: null,
        categoryName: null,
        brandName: null,
        src: 'https://api.cjbe88.com/storage/storage/'
      }
    },
    computed: {
      ...mapGetters([
        'price'
      ])
    },
    watch: {
      price() {
        this.order = 'price'
        if (this.price === 1) {
          this.sort = 'asc'
        } else {
          this.sort = 'desc'
        }
        this.onRefresh()
      }
    },
    methods: {
      onLoad() {
        this.page.pageNum += 1
        this.lists()
      },
      onRefresh() {
        this.page.pageNum = 0
        this.dataList = []
        this.finished = false
        window.scrollTo(0, 10)
      },
      lists() {
        list(this.page.pageNum, this.page.pageSize, this.order, this.sort, this.keyword, this.categoryName, this.brandName).then(response => {
          this.dataList = this.dataList.concat(response.data.dataList)
          this.page = response.data.page
          this.refreshing = false
          // 加载状态结束
          this.loading = false
          // 数据全部加载完成
          if (this.page.pageNum * this.page.pageSize >= this.page.total) {
            this.finished = true
          } else {
            this.finished = false
          }
        }).catch(() => {
          this.loading = false
          this.finished = true
        })
      },
      exchange(item) {
        this.$router.push({
          path: '/CommodityDetails',
          query: {
            id: item.id
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    padding: 0 25px;
    background: #fff;
    border-top: 1px solid #fff;

    .shop-list {
      padding-bottom: 50px;
    }

    ul {
      padding-top: 20px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-bottom: 50px;

      li {
        padding-bottom: 20px;
        width: 260px;
        margin: 20px 45px 0;

        .item {
          img {
            width: 260px;
            height: 260px;
          }

          .name {
            margin-top: 10px;
            font-size: 30px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }

          .bottom {
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .price {
              img {
                width: 20px;
                height: 20px;
                margin-right: 4px;
              }
            }

            .exchange {
              font-size: 24px;
              font-weight: 400;
              width: 108px;
              height: 50px;
              background: rgba(16, 142, 233, 1);
              border-radius: 25px;
              text-align: center;
              line-height: 50px;
              color: #fff;
            }
          }
        }
      }
    }
  }
</style>
