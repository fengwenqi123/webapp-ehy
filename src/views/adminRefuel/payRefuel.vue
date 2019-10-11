<template>
  <div class="main">
    <div class="content">
      <ul class="content-list">
        <li>
          <span>船名:</span>
          <span>{{form.shipName||'--'}}</span>
        </li>
        <li>
          <span>加油点:</span>
          <span>{{form.refuelingPoint||'--'}}</span>
        </li>
        <li>
          <span>联系人:</span>
          <span>{{form.contacts||'--'}}</span>
        </li>
        <li>
          <span>联系电话:</span>
          <span>{{form.telephone||'--'}}</span>
        </li>
        <li>
          <span>加油量（L）:</span>
          <span>{{form.capacity||'--'}}</span>
        </li>

        <li>
          <span>总金额（元）:</span>
          <span>{{form.price||'--'}}</span>
        </li>
        <li>
          <span>支付方式:</span>
          <span>{{form.payWay===1?'账户余额购买':form.payWay===2?'支付宝':form.payWay===3?'微信':'--'}}</span>
        </li>
        <li>
          <span>状态:</span>
          <span>{{form.status===1?'待加油':form.status===2?'待支付':form.status===3?'已完成 ':form.status===4?'待退款':form.status===5?'已退款':form.status===6?'已关闭':'--'}}</span>
        </li>
      </ul>
      <div class="bottom" v-if=" form.status !==4 && form.status!==5 && form.status!==6">
          <div class="bottom-btn-content">
            <van-button  type="primary"  class="bottom-button" @click="submit">申请退款</van-button>
          </div>
      </div>
      <van-dialog v-model="show"  title="标题" show-cancel-button :before-close="confirmClose" @confirm="confirm">
        <van-field v-model="description" type="textarea" required label="备注" placeholder="请输入备注" :error-message="errorMsg"/>
      </van-dialog>
    </div>
  </div>
</template>

<script>
import { payBack, oilMoney } from '@/api/adminRefuel'
import { setTitle } from '@/utils/cache.js'
export default {
  created() {
    setTitle(this.$route.meta.title)
    console.log(JSON.parse(this.$route.query.infos))
    this.form = JSON.parse(this.$route.query.infos)
  },
  data() {
    return {
      show: false,
      oil: false,
      description: null,
      money: false,
      showPicker: false,
      columns: ['账户余额购买', '支付宝', '微信'],
      checked: false,
      shipName: '',
      name: '',
      telephone: '',
      errorMsg: null,
      form: {
        payWay: ''
      },
      payWay: ''
    }
  },
  components: {
  },
  methods: {
    onConfirm(value) {
      this.form.payWay = value
      this.showPicker = false
    },
    confirm() {
      console.log(!this.description)
    },
    confirmClose(action, done) {
      if (!this.description) {
        this.errorMsg = '请填写备注'
        done(false) // 不关闭弹框
      }
      if (action === 'confirm') {
        payBack(this.form.id, this.description).then(response => {
          console.log(response)
          this.$toast.success('申请退款成功')
          this.$router.push({ name: 'adminRefuel' })
        })
      }
    },
    submit() {
      this.show = true
    },
    getOli() {
      // 计算总金额
      oilMoney(1, this.form.refuelingPoint, this.form.capacity, '').then(response => {
        this.form.price = response.data
      })
    },
    getMoney() {
      // 计算升数
      oilMoney(2, this.form.refuelingPoint, '', this.form.price).then(response => {
        this.form.capacity = response.data
      })
    }
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
    .bottom{
    .bottom-check{
      padding:15px 0;
      .van-checkbox{
            margin-left:20px;
            span{
              color:#666666;
             font-size:25px;
             .inner{
               color:#108EE9;
             }
            }
          }
    }
    .bottom-btn-content{
      margin-top:20px;
      width:100%;
      text-align: center;
      .bottom-button{
            width:90%;
            border-radius: 15px;
            margin:0;
            font-size:38px;
            background-color:#108EE9;
          }
      .van-button--primary{
      border:2px solid #108EE9;
      }
    }

  }
  }
}
</style>
