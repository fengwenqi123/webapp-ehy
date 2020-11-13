<template>
  <div class="container">
      <div class="top">
        <div class="banner">
          <img :src="banner" alt="">
        </div>
      </div>
      <div class="content">
        <div v-for="(item,index) in list" :key="index" class="item" @click="linkTo(item.path)">
          <div class="img">
            <img :src="item.img" alt="">
          </div>
          <div class="label">
            <p>{{item.label}}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import pageHeader from '@/components/navBar'
  import { setTitle, getDefaultShip } from '@/utils/cache.js'

  export default {
    components: {
      pageHeader
    },
    name: 'index',
    data() {
      return {
        banner: require('@/assets/img/gyt/banner.png'),
        list: [
          {
            label: '自助报港',
            img: require('@/assets/img/gyt/zzbg.png'),
            path: '/selfBg'
          },
          {
            label: '集装箱报港',
            img: require('@/assets/img/gyt/jzxbg.png'),
            path: '/boxBg'
          },
          {
            label: '报港历史',
            img: require('@/assets/img/gyt/bgls.png'),
            path: '/bgHistory'
          },
          {
            label: '过闸管理',
            img: require('@/assets/img/gyt/gzgl.png'),
            path: '/lockManageIn'
          }
        ]
      }
    },
    created() {
      this.$store.dispatch('clearAll')
      setTitle(this.$route.meta.title)
    },
    mounted() {
      this.setDefaultShip()
    },
    methods: {
      linkTo(path) {
        this.$router.push({
          path
        })
      },
      setDefaultShip() {
        this.$store.commit('setShipName', getDefaultShip())
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    .top {
      .banner {
        img {
          width: 100%;
          height: 460px;
        }
      }
    }

    .content {
      display: flex;
      flex-wrap: wrap;
      padding: 0 40px;

      .item {
        width: 140px;
        text-align: center;
        margin: 40px;

        .img {
          img {
            width: 100%;
          }
        }

        .label {
          margin-top: 14px;

          p {
            font-size: 28px;
          }
        }
      }
    }
  }
</style>
