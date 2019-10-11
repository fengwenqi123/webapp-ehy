<template>
  <div class="container">
    <!-- <header>
      <div @click="goBack()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <p>我的排闸</p>
    </header> -->

    <div class="port-content">
      <div class="port-info">
        <div v-if="isGuoZha">
          <p>总长{{locklength}}米</p>
          <p><span>已用{{ useLeftLength }}米</span><span>已用{{ useRightLength }}米</span></p>
        </div>
        <ul v-if="isGuoZha">
          <li class="li-left">
            <div v-for="(item,index) in leftArr"
                 :key="index">
              <img src="../../../assets/img/jh/ship.png">
              <p>{{item.shipname}}({{item.cz}}米)</p>
            </div>
          </li>
          <li class="li-right">
            <div v-for="(item,index) in rightArr"
                 :key="index">
              <img src="../../../assets/img/jh/ship.png">
              <p>{{item.shipname}}({{item.cz}}米)</p>
            </div>
          </li>
        </ul>
        <div class="surplus-length"
             v-if="isGuoZha">
          <span>剩余{{leftSurplus}}米</span><span>剩余{{rightSurplus}}米</span>
        </div>

        <!-- 暂无信息 -->
        <div class="empty-box"
             v-if="isEmpty">
          <img src="../../../assets/img/jh/kbox.png">
          <p>请等待调度</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPaiZhaList } from '@/api/JHport'
import { setTitle } from '@/utils/cache'
import $ from 'jquery'
export default {
  name: 'point',
  data() {
    return {
      leftArr: [],
      rightArr: [],
      isGuoZha: false,
      isEmpty: false,
      useLeftLength: 0, // 使用长度
      useRightLength: 0,
      leftSurplus: 0, // 剩余长度
      rightSurplus: 0,
      leftLength: 0, // 总船长
      rightLength: 0
    }
  },
  created() {
    setTitle('我的排闸')
    this.paiZhaList()
  },
  methods: {
    paiZhaList(value) {
      getPaiZhaList(localStorage.lockId, localStorage.directionData).then(response => {
        this.leftArr = response.left
        this.rightArr = response.right
        this.locklength = response.locklength
        if (localStorage.guoZhaStatus === '1' || (response.left.length === 0 && response.right.length === 0)) {
          this.isGuoZha = false
          this.isEmpty = true
          return
        } else {
          this.isGuoZha = true
          this.isEmpty = false
        }
        this.leftLength = 0 // 总船长
        this.rightLength = 0
        const multiple = 3 // 倍数
        const bufferlength = response.bufferlength * multiple // 缓冲

        setTimeout(() => {
          // 缓冲
          $('.port-content .port-info ul li').css({
            'height': (response.locklength * multiple) + 'px'
          })
          // 左边长度
          response.left.forEach((value, index) => {
            this.leftLength = this.leftLength + value.cz + response.bufferlength // 左边船长 + 缓冲
            $('.li-left > div:eq(' + index + ')').css({
              'height': (value.cz * multiple + bufferlength) + 'px'
            })
            $('.li-left > div:eq(' + index + ') img').css({
              'height': (value.cz * multiple) + 'px',
              'margin-top': bufferlength + 'px'
            })
            if (index === response.left.length - 1) {
              $('.li-left > div:eq(' + index + ')').css({
                'height': (value.cz * multiple + bufferlength * 2) + 'px'
              })
              $('.li-left > div:eq(' + index + ')  img').css({
                'margin-bottom': bufferlength + 'px'
              })
            }
            if (value.shipname === localStorage.shipName) {
              $('.li-left > div:eq(' + index + ')').css({
                'animation': 'heart 3s ease infinite'
              })
            }
          })

          // 右边长度
          response.right.forEach((value, index) => {
            this.rightLength = this.rightLength + value.cz + response.bufferlength // 右边船长 + 缓冲
            $('.li-right > div:eq(' + index + ')').css({
              'height': (value.cz * multiple + bufferlength) + 'px'
            })
            $('.li-right > div:eq(' + index + ') img').css({
              'height': (value.cz * multiple) + 'px',
              'margin-top': bufferlength + 'px'
            })
            if (index === response.right.length - 1) {
              $('.li-right > div:eq(' + index + ')').css({
                'height': (value.cz * multiple + bufferlength * 2) + 'px'
              })
              $('.li-right > div:eq(' + index + ') img').css({
                'margin-bottom': bufferlength + 'px'
              })
            }
            if (value.shipname === localStorage.shipName) {
              $('.li-right > div:eq(' + index + ')').css({
                'animation': 'heart 3s ease infinite'
              })
            }
          })

          // 已用长度
          this.useLeftLength = this.leftLength + bufferlength
          this.useRightLength = this.rightLength + bufferlength
          if (this.useLeftLength === 3) {
            this.useLeftLength = 0
          }
          if (this.useRightLength === 3) {
            this.useRightLength = 0
          }
          this.useLeftLength = this.useLeftLength.toFixed(2)
          this.useRightLength = this.useRightLength.toFixed(2)

          // 剩余长度
          this.leftSurplus = (this.locklength - this.leftLength).toFixed(2)
          this.rightSurplus = (this.locklength - this.rightLength).toFixed(2)
        }, 1)
      })
    }
    // goBack() {
    //   this.$router.go(-1)
    // }
  }
}
</script>

<style scoped lang="scss">
.container {
  .port-info {
    width: 100%;
    height: auto;
    float: left;
    padding: 0 36px 36px;
    box-sizing: border-box;
    > div {
      p:first-child {
        margin: 20px 0;
        text-align: center;
        height: 60px;
        line-height: 60px;
      }
      p {
        span {
          text-align: center;
          display: block;
          width: 50%;
          float: left;
          font-size: 14px;
        }
      }
    }

    .surplus-length {
      float: left;
      width: 100%;
      margin: 5px 0 10px 0;
      span {
        text-align: center;
        display: block;
        width: 50%;
        float: left;
        font-size: 14px;
      }
    }

    ul {
      width: 100%;
      height: auto;
      float: left;

      li {
        width: 49%;
        height: auto;
        float: left;
        background: #fff;
        border: 1px solid #ddd;

        div {
          width: 100%;
          height: auto;
          line-height: 44px;
          background-size: auto 98%;
          position: relative;
          p {
            width: 100%;
            height: 25px;
            line-height: 25px;
            position: absolute;
            bottom: 0;
            top: 0;
            left: 0;
            margin: auto;
            font-size: 14px;
            text-align: center;
          }
          img {
            width: auto;
            max-width: 95%;
            height: 100%;
            position: absolute;
            right: 0;
            left: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }

          span {
            position: absolute;
            left: 5px;
            top: 0;
            color: #333;
            font-size: 14px;
            height: 20px;
            line-height: 20px;
          }
        }
      }

      li:nth-child(2) {
        margin-left: 1%;
        div {
          margin-right: 1%;
          span {
            left: initial;
            right: 5px;
          }
        }
      }
    }

    > div:nth-child(2) {
      div {
        color: #999;
      }

      .ion-ios-flag {
        color: #5b97ff;
      }
    }
  }
}

.empty-box {
  margin-top: 300px;
  text-align: center;
  img {
    width: 60%;
  }
  p {
    margin-top: 50px;
    font-size: 40px;
    font-weight: bold;
    color: #666;
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