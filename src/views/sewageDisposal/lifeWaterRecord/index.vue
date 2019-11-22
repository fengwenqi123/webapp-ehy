<template>
  <div>
    <div class="main">
      <div class="shipList">
        <img src="../../../assets/img/ehyShip.png">
        <span>{{shipName}}</span>
        <p @click="selectShipName">
          <span>切换</span>
          <img src="../../../assets/img/qh.png" />
        </p>
        <div style="clear:both"></div>
      </div>
      <van-popup v-model="showShipName"
                 round
                 position="bottom"
                 :style="{ height: '30%' }">
        <van-picker :columns="shipColumn"
                    show-toolbar
                    @cancel="onCancel"
                    @confirm="onConfirm" />
      </van-popup>
    </div>
    <div class="tip">
      <span>请选择附近上岸站点，也可以直接扫扫码</span>
      <img src="../../../assets/img/sewage/qr.png"
           @click="getCode" />
    </div>
    <div class="bottom">
      <div class="bottom-title">
        <div>
          <span>附近码头</span>
          <span>根据船舶AIS定位</span>
        </div>
        <div>
          <span @click="getDW">重新定位</span>
        </div>
      </div>
      <div class="bottom-list">
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh">
          <van-list v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad">
            <div class="card"
                 @click="goOutLet(item)"
                 v-for="item in itemList"
                 :key="item.id">
              <div>
                <van-row>
                  <van-col :offset="1"
                           span="19">
                    <p>{{item.name}}</p>
                  </van-col>
                  <!-- <van-col span="3">
                    <span>{{item.attribute===1?'智能':item.attribute===2?'普通':item.attribute===3?'综合':"不明"}}</span>
                  </van-col> -->
                  <van-col :span="4">
                    <p :class="{status1:item.status===1||item.status===2,status2:item.status===3}">{{item.status===1?'正常':item.status===2?'正常':item.status===3?'故障':"--"}}</p>
                  </van-col>

                  <!-- </van-col> -->
                </van-row>
                <van-row>
                  <van-col span="8"
                           :offset="1">
                    <p>联系人：{{item.contact||'--'}}</p>
                  </van-col>
                  <van-col span="15">
                    <p>{{item.mobile}}</p>
                  </van-col>
                </van-row>
                <van-row>
                  <van-col span="18"
                           :offset="1">
                    <p>地址：{{item.city}}{{item.area}}{{item.address}}</p>
                  </van-col>
                  <van-col span="5">
                    <p style="font-weight:bold;color:#1890ff">{{parseInt(item.distance)||'--'}} km</p>
                  </van-col>
                </van-row>
                <van-row>
                  <van-col span="12"
                           :offset="1">
                    <span :class="{active:fomesFun1(item.fomesType||'')}">生活垃圾</span>
                    <span :class="{active:fomesFun2(item.fomesType||'')}">生活污水</span>
                    <span :class="{active:fomesFun3(item.fomesType||'')}">油污</span>
                  </van-col>
                </van-row>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { setTitle, setBoat, getBoat, getGoQr, getLng, getLat } from '@/utils/cache.js'
