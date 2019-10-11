<template>
  <div class="mains">
    <div class="container">
      <div class="header">
        <p class="title">
          个人专属收件码
        </p>
      </div>
      <div class="qrcode">
        <img :src="qrcode"
             alt="">
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars,prefer-const,object-curly-spacing */

import { mapGetters } from 'vuex'
import {
  getToken
} from '@/utils/cache'

export default {
  data() {
    return {
      src: require('@/assets/img/st.png'),
      token: getToken(),
      qrcode: ''
    }
  },
  created() {
    if (this.token) {
      this.qrcode = 'https://api.cjbe88.com/express/express/qrcode?content=' + this.token
    }
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.mains {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: url("../../assets/img/exp_qr_background.png");
  background-size: 100% 100%;
  padding: 60px 32px;
  box-sizing: border-box;

  .container {
    border-radius: 8px;
    overflow: hidden;
    .header {
      height: 200px;
      background: #e0f1ff;
      line-height: 200px;
      text-align: center;

      .title {
        font-size: 49px;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
        margin: 0;
      }
    }

    .qrcode {
      width: 100%;
      height: 700px;
      text-align: center;
      background: rgba(255, 255, 255, 1);
      img {
        width: 600px;
        height: 600px;
        margin-top: 40px;
      }
    }
  }
}
</style>
