<template>
  <div class="container">
    <!--    <div class="header">-->
    <!--      <pageHeader/>-->
    <!--    </div>-->
    <div class="content">
      <van-cell-group>
        <van-field
          v-for="(item,index) in list"
          :key="index"
          :label="item.name"
          clickable
          disabled
          @click="selectItem(item)"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import { setTitle } from '@/utils/cache.js'

  export default {
    name: 'selfBg-popup-qy',
    data() {
      return {
        list: [
          { name: '内河港', letter: 'nhg', cityID: '155' },
          { name: '余杭港', letter: 'yhg', cityID: '156' },
          { name: '富阳港', letter: 'fyg', cityID: '157' },
          { name: '桐庐港', letter: 'tlg', cityID: '158' },
          { name: '萧山港', letter: 'xsg', cityID: '159' },
          { name: '建德港', letter: 'jdg', cityID: '160' },
          { name: '淳安港', letter: 'cag', cityID: '161' },
          { name: '临安港', letter: 'lag', cityID: '162' },
          { name: '钱江港', letter: 'qjg', cityID: '8277' }
        ]
      }
    },
    created() {
      setTitle(this.$route.meta.title)
    },
    methods: {
      selectItem(item) {
        this.$store.commit('set_qyg', item)
        this.$router.go(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 750px;
    background: #fff;
    /*.header{*/
    /*  position: fixed;*/
    /*  width: 100%;*/
    /*}*/
    /*.content {*/
    /*  padding-top: 100px;*/
    /*}*/
  }
</style>
