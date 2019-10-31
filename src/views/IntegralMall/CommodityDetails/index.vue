<template>
<div class="container">
  <div class="banner">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item>
        <img src="http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg" alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src="http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
  <div class="main">
    <div class="name">商品名称</div>
    <div class="tip">需使用300积分兑换</div>
    <div class="bottom">
      <div class="left">
        <img src="../../../assets/img/shop/coin.png" alt="">
        <span>300</span>
      </div>
      <div class="right">
        月销2件
      </div>
    </div>
  </div>
  <div class="address">
    <div class="label">选择兑换地点</div>
    <div class="value">
      <span>湖州市杭湖申线城东服务区</span>
      <img src="../../../assets/img/shop/bottom.png" alt="">
    </div>
  </div>
  <div class="button">
    <van-button type="info" size="large">立即兑换</van-button>
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
    .banner{
      img{
        width: 100%;
      }
    }
    .main{
      padding: 0 32px;
      background: #fff;
      .name{
        padding-top: 30px;
        font-size:34px;
        font-weight:600;
        color:rgba(51,51,51,1);
      }
      .tip{
        margin-top: 20px;
        font-size:28px;
        font-weight:400;
        color:rgba(255,162,0,1);
      }
      .bottom{
        margin-top: 20px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .left{
          display: flex;
          align-items: center;
          img{
            width: 20px;
            height: 20px;
          }
          span{
            margin-left: 10px;
            font-size:60px;
            font-weight:400;
            color:rgba(255,162,0,1);
          }
        }
        .right{
          font-size:28px;
          font-weight:400;
          color:rgba(136,136,136,1);
        }
      }
    }
    .address{
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      height: 96px;
      background: #fff;
      .label{
        font-size:30px;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
      .value{
        display: flex;
        align-items: center;
        span{
          font-size:30px;
          font-weight:400;
          color:rgba(136,136,136,1);
        }
        img{
          margin-left: 10px;
          width: 16px;
          transform: rotate(270deg);
        }
      }
    }
    .button{
      position: fixed;
      bottom: 0px;
      width: 100%;
    }
  }

</style>
