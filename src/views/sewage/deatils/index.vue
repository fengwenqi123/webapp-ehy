<template>
  <div class="container">
    <header>
      <p>排放数据</p>
    </header>

    <ul class="ul">
      <li>
        <div>{{item.id || '--'}}</div>
        <p>
          <span>船名</span>
          <span>{{item.shipName || '--'}}</span>
        </p>
        <p>
          <span>收集点</span>
          <span>{{item.siteName || '--'}}</span>
        </p>
        <p>
          <span>排放口</span>
          <span>{{item.outletName || '--'}}</span>
        </p>
        <p>
          <span>排放口编号</span>
          <span>{{item.outletId || '--'}}</span>
        </p>
        <p>
          <span>时间</span>
          <span>{{item.addTimeString || '--'}}</span>
        </p>
      </li>
    </ul>
    <div class="button">
      <van-button type="info"
                  @click="goBack()">返回污水上岸</van-button>
    </div>
  </div>
</template>
<script>
// import { sewageDeatils } from '@/api/sewage'
import { getGoQrId } from '@/utils/cache'

export default {
  name: 'point',
  data() {
    return {
      item: {},
      id: getGoQrId()
    }
  },
  created() {
    this.getSewageDeatils()
  },
  methods: {
    getSewageDeatils() {
      const xhr = new XMLHttpRequest()
      xhr.open('get', 'https://api.cjbe88.com/sewage/sewageInfo/findByoutlet?id=' + this.id, true)
      xhr.send()
      // 4、指定一些回调函数
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            this.item = JSON.parse(xhr.responseText).data
            // alert(JSON.stringify(this.item))
          } else {
            // alert(xhr)
          }
        }
      }

      // sewageDeatils(this.id).then(response => {
      //   this.item = response.data
      // })
    },
    goBack() {
      this.$router.push(
        {
          path: '/point'
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  header {
    width: 100%;
    height: 1.35rem;
    line-height: 1.35rem;
    position: fixed;
    top: 0;
    left: 0;
    background: #fff;
    box-shadow: 0 3px 5px #efefef;
    z-index: 9;
    p {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      margin: auto;
      text-align: center;
      height: 1.35rem;
      line-height: 1.35rem;
      font-size: 0.5rem;
      font-weight: bold;
      z-index: 99;
    }
  }
  .ul {
    background: #f2f2f2;
    margin-top: 1.35rem;
    li {
      width: 100%;
      height: 4.8rem;
      background: #fff;
      padding: 0.4rem 0.6rem;
      box-sizing: border-box;
      div {
        font-size: 0.5rem;
      }
      p {
        width: 100%;
        float: left;
        span {
          line-height: 0.7rem;
          font-size: 0.4rem;
          color: #666666;
          float: left;
        }
        span:nth-child(2) {
          float: right;
        }
      }
    }
  }
  .button {
    width: 100%;
    height: 2rem;
    padding: 0 5%;
    float: left;

    .van-button {
      width: 90%;
      margin-top: 0.4rem;
    }
  }
}
</style>