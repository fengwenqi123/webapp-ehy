<template>
<div class="container">
  <div class="title">
    当前任职情况
  </div>
  <div class="content" v-if="rzList.length>0">
    <ul v-for="(item,index) in rzList" :key="index">
      <li>
        <div class="item">
          <div class="label">
            任职船名
          </div>
          <div class="value">
            {{item.cbmc}}
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">
            上船任职时间
          </div>
          <div class="value">
            {{item.createdate}}
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">
            职务
          </div>
          <div class="value">
            {{item.zw}}
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="title">
    历史任职情况
  </div>
  <div class="content" v-if="jzList.length>0">
    <ul v-for="(item,index) in jzList" :key="index">
      <li>
        <div class="item">
          <div class="label">
            任职船名
          </div>
          <div class="value">
            {{item.cbmc}}
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">
            上船任职时间
          </div>
          <div class="value">
            {{item.createdate}}
          </div>
        </div>
      </li>
      <li>
        <div class="item">
          <div class="label">
            职务
          </div>
          <div class="value">
            {{item.zw}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
  import { jrzList } from '@/api/competencyCertificate'
  export default {
    name: 'dismission',
    props: ['name'],
    data() {
      return {
        page: 1,
        row: 99,
        dataList: null,
        rzList: [],
        jzList: []
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        jrzList(this.page, this.row, this.name).then(response => {
          this.dataList = JSON.parse(response.data).records.data
          this.getList()
        })
      },
      getList() {
        this.rzList = []
        this.jzList = []
        this.dataList.forEach((item, index) => {
          if (item.sfsc === 0) {
            this.jzList.push(item)
          } else {
            this.rzList.push(item)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.container{
  .title{
    height: 70px;
    line-height: 70px;
    /*background: #ccc;*/
    color: #77777C;
    padding-left: 20px;
    font-size: 28px;
  }
  .content{
    padding: 20px;
    background: #fff;
    ul{
      display: flex;
      flex-wrap: wrap;
      padding-bottom: 20px;
      border-bottom: 1px solid #ccc;
      li{
        width: 50%;
        margin-top: 20px;
      }
    }
  }
}
</style>
