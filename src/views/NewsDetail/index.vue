<template>
  <div class="container">
    <div class="news">
      <h1>{{obj.title}}</h1>
      <div class="title-type">
        <span>{{obj.categoryName}}</span>
        <span>{{obj.addTimeString.slice(0,10)}}</span>
      </div>
      <p v-html="obj.content"></p>
    </div>
    <!-- 遮罩 -->
    <div v-if="loadingSpinner">
      <cjb-loading></cjb-loading>
    </div>
  </div>
</template>
<script>
// import { selectByUserId } from '@/api/NewDetail.js'
import { getId } from '@/utils/cache'
import cjbLoading from '@/components/cjbLoading'

export default {
  name: 'index',
  data() {
    return {
      id: getId(),
      loadingSpinner: true,
      obj: ''
    }
  },
  created() {
    this.getNews()
  },
  components: {
    cjbLoading
  },
  methods: {
    getNews() {
      const xhr = new XMLHttpRequest()
      xhr.open('get', 'https://api.cjbe88.com/news/news/' + this.id, true)
      xhr.send()
      // 4、指定一些回调函数
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.obj = JSON.parse(xhr.responseText).data
            console.log(this.obj)
            this.loadingSpinner = false
            // alert(JSON.stringify(xhr.responseText))
          } else {
            // alert(xhr)
          }
        }
      }

      // selectByUserId().then(response => {
      //   console.log(response)
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.news {
  padding: 0.4rem;
  h1 {
    text-align: center;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 0.5rem;
  }
  .title-type {
    padding: 0.4rem 0 0.2rem 0;
    span {
      color: #fd6161;
      font-size: 0.4rem;
    }
    span:last-child {
      color: #888;
      padding-left: 1rem;
    }
  }
  p {
    font-size: 0.4rem;
    line-height: 0.6rem;
    margin-top: 0.3rem;
  }
}
</style>
