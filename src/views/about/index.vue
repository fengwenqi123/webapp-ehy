<template>
  <div class="container">
    <div class="header">
      <pageHeader />
    </div>
    <ul>
      <li
        v-for="(item, index) in dataList"
        :key="index"
        @click="showContent(item.content, item.title, true)"
      >
        <div class="item">
          <div class="title">
            {{ item.title }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { list } from '@/api/about'
import pageHeader from '@/components/navBar'

export default {
  name: 'index',
  components: {
    pageHeader
  },
  data() {
    return {
      dataList: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      list({
        articleClassId: 'platform',
        articleClassCode: 'platform',
        status: 1
      }).then(response => {
        if (response.data.length === 1) {
          this.showContent(
            response.data[0].content,
            response.data[0].title,
            false
          )
        } else {
          this.dataList = response.data
        }
      })
    },
    showContent(content, title, flag) {
      this.$router.push({
        path: '/aboutContent',
        query: {
          content,
          title,
          flag
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;

  .header {
    position: fixed;
    width: 100%;
    z-index: 9;
  }

  ul {
    padding-top: 100px;

    li {
      .item {
        height: 80px;
        line-height: 80px;
        margin: 0 40px;
      }

      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
