<template>
  <div class="container">
    <div class="content">
      <div class="shop-name">
        <div class="img">
          <img
            src="http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg"
            alt=""
          />
        </div>
        <div class="info">
          <div class="name">
            商品名称
          </div>
          <div class="num">×{{ 1 }}</div>
        </div>
      </div>
      <div class="field">
        <van-cell-group>
          <van-field
            value="浙湖州货1258"
            label="船舶名称"
            input-align="right"
            disabled
          />
          <van-field
            value="860"
            label="可用积分"
            input-align="right"
            disabled
          />
          <van-field
            value="城东服务区"
            label="兑换地点"
            input-align="right"
            readonly
            is-link
          />
          <van-field
            value="300"
            label="兑换积分"
            input-align="right"
            disabled
          />
        </van-cell-group>
      </div>
      <div class="exchange-num">
        <div class="label">
          兑换数量
        </div>
        <div class="value">
          <van-stepper v-model="value" integer />
        </div>
      </div>
    </div>
    <div class="button">
      <button>确认兑换</button>
      <div class="total">
        <span>合计</span>
        <p>300积分</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      value: 1
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .content {
    .shop-name {
      padding: 32px;
      display: flex;
      align-items: flex-start;
      background: #fff;
      border-bottom: 1px solid #eeeeee;
      .img {
        img {
          width: 180px;
          height: 180px;
        }
      }
      .info {
        margin-left: 30px;
        .name {
          margin-top: 20px;
          font-size: 34px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
        }
        .num {
          margin-top: 20px;
          font-size: 30px;
          font-weight: 400;
          color: rgba(136, 136, 136, 1);
        }
      }
    }
    .exchange-num {
      display: flex;
      border-top: 1px solid #eeeeee;
      justify-content: space-between;
      align-items: center;
      padding: 0 32px;
      background: #fff;
      height: 116px;
    }
  }
  .button{
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 120px;
    background: #fff;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    .total{
      /*margin-left: 435px;*/
      text-align: right;
      span{
        font-size:22px;
        font-weight:400;
        color:rgba(170,170,170,1);
      }
      p{
        margin-top: 8px;
        font-size:26px;
        font-weight:600;
        color:rgba(255,162,0,1);
      }
    }
    button{
      border: none;
      width:164px;
      height:60px;
      background:rgba(16,142,233,1);
      border-radius:6px;
      text-align: center;
      color: #fff;
      line-height: 60px;
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}
</style>
