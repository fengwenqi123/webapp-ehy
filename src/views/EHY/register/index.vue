<template>
  <div class="container">
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="form.name"
          label="姓名"
          required
          placeholder="请输入姓名"
          clickable
          input-align="right"
        />
        <van-field
          v-model="form.idCard"
          label="身份证"
          required
          placeholder="请输入身份证"
          clickable
          input-align="right"
        />
        <van-field
          v-model="form.mobile"
          label="手机号"
          type="tel"
          required
          placeholder="请输入手机号"
          clickable
          input-align="right"
        />
        <van-field
          v-model="form.code"
          type="number"
          center
          required
          clearable
          label="验证码"
          placeholder="请输入短信验证码"
        >
          <van-button @click="_getSms" :disabled="disabled" slot="button" size="small" type="info">{{smsText}}</van-button>
        </van-field>
        <van-field
          v-model="form.password"
          label="密码"
          required
          type="password"
          placeholder="请输入密码"
          clickable
          input-align="right"
        />
        <van-field
          v-model="form.channel"
          label="推广单位"
          is-link
          disabled
          required
          input-align="right"
          placeholder="请选择推广单位"
          @click="unitList"
        />
      </van-cell-group>
      <div class="submit" @click="submit">
        <van-button type="info" size="large">注 册</van-button>
      </div>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        title="站点"
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import { getSms, getRegister } from '@/api/register.js'
  import { Toast } from 'vant'
  var smsText = 60
  export default {
    name: 'index',
    data() {
      return {
        smsText: '发送验证码',
        disabled: false,
        form: {
          name: null,
          idCard: null,
          mobile: null,
          channel: null,
          code: null,
          password: null,
          loginName: null
        },
        showPicker: false,
        columns: ['吴山渡站', '太湖站', '南浔港航管理检查站', '乾元站', '新市站', '环城站', '洪桥站', '双林站', '武康站', '马家渡站', '雉城站', '吕山站', '菱湖站', '小浦站', '和平站']
      }
    },
    methods: {
      // 获取验证码
      _getSms() {
        if (!this.form.mobile) {
          Toast('请填写手机号')
          return
        }
        const type = 1
        getSms(type, this.form.mobile).then(response => {
          this.CountDown()
        })
      },
      CountDown() {
        setTimeout(() => {
          if (smsText > 0) {
            this.disabled = true
            smsText--
            this.smsText = smsText + ' s'
            this.CountDown()
          } else {
            smsText = 60
            this.smsText = '发送验证码'
            this.disabled = false
          }
        }, 1000)
      },
      unitList() {
        this.showPicker = true
      },
      submit() {
        if (!this.form.name) {
          Toast('请输入姓名')
          return
        } if (!this.form.name) {
          Toast('请输入姓名')
          return
        } if (!this.form.idCard) {
          Toast('请输入身份证')
          return
        } if (!this.form.mobile) {
          Toast('请输入手机号')
          return
        } if (!this.form.code) {
          Toast('请输入短信验证码')
          return
        } if (!this.form.password) {
          Toast('请输入密码')
          return
        } if (!this.form.channel) {
          Toast('请选择推广单位')
          return
        }
        this.form.loginName = this.form.mobile
        getRegister(this.form).then(response => {

        })
      },
      onConfirm(value) {
        this.form.channel = value
        this.showPicker = false
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    position: absolute;
    width: 100%;
    background: #fff;
  }
</style>
