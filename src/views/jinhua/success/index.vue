<template>
  <div class="container">
    <!-- <header>
      <div @click="goBack()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <p>过闸申报</p>
    </header> -->

    <div class="success-content">
      <img src="../../../assets/img/jh/success.png">
      <p>{{text}}</p>
      <div class="login-click padding">
        <van-button type="info"
                    size="large"
                    @click="port()">{{state}}</van-button>
      </div>
    </div>

  </div>
</template>
<script>
import { putBaoGangOfCancel } from '@/api/JHport'
import { setTitle } from '@/utils/cache'
import Vue from 'vue'

export default {
  name: 'point',
  data() {
    return {
      items: [],
      shipName: localStorage.shipName,
      text: '已申报',
      state: '取消申报',
      page: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      }
    }
  },
  created() {
    setTitle('过闸申报')
    Vue.prototype.jhType = 'jh'
    if (localStorage.gateState === '1') {
      this.text = '申报成功'
      this.state = '返回主页'
    } else {
      this.text = '已申报'
      this.state = '取消申报'
    }
  },
  methods: {
    port() {
      if (localStorage.gateState === '1') {
        this.$router.push({ path: '/port' })
        localStorage.gateState = '2'
      } else {
        this.$dialog.alert({
          title: '提示',
          message: '取消当前申报',
          showCancelButton: true
        }).then(() => {
          this.baoGangOfCancel()
        }).catch(() => {
        })
      }
    },
    baoGangOfCancel() {
      putBaoGangOfCancel(localStorage.gateSowId).then(response => {
        this.$router.push({ path: '/port' })
      }).catch(error => {
        this.$toast(error.message)
        console.log(error)
      })
    }
    // goBack() {
    //   this.$router.push({ path: '/port' })
    // }
  }
}
</script>

<style scoped lang="scss">
.container {
  .success-content {
    background: #f2f2f2;
    text-align: center;
    img {
      width: 60%;
      margin-top: 100px;
    }
    p {
      font-size: 40px;
      margin-top: 50px;
    }
    .login-click {
      margin: 50px 0 80px 0;
      padding: 0 36px;
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