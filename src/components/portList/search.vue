<template>
  <div class="search">
    <van-search v-model="keyword"
                placeholder="请输入港口名称" />
  </div>
</template>

<script>
export default {
  name: 'search',
  data() {
    return {
      keyword: ''
    }
  },
  watch: {
    keyword() {
      this.$emit('sendKeyWord', this.keyword)
    }
  }
}
</script>

<style scoped lang='scss'>
.search {
  position: fixed;
  top: 0px;
  left: 0px;
  height: 108px;
  width: 100%;
  z-index: 10;
}
</style>
