<template>
  <div class="container">
    <div class="content">
      <div class="title">
        <div class="nav-bar">
          <van-nav-bar
            :title="title"
            left-text="返回"
            left-arrow
            @click-left="onClickLeft"
          >
          </van-nav-bar>
        </div>
      </div>
      <p v-html="content"></p>
    </div>
  </div>
</template>

<script>
import { getFinishWeb } from '@/utils/cache.js'
export default {
  name: 'aboutContent',
  data() {
    return {
      content: null,
      title: null,
      flag: null
    }
  },
  created() {
    this.getQuery()
  },
  methods: {
    getQuery() {
      this.content = this.$route.query.content
      this.title = this.$route.query.title
      this.flag = this.$route.query.flag
    },
    onClickLeft() {
      if (this.flag) {
        this.$router.go(-1)
      } else {
        getFinishWeb()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;

  p {
    margin: 10px 40px;
  }
}
</style>
