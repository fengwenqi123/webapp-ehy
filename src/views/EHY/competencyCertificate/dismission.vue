<template>
<div class="container">
  <div class="title">
    当前任职情况
  </div>
  <div class="content">
    <ul>
      <li>
        <div class="item">
          <div class="label">
            任职船名
          </div>
          <div class="value">
            asdasadasdasd
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">
            上船任职时间
          </div>
          <div class="value">
            asdasadasdasd
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">
            职务
          </div>
          <div class="value">
            asdasadasdasd
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="title">
    历史任职情况
  </div>
  <div class="content">
    <ul>
      <li>
        <div class="item">
          <div class="label">
            任职船名
          </div>
          <div class="value">
            asdasadasdasd
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">
            上船任职时间
          </div>
          <div class="value">
            asdasadasdasd
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">
            职务
          </div>
          <div class="value">
            asdasadasdasd
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  export default {
    name: 'dismission'
  }
</script>

<style scoped lang="scss">
.container{
  .title{
    height: 70px;
    line-height: 70px;
    /*background: #ccc;*/
    color: #77777C;
    padding-left: 20px;
    font-size: 28px;
  }
  .content{
    padding: 20px;
    background: #fff;
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        width: 50%;
        margin-top: 20px;
        .item{

        }
      }
    }
  }
}
</style>