import { sewagePoint } from '@/api/sewageDisposalNo'
import { boatList } from '@/api/ehy'
import { Toast } from 'vant'
import { discharge } from '@/api/sewageDisposal'
import { recoveryInfo } from '@/api/sewageDisposal'
export default {
  data() {
    return {
      shipName: null,
      code: null,
      showShipName: false,
      shipColumn: [],
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      currentLon: '',
      currentLat: '',
      city: '',
      area: '',
      isLoading: false,
      finished: false,
      loading: false,
      itemList: []
    }
  },
  created() {
    this.lists()
    this.boatlist()
    setTitle(this.$route.meta.title)
  },
  mounted() {
    window.callBackCode = this.callBackCode
  },
  methods: {
    goOutLet(item) {
      this.$router.push({ name: 'lifeSewageOutLet', query: { info: item } })
    },
    fomesFun1(value) {
      if (value.indexOf('生活垃圾') !== -1) {
        return true
      } else {
        return false
      }
    },
    fomesFun2(value) {
      if (value.indexOf('生活污水') !== -1) {
        return true
      } else {
        return false
      }
    },
    fomesFun3(value) {
      if (value.indexOf('油污') !== -1) {
        return true
      } else {
        return false
      }
    },
    boatlist() {
      boatList(2).then(response => {
        console.log(response)
        this.shipList = response.data
        this.shipName = getBoat()
        this.shipColumn = this.shipList.map(item => item.shipName)
      })
    },
    selectShipName() {
      this.showShipName = true
    },
    onConfirm(value, index) {
      console.log(value)
      this.shipName = value
      setBoat(this.shipName)
      this.showShipName = false
    },
    onCancel() {
      this.showShipName = false
    },
    //
    lists() {
      this.currentLon = getLng()
      this.currentLat = getLat()
      // this.currentLon = '119.5811'
      // this.currentLat = '30.1342'
      sewagePoint(this.page.pageNum, this.page.pageSize, this.city, this.area, this.fomesType, this.currentLon, this.currentLat).then(response => {
        console.log(response)
        this.page.total = response.data.page.total
        this.itemList = this.itemList.concat(response.data.dataList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.page.pageNum * this.page.pageSize >= this.page.total) {
          this.finished = true
        }
      })
    },
    getDW() {
      this.lists()
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page.pageNum = 1
        this.itemList = []
        this.lists()
        this.loading = true
        this.isLoading = false
        this.finished = false
      }, 300)
    },
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.page.pageNum++
        this.lists()
      }, 800)
    },
    getCode() {
      getGoQr()
    },
    callBackCode(code) {
      if (/^[0-9]+$/.test(code) && code.length === 20) {
        this.code = code
        this.$store.commit('setrecoveryCode', this.code)
        this.getRecoveryInfo()
      } else {
        this.$router.push({ path: '/unrecognized' })
      }
    },
    submitWater() {
      const obj = {
        type: 1,
        shipName: this.recoveryInfo.shipName,
        code: this.code,
        orderWay: 1
      }
      discharge(obj).then(response => {
        Toast.success({
          message: `${response.msg}，请稍等...`,
          duration: 2000
        })
        setTimeout(() => {
          this.$router.push({
            path: '/successWaterAuto'
          })
        }, 2000)
      })
    },
    getRecoveryInfo() {
      recoveryInfo(this.shipName, this.code).then(response => {
        this.recoveryInfo = response.data
        this.$store.commit('setRecoveryInfo', response.data)
        switch (response.data.type) {
          case 1:
            switch (response.data.attribute) {
              case 1:
                this.submitWater()
                break
              case 2:
                this.$router.push({
                  path: '/lifeSewage'
                })
                break
              default:
                this.$router.push({
                  path: '/lifeSewage'
                })
            }
            break
          case 2:
            this.$router.push({
              path: '/oilSewage'
            })
            break
          default:
            this.$router.push({
              path: '/rubbishSewage'
            })
        }
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.main {
  background: rgba(16, 142, 233, 1);
  .shipList {
    height: 60px;
    line-height: 60px;
    padding: 20px;
    color: #fff;
    img {
      height: 100%;
      float: left;
      vertical-align: middle;
    }
    > span {
      display: inline-block;
      font-size: 34px;
      line-height: 60px;
      margin-left: 20px;
    }
    > p {
      float: right;
      display: flex;
      align-items: center;
      img {
        width: 25px;
      }
      span {
        display: inline-block;
        font-size: 28px;
        margin-right: 10px;
      }
    }
  }
}
.tip {
  color: #666;
  font-size: 24px;
  display: flex;
  padding: 20px;
  justify-content: space-between;
  line-height: 60px;
  img {
    width: 60px;
    height: 60px;
  }
}
.bottom {
  .bottom-title {
    background-color: #fff;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    div:nth-child(1) {
      span:nth-child(1) {
        font-size: 36px;
        font-weight: bold;
        color: #000;
      }
      span:nth-child(2) {
        font-size: 24px;
        color: #888;
      }
    }
    div:nth-child(2) {
      span {
        color: #108ee9;
      }
    }
  }
  .bottom-list {
    .card {
      padding: 20px 0 40px 0;
      background-color: #fff;
      border-bottom: 1px solid #eeeeee;
      div {
        .van-row {
          p {
            line-height: 50px;
          }
        }
        .van-row:nth-child(1) {
          .van-col:nth-child(1) {
            p {
              text-align: left;
            }
          }
          .van-col:nth-child(3) {
            p {
              font-size: 34px;
              text-align: right;
            }
            .status1 {
              color: #09bb07;
            }
            .status2 {
              color: #f76260;
            }
          }
          .van-col:nth-child(2) {
            height: 50px;
            span {
              padding: 5px 10px;
              font-size: 24px;
              color: #fff;
              display: inline-block;
              vertical-align: middle;
              background-color: #1890ff;
            }
          }
        }
        .van-row:nth-child(2),
        .van-row:nth-child(3) {
          p {
            color: #666666;
            font-size: 28px;
          }
        }
        .van-row:nth-child(4) {
          span {
            background-color: #999999;
            padding: 4px 15px;
            border-radius: 15px;
            color: #fff;
            font-size: 20px;
            text-align: center;
            line-height: 30px;
          }
          .active {
            color: #fff;
            background-color: #1890ff;
          }
        }
      }
    }
  }
}
.status1 {
  color: #09bb07;
}
.status2 {
  color: #f76260;
}
</style>
