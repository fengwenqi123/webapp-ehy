<template>
  <div class="container">
    <ul class="ul1">
      <li>
        <div class="item">
          <div class="title">
            通航水位（米）
          </div>
          <div class="item-1">
            <div class="item-1-min">
              <div class="label">最低：</div>
              <div class="value">{{obj.waterLevel.waterLevel1Min.toFixed(4)}}</div>
            </div>
            <div class="item-1-max">
              <div class="label">最高：</div>
              <div class="value">{{obj.waterLevel.waterLevel1Max.toFixed(4)}}</div>
            </div>
            <div class="place">
              {{place1}}
            </div>
          </div>
          <div class="item-2">
            <div class="item-1-min">
              <div class="label">最低：</div>
              <div class="value">{{obj.waterLevel.waterLevel2Min.toFixed(4)}}</div>
            </div>
            <div class="item-1-max">
              <div class="label">最高：</div>
              <div class="value">{{obj.waterLevel.waterLevel2Max.toFixed(4)}}</div>
            </div>
            <div class="place">
              {{place2}}
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="title">
            85高程（米）
          </div>
          <div class="item-1">
            <div class="item-1-min">
              <div class="label">闸室标高：</div>
              <div class="value">-2.08</div>
            </div>
            <div class="item-1-max">
              <div class="label">上闸首门槛标高：</div>
              <div class="value">-0.18</div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="title">
            船闸引航道水位（米）
          </div>
          <div class="item-1">
            <div class="item-1-min">
              <div class="label">上游：</div>
              <div class="value">{{obj.hydrology.sysw.toFixed(4)}}</div>
            </div>
            <div class="item-1-max">
              <div class="label">下游：</div>
              <div class="value">{{obj.hydrology.xysw.toFixed(4)}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul v-if="obj">
      <li>
        <div class="item">
          <div class="left">申报总数</div>
          <div class="right">合计:{{obj.waitShipTotal.shipTotal}}</div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="left">闸区船舶总数</div>
          <div class="right">合计:{{obj.waitShipTotal.gateShipTotal}}</div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="left">途中船舶总数</div>
          <div class="right">合计:{{obj.waitShipTotal.passageTotal}}</div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="left">上行停泊区船舶数</div>
          <div class="right">合计:{{obj.sxTotal}}</div>
        </div>
      </li>
      <li v-for="item1 in obj.waitShipTotal.sxportarea">
        <div class="item">
          <div class="left fontb">{{item1.areaName}}</div>
          <div class="right">{{item1.shipSum}}</div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="left">下行停泊区船舶数</div>
          <div class="right">合计:{{obj.xxTotal}}</div>
        </div>
      </li>
      <li v-for="item2 in obj.waitShipTotal.xxportarea">
        <div class="item">
          <div class="left fontb">{{item2.areaName}}</div>
          <div class="right">{{item2.shipSum}}</div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="left">公共停泊区船舶数</div>
          <div class="right">合计:{{obj.ggqtotal}}</div>
        </div>
      </li>
      <li v-for="item3 in obj.waitShipTotal.ggqportarea">
        <div class="item">
          <div class="left fontb">{{item3.areaName}}</div>
          <div class="right">{{item3.shipSum}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import pageHeader from '@/components/navBar'
  import { setTitle } from '@/utils/cache.js'

  export default {
    components: {
      pageHeader
    },
    name: 'lockDetails',
    data() {
      return {
        obj: null,
        place1: null,
        place2: null
      }
    },
    created() {
      this.getQuery()
      setTitle(this.$route.meta.title)
    },
    methods: {
      getQuery() {
        this.obj = JSON.parse(this.$route.query.obj)
        switch (this.obj.waitShipTotal.shipGateName) {
          case '三堡船闸':
            this.place1 = '钱江'
            this.place2 = '内河'
            break
          case '新坝船闸':
            this.place1 = '浦阳'
            this.place2 = '杭甬'
            break
          case '富春江船闸':
            this.place1 = '上游'
            this.place2 = '下游'
            break
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    position: absolute;
    width: 100%;

    /*.header {*/
    /*  position: fixed;*/
    /*  width: 100%;*/
    /*  z-index: 9;*/
    /*}*/

    ul {
      /*padding-top: 100px;*/
      background: #fff;

      li {
        .item {
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 120px;
          border-bottom: 1px solid #ccc;

          .fontb {
            font-size: 40px;
            font-weight: bold;
          }
        }
      }
    }

    .ul1 {
      margin-bottom: 30px;

      li {
        .item {
          display: block;
          height: auto;
          padding-bottom: 20px;

          .title {
            color: #A3A3A3;
            padding: 30px 0 0 0;
          }

          .item-1, .item-2 {
            margin-top: 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .value {
              color: #389e0d;
            }

            &-min {
              display: flex;
              align-items: center;
            }

            &-max {
              display: flex;
              align-items: center;
            }
          }
        }
      }
    }
  }
</style>
