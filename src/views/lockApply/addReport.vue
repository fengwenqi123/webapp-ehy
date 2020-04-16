<template>
  <div class="mainLock">
    <van-form @submit="onSubmit">
      <span class="title">过闸信息</span>
      <van-field v-model="gzgk.czmc"
                 name="czmc"
                 label="船闸名称"
                 placeholder="船闸名称"
                 error-message-align="right"
                 required
                 @focus="lockFocus"
                 is-link
                 input-align="right"
                 :rules="[{ required: true, message: '请选择船闸' }]" />
      <van-field v-model="gzgk.gzfx"
                 name="gzfx"
                 label="过闸方向"
                 readonly
                 placeholder="过闸方向"
                 error-message-align="right"
                 required
                 input-align="right"
                 :rules="[{ required: true, message: '请选择过闸方向' }]" />
      <van-field v-model="gzgk.gk1"
                 label="始发港"
                 name="始发港"
                 @focus="selectPort"
                 placeholder="始发港"
                 input-align="right"
                 is-link
                 error-message-align="right"
                 required
                 :rules="[{ required: true, message: '请选择始发港' }]" />
      <van-field v-model="gzgk.gk2"
                 label="目的港"
                 name="目的港"
                 placeholder="目的港"
                 is-link
                 input-align="right"
                 error-message-align="right"
                 @focus="selectNextPort"
                 required
                 :rules="[{ required: true, message: '请选择目的港' }]" />
      <span class="title">申请信息</span>
      <van-field v-model="gzgk.zwcm"
                 name="zwcm"
                 label="船舶名称"
                 is-link
                 error-message-align="right"
                 required
                 input-align="right"
                 @focus="boatFocus"
                 placeholder="船舶名称"
                 :rules="[{ required: true, message: '请选择船舶' }]" />
      <van-field v-model="gzgk.cjr"
                 name="cjr"
                 label="申请人"
                 error-message-align="right"
                 required
                 input-align="right"
                 placeholder="申请人"
                 readonly
                 :rules="[{required: true, message: '请填写申请人' }]" />
      <van-field v-model="gzgk.lxdh"
                 name="lxdh"
                 error-message-align="right"
                 required
                 input-align="right"
                 label="联系电话"
                 placeholder="联系电话"
                 :rules="[{ required: true, message: '请填写联系方式' }]" />
      <van-field v-model="gzgk.zz"
                 name="zz"
                 class="zz"
                 error-message-align="right"
                 required
                 input-align="right"
                 label="载货"
                 is-link
                 placeholder="载货"
                 @focus="zzFocus"
                 :rules="[{ required: true, message: '请选择载货方式' }]" />

      <div v-for="(item,index) in gzhw"
           :key="item+index"
           v-if="zz">
        <p class="cargo-title">
          <span class="cargo-title-in">货物明细<span>{{index+1}}</span></span>
          <span @click="deleteCargo(index,item)"
                v-if="index!==0">删除</span>
        </p>
        <van-field v-model="item.hwlx"
                   name="货物类型"
                   label="货物类型"
                   error-message-align="right"
                   required
                   placeholder="货物类型"
                   is-link
                   input-align="right"
                   @focus="cargoFocus(index)"
                   :rules="[{ required: true, message: '请选择货物类型' }]" />
        <van-field v-model="item.szhsl"
                   name="实际载货量"
                   label="实际载货量（吨）"
                   label-width="120px"
                   error-message-align="right"
                   required
                   input-align="right"
                   type="number"
                   placeholder="实际载货量"
                   :rules="[{ required: true, message: '请填写实际载货量' }]">
        </van-field>
        <p @click="addCargoList"
           class="add"
           v-if="index===gzhw.length-1">
          <van-icon name="add-o" /><span>新增货物明细</span></p>
      </div>
      <p class="zl"
         v-if="zz">实际载货总量：{{gzgk.zzhwzl}}吨</p>
      <van-field v-model="gzgk.sqly"
                 rows="2"
                 autosize
                 error-message-align="right"
                 required
                 input-align="right"
                 label="申请理由"
                 type="textarea"
                 placeholder="请输入留言"
                 maxlength="100"
                 show-word-limit
                 name="sqly"
                 :rules="[{ required: true, message: '请填写申请理由' }]" />
      <div style="margin: 16px;">
        <van-button round
                    block
                    type="info"
                    native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
    <!-- 货物弹出层 -->
    <van-popup v-model="showCargo"
               position="bottom">
      <van-picker show-toolbar
                  :columns="cargoList"
                  @cancel="showCargo = false"
                  @confirm="onConfirmCargo" />
    </van-popup>
    <!-- 船闸 -->
    <van-popup v-model="showLock"
               position="bottom">
      <van-picker show-toolbar
                  :columns="lockList"
                  @cancel="showLock = false"
                  @confirm="onConfirmLock" />
    </van-popup>
    <!-- 过闸方向 -->
    <van-popup v-model="showLockdir"
               position="bottom">
      <van-picker show-toolbar
                  :columns="lockdirList"
                  @cancel="showLockdir = false"
                  @confirm="onConfirmLockdir" />
    </van-popup>
    <!-- 船舶列表 -->
    <van-popup v-model="showBoat"
               position="bottom">
      <van-picker show-toolbar
                  :columns="boatLists"
                  @cancel="showBoat = false"
                  @confirm="onConfirmBoat" />
    </van-popup>
    <!-- 空载重载 -->
    <van-popup v-model="showZZ"
               position="bottom">
      <van-picker show-toolbar
                  :columns="zzList"
                  @cancel="showZZ = false"
                  @confirm="onConfirmZZ" />
    </van-popup>
    <!-- 起始港和目的港 -->
    <van-popup v-model="showPort"
               style="width:90%;height:90%;">
      <cityList @send="sendPort"
                style="width:100%" />
    </van-popup>
    <van-popup v-model="showNextPort"
               style="width:90%;height:90%;">
      <cityList @send="sendNextPort"
                style="width:100%" />
    </van-popup>
  </div>
