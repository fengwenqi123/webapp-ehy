<template>
  <div class="main">
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="form.shipName"
          required
          clearable
          label="船名"
          placeholder="请输入船名"
        />
        <van-popup
          v-model="showPicker"
          position="bottom"
        >
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
        </van-popup>
        <van-field
          v-model="form.refuelingPoint"
          required
          readonly
          clickable
          label="加油点"
          placeholder="请选择加油点"
          :error-message="errorMsg"
          @click="showPicker = true"
        />
        <van-field
          v-model="form.contacts"
          required
          clearable
          label="联系人"
          placeholder="请输入联系人"
          :error-message="errorMsg"
        />
        <van-field
          v-model="form.telephone"
          required
          clearable
          label="联系电话"
          placeholder="请输入联系电话"
          :error-message="errorMsg"
        />
      </van-cell-group>
    </div>
    <div class="bottom">
      <div class="bottom-btn-content">
        <van-button
          type="primary"
          class="bottom-button"
          @click="submit"
        >申请加油</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { addRefuel, refuelBoatList } from '@/api/refuel'
import { getUserInfos } from '@/api/validate'
import { setTitle } from '@/utils/cache.js'
export default {
  data() {
    return {
      checked: false,
      shipName: '',
      name: '',
      telephone: '',
      errorMsg: null,
      form: {
        shipName: null,
        refuelingPoint: null,
        contacts: null,
        telephone: null
      },
      value: '',
      showPicker: false,
      columns: []
    }
  },
  components: {
  },
  created() {
    this.userInfo()
    this.boatList()
    setTitle(this.$route.meta.title)
  },
  methods: {
    onConfirm(value) {
      this.form.refuelingPoint = value
      this.showPicker = false
    },
    submit() {
      if (!this.form.refuelingPoint || !this.form.contacts || !this.form.telephone) {
        this.errorMsg = '此项为必填项'
        return
      } else {
        this.errorMsg = null
      }
      this.form.refuelingPoint = this.form.refuelingPoint.split(' ')[0]
      addRefuel(this.form).then(response => {
        console.log(response)
        this.$toast.success('预约成功')
        this.$router.push({ name: 'refuel' })
      })
    },
    boatList() {
      refuelBoatList().then(response => {
        console.log(response)
        this.columns = response.data.map(item => item.name + ' ' + item.price + '元/L')
      })
    },
    userInfo() {
      getUserInfos().then(response => {
        console.log(response)
        this.form.shipName = response.data.shipName
        this.form.contacts = response.data.name
        this.form.telephone = response.data.mobile
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.main {
  .content {
    margin-top: 20px;
  }
  .bottom {
    .bottom-check {
      padding: 15px 0;
      .van-checkbox {
        margin-left: 20px;
        span {
          color: #666666;
          font-size: 25px;
          .inner {
            color: #108ee9;
          }
        }
      }
    }
    .bottom-btn-content {
      margin-top: 20px;
      width: 100%;
      text-align: center;
      .bottom-button {
        width: 90%;
        border-radius: 15px;
        margin: 0;
        font-size: 38px;
        background-color: #108ee9;
      }
      .van-button--primary {
        border: 2px solid #108ee9;
      }
    }
  }
}
</style>
