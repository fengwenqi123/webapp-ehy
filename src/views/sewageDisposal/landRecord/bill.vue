<template>
  <div class="container">
    <div class="header">
      船舶污染物接收证明
    </div>
    <div class="main">
      <ul>
        <li>
          <div class="item">
            <div class="label">船舶名称:</div>
            <div class="value shipName">{{item.shipName}}</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">船 籍 港:</div>
            <div class="value cjgmc">{{item.cjgdm}}</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">接受地点:</div>
            <div class="value siteName ">{{item.siteName}}</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">排污日期:</div>
            <div class="value startTimeString">{{item.endTime}}</div>
          </div>
        </li>
        <li class="line"></li>
        <li>
          <div class="item">
            <div class="label">1. 船舶垃圾:</div>
            <div class="value cblj">{{num2}}</div>
            <div class="tip">公斤</div>
            <div class="tip1">（其中：可回收<span></span>公斤，不可回收<span></span>公斤)</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">2. 生活污水:</div>
            <div class="value shws">{{num1}}</div>
            <div>立方米/吨</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">3. 油污水:</div>
            <div class="value oil">{{num3}}</div>
            <div>立方米/吨</div>
          </div>
        </li>
        <li class="line"></li>
        <li>
          <div class="item">
            <div class="label">船方送交人签字:</div>
            <div class="value oil"></div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">接 收 单 位:</div>
            <div class="value oil"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { setTitle } from '@/utils/cache.js'
  export default {
    name: 'bill',
    data() {
      return {
        item: this.$route.query.item,
        num1: this.$route.query.item.type === 1 ? this.$route.query.item.amount : null,
        num2: this.$route.query.item.type === 2 ? this.$route.query.item.amount : null,
        num3: this.$route.query.item.type === 3 ? this.$route.query.item.amount : null
      }
    },
    created() {
      setTitle(this.$route.meta.title)
    }
  }
</script>

<style scoped lang="scss">
  .container{
    position: fixed;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px 0;
    div{
      font-size: 28px;
    }
  }
  .header {
    text-align: center;
    font-size: 36px!important;
    font-weight: bold;
  }

  ul {
    /*width: 700px;*/
    /*margin: 30px auto;*/
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  li {
    margin-top: 40px;
    list-style: none;
    width: 740px;
  }
  .line{
    height: 30px;
  }

  .item {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    .tip1{
      margin-top: 20px;
      margin-left: 50px;
     span{
       display:inline-block;
       height: 1px;
       width: 60px;
       border-bottom: 1px solid #000;
     }
    }
  }

  .label {
    width: 220px;
    text-align: right;
    padding-right: 20px;
  }

  .value {
    width: 344px;
    border-bottom: 1px solid #000;
    margin-right: 20px;
    height: 30px;
  }

  .bottom {
    width: 400px;
    float: right;
    margin-right: 100px;
  }

  .line1 {
    display: flex;
    margin-top: 20px;
    align-items: flex-end;
  }

  .name {
    width: 200px;
    border-bottom: 1px solid #000;
  }

  .line-label {
    width: 150px;
  }
</style>
