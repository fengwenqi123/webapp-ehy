<template>
  <div class="container">
    <div class="top">
      <div class="time-select" @click="showPicker=true">
        <span>{{selectTime}}</span>
        <img src="../../../assets/img/shop/bottom.png" alt="" />
      </div>
      <div class="tip">
        <span>本月消费：{{ 100 }}</span>
      </div>
    </div>
    <div class="content">
      <ul>
        <li v-for="item in 20">
          <div class="item">
            <div class="left">
              <img
                src="http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg"
                alt=""
              />
              <div class="info">
                <div class="name">商品名称</div>
                <div class="address">兑换地点：城东服务区</div>
                <div class="time">09-12 22:00</div>
              </div>
            </div>
            <div class="price">
              -300
            </div>
          </div>
        </li>
      </ul>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        :max-date="maxDate"
        type="year-month"
        @confirm="confirm"
        @cancel="cancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { timeChange } from '@/utils/index'
export default {
  name: 'index',
  data() {
    return {
      showPicker: false,
      currentDate: new Date(),
      maxDate: new Date(),
      selectTime: timeChange(new Date())
    }
  },
  methods: {
    confirm() {
      this.showPicker = false
      this.selectTime = timeChange(this.currentDate)
    },
    cancel() {
      this.showPicker = false
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .top {
    padding: 0 32px;
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .time-select {
      display: flex;
      align-items: center;
      width: 180px;
      height: 54px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(238, 238, 238, 1);
      border-radius: 27px;
      justify-content: center;
      span {
        font-size: 24px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      img {
        width: 17px;
        margin-left: 10px;
      }
    }
    .tip {
      font-size: 26px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .content {
    position: absolute;
    height: calc(100% - 110px);
    width: 100%;
    background: #fff;
    overflow: auto;
    ul {
      padding: 0 32px;
      li {
        .item {
          padding: 28px 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          border-bottom: 1px solid #eeeeee;
          .left {
            display: flex;
            align-items: flex-start;
            img {
              width: 76px;
              height: 76px;
              border-radius: 50%;
            }
            .info {
              margin-left: 32px;
              .name {
                font-size: 34px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              .address {
                margin-top: 10px;
                font-size: 26px;
                font-weight: 400;
                color: rgba(51, 51, 51, 1);
              }
              .time {
                margin-top: 10px;
                font-size: 26px;
                font-weight: 400;
                color: rgba(153, 153, 153, 1);
              }
            }
          }
          .price {
            font-size: 40px;
            font-weight: 500;
            color: rgba(241, 157, 82, 1);
          }
        }
      }
    }
  }
}
</style>
