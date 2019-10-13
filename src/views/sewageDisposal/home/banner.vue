<template>
  <div class="container">
    <p @click="pathTo">
      排污积分：<span>{{ 100 }} ></span>
    </p>
    <div class="sys">
      <img
        @click="getCode"
        src="../../../assets/img/sewage/sys.png"
        alt="扫一扫"
      />
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { recoveryInfo } from '@/api/sewageDisposal'
  import { getGoQr } from '@/utils/cache.js'

  export default {
    data() {
      return {
        code: null
      }
    },
    computed: {
      ...mapGetters([
        'eshipName'
      ])
    },
    mounted() {
      window.callBackCode = this.callBackCode
    },
    methods: {
      pathTo() {
        this.$router.push({
          path: '/shipIntegral'
        })
      },
      getCode() {
        getGoQr()
      },
      callBackCode(code) {
        this.code = code
        this.$store.commit('setrecoveryCode', this.code)
        this.getRecoveryInfo()
      },
      getRecoveryInfo() {
        recoveryInfo(this.eshipName, this.code).then(response => {
          this.$store.commit('setRecoveryInfo', response.data)
          switch (response.data.type) {
            case 1:
              this.$router.push({
                path: '/lifeSewage'
              })
              break
            case 2:
              this.$router.push({
                path: '/oilSewage'
              })
              break
            default:
              this.$router.push({
                path: '/rubbishSewage'
              })
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    position: relative;
    height: 380px;
    background: rgba(16, 142, 233, 1);

    p {
      padding-top: 24px;
      padding-left: 32px;
      font-size: 30px;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);

      span {
        font-size: 48px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }

    .sys {
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -110px;
      margin-left: -110px;

      img {
        width: 220px;
        height: 220px;
      }
    }
  }
</style>
