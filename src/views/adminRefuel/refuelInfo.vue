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
        <van-field
          label-width="110px"
          v-model="form.refuelingPoint"
          clearable
          label="加油点"
          placeholder="请输入加油点"
          :error-message="errorMsg"
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
        <van-field
          label-width="110px"
          clickable
          label="支付方式"
          :value="form.payWay"
          placeholder="支付方式"
          @click="showPicker = true"
          clearable
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
          >加油完成</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { addRefuel, oilMoney } from '@/api/adminRefuel'
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
      money: false,
      showPicker: false,
      columns: ['支付宝'],
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
    submit() {
      this.$dialog.confirm({
        title: '提示',
        message: `本次加油 ${this.form.capacity} L,总金额 ${this.form.price} 元`
      }).then(() => {
        this.payWay = this.form.payWay === '账户余额购买' ? 1 : this.form.payWay === '支付宝' ? 2 : this.form.payWay === '微信' ? 3 : ''
        addRefuel(this.form.id, this.form.capacity, this.form.price, this.payWay).then(response => {
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
