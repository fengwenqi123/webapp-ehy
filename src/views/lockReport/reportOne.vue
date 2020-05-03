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
                   @focus="selectPort"
                   placeholder="当前港口"
                   required
                   :rules="[{ required: true, message: '请填写当前港口' }]" />
        <van-field v-model="formOne.nextPortName"
                   label="下一港口"
                   name="下一港口"
                   placeholder="下一港口"
                   @focus="selectNextPort"
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
  </div>
</template>

<script>
import cityList from '../../components/portList'
export default {
  data() {
    return {
      showPort: false,
      showNextPort: false,
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
  methods: {
    onSubmit(values) {
      this.$router.push({ name: 'lockReportTwo', query: { one: JSON.stringify(this.formOne) } })
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