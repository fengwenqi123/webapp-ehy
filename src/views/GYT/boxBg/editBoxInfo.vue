<template>
  <div class="container">
<!--    <div class="header">-->
<!--      <pageHeader/>-->
<!--    </div>-->
    <div class="content">
      <van-cell-group>
        <van-field
          v-model="boxInfo.type"
          label="集装箱类型"
          is-link
          disabled
          input-align="right"
          arrow-direction="down"
          placeholder="请选择集装箱类型"
          @click="show=true"
        />
        <van-field
          v-model="boxInfo.number"
          label="数量(个)"
          clickable
          type="number"
          input-align="right"
          placeholder="请输入集装箱数量"
        />
        <van-field
          v-model="boxInfo.teu"
          label="箱量(TEU)"
          clickable
          type="number"
          input-align="right"
          placeholder="请输入集装箱箱量"
        />
        <van-field
          v-model="boxInfo.weight"
          label="重量(吨)"
          clickable
          type="number"
          input-align="right"
          placeholder="请输入集装箱重量"
        />
        <van-field
          v-model="boxInfo.volume"
          label="货量(吨)"
          clickable
          type="number"
          input-align="right"
          placeholder="请输入集装箱货量"
        />
      </van-cell-group>
      <div class="submit">
        <van-button class="button" size="normal" @click="validate(submit)">保存</van-button>
        <van-button class="button" type="info" size="normal" @click="validate(deletes)">删除</van-button>
      </div>
    </div>
    <van-popup v-model="show" round position="bottom">
      <van-picker
        show-toolbar
        title="集装箱类型"
        :default-index="pickerIndex"
        :columns="columns"
        @cancel="show = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
  import pageHeader from '@/components/navBar'
  import { Toast } from 'vant'
  import { setTitle } from '@/utils/cache.js'

  export default {
    components: {
      pageHeader
    },
    data() {
      return {
        show: false,
        columns: ['(重箱)40英寸标准箱', '(重箱)40英寸自然箱', '(重箱)20英寸标准箱', '(重箱)20英寸自然箱', '(空箱)40英寸标准箱', '(空箱)40英寸自然箱', '(空箱)20英寸标准箱', '(空箱)20英寸自然箱'],
        boxInfo: {
          type: null,
          number: null,
          teu: null,
          weight: null,
          volume: null
        },
        index: null,
        pickerIndex: null
      }
    },
    created() {
      this.getQuery()
      setTitle(this.$route.meta.title)
    },
    methods: {
      getQuery() {
        this.index = this.$route.query.index
        this.boxInfo = JSON.parse(this.$route.query.stringObj)
        this.pickerIndex = this.columns.indexOf(this.boxInfo.type)
      },
      onConfirm(value) {
        this.boxInfo.type = value
        this.show = false
      },
      submit() {
        this.$store.commit('edit_boxInfo', {
          value: this.boxInfo,
          index: this.index
        })
        this.$router.go(-1)
      },
      deletes() {
        this.$store.commit('delete_boxInfo', this.index)
        this.$router.go(-1)
      },
      validate(fn) {
        if (!this.boxInfo.type) {
          Toast.fail('请选择集装箱类型')
          return
        }
        if (!this.boxInfo.number) {
          Toast.fail('请输入集装箱数量')
          return
        }
        if (!this.boxInfo.teu) {
          Toast.fail('请输入集装箱箱量')
          return
        }
        if (!this.boxInfo.weight) {
          Toast.fail('请输入集装箱重量')
          return
        }
        if (!this.boxInfo.volume) {
          Toast.fail('请输入集装箱货量')
          return
        }
        fn()
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    position: absolute;
    width: 100%;
    /*background: #fff;*/

    /*.header {*/
    /*  position: fixed;*/
    /*  width: 100%;*/
    /*  z-index: 9;*/
    /*}*/

    .content {
      /*padding-top: 92px;*/

      ul {
        li {
          .item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 40px;
            height: 100px;
            border-bottom: 1px solid #ccc;

            .label {
              font-size: 30px;
            }

            .value {
              font-size: 30px;
            }
          }
        }
      }

      .submit {
        margin-top: 50px;
        display: flex;
        padding: 0 40px;
        align-items: center;
        justify-content: space-between;

        .button {
          width: 330px;
        }
      }

    }
  }
</style>
