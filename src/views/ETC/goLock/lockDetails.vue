<template>
  <div class="container">
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="item.shipname"
          label="船舶名称"
          clickable
          disabled
          input-align="right"
        />
        <van-field
          v-model="goodType"
          label="货物类型"
          clickable
          disabled
          input-align="right"
        />
        <van-field
          v-model="amount"
          label="货物量"
          clickable
          disabled
          input-align="right"
        />
        <van-field
          v-model="item.lock"
          label="船闸"
          clickable
          disabled
          input-align="right"
        />
        <van-field
          v-model="je"
          label="缴费金额"
          clickable
          disabled
          input-align="right"
        />
        <van-field
          v-model="jfzt"
          label="缴费状态"
          clickable
          disabled
          input-align="right"
        />
        <van-field
          v-model="gzzt"
          label="过闸状态"
          clickable
          disabled
          input-align="right"
        />
      </van-cell-group>
    </div>
    <div class="button">
      <van-button type="info" plain hairline size="large" @click="refund">申请退款</van-button>
    </div>
  </div>
</template>

<script>
  import { setTitle } from '@/utils/cache.js'
  export default {
    name: 'lockDetails',
    data() {
      return {
        item: null,
        je: 0,
        jfzt: '已缴费',
        gzzt: '已过闸',
        amount: 0,
        goodType: null
      }
    },
    created() {
      setTitle(this.$route.meta.title)
      this.init()
    },
    methods: {
      init() {
        this.item = this.$route.params.obj
        var goodType = []
        this.item.goodList.forEach((item, index) => {
          this.amount += item.zhdw
          goodType.push(item.goodtype)
        })
        this.goodType = goodType.join(',')
      },
      refund() {
        this.$toast('金额为0，无法退款。')
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
