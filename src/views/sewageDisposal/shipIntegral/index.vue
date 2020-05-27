<template>
  <div class="container">
    <div class="header">
      <tip></tip>
    </div>
    <div class="bottom">
      <div class="title">
        积分服务
      </div>
      <div class="main">
        <ul>
          <li v-for="item in list"
              :key="item.label">
            <div class="item"
                 @click="pathTo(item.path)">
              <div class="title-item">
                {{ item.label }}
              </div>
              <div class="title-value">
                {{ item.value }}
              </div>
            </div>
          </li>
        </ul>
        <p class="shop">积分商城 ></p>
      </div>
    </div>
  </div>
</template>

<script>
import tip from './tip'
import { setTitle } from '@/utils/cache.js'
import { allPoints } from '@/api/sewageDisposal'
export default {
  components: {
    tip
  },
  created() {
    this.getAllPoint()
  },
  mounted() {
    setTitle(this.$route.meta.title)
  },
  data() {
    return {
      list: [
        {
          label: '违章积分',
          value: 0
        },
        {
          label: '排污积分',
          value: 0,
          path: '/sewageIntegral'
        },
        {
          label: '运营积分',
          value: 0
        }
      ]
    }
  },
  methods: {
    pathTo(path) {
      this.$router.push({
        path
      })
    },
    getAllPoint() {
      allPoints().then(response => {
        this.list[1].value = response.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  background: #fff;
  padding: 40px 0;
}
.bottom {
  background: #fff;
  margin-top: 20px;
  padding: 0 40px;
  .title {
    font-size: 30px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    height: 28px;
    padding: 20px 0;
    border-bottom: 1px solid #eeeeee;
  }
  .main {
    padding: 30px 0 160px 0;
    ul {
      display: flex;
      align-items: center;
      li {
        width: 33%;
        .item {
          text-align: center;
          .title-item {
            font-size: 26px;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          .title-value {
            margin-top: 24px;
            font-size: 40px;
            font-weight: 400;
            color: rgba(247, 160, 67, 1);
          }
        }
      }
    }
    .shop {
      margin-top: 500px;
      text-align: center;
      font-size: 30px;
      font-weight: 500;
      color: rgba(247, 160, 67, 1);
    }
  }
}
</style>
