<template>
  <div class="container">
    <!-- <header>
      <div @click="goBack()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <p>金港通</p>
    </header> -->

    <div class="port-content">
      <div class="port-top">
        <ul>
          <li>
            <span>{{shipName}}</span>
            <van-button type="info"
                        size="small"
                        @click="startClick()">{{startInfo}}</van-button>
          </li>
          <li>
            <span>报港编号：</span>
            <span>{{gateSowId}}</span>
          </li>
          <li>
            <span>过闸船闸：</span>
            <span>{{chuanZhaText}}</span>
          </li>
          <li>
            <span>过闸编号：</span>
            <span>{{showId}}</span>
          </li>
          <li>
            <span>船闸待闸数：</span>
            <span>{{waitNumber}}</span>
          </li>
        </ul>
      </div>

      <ul class="port-bottom">
        <li @click="register()">
          <img src="../../../assets/img/1.png">
          <p>过闸申报</p>
          <i class="icon ion-ios-arrow-right"></i>
        </li>
        <li @click="pay()">
          <img src="../../../assets/img/2.png">
          <p>过闸缴费</p>
          <i class="icon ion-ios-arrow-right"></i>
        </li>
        <li @click="info()">
          <img src="../../../assets/img/3.png">
          <p>我的排闸</p>
          <i class="icon ion-ios-arrow-right"></i>
        </li>
        <li @click="history()">
          <img src="../../../assets/img/4.png">
          <p>申报历史</p>
          <i class="icon ion-ios-arrow-right"></i>
        </li>
      </ul>
    </div>

    <!-- 遮罩 -->
    <van-overlay :show="overlayShow" />

  </div>
</template>
<script>
import { getAccessToken, getUserInfo, getBaoGangIdOfUnfinished, getChuanZhaByBaoGangId, putGuoZhaPaiDuiStart, putGuoZhaPaiDuiCancel, getPaiZhaChuanZhaByShipName } from '@/api/JHport'
import { getCode, setTitle } from '@/utils/cache'
import Vue from 'vue'

