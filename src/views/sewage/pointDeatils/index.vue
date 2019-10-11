<template>
  <div class="container">
    <header>
      <div @click="goBack()">
        <van-icon name="arrow-left" />
        <span>返回</span>
      </div>
      <p>{{title}}</p>
    </header>

    <ul class="ul">
      <li>
        <p>
          <span>联系人</span>
          <span>{{item.contact || '--'}}</span>
        </p>
        <p>
          <span>联系电话</span>
          <span>{{item.mobile || '--'}}</span>
        </p>
        <p>
          <span>地址</span>
          <span>{{item.address || '--'}}</span>
        </p>
        <p>
          <span>中心经纬度</span>
          <span v-if="item.longitude && item.latitude">{{item.longitude +','+ item.latitude}}</span>
          <span v-if="!item.longitude && !item.latitude">--</span>
        </p>
      </li>
      <li>
        <div class="top">
          <span>名称</span>
          <span>编号</span>
          <span>状态</span>
        </div>
        <div v-for="(value,index) in item.outlet"
             :key="index">
          <span>{{value.name || '--'}}</span>
          <span>{{value.code || '--'}}</span>
          <span style="color: #07c160;"
                v-if="value.status === 1">空闲</span>
          <span style="color: #ff976a;"
                v-if="value.status === 2">工作中</span>
          <span style="color: #f44;"
                v-if="value.status === 3">设备维护</span>
        </div>
      </li>
    </ul>
    <div class="button">
      <van-button type="info"
                  @click="goQr()">扫码排放污水</van-button>
    </div>

    <!-- 遮罩 -->
    <div v-if="loadingSpinner">
      <cjb-loading></cjb-loading>
    </div>

  </div>
</template>
<script>
import { siteDeatils } from '@/api/sewage'
import { getGoQr } from '@/utils/cache'
import cjbLoading from '@/components/cjbLoading'

export default {
  name: 'point',
  data() {
    return {
      item: {},
      loadingSpinner: true,
      title: this.$route.query.title || ''
    }
  },
  components: {
    cjbLoading
  },
  created() {
    this.getSewageSite()
  },
  methods: {
    getSewageSite() {
      siteDeatils(this.$route.query.id).then(response => {
        this.item = response.data
        this.loadingSpinner = false
      })
    },
    goQr() {
      getGoQr()
    },
    goBack() {
      this.$router.go(-1)
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
    background: #f2f2f2;
    margin-top: 1.35rem;
    li {
      width: 100%;
      height: 3.6rem;
      background: #fff;
      box-sizing: border-box;
      p {
        width: 100%;
        float: left;
        span {
          line-height: 0.7rem;
          font-size: 0.4rem;
          color: #666666;
          float: left;
        }
        span:nth-child(2) {
          float: right;
        }
      }
    }
    li:nth-child(1) {
      padding: 0.4rem 0.5rem;
    }
    li:nth-child(2) {
      margin-top: 0.25rem;
      height: auto;
      float: left;
      div {
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        float: left;
        span {
          width: 33.3333%;
          float: left;
          text-align: center;
        }
      }
      div:nth-child(1) {
        border-bottom: 1px solid #eee;
      }
    }
  }
  .button {
    width: 100%;
    height: 2rem;
    padding: 0 0.5rem;
    float: left;
    box-sizing: border-box;

    .van-button {
      width: 100%;
      margin-top: 0.4rem;
    }
  }
}
</style>