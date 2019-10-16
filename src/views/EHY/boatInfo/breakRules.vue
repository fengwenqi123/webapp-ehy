<template>
  <div class="breakRules">
    <van-row>
      <van-col :span="24">
        <p>未处理违章</p>
          <ul>
            <li v-for="item in noDeel" :key="item.id" @click="goBreakRuleInfo(item)">
              <div>
                <p>{{item.content}}</p>
                <p>
                  <span>{{item.dockName}}</span>
                  <span>{{item.violationDate.substring(0,10)}}</span>
                </p>
              </div>
                <p>
                  <van-icon name="arrow" />
                </p>
            </li>
            <li v-if="noDeel.length===0">暂无记录</li>
          </ul>
      </van-col>
      <van-col :span="24" >
        <p>历史行政处罚信息</p>
        <ul>
            <li v-for="item in doDeel" :key="item.id">
              <div>
                <p>{{item.content}}</p>
                <p>
                  <span>{{item.dockName}}</span>
                  <span>{{item.violationDate.substring(0,10)}}</span>
                </p>
              </div>
                <p>
                  <van-icon name="arrow" />
                </p>
            </li>
             <li v-if="doDeel.length===0">暂无记录</li>
          </ul>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { breakRules } from '@/api/ehy'
import { getShipName } from '@/utils/cache.js'
export default {
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 200,
        total: 0
      },
      infoObj: {},
      allBreakRules: [],
      noDeel: [],
      doDeel: []
    }
  },
  created() {
    if (this.$route.query.info) {
      this.infoObj = this.$route.query.info
      this.breakRule(this.infoObj.shipName)
    } else {
      this.breakRule(getShipName())
      this.$store.commit('seteshipName', getShipName())
    }
    console.log(this.infoObj)
  },
  methods: {
    breakRule(shipName) {
      breakRules(this.page.pageNum, this.page.pageSize, shipName).then(response => {
        // console.log(response)
        this.page.total = response.data.page.total
        if (this.page.total > this.page.pageSize) {
          this.page.pageSize = this.page.total
          breakRules(this.page.pageNum, this.page.pageSize, this.infoObj.shipName).then(response => {
            this.allBreakRules = response.data.dataList
          })
        } else {
          this.allBreakRules = response.data.dataList
        }
        this.noDeel = this.allBreakRules.filter(item => item.status === '未处理')
        this.doDeel = this.allBreakRules.filter(item => item.status === '已处理')
        console.log('未处理', this.noDeel)
        console.log('已处理', this.doDeel)
      })
    },
    goBreakRuleInfo(item) {
      this.$router.push({ path: '/breakRulesInfo', query: { info: item }})
    }

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
          border-top: 1px solid #eee;
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
                span:nth-child(2) {
                  float: right;
                }
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
