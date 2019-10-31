<template>
  <div class="container">
    <div class="content">
      <div class="title">
        我的订单
      </div>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div class="item">
            <img :src="item.img" alt="">
            <div class="name">{{item.name}}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  const allimg = require('@/assets/img/shop/all.png')
  const ydh = require('@/assets/img/shop/ydh.png')
  const ddh = require('@/assets/img/shop/ddh.png')
  export default {
    name: 'personal',
    data() {
      return {
        list: [
          {
            name: '全部订单',
            img: allimg
          },
          {
            name: '待兑换',
            img: ddh
          },
          {
            name: '已兑换',
            img: ydh
          }
        ]
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    margin-top: 24px;
    .content {
      background: #ffffff;
      border-radius:20px;
      margin: 0 20px;

      .title {
        font-size: 30px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        height: 90px;
        line-height: 90px;
        padding-left: 24px;
        border-bottom: 1px solid #D8D8D8;
      }

      ul {
        padding: 40px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

        li {
          .item {
            text-align: center;

            img {
              width: 90px;
              height: 90px;
            }

            .name {
              margin-top: 10px;
              font-size: 24px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
            }
          }
        }
      }
    }
  }
</style>
