<template>
<div>
  <div class="main">
    <div class="content">
      <van-cell title="请确认以下投保信息" value="" size="large" />
      <van-cell-group>
      <van-field v-model="form.shipName" required clearable label="船名" placeholder="请输入船名" :error-message="errorMsg1"/>
      <van-field v-model="form.contacts" required clearable label="联系人" placeholder="请输入联系人" :error-message="errorMsg2"/>
      <van-field v-model="form.mobile" required clearable label="联系电话" placeholder="请输入联系电话" :error-message="errorMsg3"/>
      </van-cell-group>
    </div>
    <div class="bottom">
      <div class="bottom-check">
        <van-checkbox v-model="checked">
          <span>船主即被保险人，请务必阅读<span class="inner">《xxx协议》</span></span>
        </van-checkbox>
      </div>
      <div class="bottom-btn-content">
         <van-button  type="primary"  class="bottom-button" @click="submit">开始预约</van-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { getUserInfos } from '@/api/validate.js'
import { addInsurance } from '@/api/insurance'
export default {
  data() {
    return {
      checked: false,
      shipName: '',
      name: '',
      telephone: '',
      errorMsg1: null,
      errorMsg2: null,
      errorMsg3: null,
      form: {
        shipName: null,
        contacts: null,
        mobile: null,
        status: 1
      }
    }
  },
  components: {
  },
  created() {
    setTitle(this.$route.meta.title)
    this.getUserInfo()
  },
  methods: {
    getUserInfo() {
      getUserInfos().then(response => {
        console.log(response)
        this.form.shipName = response.data.shipName
        this.form.mobile = response.data.mobile
        this.form.contacts = response.data.name
      })
    },
    submit() {
      if (!this.form.shipName) {
        this.errorMsg1 = '此项为必填项'
        return
      } else {
        this.errorMsg1 = null
      }
      if (!this.form.contacts) {
        this.errorMsg2 = '此项为必填项'
        return
      } else {
        this.errorMsg2 = null
      }
      if (!this.form.mobile) {
        this.errorMsg3 = '此项为必填项'
        return
      } else {
        this.errorMsg3 = null
      }
      if (!this.checked) {
        this.$toast.fail('请先阅读《xxx协议》')
        return
      }
      addInsurance(this.form).then(response => {
        console.log(response)
        this.$toast.success('预约成功')
        this.$router.push({ name: 'insurance' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main{
  .content{
    margin-top:20px;
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
</style>
