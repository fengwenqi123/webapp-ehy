<template>
  <div class="boatList">
    <van-row>
      <van-col :span="24">
          <ul>
            <li v-for="item in shipList" :key="item.id" @click="goInfo(item)">
              <div>
                <img src="../../../assets/img/1.png">
                <p>{{item.shipName}}</p>
              </div>       
                <p>
                  <van-icon name="arrow" />
                </p>
            </li>
          </ul>
      </van-col>
    </van-row>
    <div class="bottom">
      <van-button type="default" color="#0064e0" @click.native="addShip">新增船舶</van-button>
    </div>
  </div>
</template>

<script>
import { boatList } from '@/api/ehy'
export default {
  data() {
    return {
      shipList: []
    }
  },
  created() {
    this.list()
  },
  methods: {
    list() {
      boatList(2).then(response => {
        console.log(response)
        this.shipList = response.data
      })
    },
    goInfo(item) {
      this.$router.push({ path: '/boatInfo', query: { info: item }})
    },
    addShip() {
      this.$router.push({ name: 'addShip' })
    }
  }
}
</script>

<style scoped lang="scss">
.boatList {
  .van-row {
    padding: 20px 0;
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
          border-top: 1px solid #eee;
          height: 120px;
          padding: 20px;
          > p {
            display: inline-block;
            float: right;
            line-height: 120px;
            color: #888;
          }
          div {
            height: 120px;
            display: inline-block;
            width: 80%;
            img {
              height: 100%;
              float: left;
            }
            p {
              margin-left: 20px;
              display: inline-block;
              line-height: 120px;
              font-size: 34px;
            }
          }
        }
      }
    }
  }
  .bottom {
    width: 96%;
    padding: 0 2%;
    .van-button {
      width: 96%;
      position: fixed;
      bottom: 20px;
    }
  }
}
</style>