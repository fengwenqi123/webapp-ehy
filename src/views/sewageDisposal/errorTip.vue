<template>
  <div class="error">
    <p @click="goRepair">回收设备有故障？点击报修</p>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: ['info'],
  methods: {
    goRepair() {
      console.log(this.info)
      this.$router.push({ name: 'unableToLand', query: { infos: this.info }})
    }
  }
}
</script>

<style scoped lang="scss">
.error {
  width: 100%;
  margin-top: 216px;
  p {
    text-align: center;
    font-size: 30px;
    font-weight: 500;
    color: rgba(16, 142, 233, 1);
  }
}
</style>