export default {
  name: 'point',
  data() {
    return {
      appId: '15FvP6mT49i5ZGkbw1Gfmr',
      secret: '2GxYGRktPE2emVQi1gaqqz',
      code: getCode(),
      grantType: 'authorization_code',
      overlayShow: false,
      items: [],
      shipName: localStorage.shipName || '',
      startInfo: '开始排队',
      gateSowId: '暂无',
      chuanZhaText: '暂无',
      showId: '暂无',
      waitNumber: '暂无',
      finishedFlag: true,
      paiFlag: true,
      paiTime: null,
      page: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  created() {
    // alert(1)
    setTitle('金华船闸')
    if (Vue.prototype.jhType === 'jh') {
      this.baoGangIdOfUnfinished()
      this.paiZhaChuanZhaByShipName()
    } else {
      this.overlayShow = true
      this.accessToken()
    }
  },
  // destroyed() {
  //   clearInterval(this.paiTime)
  // },
  methods: {
    accessToken() {
      getAccessToken(this.appId, this.secret, this.code, this.grantType).then(response => {
        this.userInfo(response.data.accessToken, response.data.openId)
      }).catch(error => {
        this.$toast(error.msg)
        console.log(error)
      })
    },
    userInfo(accessToken, openId) {
      getUserInfo(accessToken, openId).then(response => {
        if (response.data.shipName) {
          this.overlayShow = false
          this.shipName = response.data.shipName
          localStorage.shipName = response.data.shipName
          localStorage.cbdjh = response.data.cbdjh
          localStorage.cbsbh = response.data.cbsbh
          localStorage.cjdjh = response.data.cjdjh
          Vue.prototype.jhType = 'jh'
          this.baoGangIdOfUnfinished()
          this.paiZhaChuanZhaByShipName()
          this.paiTime = setInterval(() => {
            if (localStorage.gateSowId) {
              this.paiZhaChuanZhaByShipName()
            }
          }, 5000)
        } else {
          this.$toast('请到《会员认证》认证船舶！')
        }
      }).catch(error => {
        this.$toast(error.msg)
        console.log(error)
      })
    },
    register() {
      if (localStorage.gateSowId) {
        this.$router.push({ path: '/portSuccess' })
      } else {
        this.$router.push({ path: '/portRegister' })
      }
    },
    pay() {
      if (!localStorage.gateSowId) {
        this.$toast('请申报后缴费')
      } else {
        this.$router.push({ path: '/portPay' })
      }
    },
    info() {
      if (!localStorage.gateSowId || this.showId === '暂无') {
        this.$toast('请排队后查看')
      } else {
        this.$router.push({ path: '/portInfo' })
      }
    },
    history() {
      this.$router.push({ path: '/portHistory' })
    },
    startClick() {
      if (!localStorage.gateSowId) {
        this.$toast('申报后才能排队')
      } else {
        if (this.startInfo === '开始排队') {
          // if (!localStorage.longitude || !localStorage.latitude) {
          //   this.$toast('无法获取当前定位信息')
          // } else {
          // }
          if (this.currentPort.payStatus === '0') {
            this.$toast('该船闸未付款,请先缴费')
          } else {
            this.chuanZhaText = this.currentPort.name
            this.chuanZhaId = this.currentPort.id
            this.guoZhaPaiDuiStart() // 开始排队
          }
        } else {
          this.guoZhaPaiDuiCancel() // 取消排队
        }
      }
    },
    // 开始排队
    guoZhaPaiDuiStart() {
      putGuoZhaPaiDuiStart(this.chuanZhaId).then(response => {
        this.startInfo = '取消排队'
        this.baoGangIdOfUnfinished()
        this.paiZhaChuanZhaByShipName()
      }).catch(error => {
        this.$toast(error.message)
        console.log(error)
      })
    },
    // 取消排队
    guoZhaPaiDuiCancel() {
      putGuoZhaPaiDuiCancel(this.chuanZhaId).then(response => {
        this.startInfo = '开始排队'
        this.showId = '暂无'
        this.waitNumber = '暂无'
        this.chuanZhaText = '暂无'
        this.baoGangIdOfUnfinished()
      }).catch(error => {
        this.$toast(error.message)
        console.log(error)
      })
    },
    // 判读是否有排闸信息
    paiZhaChuanZhaByShipName() {
      getPaiZhaChuanZhaByShipName(this.shipName).then(response => {
        if (response.isPaiDui) {
          this.finishedFlag = true
          this.startInfo = '取消排队'
          const paiZhaData = response.obj[0]
          this.chuanZhaId = paiZhaData.recordId || '暂无' // 过闸id
          this.showId = paiZhaData.showId || '暂无' // 显示排队id
          this.chuanZhaText = paiZhaData.lockName || '暂无' // 船闸名称
          this.waitNumber = paiZhaData.waitNumber || '暂无' // 船闸名称
          localStorage.lockName = paiZhaData.lockName // 船闸id
          localStorage.lockId = paiZhaData.lockId
          localStorage.directionData = paiZhaData.direction
          localStorage.guoZhaStatus = paiZhaData.guoZhaStatus

          // guoZhaStatus 0 等待过闸 1 开始排队 2 预备进闸 3 开始进闸
          if (this.paiFlag) {
            this.paiFlag = false
            this.paiStatus = paiZhaData.guoZhaStatus // 排队状态
          }
          if (this.paiStatus === paiZhaData.guoZhaStatus) {
            this.paiStatus++
            if (paiZhaData.guoZhaStatus === 0) {
              this.$toast('等待过闸')
            } else if (paiZhaData.guoZhaStatus === 1) {
              this.$toast('开始排队')
            } else if (paiZhaData.guoZhaStatus === 2) {
              this.$toast('预备进闸')
            } else if (paiZhaData.guoZhaStatus === 3) {
              this.$toast('开始进闸')
            }
          }
        } else {
          this.paiFlag = true
          this.startInfo = '开始排队'
          this.chuanZhaText = '暂无'
          this.showId = '暂无'
          this.waitNumber = '暂无'
          if (this.finishedFlag) {
            this.finishedFlag = false
            this.baoGangIdOfUnfinished()
          }
        }
      }).catch(error => {
        console.log(error)
      })
    },
    baoGangIdOfUnfinished() {
      getBaoGangIdOfUnfinished(this.shipName).then(response => {
        if (response.hasReported) {
          this.gateSowId = response.obj[0].substring(0, 5)
          localStorage.gateSowId = response.obj[0]
          this.chuanZhaByBaoGangId(response.obj[0])
        } else {
          this.gateSowId = '暂无'
          localStorage.removeItem('gateSowId')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    chuanZhaByBaoGangId(gateSowId) {
      getChuanZhaByBaoGangId(gateSowId).then(response => {
        for (let i = 0; i < response.obj.length; i++) {
          if (response.obj[i].guozhaStatus !== '4') {
            this.currentPort = response.obj[i]
            return
          }
        }
      }).catch(error => {
        console.log(error)
      })
    }
    // goBack() {
    //   getFinishWeb()
    //   localStorage.removeItem('jhType')
    // }
  }
}
</script>

<style scoped lang="scss">
.container {
  header {
    background: #1989fa;
    color: #fff;
    box-shadow: initial;
  }
  .port-content {
    background: #f2f2f2;
    .port-top {
      width: 100%;
      height: 300px;
      float: left;
      background: #1989fa;
      padding: 24px;
      border-bottom: 1px solid #ddd;
      box-shadow: rgba(0, 0, 0, 0.05) 0 1px 6px;
      box-sizing: border-box;

      ul {
        width: 100%;
        height: 252px;
        float: left;
        position: relative;
        background: #fff;
        border-radius: 6px;
        padding: 24px;
        box-sizing: border-box;

        li {
          width: 50%;
          height: 70px;
          line-height: 70px;
          color: #eeeeee;
          float: left;

          > span {
            width: auto;
            height: 100%;
            float: left;
            color: #666;
            font-weight: bold;
            font-size: 30px;
          }

          > span:nth-child(2) {
            color: #1989fa;
            font-size: 30px;
          }
        }

        li:nth-child(1) {
          width: 100%;

          > span {
            color: #333;
            font-size: 40px;
          }

          .van-button {
            padding: 6px 20px;
            font-size: 24px;
            height: 60px;
            line-height: 26px;
            position: absolute;
            right: 24px;
            top: 24px;
          }
          .van-button::before {
            color: #fff;
          }

          label {
            width: 80px;
            height: 30px;
            position: absolute;
            right: 16px;
            top: 16px;
            line-height: 30px;
            display: block;
            text-align: center;
            font-size: 16px;
            color: #fff;
            background: #1989fa;
            border-radius: 3px;
          }
        }
      }
    }

    .port-bottom {
      width: 100%;
      height: auto;
      float: left;
      background: #fff;

      li {
        width: 100%;
        height: 140px;
        float: left;
        position: relative;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;

        img {
          width: 90px;
          height: 90px;
          float: left;
          position: absolute;
          left: 24px;
          top: 0;
          bottom: 0;
          margin: auto;
        }

        img:nth-child(2) {
          width: 60px;
          height: 15px;
          left: 71px;
        }

        p {
          height: 100%;
          line-height: 140px;
          padding-left: 140px;
          font-size: 36px;
          font-weight: bold;
          color: #1989fa;
        }

        i {
          position: absolute;
          right: 16px;
          top: 0;
          bottom: 0;
          margin: auto;
          display: table;
          font-size: 24px;
          color: #888;
        }
      }

      li:nth-child(2),
      li:nth-child(4) {
        border-right: 0;
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