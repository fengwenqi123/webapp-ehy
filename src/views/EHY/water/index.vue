<template>
  <div class="container">
    <div class="list">
      <p>{{address}}</p>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
/* eslint-disable object-curly-spacing,prefer-const,no-undef */
import { waterList } from '@/api/ehy.js'
export default {
  data() {
    return {
      address: '湖州市'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      waterList().then(response => {

      })
        .catch(error => {
          console.log(error)
        })
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
