<template>
  <div class="main">
    <div class="content">
      <van-cell-group>
        <van-field
          label-width="110px"
          v-model="form.shipName"
          clearable
          label="船名"
          placeholder="请输入船名"
          :error-message="errorMsg"
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
          label-width="110px"
          v-model="form.refuelingPoint"
          readonly
          clickable
          label="加油点"
          placeholder="请选择加油点"
          :error-message="errorMsg"
          @click="showPicker = true"
        />
        <van-field
          label-width="110px"
          v-model="form.contacts"
          clearable
          label="联系人"
          placeholder="请输入联系人"
          :error-message="errorMsg"
        />
        <van-field
          label-width="110px"
          v-model="form.telephone"
          clearable
          label="联系电话"
          placeholder="请输入联系电话"
          :error-message="errorMsg"
        />
        <van-field
          label-width="110px"
          v-model="form.capacity"
          clearable
          label="加油量（L）"
          @blur="getOli"
          placeholder="总金额和加油量二选一输入"
          :error-message="errorMsg"
        />
        <van-field
          label-width="110px"
          v-model="form.price"
          clearable
          label="总金额（元）"
          @blur="getMoney"
          placeholder="总金额和加油量二选一输入"
          :error-message="errorMsg"
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
      </van-cell-group>
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
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { addPersonRefuel, oilMoney } from '@/api/adminRefuel'
import { refuelBoatList } from '@/api/refuel'
export default {
  data() {
    return {
      show: false,
      oil: false,
      money: false,
      checked: false,
      shipName: '',
      name: '',
      telephone: '',
      errorMsg: null,
      form: {
        payWay: '',
        price: '',
        capacity: ''
      },
      payWay: '',
      value: '',
      showPicker: false,
      columns: []
    }
  },
  components: {
  },
  created() {
    this.boatList()
    setTitle(this.$route.meta.title)
  },
  methods: {
    onConfirm(value) {
      this.form.refuelingPoint = value
      this.showPicker = false
    },
    boatList() {
      refuelBoatList().then(response => {
        console.log(response)
        this.columns = response.data.map(item => item.name + ' ' + item.price + '元/L')
      })
    },
    submit() {
      this.$dialog.confirm({
        title: '提示',
        message: `本次加油 ${this.form.capacity} L,总金额 ${this.form.price} 元`
      }).then(() => {
        this.form.refuelingPoint = this.form.refuelingPoint.split(' ')[0]
        addPersonRefuel(this.form.shipName, this.form.telephone, this.form.contacts, this.form.capacity, this.form.price, this.form.refuelingPoint).then(response => {
          console.log(response)
          this.$toast.success('加油成功')
          this.$router.push({ name: 'adminRefuel' })
        })
      }).catch(() => {
        // on cancel
      })
    },
    getOli() {
      // 计算总金额
      this.form.refuelingPoint = this.form.refuelingPoint.split(' ')[0]
      oilMoney(1, this.form.refuelingPoint, this.form.capacity, '').then(response => {
        this.form.price = response.data
        console.log(this.form.price)
      })
    },
    getMoney() {
      // 计算升数
      this.form.refuelingPoint = this.form.refuelingPoint.split(' ')[0]
      oilMoney(2, this.form.refuelingPoint, '', this.form.price).then(response => {
        this.form.capacity = response.data
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.main {
  .content {
    .content-list {
      li {
        width: 100%;
        background-color: #fff;
        border-bottom: 1px solid #eeeeee;
        span {
          display: inline-block;
          height: 88px;
          line-height: 88px;
        }
        span:nth-child(1) {
          color: #888;
          width: 30%;
          margin-left: 40px;
        }
        span:nth-child(2) {
          color: #333;
        }
      }
    }
    .van-row {
      .van-col {
        padding: 10px;
        img {
          width: 100%;
          height: 200px;
        }
      }
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
}
</style>
