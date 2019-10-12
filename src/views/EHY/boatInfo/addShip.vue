<template>
  <div>
    <van-cell title="认证类型" value="船主" size="large" />
    <van-field
    style="margin-top:20px;"
    v-model="username"
    label="船舶名称"
    placeholder="请输入船舶名称"
    error
  />
  <van-field
    v-model="phone"
    label="船舶登记号"
    placeholder="请输入船舶登记号"
    error-message="手机号格式错误"
  />
  <van-field
    v-model="phone"
    label="船舶识别号"
    placeholder="请输入船舶识别号"
    error-message="手机号格式错误"
  />
  <div>
     <p>船舶登记证书</p>
    <van-uploader v-model="fileList" multiple />
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: []
    }
  }
}
</script>

<style scoped lang="scss">
</style>