</template>

<script>
import cityList from '../../components/portList'
import { getUserInfos } from '@/api/validate'
import { dateToString } from '@/utils'
import { boatList } from '@/api/ehy'
import { Dialog } from 'vant'
// import { submitApply } from '@/api/ehyLock'
export default {
  components: {
    cityList
  },
  data() {
    return {
      gzgk: {
        gzfx: '',
        czmc: '',
        zwcm: '',
        lxdh: '',
        cjr: '',
        zz: '',
        zzhwzl: '',
        sqly: ''
      },
      gzhw: [
        {
          id: '',
          hwlx: '',
          hwmc: '',
          szhsl: ''
        }
      ],
      showLockdir: false,
      showPort: false,
      showNextPort: false,
      showLock: false,
      showBoat: false,
      showCargo: false,
      showZZ: false,
      zz: true,
      cargosList: [
        { id: '0100', name: '煤炭及制品' },
        { id: '0200', name: '石油、天然气及制品' },
        { id: '0300', name: '金属矿石' },
        { id: '0400', name: '钢铁' },
        { id: '0500', name: '矿物性建筑材料' },
        { id: '0600', name: '水泥' },
        { id: '0700', name: '木材' },
        { id: '0800', name: '非金属矿石' },
        { id: '0900', name: '化学肥料及农药' },
        { id: '1000', name: '盐' },
        { id: '1100', name: '粮食' },
        { id: '1200', name: '机械、设备、电器' },
        { id: '1300', name: '化工原料及制品' },
        { id: '1400', name: '有色金属' },
        { id: '1500', name: '轻工、医药产品' },
        { id: '1600', name: '农林牧渔业产品' },
        { id: '1700', name: '其他' },
        { id: '1800', name: '集装箱运量(TEU)' },
        { id: '1900', name: '集装箱货运量' },
        { id: '2000', name: '滚装车辆数' },
        { id: '2100', name: '滚装车辆货运量' }
      ],
      cargoList: [],
      index: null,
      boatLists: [],
      lockList: ['湖州船闸'],
      lockdirList: ['进', '出'],
      zzList: ['重载', '空载']
    }
  },
  created() {
    this.gzgk.gzfx = this.$route.query.direction
    this.cargoList = this.cargosList.map(item => item.name)
    getUserInfos().then(res => {
      console.log(res)
      this.gzgk.cjr = res.data.name
      this.gzgk.lxdh = res.data.mobile
    })
    boatList(2).then(res => {
      console.log(res)
      this.boatLists = res.data.map(item => item.shipName)
    })
    this.gzgk.czmc = this.lockList[0]
  },
  watch: {
    gzhw: {
      handler(n, o) {
        console.log(n)
        this.gzgk.zzhwzl = 0
        n.map(item => {
          this.gzgk.zzhwzl += Number(item.szhsl)
          this.$forceUpdate()
        })
      },
      deep: true
    },
    'gzgk.zz': {
      handler(n, o) {
        if (n === '空载') {
          this.zz = false
          this.gzhw = [{
            id: '',
            hwlx: '',
            hwmc: '',
            szhsl: ''
          }]
          this.$forceUpdate()
        } else {
          this.zz = true
          this.$forceUpdate()
        }
      },
      deep: true
    }
  },
  methods: {
    // 起始港和目的港
    selectPort() {
      this.showPort = true
    },
    selectNextPort() {
      this.showNextPort = true
    },
    sendPort(city) {
      this.gzgk.gk1 = city.name
      this.showPort = false
    },
    sendNextPort(city) {
      this.gzgk.gk2 = city.name
      this.showNextPort = false
    },

    //
    onSubmit() {
      this.gzgk.cjsj = dateToString(new Date())
      let form = {}
      form.gzgk = this.gzgk
      form.gzhw = this.gzhw
      console.log(form)
      // submitApply()
    },
    deleteCargo(index, item) {
      Dialog.confirm({
        title: '删除此条货物信息',
        message: `货物名称：${item.hwlx}<br/>货物实际载货吨：${item.szhsl}吨`
      })
        .then(() => {
          this.gzhw.splice(index, 1)
          this.$forceUpdate()
        })
        .catch(() => {
          // on cancel
        })
    },
    addCargoList() {
      this.gzhw.push({
        id: '',
        hwlx: '',
        hwmc: '',
        szhsl: ''
      })
      this.$forceUpdate()
    },
    lockdirFocus() {
      this.showLockdir = true
    },
    lockFocus() {
      this.showLock = true
    },
    boatFocus() {
      this.showBoat = true
    },
    cargoFocus(index) {
      console.log(index)
      this.index = index
      this.showCargo = true
    },
    zzFocus() {
      this.showZZ = true
    },
    onConfirmCargo(value) {
      console.log(value)
      this.gzhw[this.index].hwlx = value
      this.gzhw[this.index].id = this.cargosList.filter(item => item.name === value)[0].id
      console.log(this.gzhw)
      this.showCargo = false
    },
    onConfirmLock(value) {
      this.gzgk.czmc = value
      this.showLock = false
    },
    onConfirmLockdir(value) {
      this.gzgk.gzfx = value
      this.showLockdir = false
    },
    onConfirmBoat(value) {
      this.gzgk.zwcm = value
      this.showBoat = false
    },
    onConfirmZZ(value) {
      this.gzgk.zz = value
      this.showZZ = false
    }
  }

}
</script>

<style lang="scss" scoped>
.mainLock {
  color: #333;
  .title {
    display: inline-block;
    margin: 20px;
    color: #888;
  }
  .cargo-title {
    display: flex;
    justify-content: space-between;
    margin: 20px;
    color: #999;
  }
  .zz {
    margin: 20px 0;
  }
  .zl {
    text-align: right;
    margin: 30px;
    font-size: 32px;
  }
  .add {
    background-color: #fff;
    display: flex;
    align-items: center;
    height: 80px;
    justify-content: center;
    span {
      margin: 0 10px;
    }
  }
}
</style>