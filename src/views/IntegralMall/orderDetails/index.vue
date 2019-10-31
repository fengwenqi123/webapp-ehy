<template>
<div class="container">
<div class="header">
  <div class="img">
    <img src="../../../assets/img/shop/order-logo.png" alt="">
  </div>
  <div class="code">
    <span>兑换码</span>
    <p>123456</p>
  </div>
</div>
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
          value="12344555533311122"
          label="兑换订单号"
          input-align="right"
          disabled
        />
        <van-field
          value="300"
          label="兑换积分"
          input-align="right"
          disabled
        />
        <van-field
          value="城东服务区"
          label="兑换地点"
          input-align="right"
          disabled
        />
        <van-field
          value="2019-10-18 11:19:40"
          label="下单时间"
          input-align="right"
          disabled
        />
        <van-field
          value="有效期至2020-01-19"
          label="兑换时间"
          input-align="right"
          disabled
        />
      </van-cell-group>
    </div>
  </div>
  <div class="button">
    <van-button type="default" plain  size="large">申请退款</van-button>
  </div>
</div>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped lang="scss">
.container{
  .header{
    height: 240px;
    background: url("../../../assets/img/shop/order-details.png") no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .img{
      img{
        width: 210px;
        height: 210px;
      }
    }
    .code{
      span{
        display: inline-block;
        font-size:26px;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
      p{
        margin-top: 20px;
        font-size:50px;
        font-weight:400;
        color:rgba(255,255,255,1);
      }
    }
  }
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
  }
  .button{
    width: 90%;;
    margin: 40px auto;
    .van-button__text{
      font-size:30px;
      font-weight:400;
      color:rgba(51,51,51,1);
    }
  }
}
</style>
