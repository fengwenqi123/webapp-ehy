<template>
  <div class="container">
    <ul>
      <li v-for="item in list" :key="item.value">
        <div class="item" @click="pathTo(item.path)">
          <div class="left">
            <img :src="item.icon" :alt="item.value" />
            <div class="value">
              {{ item.value }}
            </div>
          </div>
          <div class="right">
            <img src="../../../assets/img/sewage/Path.png" />
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          value: '油污水回收记录',
          icon: require('@/assets/img/sewage/ywshs.png'),
          path: ''
        },
        {
          value: '生活垃圾回收记录',
          icon: require('@/assets/img/sewage/shlj.png'),
          path: ''
        },
        {
          value: '生活污水回收记录',
          icon: require('@/assets/img/sewage/shws.png'),
          path: '/lifeWaterRecord'
        },
        {
          value: '回收点位置查询',
          icon: require('@/assets/img/sewage/hsdwz.png'),
          path: '/sewagePointSearch'
        },
        {
          value: '无法上岸问题上报',
          icon: require('@/assets/img/sewage/wfsa.png'),
          path: '/unableToLand'
        }
      ]
    }
  },
  methods: {
    pathTo(path) {
      this.$router.push({
        path
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  ul {
    li {
      padding: 0 32px;
      .item {
        height: 94px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;
        .left {
          display: flex;
          img {
            width: 32px;
            height: 32px;
            margin-right: 35px;
          }
          .value {
            font-size: 32px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
        }
        .right {
          img {
            width: 16px;
          }
        }
      }
    }
  }
}
</style>
