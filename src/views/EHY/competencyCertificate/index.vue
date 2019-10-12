<template>
  <div class="container">
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="form.name"
          label="姓名"
          required
          placeholder="请输入姓名"
          clickable
          input-align="right"
        />
        <van-field
          v-model="form.idCard"
          label="身份证号"
          required
          placeholder="请输入身份证"
          clickable
          input-align="right"
        />
      </van-cell-group>
      <div class="submit" @click="submit">
        <van-button type="info" size="large">查 询</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { search } from '@/api/competencyCertificate'
import { setTitle } from '@/utils/cache.js'
export default {
  name: 'index',
  data() {
    return {
      form: {
        name: null,
        idCard: null
      }
    }
  },
  created() {
    setTitle(this.$route.meta.title)
  },
  methods: {
    submit() {
      search(this.form.name, this.form.idCard).then(response => {
        let data = null
        if (response.data.dataList) {
          data = response.data.dataList
        }
        this.$router.push({
          path: '/cerDetails',
          query: {
            data
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
