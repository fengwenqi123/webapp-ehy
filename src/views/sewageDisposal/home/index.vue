<template>
  <div class="container">
    <banner></banner>
    <home-item></home-item>
  </div>
</template>

<script>
import banner from './banner'
import homeItem from './homeItem'
import { setTitle } from '@/utils/cache.js'
export default {
  name: 'index',
  components: {
    banner,
    homeItem
  },
  mounted() {
    setTitle(this.$route.meta.title)
  }
}
</script>

<style scoped lang="scss"></style>
