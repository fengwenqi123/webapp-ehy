<template>
  <div class="container">
    <div class="header">
      <div class="left">
        油污水回收船
      </div>
      <div class="right">
        <p>
          {{recoveryInfo.shipName}}
        </p>
      </div>
    </div>
    <div class="main-list">
      <van-cell-group>
        <van-field v-model="type" label="回收类型" disabled clickable input-align="right" />
        <van-field v-model="recoveryInfo.shipName" label="船舶名称" disabled clickable input-align="right" />
        <van-field v-model="recoveryInfo.siteName" label="回收点" disabled clickable input-align="right" />
        <van-field v-model="recoveryInfo.name" label="排放口" disabled clickable input-align="right" />
        <van-field v-model="recoveryInfo.attribute===1?'智能':'普通'" label="排放口类型" disabled clickable input-align="right" />
        <van-field v-if="recoveryInfo.attribute!==1" v-model="amount" label="排放容积(L)" placeholder="请输入排放容积" type="number" clickable input-align="right" />
      </van-cell-group>
      <div class="submit">
        <van-button @click="getLocation('submit')" v-if="recoveryInfo.attribute===1" class="button" type="info" size="large">确认开始排放</van-button>
        <van-button @click="getLocation('submit1')" v-else class="button" type="info" size="large">确认排放</van-button>
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
import { setTitle } from '@/utils/cache.js'
import { getLocation } from '@/mixins/getLocation'
export default {
  mixins: [getLocation],
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
      type: '油污水回收'
    }
  },
  methods: {
    submit(lng, lat) {
      const obj = {
        type: 2,
        shipName: this.recoveryInfo.shipName,
        code: this.recoveryCode,
        orderWay: 1,
        currentLon: lng,
        currentLat: lat
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
    submit1(lng, lat) {
      if (!this.amount) {
        Toast('请先输入容积')
        return
      }
      const obj = {
        type: 2,
        shipName: this.recoveryInfo.shipName,
        code: this.recoveryCode,
        amount: this.amount,
        orderWay: 1,
        currentLon: lng,
        currentLat: lat
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
    height: 42px;
    background: rgba(16, 142, 233, 1);
    box-shadow: 0px 1px 0px 0px rgba(238, 238, 238, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40px 32px;
    color: #fff;
    font-size: 28px;
  }
}
</style>
