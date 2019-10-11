<template>
  <div class="container">
    <template v-if="showError===1">
      <div class="top">
        <div class="banner">
          <img :src="banner" alt="">
        </div>
      </div>
      <div class="content">
        <van-row gutter="40">
          <van-col span="8" v-for="(item,index) in list" :key="index">
            <div class="item" @click="linkTo(item.path)">
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <div class="label">
                <p>{{item.label}}</p>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
    </template>
    <template v-if="showError===2">
      <p>用户信息获取失败</p>
    </template>
  </div>
</template>

<script>
  import pageHeader from '@/components/navBar'
  import { getAccessToken, getUserInfo } from '@/api/validate'
  import { getCode } from '@/utils/cache.js'
  import { mapGetters } from 'vuex'
  import { setTitle } from '@/utils/cache.js'

  export default {
    components: {
      pageHeader
    },
    name: 'index',
    computed: {
      ...mapGetters([
        'userInfos'
      ])
    },
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
        ],
        code: getCode(),
        appId: '1KKSAkQTCeqw6GGXUN4iB',
        showError: 1
      }
    },
    created() {
      this.$store.dispatch('clearAll')
      setTitle(this.$route.meta.title)
    },
    mounted() {
      this.getTokenAndUserInfo()
    },
    methods: {
      linkTo(path) {
        this.$router.push({
          path
        })
      },
      getTokenAndUserInfo() {
        if (!this.userInfos) {
          const obj = {
            appId: this.appId,
            secret: '2iqPvudiVWhUMreSHxCBWt',
            code: this.code,
            grantType: 'authorization_code'
          }
          getAccessToken(obj).then(response => {
            const accessToken = response.data.accessToken
            const openId = response.data.openId
            getUserInfo(accessToken, openId).then(res => {
              this.$store.commit('setUserInfo', res.data)
              this.showError = 1
            }).catch(error => {
              console.log(error)
              this.showError = 2
            })
          })
        }
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
      padding: 0 40px;

      .item {
        width: 140px;
        text-align: center;
        margin: 40px auto;

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
