<template>
  <div class="container">
    <ul>
      <li v-for="item in 4" :key="item">
        <div class="item">
          <div class="title">
            <div class="left">
              <img src="../../../assets/img/shop/jifen-icon.png" alt="" />
              <div class="time">2019-04-23</div>
            </div>
            <div class="right">
              已完成
            </div>
          </div>
          <div class="main">
            <div class="name">商品名称</div>
            <div class="total">合计{{ 8 }}件</div>
            <div class="address">兑换地点：城东服务区</div>
            <div class="time">兑换时间：2019-04-23 19:37</div>
          </div>
          <div class="bottom">
          <div class="total">  合计：{{ 200 }}</div>
            <div class="watch">查看</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'all'
}
</script>

<style scoped lang="scss">
.container {
  ul {
    li {
      margin: 20px 24px 0;
      background: #fff;
      .item {
        .title {
          padding: 0 24px 0 15px;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            display: flex;
            align-items: center;
            img {
              width: 136px;
              height: 46px;
            }
            .time {
              margin-left: 24px;
              font-size: 24px;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
            }
          }
          .right {
            font-size: 24px;
            font-weight: 400;
            color: rgba(16, 142, 233, 1);
          }
        }
        .main {
          padding: 0 32px 0 48px;
          .name {
            margin-top: 42px;
            font-size: 34px;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
          }
          .total {
            margin-top: 10px;
            font-size: 26px;
            font-weight: 400;
            color: rgba(136, 136, 136, 1);
          }
          .address {
            margin-top: 10px;
            font-size: 26px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
          .time {
            margin-top: 10px;
            font-size: 26px;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
        .bottom{
          display: flex;
          align-items: center;
          margin-top: 36px;
          padding-bottom: 30px;
          .total{
            margin-left: 374px;
            font-size:26px;
            font-weight:400;
            color:rgba(102,102,102,1);
          }
          .watch{
            margin-left: 40px;
            width:120px;
            height:50px;
            border:2px solid rgba(16,142,233,1);
            border-radius:25px;
            text-align: center;
            line-height: 50px;
            color: #108EE9;
          }
        }
      }
    }
  }
}
</style>
