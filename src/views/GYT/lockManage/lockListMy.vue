<template>
  <div class="main">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <div class="my-self">
        <ul v-if="lockList&&lockList.queueOrder!==0">
          <li>
            <div class="item">
              <div class="label">船闸名称：</div>
              <div class="value">{{lockList.gateName}}</div>
            </div>
          </li>
          <li>
            <div class="item">
              <div class="label">船舶名称：</div>
              <div class="value">{{lockList.shipname}}</div>
            </div>
          </li>
          <li>
            <div class="item">
              <div class="label">当前排查数：</div>
              <div class="value">{{lockList.queueOrder}}</div>
            </div>
          </li>
          <li>
            <div class="item">
              <div class="label">排队总数：</div>
              <div class="value">{{totalShipNum}}</div>
            </div>
          </li>
        </ul>
        <p v-else>暂无数据</p>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
  import { myLock } from '@/api/gyt'
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
        this.totalShipNum = 0
        myLock(this.shipName).then(response => {
          this.lockList = response.data
          this.lockList.queueList.forEach((item, index) => {
            this.totalShipNum += item.queueTotal
          })
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .main {

    .my-self {
      margin: 40px;
      height: 1000px;

      ul {
        padding: 20px;
        background: #fff;

        li {
          .item {
            display: flex;
            align-items: center;
            height: 80px;

            .label {

            }
          }
        }
      }

      p {
        text-align: center;
      }
    }
  }
</style>
