<template>
  <div class="boatInfo">
    <van-row>
      <van-col :span="12">
        <p>船名号</p>
        <p>{{items.zwcm || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>船籍港</p>
        <p>{{items.cjgmc || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>船检登记号</p>
        <p>{{items.cjdjh || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>船舶登记号</p>
        <p>{{items.cbdjh || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>船舶种类</p>
        <p>{{items.cbzlmc || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>船舶识别号</p>
        <p>{{items.cbsbh || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>主机功率（千瓦）</p>
        <p>{{items.zjzgl || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>参考载货量</p>
        <p>{{items.ckzzd || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>总吨位</p>
        <p>{{items.zdw || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>净吨位</p>
        <p>{{items.jdw || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>吃水空载（米）</p>
        <p>{{items.kzcs || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>吃水满载（米）</p>
        <p>{{items.mzcs || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>总长</p>
        <p>{{items.cbzc || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>型宽（米）</p>
        <p>{{items.cbxk || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>型深（米）</p>
        <p>{{items.cbxs || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>船舶所有人</p>
        <p>{{items.syr || '--'}}</p>
      </van-col>
      <van-col :span="24">
        <p>船舶经营人</p>
        <p>{{items.jyr || '--'}}</p>
      </van-col>
      <van-col :span="12">
        <p>经营人电话</p>
        <p>{{items.jyrlxdh || '--'}}</p>
      </van-col>
    </van-row>
  </div>
</template> 

<script>
import { shipInfo } from '@/api/ehy.js'
import { getCbsbh } from '@/utils/cache.js'

export default {
  data() {
    return {
      infoObj: {},
      items: []
    }
  },
  created() {
    console.log(this.$route.query.info)
    if (this.$route.query.info) {
      this.infoObj = this.$route.query.info
      this.getCbsbh(this.infoObj.cbsbh)
    } else {
      this.getCbsbh(getCbsbh())
    }
  },
  methods: {
    getCbsbh(cbsbh) {
      shipInfo(cbsbh).then(response => {
        // console.log(response)
        this.items = response.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.boatInfo {
  padding: 40px;
  .van-row {
    .van-col {
      margin: 10px 0;
      p {
        line-height: 50px;
        &:nth-child(1) {
          color: #888;
          font-size: 32px;
        }
        &:nth-child(2) {
          color: #333;
          font-size: 40px;
        }
      }
    }
  }
}
</style>