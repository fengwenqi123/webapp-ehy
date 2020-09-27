<template>
  <div class="container">
    <div class="content">
      <van-cell-group>
        <van-field v-model="item.shipname"
                   label="船舶名称"
                   clickable
                   disabled
                   input-align="right" />
        <van-field v-model="goodType"
                   label="货物类型"
                   clickable
                   disabled
                   input-align="right" />
        <van-field v-model="amount"
                   label="货物量"
                   clickable
                   disabled
                   input-align="right" />
        <van-field v-model="item.channel"
                   label="航道"
                   clickable
                   disabled
                   input-align="right" />
        <van-field v-model="je"
                   label="缴费金额"
                   clickable
                   disabled
                   input-align="right" />
        <van-field v-model="jfzt"
                   label="缴费状态"
                   clickable
                   disabled
                   input-align="right" />
        <van-field v-model="gzzt"
                   label="过闸状态"
                   clickable
                   disabled
                   input-align="right" />
      </van-cell-group>
    </div>
    <div class="button" v-if="item.payStatus==2">
      <van-button type="info"
                  plain
                  hairline
                  size="large"
                  @click="refund">申请退款</van-button>

    </div>
    <div class="button">
      <van-button type="info"
                  hairline
                  size="large"
                  @click="openCheck">申请开票</van-button>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { Toast } from 'vant'
import { refund } from '@/api/etc.js'
export default {
  name: 'lockDetails',
  data() {
    return {
      item: null,
      je: 0.01,
      jfzt: '',
      gzzt: '已过闸',
      amount: 0,
      goodType: null
    }
  },
  created() {
    this.init()
    setTitle(this.$route.meta.title)
  },
  methods: {
    openCheck() {
      Toast.fail('政策原因，暂停开票功能')
    },
    init() {
      this.item = this.$route.params.obj
      switch (this.item.payStatus) {
        case 1:
          this.jfzt = '待支付'
          break
        case 2:
          this.jfzt = '已支付'
          break
        case 3:
          this.jfzt = '已退款'
          break
      }
      var goodType = []
      this.item.goodList.forEach((item, index) => {
        this.amount += item.zhdw
        goodType.push(item.goodtype)
      })
      this.goodType = goodType.join(',')
    },
    refund() {
      refund(this.item.id).then(res => {
        this.$toast.success('退款成功')
        setTimeout(() => {
          this.$router.push({
            path: '/fees'
          })
        }, 1500)
      })
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
