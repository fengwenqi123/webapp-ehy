<template>
  <div class="container">
    <header>
      <div @click="goBack()">
        <van-icon name="arrow-left"/>
        <span>返回</span>
      </div>
      <p>污水上岸</p>
      <div @click="goList()">排污记录</div>
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
              :key="index"
              @click="deatils(item)">
            <p>
              <span>{{item.name}}</span>
              <span>（{{item.type === 1?'码头':item.type === 2?'站所':item.type === 3?'排污船':'其他'}}）</span>
            </p>
            <p>
              <span>联系人：</span>
              <span>{{item.contact}}</span>
              <span>{{item.mobile}}</span>
            </p>
            <p>
              <span>地址：</span>
              <span>{{item.address}}</span>
            </p>
            <label>{{item.distance || '--'}}</label>
          </li>
        </ul>
      </van-list>
    </van-pull-refresh>

    <div class="button">
      <van-button type="info"
                  @click="goQr()">扫码排放污水
      </van-button>
    </div>
  </div>
</template>
<script>
  import { sewageSite } from '@/api/sewage'
  import { getGoQr, getFinishWeb } from '@/utils/cache'

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
      this.getSewageSite()
    },
    methods: {
      getSewageSite() {
        sewageSite(this.page.pageNum, this.page.pageSize).then(response => {
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
        }).finally(() => {
          this.refreshing = false
          this.loading = false // 加载状态结束
        })
      },
      onRefresh() {
        this.page.pageNum = 1
        this.finished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
        this.getSewageSite()
      },
      onLoad() {
        this.page.pageNum++
        this.getSewageSite()
      },
      goQr() {
        getGoQr()
      },
      goBack() {
        getFinishWeb()
      },
      deatils(value) {
        this.$router.push(
          {
            path: '/pointDeatils',
            query: {
              id: value.id,
              title: value.name
            }
          }
        )
      },
      goList() {
        this.$router.push(
          {
            path: '/sewageList'
          }
        )
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

    .list-refresh {
      margin-bottom: 2rem;
    }

    .ul {
      background: #fff;
      padding-left: 0.6rem;
      margin-top: 1.35rem;

      li {
        width: 100%;
        height: 2rem;
        padding: 0.4rem 0;
        border-bottom: 1px solid #eeeeee;
        position: relative;

        label {
          position: absolute;
          right: 1rem;
          top: 0;
          bottom: 0;
          margin: auto;
          line-height: 3rem;
          color: #666666;
        }

        p {
          span {
            line-height: 0.7rem;
            font-size: 0.4rem;
            color: #666666;
          }
        }

        p:first-child {
          span:first-child {
            font-size: 0.48rem;
            color: #333333;
            font-weight: bold;
          }

          span:last-child {
            font-size: 0.45rem;
            color: #666666;
          }
        }

        p:nth-child(2),
        p:nth-child(3) {
          span:first-child {
            display: block;
            width: 1.7rem;
            float: left;
            text-align: center;
          }
        }
      }
    }

    .button {
      width: 100%;
      height: 2rem;
      padding: 0 5%;
      background: #fff;
      position: fixed;
      bottom: 0;
      left: 0;
      box-shadow: 0 -10px 10px #efefef;

      .van-button {
        width: 90%;
        margin-top: 0.4rem;
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
