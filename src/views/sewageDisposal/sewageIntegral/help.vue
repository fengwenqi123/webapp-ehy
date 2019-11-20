<template>
  <div style="padding:10px">
    <table border="1"
           cellspacing="0"
           style="width:100%"
           class="point-table">
      <tr>
        <th>项目</th>
        <th>积分类型</th>
        <th>分值</th>
      </tr>
      <tr class="title">
        <td colspan="3">生活污水上岸</td>
      </tr>
      <tr>
        <td>基础分</td>
        <td>加分</td>
        <td></td>
      </tr>
      <tr>
        <td>定位匹配</td>
        <td>加分</td>
        <td></td>
      </tr>
      <tr>
        <td>生活污水柜使用</td>
        <td>加分</td>
        <td></td>
      </tr>
      <tr>
        <td>回收点审核</td>
        <td>加分</td>
        <td></td>
      </tr>
      <tr class="title">
        <td colspan="3">污水设备故障上报</td>
      </tr>
      <tr>
        <td>故障上报</td>
        <td>加分</td>
        <td></td>
      </tr>
      <tr class="title">
        <td colspan="3">上岸异常扣分</td>
      </tr>
      <tr>
        <td>长期未上岸扣分</td>
        <td>扣分</td>
        <td></td>
      </tr>
      <tr>
        <td>违法排放扣分</td>
        <td>扣分</td>
        <td></td>
      </tr>
    </table>
    <div class="help">
      <h1>说明</h1>
      <p class="title">1.生活污水上岸</p>
      <p>a. 每天最多累积一次上岸积分。</p>
      <p>b. 需要满足手机定位与回收点定位匹配，方可判断为有效上岸后获得基础分。</p>
      <p>c. 定位匹配加分为需满足船舶AIS定位与回收点定位匹配方可加分。</p>
      <p>d. 生活污水柜使用加分要求在上岸期间，生活污水柜运行状态保持正常。</p>
      <p class="title">2.污水设备故障上报</p>
      <p>a. 在污水回收点发现回收设备故障时，使用app故障上报功能，且码头确认故障后，方获得对应奖励积分，每天最多累计一次加分。</p>
      <p class="title">3.上岸异常扣分</p>
      <p>a. 上期为上岸扣分，船舶最新连续五次进出湖州港（以进出港报告为准），期间无生活污水上岸记录与单证（含电子单证），扣除对应分值。</p>
      <p>b. 违法排放扣分，船舶在湖州航区内将生活污水直接排入水体，或通过其他方式不正常排放的，扣除对应分值。</p>
    </div>
  </div>
</template>

<script>
import { setTitle } from '@/utils/cache.js'
import { getSewagePoint } from '@/api/sewageDisposal'
export default {
  created() {
    getSewagePoint().then(response => {
      console.log(response)
    })
  },
  mounted() {
    setTitle(this.$route.meta.title)
  }
}
</script>

<style lang="scss">
.point-table {
  tr {
    td {
      padding: 10px 0;
      text-align: center;
    }
    th {
      padding: 10px 0;
      text-align: center;
    }
  }
  .title {
    td {
      text-align: left;
      padding: 20px 0;
    }
  }
}
.help {
  h1 {
    padding: 10px;
  }
  p {
    color: #666;
    text-indent: 35px;
    line-height: 50px;
  }
  .title {
    color: #222;
    text-indent: 0;
  }
}
</style>