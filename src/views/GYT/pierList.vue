<template>
  <div class="container">
    <div class="header">
      <div class="search">
        <form action="/">
          <van-search
            v-model="keyword"
            placeholder="请输入搜索关键词"
            @search="onSearch"
          />
        </form>
      </div>
    </div>
    <div class="list">
      <van-cell-group>
        <van-field
          v-for="(item,index) in list"
          :key="index"
          :label="item.name"
          clickable
          disabled
          label-width="9rem"
          @click="selectItem(item)"
        />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import { list } from '@/api/pier'
  import { setTitle } from '@/utils/cache.js'
  import pageHeader from '@/components/navBar'

  export default {
    components: {
      pageHeader
    },
    data() {
      return {
        keyword: null,
        list: null,
        managementUnit: null
      }
    },
    created() {
      this.getQuery()
      setTitle(this.$route.meta.title)
    },
    methods: {
      getQuery() {
        if (this.$route.query.name) {
          this.managementUnit = this.$route.query.name
        }
        this._list()
      },
      selectItem(item) {
        this.$store.commit('set_pier', item)
        this.$router.go(-1)
      },
      _list() {
        const form = {
          managementUnit: this.managementUnit,
          keyword: this.keyword,
          status: 1
        }
        list(form).then(response => {
          this.list = response.data
        })
      },
      onSearch() {
        this._list()
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    width: 750px;
    background: #fff;

    .header {
      position: fixed;
      width: 100%;
      z-index: 9;
    }

    .list{
      padding-top: 100px;
    }
  }
</style>
