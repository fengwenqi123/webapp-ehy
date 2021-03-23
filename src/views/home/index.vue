<template>
  <div class="ehy-content">
    <div class="header">
      <div class="top">
        <div>
          <img src="@/assets/img/address.png" alt="">
          <span>{{city}}</span>
        </div>
        <p></p>
      </div>
      <div class="weather">
        <div v-if="weather.temperature">
          <p>{{weather.temperature}}℃</p>
          <p>
            <span>{{weather.weather}}</span>
            <span>{{ weather.winddirection}}风</span>
            <span>{{ weather.windpower}}级</span>
          </p>
        </div>
        <div @click="water()">
          <p>{{waterInfo.depth}}米</p>
          <p>{{waterInfo.name}}<span class="lg cuIcon-right"></span></p>
        </div>
      </div>
    </div>
    <div class="login" v-if="isLogin">
      <div class="padding-xl radius bg-white" @click="login()">去登录</div>
    </div>
    <div class="info" v-if="isInfo">
      <div class="padding-xl radius bg-white">
        <van-swipe class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true" autoplay="true" interval="5000" duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff">
          <van-swipe-item v-for="(item,index) in swiperList" :key="index">
            <div v-if="item.shipName !== 'add'" class="ship-info" @click="tabClick(item)">
              <p>{{item.shipName}}</p>
              <p>船舶登记号：{{item.cbdjh}}</p>
              <p>点击查看详情</p>
              <img src="@/assets/img/ship.png" mode=""></img>
            </div>
            <div v-else class="ship-add" @click="addClick()">
              <p><img src="@/assets/img/ship.png" mode=""></img>立即添加船舶</p>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>

    <div class="box">
      <div class="padding-xl radius bg-white">
        <ul>
          <li @click="sewage()">
            <img src="@/assets/img/h2.png" alt="">
            <p>污染物上岸</p>
          </li>
          <li @click="port()">
            <img src="@/assets/img/h3.png" alt="">
            <p>电子报告</p>
          </li>
          <li @click="police()">
            <img src="@/assets/img/h5.png" alt="">
            <p>一键报警</p>
          </li>
          <li @click="srz()">
            <img src="@/assets/img/srz.png" alt="">
            <p>船员适任证</p>
          </li>
          <li @click="shipwz()">
            <img src="@/assets/img/weizhang.png" alt="">
            <p>船舶违章</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {
  selectByToken,
  findByCity
} from '@/api/home'
import {
  findByName
} from '@/api/weather'
import { getLocation } from '@/mixins/getLocation'

export default {
  mixins: [getLocation],
  data() {
    return {
      loadingType: 'more', // 加载更多状态
      headerPosition: 'fixed',
      headerTop: '0px',
      province: '浙江省',
      city: '杭州市',
      waterInfo: {
        depth: '0',
        name: '暂无'
      },
      weather: {},
      items: [],
      swiperList: [],
      isLogin: false,
      isInfo: true,
      dotStyle: false,
      cardCur: 0,
      page: {
        pageSize: 20,
        pageNum: 1,
        total: 0
      }
    }
  },
  mounted() {
    // const value = uni.getStorageSync('userInfo')
    // if (value) {
    //   this.isLogin = false
    //   this.isInfo = true
    //   this.getSelectByToken()
    // } else {
    //   this.isLogin = true
    //   this.isInfo = false
    // }

    this.getSelectByToken()
  },
  created() {
    this.getLocation('homecity')
  },
  methods: {
    login() {
      // uni.navigateTo({
      //   url: '/pages/login/index',
      //   animationType: 'pop-in',
      //   animationDuration: 300
      // })
    },
    water() {
      // uni.removeStorageSync('userInfo');
      // uni.navigateTo({
      //   url: '/pages/home/water/index?city=' + this.city,
      //   animationType: 'pop-in',
      //   animationDuration: 300
      // })
    },
    police() {
      // uni.navigateTo({
      //   url: '/pages/home/police/index',
      //   animationType: 'pop-in',
      //   animationDuration: 300
      // })
    },
    sewage() {
      // uni.navigateTo({
      //   url: '/pages/sewage/index',
      //   animationType: 'pop-in',
      //   animationDuration: 300
      // })
      this.$router.push({ path: 'sewageDisposal' })
    },
    port() {
      // uni.showModal({
      //   content: '暂未开放，敬请期待！',
      //   showCancel: false,
      //   confirmText: '确定'
      // })
    },
    tabClick(item) {
      console.log(item.cbsbh)
      // uni.navigateTo({
      //   url: '/pages/home/shipInfo/index?cm=' + item.shipName + '&cbdjh=' + item.cbdjh + '&cbsbh=' + item.cbsbh,
      //   animationType: 'pop-in',
      //   animationDuration: 300
      // })
    },
    addClick() {
      // uni.navigateTo({
      //   url: '/pages/myShip/add',
      //   animationType: 'pop-in',
      //   animationDuration: 300
      // })
    },
    // getLocation() {
    //   uni.getLocation({
    //     type: 'gcj02',
    //     geocode: true,
    //     success: res => {
    //       console.log(res)
    //       if (res.address) {
    //         this.city = res.address.city
    //         console.log(this.city)
    //       }
    //     }
    //   })
    // },
    getWeather() {
      findByName(this.city).then(response => {
        console.log(response.data.data.lives[0])
        this.weather = response.data.data.lives[0]
      })
    },
    // cardSwiper
    cardSwiper(e) {
      this.cardCur = e.detail.current
    },
    getSelectByToken() {
      selectByToken(2)
        .then(res => {
          console.log(res)
          this.swiperList = res.data
          let obj = {}
          obj.shipName = 'add'
          this.swiperList.push(obj)
        })
    },
    getFindByCity() {
      findByCity(this.province, this.city)
        .then(res => {
          // console.log(res);
          this.waterInfo = res.data
        })
    },
    srz() {
      // uni.navigateTo({
      //   url: '/pages/certificate/index',
      //   animationType: 'pop-in',
      //   animationDuration: 300
      // })
    },
    shipwz() {
      // uni.navigateTo({
      //   url: '/pages/home/shipInfo/index?active=3',
      //   animationType: 'pop-in',
      //   animationDuration: 300
      // })
    }
  }
}
</script>

