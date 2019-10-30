<template>
  <div class="container">
    <p>回收服务</p>
    <div class="container-child">
      <div v-for="item in list"
           :key="item.src"
           @click="pathTo(item.path)">
        <img :src="item.icon" />
        <span>{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data() {
    return {
      list: [
        {
          value: '生活污水',
          icon: require('@/assets/img/shws.png'),
          path: '/lifeWaterRecord'
        },
        {
          value: '生活垃圾',
          icon: require('@/assets/img/shlj.png'),
          path: ''
        },
        {
          value: '油污水',
          icon: require('@/assets/img/yws.png'),
          path: ''
        },
        {
          value: '回收点位置查询',
          icon: require('@/assets/img/hsdwz.png'),
          path: '/sewagePointSearch'
        },
        {
          value: '无法上岸问题上报',
          icon: require('@/assets/img/wfsa.png'),
          path: '/unableToLand'
        },
        {
          value: '上岸记录',
          icon: require('@/assets/img/sajl.png'),
          path: '/landRecord'
        }, {
          value: '积分商城',
          icon: require('@/assets/img/jfsc.png'),
          path: '/sewageIntegral'
        }
      ]
    }
  },
  methods: {
    pathTo(path) {
      if (path === '') {
        Toast('即将开放，敬请期待...')
      } else {
        this.$router.push({
          path
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100% !important;
  p {
    background-color: #fff;
    border-bottom: 1px solid #d8d8d8;
    margin: 0 24px;
    line-height: 88px;
    padding-left: 20px;
    color: #666666;
    font-size: 32px;
  }
  .container-child {
    margin: 0 24px;
    background-color: #fff;
    flex-wrap: wrap;
    display: flex;
    div {
      width: 33.1%;
      height: 210px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border-bottom: 1px solid #d8d8d8;
      img {
        width: 96px;
        height: 96px;
      }
      span {
        font-size: 26px;
        padding: 10px 0;
      }
      &:nth-child(3n) {
        border-left: 2px solid #d8d8d8;
      }
      &:nth-child(3n + 1) {
        border-right: 2px solid #d8d8d8;
      }
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}
</style>