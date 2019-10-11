<template>
  <div class="container">
    <!--    <div class="header">-->
    <!--      <pageHeader />-->
    <!--    </div>-->
    <div class="content">
      <van-cell-group>
        <van-field v-model="shipName"
                   label="船名"
                   clickable
                   disabled
                   input-align="right"/>
        <van-field v-model="active1.name"
                   label="装/卸货"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择"
                   @click="show=true"/>
        <van-field v-model="active2.name"
                   label="起运港"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择起运港"
                   @click="qyList"/>
        <van-field v-model="active3.name"
                   label="目的港"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择目的港"
                   @click="mdList"/>
        <van-field v-model="active4.name"
                   label="作业码头"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择作业码头"
                   @click="pierList"/>
        <van-field v-model="active5.name"
                   label="货种"
                   is-link
                   disabled
                   input-align="right"
                   arrow-direction="down"
                   placeholder="请选择货种"
                   @click="goodsList"/>
        <van-field v-model="Tonnage"
                   label="载重吨（t）"
                   clickable
                   disabled
                   input-align="right"
                   placeholder="请选择载重吨（t）"/>
        <van-field label="集装箱信息"
                   clickable
                   disabled
                   right-icon="add"
                   @click="boxInfo">
        </van-field>
      </van-cell-group>
      <div class="table"
           v-if="boxInfos.length>0">
        <table border="1">
          <tr>
            <th>类型</th>
            <th>个数</th>
            <th>箱重</th>
            <th>吨重</th>
            <th>货重</th>
          </tr>
          <tr v-for="(item,index) in boxInfos"
              :key="index"
              @click="editBox(item,index)">
            <td>{{item.type}}</td>
            <td>{{item.number}}</td>
            <td>{{item.teu}}</td>
            <td>{{item.weight}}</td>
            <td>{{item.volume}}</td>
          </tr>
        </table>
      </div>
      <div class="submit"
           @click="submit">
        <van-button type="info"
                    size="large">报 港
        </van-button>
      </div>
    </div>
    <van-action-sheet v-model="show"
                      :actions="actions"
                      round
                      close-on-click-action
                      @select="onSelect"
                      cancel-text="取消"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { Toast } from 'vant'
  import pageHeader from '@/components/navBar'
  import { detailByShipName, report } from '@/api/gyt'
  import { setTitle } from '@/utils/cache.js'

  export default {
    name: 'index',
    components: {
      pageHeader
    },
    computed: {
      ...mapGetters([
        'selected_qyg',
        'selected_mdg',
        'selected_pier',
        'selected_zxh',
        'selected_goods',
        'selected_zzd',
        'boxInfos',
        'shipName'
      ])
    },
    data() {
      return {
        show: false,
        actions: [
          {
            name: '装货',
            value: 1
          },
          {
            name: '卸货',
            value: 2
          }
        ],
        active1: null,
        active2: null,
        active3: null,
        active4: null,
        active5: null,
        Tonnage: null
      }
    },
    created() {
      this.init()
      this.getTonnage()
      setTitle(this.$route.meta.title)
    },
    methods: {
      init() {
        const obj = {
          name: null
        }
        this.active1 = this.selected_zxh ? this.selected_zxh : obj
        this.active2 = this.selected_qyg ? this.selected_qyg : obj
        this.active3 = this.selected_mdg ? this.selected_mdg : obj
        this.active4 = this.selected_pier ? this.selected_pier : obj
        this.active5 = this.selected_goods ? this.selected_goods : obj
      },
      onSelect(item) {
        this.$store.commit('set_zxh', item)
        this.active1 = item
      },
      qyList() {
        if (!this.active1.name) {
          Toast('请先选择装/卸货')
          return
        }
        this.$router.push(
          {
            path: '/qyList'
          }
        )
      },
      mdList() {
        if (!this.active1.name) {
          Toast('请先选择装/卸货')
          return
        }
        if (!this.active2.name) {
          Toast('请先选择起运港')
          return
        }
        this.$router.push(
          {
            path: '/mdList'
          }
        )
      },
      pierList() {
        if (!this.active1.name) {
          Toast('请先选择装/卸货')
          return
        }
        if (!this.active2.name) {
          Toast('请先选择起运港')
          return
        }
        if (!this.active3.name) {
          Toast('请先选择目的港')
          return
        }
        this.$router.push(
          {
            path: '/pierList',
            query: {
              name: this.active2.name ? `${this.active2.name}航管理处` : null
            }
          }
        )
      },
      goodsList() {
        if (!this.active1.name) {
          Toast('请先选择装/卸货')
          return
        }
        if (!this.active2.name) {
          Toast('请先选择起运港')
          return
        }
        if (!this.active3.name) {
          Toast('请先选择目的港')
          return
        }
        if (!this.active4.name) {
          Toast('请先选择作业码头')
          return
        }
        this.$router.push(
          {
            path: '/goodsList',
            query: {
              id: this.active4.id ? this.active4.id : null
            }
          }
        )
      },
      getTonnage() {
        if (this.selected_zzd) {
          this.Tonnage = this.selected_zzd
        } else {
          detailByShipName(this.shipName).then(response => {
            this.Tonnage = response.data.ckzzd
            this.$store.commit('set_zzd', this.Tonnage)
          })
        }
      },
      boxInfo() {
        this.$router.push({
          path: '/boxInfo'
        })
      },
      submit() {
        if (!this.active1.name) {
          Toast('请先选择装/卸货')
          return
        }
        if (!this.active2.name) {
          Toast('请先选择起运港')
          return
        }
        if (!this.active3.name) {
          Toast('请先选择目的港')
          return
        }
        if (!this.active4.name) {
          Toast('请先选择作业码头')
          return
        }
        if (!this.active5.name) {
          Toast('请先选择货种')
          return
        }
        if (!this.boxInfos.length) {
          Toast('请先录入集装箱信息')
          return
        }
        const type = []
        const teu = []
        const amount = []
        const goodsWeight = []
        const totalWeight = []
        this.boxInfos.forEach(item => {
          type.push(item.type)
          teu.push(item.teu)
          amount.push(item.number)
          goodsWeight.push(item.volume)
          totalWeight.push(item.weight)
        })
        report({
          shipName: this.shipName,
          operationType: this.active1.value,
          startPortId: this.active2.cityID,
          targetPortId: this.active3.id,
          pierId: this.active4.id,
          goodsId: this.active5.id,
          weight: this.Tonnage,
          type: type.join(','),
          teu: teu.join(','),
          amount: amount.join(','),
          goodsWeight: goodsWeight.join(','),
          totalWeight: totalWeight.join(',')
        }).then(response => {
          Toast.success({
            message: response.msg,
            duration: 1000
          })
          setTimeout(() => {
            this.$router.push({
              path: '/bgHistory'
            })
          }, 1000)
        })
      },
      editBox(item, index) {
        this.$router.push({
          path: '/editBoxInfo',
          query: {
            index: index,
            stringObj: JSON.stringify(item)
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    height: 100%;
    position: absolute;
    width: 100%;
    background: #fff;
    overflow: auto;
    padding-bottom: 40px;

    /*.header {*/
    /*  position: fixed;*/
    /*  width: 100%;*/
    /*  z-index: 9;*/
    /*}*/

    .content {
      /*padding-top: 100px;*/

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

      .table {
        /*width: 100%;*/
        padding: 0 40px;
        margin-top: 30px;

        table {
          width: 100%;
          border: 1px solid #ccc;

          td,
          tr {
            height: 70px;
            text-align: center;
          }
        }
      }

      .submit {
        margin-top: 50px;
        padding: 0 40px;
      }
    }
  }
</style>