<style lang="scss">
.ehy-content {
  .header {
    width: 100%;
    height: 380px;
    background: #007aff;
    position: relative;

    .top {
      height: 96px;
      padding-top: 45px;

      div {
        width: 100%;
        height: 96px;
        line-height: 96px;
        position: absolute;
        left: 0;
        top: 48px;
        display: flex;
        align-items: center;

        img {
          width: 58px;
          height: 50px;
          padding-left: 24px;
        }

        span {
          padding-left: 21px;
          font-size: 30px;
          color: #fff;
        }
      }

      p {
        width: 100%;
        height: 96px;
        line-height: 96px;
        text-align: center;
        color: #fff;
        font-size: 36px;
      }
    }

    .weather {
      // height: 254px;

      div:first-child {
        float: left;
        margin-left: 39px;
        margin-top: 67px;

        p {
          color: #fff;
        }

        p:first-child {
          font-size: 50px;
          text-align: left;
        }

        p:last-child {
          font-size: 25px;
          // margin-top: 23px;
          span {
            padding-left: 20px;
          }
        }
      }

      div:last-child {
        float: right;
        margin-right: 40px;
        margin-top: 90px;
        p {
          font-size: 40px;
          color: #fff;
          text-align: right;
        }

        p:last-child {
          font-size: 32px;
          padding-top: 20px;
        }
      }
    }
  }

  .login {
    padding: 0 24px 0 24px;
    position: relative;
    top: -30px;
    z-index: 999;
    height: 90px;
    text-align: center;

    .padding-xl {
      height: 100%;
      line-height: 90px;
      padding: 0;
    }
  }

  .info {
    padding: 0 24px 0 24px;
    position: relative;
    top: -30px;
    z-index: 999;
    height: 230px;

    .padding-xl {
      padding: 0;
      height: 100%;

      .screen-swiper {
        height: 100%;
        min-height: initial;
      }
    }

    .ship-info {
      padding: 30px 26px;
      position: relative;

      p {
        font-size: 36px;
        color: #666666;
        padding-bottom: 23px;
      }

      p:first-child {
        font-weight: bold;
        color: #333;
      }

      p:nth-child(3) {
        font-size: 24px;
      }

      img {
        width: 70px;
        height: 70px;
        position: absolute;
        right: 30px;
        top: 30px;
      }
    }
    .ship-add {
      p {
        width: 100%;
        height: 230px;
        line-height: 230px;
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        color: #666;
      }
      img {
        width: 70px;
        height: 70px;
        position: absolute;
        left: 150px;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }

  .box {
    padding: 0 24px 0 24px;
    position: relative;
    top: -10px;

    .padding-xl {
      padding: 0;
    }

    ul {
      height: 360px;

      li {
        width: 25%;
        // height: 185px;
        text-align: center;
        float: left;

        img {
          width: 125px;
          height: 125px;
          padding-top: 50px;
        }

        p {
          color: #555555;
          font-size: 26px;
          padding-top: 10px;
        }
      }
    }
  }
}
</style>
