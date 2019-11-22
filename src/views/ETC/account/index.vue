<template>
  <div class="container">
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="account"
          label="电子账号"
          clickable
          disabled
          input-align="right"
        />
        <van-field
          v-model="balance"
          label="账户余额"
          clickable
          disabled
          input-align="right"
        />
      </van-cell-group>
    </div>
    <div class="button" @click="Recharge">
      <van-button type="info" plain hairline size="large">充 值</van-button>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { setTitle } from '@/utils/cache'

  export default {
    name: 'index',
    data() {
      return {
        account: '628596325874125263698',
        balance: '0元'
      }
    },
    created() {
      setTitle(this.$route.meta.title)
    },
    methods: {
      Recharge() {
        Toast('因政策原因，暂时无法充值。')
      }
    }
  }
</script>

<style scoped lang="scss">
  .button {
    width: 600px;
    margin: 40px auto;
  }
</style>
