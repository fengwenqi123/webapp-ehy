<template>
  <div class="container">
    水位
  </div>
</template>

<script>
/* eslint-disable object-curly-spacing,prefer-const,no-undef */
import Vue from 'vue'

export default {
  data() {
    return {
      already: require('@/assets/img/already.png'),
      wait: require('@/assets/img/wait.png'),
      list: [],
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      consignee: null,
      token: null
    }
  },
  created() {
  },
  methods: {
    watchs(id) {
      Vue.prototype.expActive = id
      this.$router.push(
        {
          path: '/expList'
        }
      )
    },
    qrcode() {
      this.$router.push(
        {
          path: '/expQrcode'
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  margin: 0 auto;
  padding: 20px 40px;
  box-sizing: border-box;
}
</style>
