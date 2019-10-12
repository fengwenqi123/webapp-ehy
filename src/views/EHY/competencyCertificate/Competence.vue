<template>
  <div class="container">
    <div class="header">
      <div class="scoring">
        <p>累计记分</p>
        <span>0</span>
      </div>
    </div>
    <div class="id-info">
      <div class="line1">
        <div class="name">
          刘旭
        </div>
        <div class="sex">
          男
        </div>
      </div>
      <div class="line2">
        <div class="idcard">
          身份证号
        </div>
        <div class="sex">
          223294234234234234243
        </div>
      </div>
    </div>
    <div class="certificate">
      <ul v-for="item in 5" :key="item">
        <li>
          <div class="item">
            <div class="label">证书编号</div>
            <div class="value">33333333333333333333333333</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">适任等级/职务</div>
            <div class="value">1231231</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">签发机构</div>
            <div class="value">asdadas</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">签发日期</div>
            <div class="value">啊大大实打实大</div>
          </div>
        </li>
        <li>
          <div class="item">
            <div class="label">有效期止</div>
            <div class="value">啊实打实大大声道</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Competence'
  }
</script>

<style scoped lang="scss">
  .container {
    .header {
      height: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #1989FA;

      .scoring {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: 3px solid #1A6BD4;

        p {
          width: 100%;
          text-align: center;
          color: #fff;
        }

        span {
          display: block;
          margin-top: -100px;
          text-align: center;
          width: 100%;
          font-size: 120px;
          color: #00CC7E;
        }
      }
    }

    .id-info {
      padding: 20px;
      display: flex;
      flex-wrap: wrap;
      background: #fff;

      .line1 {
        width: 100%;
        display: flex;
        align-items: flex-end;

        .name {
          width: 160px;
          font-size: 40px;
          font-weight: 400;
        }
      }

      .line2 {
        margin-top: 20px;
        display: flex;

        .idcard {
          width: 160px;
        }
      }
    }

    .certificate {
      background: #fff;
      margin-top: 30px;
      ul {
        display: flex;
        flex-wrap: wrap;
        padding:30px;
        border-bottom: 1px solid #ccc;

        li {
          width: 50%;
          margin-top: 20px;

          .item {
            .value {
              margin-top: 10px;
            }
          }
        }

        li:nth-child(1) {
          width: 100%;
        }
      }
    }
  }
</style>
