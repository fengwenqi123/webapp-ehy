<template>
  <div class="main">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <ul class="all">
        <li v-for="(item,index) in lockList" :key="index" @click="showValue(item)">
          <div class="item">
            <div class="top">
              <div class="left">
                <div class="name">{{item.waitShipTotal.shipGateName}}</div>
                <div class="xing">
                  <span>上行：{{item.waitShipTotal.upSum}}</span>
                  <span>下行：{{item.waitShipTotal.downSum}}</span>
                </div>
              </div>
              <div class="right">
                <div class="ship">船舶总数</div>
                <div class="num">{{item.waitShipTotal.shipTotal}}</div>
              </div>
            </div>
            <div class="title">
              船闸引航道水位(米)
            </div>
            <div class="bottom">
              <span>上游:{{item.hydrology.sysw.toFixed(4)}}</span>
              <span>下游:{{item.hydrology.xysw.toFixed(4)}}</span>
            </div>
          </div>
        </li>
      </ul>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { allLock } from '@/api/gyt'
  import { mapGetters } from 'vuex'

  export default {
    name: 'lockList',
    computed: {
      ...mapGetters([
        'shipName'
      ])
    },
    data() {
      return {
        isLoading: false,
        lockList: null,
        totalShipNum: 0
      }
    },
    created() {
      this._lockList()
    },
    methods: {
      onRefresh() {
        this._lockList()
        this.$nextTick(() => {
          this.isLoading = false
        })
      },
      _lockList() {
        allLock(this.shipName).then(response => {
          this.lockList = response.data
        })
      },
      showValue(item) {
        this.$router.push({
          path: '/lockDetails',
          query: {
            obj: JSON.stringify(item)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .main {

    .all {
      margin: 0 40px;
      padding-bottom: 40px;
      height: 1000px;

      li {
        margin-top: 30px;
        background: #fff;
        padding: 30px;

        .item {
          .top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .left {
              .name {
                font-size: 40px;
                margin-bottom: 20px;
              }
            }

            .right {
              .ship {
                margin-bottom: 20px;
              }

              .num {
              }
            }
          }

          .title {
            margin: 30px 0;
          }

          .bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        }
      }
    }
  }
</style>
