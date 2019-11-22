<template>
  <div class="container">
    <div class="header">
      <div class="left">
        您当前位于
      </div>
      <div class="right">
        <p>
          {{recoveryInfo.address}}
        </p>
        <p>
          生活垃圾投放点
        </p>
      </div>
    </div>
    <div class="main-list">
      <van-cell-group>
        <van-field v-model="type"
                   label="回收类型"
                   disabled
                   clickable
                   input-align="right" />
        <van-field v-model="recoveryInfo.shipName"
                   label="船舶名称"
                   disabled
                   clickable
                   input-align="right" />
        <van-field v-model="recoveryInfo.siteName"
                   label="回收点"
                   disabled
                   clickable
                   input-align="right" />
        <van-field v-model="recoveryInfo.attribute===1?'智能':'普通'"
                   label="回收点类型"
                   disabled
                   clickable
                   input-align="right" />
        <van-field v-model="recoveryInfo.type===3?'厨余垃圾':recoveryInfo.type===4?'其他垃圾':recoveryInfo.type===5?'可回收垃圾':'有害垃圾'"
                   label="垃圾分类"
                   disabled
                   clickable
                   input-align="right" />
        <van-field v-if="recoveryInfo.attribute!==1"
                   label-width="120px"
                   v-model="amount"
                   label="投放重量(KG)"
                   placeholder="请输入投放重量"
                   type="number"
                   clickable
                   input-align="right" />
      </van-cell-group>
      <div class="submit">
        <van-button @click="submit"
                    v-if="recoveryInfo.attribute===1"
                    class="button"
                    type="info"
                    size="large">确认开始排放</van-button>
        <van-button @click="submit1"
                    v-else
                    class="button"
                    type="info"
                    size="large">确认排放</van-button>
      </div>
    </div>
    <errors></errors>
  </div>
</template>

<script>
import errors from '@/views/sewageDisposal/errorTip'
import { mapGetters } from 'vuex'
import { Toast } from 'vant'
import { discharge } from '@/api/sewageDisposal'
import { setTitle, getLat, getLng } from '@/utils/cache.js'
export default {
  components: {
    errors
  },
  computed: {
    ...mapGetters([
      'recoveryInfo',
      'recoveryCode'
    ])
  },
  mounted() {
    setTitle(this.$route.meta.title)
  },
  data() {
    return {
      amount: null,
      type: '生活垃圾投放'
    }
  },
  methods: {
    submit() {
      const obj = {
        type: 3,
        shipName: this.recoveryInfo.shipName,
        code: this.recoveryCode,
        refuseType: parseFloat(this.recoveryInfo.type) - 2,
        orderWay: 1
      }
      discharge(obj).then(response => {
        Toast.success({
          message: response.msg,
          duration: 2000
        })
        setTimeout(() => {
          this.$router.push({
            path: '/success'
          })
        }, 2000)
      })
    },
    submit1() {
      if (!this.amount) {
        Toast('请先输入重量')
        return
      }
      const obj = {
        type: 3,
        shipName: this.recoveryInfo.shipName,
        code: this.recoveryCode,
        refuseType: parseFloat(this.recoveryInfo.type) - 2,
        amount: this.amount,
        orderWay: 1,
        currentLon: getLng(),
        currentLat: getLat()
      }
      discharge(obj).then(response => {
        Toast.success({
          message: response.msg,
          duration: 2000
        })
        setTimeout(() => {
          this.$router.push({
            path: '/success'
          })
        }, 2000)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .header {
    height: 62px;
    background: rgba(16, 142, 233, 1);
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 32px;
    color: #fff;
    font-size: 28px;
    .right {
      p:nth-child(2) {
        margin-top: 14px;
      }
    }
  }
}
</style>
