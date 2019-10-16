<template>
  <div class="card">
    <van-row>
      <van-col
        v-for="item in items"
        :key="item.id"
        :span="24"
        v-if="item.zsmc==='船舶营业运输证'||item.zsmc==='船舶国籍证书'"
      >
        <p>{{item.zsmc}}</p>
        <p>证书有效期：{{item.yxrq}}</p>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { certificate } from '@/api/ehy.js'
import { getCbdjh } from '@/utils/cache.js'
export default {
  data() {
    return {
      infoObj: {},
      items: []
    }
  },
  created() {
    if (this.$route.query.info) {
      this.infoObj = this.$route.query.info
      this.getCbsbh(this.infoObj.cbdjh)
    } else {
      this.getCbsbh(getCbdjh())
    }
  },
  methods: {
    getCbsbh(cbdjh) {
      certificate(cbdjh).then(response => {
        console.log(response)
        this.items = response.data
      })
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