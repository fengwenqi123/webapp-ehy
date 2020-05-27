<template>
  <div class="main">
    <p class="title">船舶基本信息</p>
    <div class="content">
      <van-form @submit="onSubmit">
        <van-field v-model="formOne.shipName"
                   label="船舶名称"
                   name="船舶名称"
                   placeholder="船舶名称"
                   required
                   readonly
                   @click="boatFocus"
                   :rules="[{ required: true, message: '请填写船舶名称' }]" />
        <van-field v-model="formOne.captain"
                   label="船长"
                   name="船长"
                   placeholder="船长"
                   required
                   :rules="[{ required: true, message: '请填写船长' }]" />
        <van-field v-model="formOne.portName"
                   label="当前港口"
                   name="当前港口"
                   @click="selectPort"
                   readonly
                   placeholder="当前港口"
                   required
                   :rules="[{ required: true, message: '请填写当前港口' }]" />
        <van-field v-model="formOne.nextPortName"
                   label="下一港口"
                   name="下一港口"
                   readonly
                   placeholder="下一港口"
                   @click="selectNextPort"
                   required
                   :rules="[{ required: true, message: '请填写下一港口' }]" />
        <div class="bottom">
          <van-button type="info"
                      native-type="submit">下一步</van-button>
        </div>
      </van-form>
    </div>
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
    <!-- 船舶列表 -->
    <van-popup v-model="showBoat"
               position="bottom">
      <van-picker show-toolbar
                  :columns="boatLists"
                  @cancel="showBoat = false"
                  @confirm="onConfirmBoat" />
    </van-popup>
  </div>
</template>

<script>
import cityList from '../../components/portList'
import { boatList } from '@/api/ehy'
import { setTitle } from '@/utils/cache.js'
export default {
  data() {
    return {
      showPort: false,
      showNextPort: false,
      showBoat: false,
      boatLists: [],
      formOne: {
        shipName: '',
        captain: '',
        portName: '',
        nextPortName: ''
      }
    }
  },
  components: {
    cityList
  },
  created() {
    boatList(2).then(res => {
      console.log(res)
      this.boatLists = res.data.map(item => item.shipName)
    })
    setTitle(this.$route.meta.title)
  },
  methods: {
    onSubmit(values) {
      this.$router.push({ name: 'lockReportTwo', query: { one: JSON.stringify(this.formOne) }})
    },
    sendPort(city) {
      console.log(city)
      this.formOne.portName = city.name
      this.showPort = false
    },
    sendNextPort(city) {
      console.log(city)
      this.formOne.nextPortName = city.name
      this.showNextPort = false
    },
    selectPort() {
      this.showPort = true
    },
    selectNextPort() {
      this.showNextPort = true
    },
    boatFocus() {
      this.showBoat = true
    },
    onConfirmBoat(value) {
      this.formOne.shipName = value
      this.showBoat = false
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
    width: 100%;
    box-sizing: border-box;
    padding: 32px;
    .van-button {
      width: 100%;
      background: #1890ff;
    }
  }
}
</style>
