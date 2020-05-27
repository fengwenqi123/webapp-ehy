<template>
  <div class="main">
    <p class="title">船舶基本信息</p>
    <div class="content">
      <div class="card"
           v-for="item in checkItemResult"
           :key="item.code">
        <p class="card-title"><span></span><span>{{item.codeName}}</span></p>
        <van-row class="card-content"
                 v-for="itemChild in item.itemResult"
                 :key="itemChild.itemCode">
          <van-col :offset="1"
                   :span="23">
            <p><span style="color:red;margin:0 3px;">*</span>{{itemChild.itemName}}</p>
            <van-radio-group v-model="itemChild.itemResult"
                             class="reportTwoRadio">
              <van-radio name="1">是</van-radio>
              <van-radio name="2">否</van-radio>
              <van-radio name="3">不适用</van-radio>
            </van-radio-group>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="bottom">
      <van-button type="primary"
                  class="bottom-button"
                  @click="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { dateToString } from '../../utils/index'
import { setTitle } from '@/utils/cache.js'
import { submitReport } from '@/api/lockReport'
export default {
  data() {
    return {
      radio: '',
      // 1000 驾驶台, 1001 救生、消防 ,1002 甲板 ,1003 机舱
      checkItemResult: [
        {
          code: '1000',
          codeName: '驾驶台',
          itemResult: [
            {
              itemCode: '100001',
              itemName: '1.船舶证书、文书、图书资料、船员证书是否齐全',
              itemResult: null
            },
            {
              itemCode: '100002',
              itemName: '2.导助航、通信设备是否状态良好、工作正常',
              itemResult: null
            },
            {
              itemCode: '100003',
              itemName: '3.号灯、号型、声响信号等是否功能良好',
              itemResult: null
            }
          ]
        },
        {
          code: '1001',
          codeName: '救生、消防部分',
          itemResult: [
            {
              itemCode: '100101',
              itemName: '1.救生（助）艇、救生筏及其属具是否配备齐全、登乘装置、应急照明状况是否良好',
              itemResult: null
            },
            {
              itemCode: '100102',
              itemName: '2.个人救生设备（救生圈、救生衣、浸水保温服等）是否配备齐全、是否良好',
              itemResult: null
            },
            {
              itemCode: '100103',
              itemName: '3.探火和报警装置（驾驶台、机舱、控制室等）状况是否良好',
              itemResult: null
            },
            {
              itemCode: '100104',
              itemName: '4.主、应急消防泵及其管系状况是否良好',
              itemResult: null
            },
            {
              itemCode: '100105',
              itemName: '5.固定式、移动式灭火装置、个人消防装备状况是否良好',
              itemResult: null
            },
            {
              itemCode: '100106',
              itemName: '6.防火分隔、防火门、防火挡板、速闭阀等装置状况是否良好',
              itemResult: null
            }
          ]
        },
        {
          code: '1002',
          codeName: '甲板部分',
          itemResult: [
            {
              itemCode: '100201',
              itemName: '1.船体及甲板结构状况是否良好',
              itemResult: null
            },
            {
              itemCode: '100202',
              itemName: '2.风雨密、水密装置、设备、设施状况是否良好',
              itemResult: null
            },
            {
              itemCode: '100203',
              itemName: '3.货物积载、隔离、绑扎、系固是否符合要求',
              itemResult: null
            },
            {
              itemCode: '100204',
              itemName: '4.系泊设备状态是否良好',
              itemResult: null
            },
            {
              itemCode: '100205',
              itemName: '5.载重线和水尺标识清晰、船舶未处于超载状态',
              itemResult: null
            }
          ]
        },
        {
          code: '1003',
          codeName: '机舱部分',
          itemResult: [
            {
              itemCode: '100301',
              itemName: '1.主辅机及其附属系统工作状况是否良好',
              itemResult: null
            },
            {
              itemCode: '100302',
              itemName: '2.锅炉及其附属设备工作状况是否良好',
              itemResult: null
            },
            {
              itemCode: '100303',
              itemName: '3.主电源和应急电源是否工作正常',
              itemResult: null
            },
            {
              itemCode: '100304',
              itemName: '4.操舵装置工作状态是否良好',
              itemResult: null
            },
            {
              itemCode: '100305',
              itemName: '5.防污染设备工作是否正常',
              itemResult: null
            }
          ]
        }

      ]
    }
  },
  created() {
    console.log(JSON.parse(this.$route.query.one))
    setTitle(this.$route.meta.title)
  },
  methods: {
    submit() {
      let arr = []
      let string = ''
      this.checkItemResult.map((item, index) => {
        item.itemResult.map((itemChild, indexChild) => {
          if (Boolean(itemChild.itemResult) === false) {
            console.log(item.codeName, indexChild + 1)
            arr.push({ name: item.codeName, index: indexChild + 1 })
          }
        }
        )
      })
      if (arr.length === 0) {
        let resultForm = { ...JSON.parse(this.$route.query.one) }
        resultForm.checkItemResult = this.checkItemResult
        resultForm.checkTime = dateToString(new Date())
        console.log(resultForm)
        submitReport(resultForm).then(res => {
          console.log(res)
          this.$router.push({ name: 'lockReport' })
        })
      } else {
        arr.forEach(item => {
          string += `${item.name}:第${item.index}项\n`
        })
        Dialog.alert({
          title: '以下为必填项',
          message: string
        })
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.main {
  .title {
    color: #999;
    font-size: 30px;
    line-height: 88px;
    padding-left: 40px;
  }
  .bottom {
    position: fixed;
    bottom: 0px;
    width: 100%;
    border-top: 1px solid #ddd;
    padding: 20px 0;
    background-color: #fff;
    text-align: center;
    .bottom-button {
      width: 94%;
      margin: 0;
      font-size: 38px;
      background-color: #108ee9;
    }
    .van-button--primary {
      border: 2px solid #108ee9;
    }
  }
  .content {
    background-color: #fff;
    padding-bottom: 120px;
    .card {
      padding-top: 30px;
      padding-left: 30px;
      border-bottom: 1px solid #ddd;
      .card-title {
        span:nth-child(1) {
          display: inline-block;
          width: 8px;
          height: 24px;
          background-color: #1890ff;
        }
        span:nth-child(2) {
          padding: 0 10px;
          color: #333;
          font-weight: bold;
          margin-left: 5px;
          font-size: 34px;
        }
      }
      .card-content {
        .van-col {
          border-bottom: 1px solid #ddd;
          p {
            color: #333;
            width: 90%;
            line-height: 50px;
            margin-top: 40px;
            font-size: 30px;
          }
          .van-radio-group {
            display: flex;
            margin-top: 40px;
            padding-bottom: 40px;
            .van-radio {
              margin: 0px 60px 0px 20px;
            }
          }
        }
      }
    }
  }
}
</style>