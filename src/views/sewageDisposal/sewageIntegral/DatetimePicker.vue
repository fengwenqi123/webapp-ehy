<template>
  <div class="container">
    <van-datetime-picker
      v-model="currentDate"
      type="year-month"
      :formatter="formatter"
      @confirm="confirms"
      @cancel="cancel"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date()
    }
  },
  methods: {
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    confirms(value) {
      this.$emit('sendDate', value)
    },
    cancel() {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped lang="scss"></style>
