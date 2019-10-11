<template>
  <div class="main">
    <div class="content">
      <ul class="content-list">
        <li>
          <span>船名:</span>
          <span>{{form.shipName||'--'}}</span>
        </li>
        <li>
          <span>姓名:</span>
          <span>{{form.contacts||'--'}}</span>
        </li>
        <li>
          <span>联系电话:</span>
          <span>{{form.mobile||'--'}}</span>
        </li>
        <li>
          <span>保险类型:</span>
          <span>{{form.type||'--'}}</span>
        </li>
        <li>
          <span>保险价值:</span>
          <span>{{form.price||'--'}}</span>
        </li>

        <li>
          <span>保险金额:</span>
          <span>{{form.itemAmount||'--'}}</span>
        </li>
        <li>
          <span>保险费合计:</span>
          <span>{{form.actualAmount||'--'}}</span>
        </li>
        <li>
          <span>保单状态:</span>
          <span>{{form.status===1?'待处理':form.status===2?'待上传':form.status===3?'生效中':form.status===4?'已失效':form.status===5?'已关闭':'--'}}</span>
        </li>
        <li>
          <span>有效时间:</span>
          <span>{{form.startTime||'--'}}至{{form.endTime||'--'}}</span>
        </li>
      </ul>
      <van-row>
        <van-col span="8" v-for="item in this.form.list" :key="item.id">
          <img :src="item.url"/>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
// import { addInsurance } from '@/api/insurance'
export default {
  created() {
    setTitle(this.$route.meta.title)
    console.log(JSON.parse(this.$route.query.infos))
    this.form = JSON.parse(this.$route.query.infos)
  },
  data() {
    return {
      checked: false,
      shipName: '',
      name: '',
      telephone: '',
      errorMsg: null,
      form: {
      }
    }
  },
  components: {

  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.main{
  .content{
   .content-list{
     li{
       width:100%;
       background-color:#fff;
       border-bottom:1px solid #EEEEEE;
       span{
         display:inline-block;
         height:88px;
         line-height:88px;
       }
       span:nth-child(1){
         color:#888;
         width:30%;
         margin-left:40px;
       }
       span:nth-child(2){
         color:#333;
       }
     }
   }
   .van-row{
     .van-col{
       padding:10px;
       img{
        width:100%;
        height:200px;
       }
     }
   }
  }
}
</style>
