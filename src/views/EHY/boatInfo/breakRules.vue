<template>
  <div class="breakRules">
    <van-row>
      <van-col :span="24">
        <p>未处理违章</p>
          <ul>
            <li>
              <div>
                <p>未能按照交通法规行驶未能按照交通法规行驶未能按照交通法规行驶</p>
                <p>海事</p>
              </div>       
                <p>
                  <van-icon name="arrow" />
                </p>
            </li>
          </ul>
      </van-col>
      <van-col :span="24" >
        <p>历史行政处罚信息</p>
        <van-col :span="20"></van-col>
        <van-col :span="4"></van-col>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoObj: {}
    }
  },
  created() {
    this.infoObj = this.$route.query.info
    console.log(this.infoObj)
  }
}
</script>

<style scoped lang="scss">
.breakRules {
  .van-row {
    .van-col {
      > p {
        padding: 20px;
        color: #888;
        line-height: 60px;
      }
      ul {
        background-color: #fff;
        width: 100%;
        li {
          height: 100px;
          padding: 20px;
          > p {
            display: inline-block;
            float: right;
            line-height: 100px;
          }
          div {
            height: 100px;
            display: inline-block;
            &:nth-child(1) {
              width: 80%;
              p {
                line-height: 50px;
                &:nth-child(1) {
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                }
                &:nth-child(2) {
                  color: #888;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>