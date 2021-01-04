export const getLocation = {
  data() {
    return {}
  },
  methods: {
    /* eslint-disable */
    // 获取位置
    getLocation(to, item) {
      getlocation({
        success: function(data) {
          if (typeof data === 'string' && data.constructor == String) {
            console.log(data)
          } else {
            if (to === 'submitWater') {
              this.submitWater(data.longitude, data.latitude)
            }
            if (to === 'submitRubbish') {
              this.submitRubbish(data.longitude, data.latitude)
            }
            if (to === 'getSbRecoveryInfo') {
              this.getSbRecoveryInfo(data.longitude, data.latitude)
            }
            if (to === 'getRecoveryInfo') {
              this.getRecoveryInfo(data.longitude, data.latitude, item)
            }
            if (to === 'submit') {
              this.submit(data.longitude, data.latitude)
            }
            if (to === 'submit1') {
              this.submit1(data.longitude, data.latitude)
            }
            if (to === 'lists') {
              this.lists(data.longitude, data.latitude)
            }
            if (to === 'homecity') {
              this.city = data.cityName
              this.getWeather()
              this.getFindByCity()
            }
          }
        },
        fail: function(data) {
          console.log(data)
        }
      })
    }
  }
}
