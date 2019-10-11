<template>
  <div class="loading-spinner">
    <van-loading size="24px"
                 color="#1989fa"></van-loading>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.loading-spinner {
  width: 100vw;
  height: 100vh;
  background: #fff;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;
  .van-loading {
    left: 0;
    right: 0;
    top: 40%;
    margin: auto;
    text-align: center;
  }
}
</style>
