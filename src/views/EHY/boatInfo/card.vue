<template>
  <div class="card">
    <van-row>
      <van-col v-for="item in itemList" :key="item.id" :span="24">
        <p>{{item.card}}</p>
        <p>证书有效期：{{item.date}}</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemList: [
        { id: '1', card: '船舶营业运输证', date: '2020-04-30' },
        { id: '2', card: '船舶营业运输证', date: '2020-04-30' },
        { id: '3', card: '船舶营业运输证', date: '2020-04-30' }
      ]
    }
  }

}
</script>

<style scoped lang="scss">
.card {
  .van-row {
    background-color: #fff;
    padding: 0 20px;
    .van-col {
      border-top: 1px solid #eee;

      p:nth-child(1) {
        font-size: 40px;
        line-height: 100px;
        font-weight: bold;
      }
      p:nth-child(2) {
        font-size: 30px;
        color: #888;
        line-height: 80px;
      }
    }
  }
}
</style>