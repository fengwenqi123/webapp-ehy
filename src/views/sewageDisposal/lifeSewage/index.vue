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
          生活污水回收点
        </p>
      </div>
    </div>

    <div class="main-list">
      <div class="list-top">
        <p>
          <span>回收类型</span>
          <span>{{type}}</span>
        </p>
        <p>
          <span>船舶名称</span>
          <span>{{recoveryInfo.shipName}}</span>
        </p>
        <p>
          <span>回收点</span>
          <span>{{recoveryInfo.siteName}}</span>
        </p>
        <p>
          <span>排放口</span>
          <span>{{recoveryInfo.name}}</span>
        </p>
        <p>
          <span>排放口类型</span>
          <span>{{recoveryInfo.attribute===1?'智能':'普通'}}</span>
        </p>
      </div>
      <!-- <van-cell-group>
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
        <van-field v-model="recoveryInfo.name"
                   label="排放口"
                   disabled
                   clickable
                   input-align="right" />
        <van-field v-model="recoveryInfo.attribute===1?'智能':'普通'"
                   label="排放口类型"
                   disabled
                   clickable
                   input-align="right" />
      </van-cell-group> -->
      <div class="submitField">
        <van-field style="margin-top:20px" class="submitNumber" v-if="recoveryInfo.attribute!==1" v-model="amount" label="排放量" placeholder="请输入排放量" type="number" clickable error-message="请输入100-1000的数字" input-align="right" />
        <span v-if="recoveryInfo.attribute!==1">(L)</span>
      </div>
      <div class="submit">
        <van-button @click="getLocation('submit')" v-if="recoveryInfo.attribute===1" class="button" type="info" size="large">确认开始排放</van-button>
        <van-button @click="getLocation('submit1')" v-else class="button" type="info" size="large">确认排放</van-button>
      </div>
    </div>
    <errors :info="info"></errors>
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
  created() {
  },
  mounted() {
    setTitle(this.$route.meta.title)
    this.info = this.recoveryInfo
  },
  data() {
    return {
      amount: null,
      type: '生活污水回收',
      // recoveryInfo: { siteName: '122' },
      info: {}
    }
  },
  methods: {
    submit(lng, lat) {
      const obj = {
        type: 1,
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
            path: '/successWaterAuto'
          })
        }, 2000)
      })
    },
    submit1(lng, lat) {
      if (!this.amount) {
        Toast('请先输入排放量')
        return
      }
      if (this.amount < 100) {
        Toast('请输入大于100的值')
        return
      }
      if (this.amount > 1000) {
        Toast('请输入小于1000的值')
        return
      }

      const obj = {
        type: 1,
        shipName: this.recoveryInfo.shipName,
        code: this.recoveryCode,
        amount: this.amount,
        orderWay: 1,
        status: 3,
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
    height: 82px;
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
  .main-list {
    .list-top {
      padding: 0 20px;
      background-color: #108ee9;
      border-top: 1px solid #fff;
      p {
        display: flex;
        height: 80px;
        justify-content: space-between;
        align-items: center;
        span {
          color: #fff;
        }
      }
    }
  }
}
.submitField {
  position: relative;
  span {
    position: absolute;
    color: red;
    font-weight: bold;
    left: 140px;
    top: 20%;
  }
}
</style>
