<template>
  <div class="container">
    <template v-if="showError===1">
      <div class="list">
        <van-tabs v-model="active" sticky animated swipeable color="#1989FA" title-active-color="#1989FA">
          <van-tab title="我的待闸">
            <lock-list-my/>
          </van-tab>
          <van-tab title="所有待闸">
            <lock-list-all/>
          </van-tab>
        </van-tabs>
      </div>
    </template>
    <template v-if="showError===2">
      <p>用户信息获取失败</p>
    </template>
  </div>
</template>

<script>
  import pageHeader from '@/components/navBar'
  import lockListMy from './lockListMy'
  import lockListAll from './lockListAll'
  import { setTitle } from '@/utils/cache.js'
  import { getAccessToken, getUserInfo } from '@/api/validate'
  import { getCode } from '@/utils/cache.js'

  export default {
    components: {
      pageHeader,
      lockListMy,
      lockListAll
    },
    data() {
      return {
        active: 0,
        code: getCode(),
        appId: '1KKSAkQTCeqw6GGXUN4iB',
        showError: 1
      }
    },
    created() {
      this.getTokenAndUserInfo()
      setTitle(this.$route.meta.title)
    },
    methods: {
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

</style>
