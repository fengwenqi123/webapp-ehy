<template>
  <div class="container">
    <ul>
      <li v-for="(item,index) in dataList" :key="index">
        <div class="item">
          <img
            :src="item.img"
            alt=""
          />
          <div class="name">{{item.name}}</div>
          <div class="bottom">
            <div class="price">
              <img src="../../../../assets/img/shop/coin.png" alt="" />
              <span>{{item.price}}</span>
            </div>
            <div class="exchange">
              去兑换
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'list',
  data() {
    return {
      dataList: [
        {
          img:
            'http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
          name: '鲜花',
          price: 100
        },
        {
          img:
            'http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
          name: '鲜花',
          price: 100
        },
        {
          img:
            'http://b.hiphotos.baidu.com/image/pic/item/908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg',
          name: '鲜花',
          price: 100
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding: 0 25px;
  background: #fff;
  border-top: 1px solid #fff;
  ul {
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    li {
      padding-bottom: 20px;
      width: 260px;
      margin:20px 45px 0;
      .item {
        img {
          width: 260px;
          height: 260px;
        }
        .name {
          margin-top: 10px;
          font-size: 30px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        .bottom{
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .price{
            img{
              width: 20px;
              height: 20px;
              margin-right: 4px;
            }
          }
          .exchange{
            font-size:24px;
            font-weight:400;
            width:108px;
            height:50px;
            background:rgba(16,142,233,1);
            border-radius:25px;
            text-align: center;
            line-height: 50px;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
