<template>
  <div class="content">
    <div class="top">
      <div class="ship-name">
        <img src="../../../assets/img/ehyShip.png" alt="">
        <div class="name">浙湖州货1234</div>
      </div>
      <div class="zdlist">
        兑换账单
      </div>
    </div>
    <div class="middle">
      <img src="../../../assets/img/jifen.png" alt="">
      <div class="integral">
       900
      </div>
    </div>
    <div class="bottom">
      切换船舶
    </div>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped lang="scss">
  .content {
    color: #fff;
    padding:30px 40px 0;
    background: url("../../../assets/img/jifen_background.png") no-repeat;
    background-size: 100% 100%;
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ship-name {
        display: flex;
        align-items: center;

        img {
          width: 80px;
          height: 80px;
        }

        .name {
          margin-left: 20px;
        }
      }
    }
    .middle{
      margin-top: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 30px;
        height: 30px;
      }
      .integral{
        margin-left: 20px;
        font-size: 50px;
        font-weight: bold;
      }
    }
    .bottom{
      text-align: center;
      margin-top: 40px;
      height: 80px;
      line-height: 80px;
    }
  }
</style>
