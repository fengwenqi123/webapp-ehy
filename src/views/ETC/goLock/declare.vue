<template>
  <div class="container">
    <div
      class="register"
      v-if="isCancel"
    >
      <ul>
        <li>
          <span>船舶名称</span>
          <input
            placeholder="请输入船舶名称"
            v-model="shipName"
          >
        </li>
        <li>
          <span>危险品船舶</span>
          <input
            placeholder="是否危险品船舶"
            v-model="dangerShip"
          >
          <!--          <span>{{dangerShip}}</span>-->
        </li>
        <li>
          <span>装载方式</span>
          <span @click="loadWay()">{{loadText}}</span>
        </li>
        <li>
          <span>联系方式</span>
          <input
            type="number"
            placeholder="请输入联系方式"
            v-model="input.phone"
          >
        </li>
        <li class="list-title">船闸选择</li>
        <li>
          <span>船闸</span>
          <span @click="showShipLock()">{{shipLock}}</span>
        </li>
        <li
          class="list-title"
          v-if="isGoods"
        >货种选择
        </li>
        <li
          class="goods-add"
          @click="addGoods()"
          v-if="isGoods"
        >
          <span>添加货种</span>
          <van-icon name="add-o" />
        </li>
        <li
          class="goods-list"
          v-for="(item,index) in goodsArr"
          :key="index"
          @click="goodsDel(item,index)"
        >
          <label>{{item.name}}</label>
          <label>{{item.load}}吨</label>
          <van-icon name="close" />
        </li>
        <li class="list-title">载货信息</li>
        <li>
          <span>实际载货吨</span>
          <span>{{loadNumber}}</span>
        </li>
        <li>
          <span>实际吃水（m）</span>
          <input
            type="number"
            placeholder="请输入实际吃水量"
            v-model="input.water"
          >
        </li>
        <li>
          <span>申报干舷（m）</span>
          <input
            type="number"
            placeholder="请输入申报干舷"
            v-model="input.freeboard"
          >
        </li>
        <li>
          <span>拖泥深度（m）</span>
          <input
            type="number"
            placeholder="请输入拖泥深度"
            v-model="input.depth"
          >
        </li>
        <li>
          <span>净空高度（m）</span>
          <input
            type="number"
            placeholder="请输入净空高度"
            v-model="input.height"
          >
        </li>
        <li class="list-title">船舶信息</li>
        <li>
          <span>船舶类型</span>
          <span>{{typeText}}</span>
        </li>
        <li>
          <span>船舶净吨位</span>
          <input
            type="number"
            placeholder="请输入船舶净吨位"
            v-model="input.tonnage"
          >
        </li>
        <li>
          <span>C级参考载重吨</span>
          <input
            type="number"
            placeholder="请输入参考载重吨"
            v-model="input.DWT"
          >
        </li>
        <li>
          <span>船舶长度（m）</span>
          <input
            type="number"
            placeholder="请输入船舶长度"
            v-model="input.length"
          >
        </li>
      </ul>

      <div class="login-click padding">
        <van-button
          type="info"
          size="large"
          :disabled="buttonFlag"
          @click="portSumitClick()"
        >确认报港
        </van-button>
      </div>
      <!-- 装载方式 -->
      <van-dialog
        v-model="show"
        title="装载方式"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
      >
        <ul class="dialog-ul load-ul">
          <li
            v-for="(item,index) in actions"
            :key="index"
            @click="onSelect(item)"
          >{{item.name}}
          </li>
        </ul>
      </van-dialog>
      <!--      船闸-->
      <van-dialog
        v-model="shipLockFlag"
        title="船闸列表"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
      >
        <ul class="dialog-ul">
          <li
            v-for="(item,index) in shipLockList"
            :key="index"
            @click="onSelectShipLock(item)"
          >{{item.name}}
          </li>
        </ul>
      </van-dialog>
      <!-- 起始港 -->
      <van-dialog
        v-model="startPortShow"
        title="起始港"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
      >
        <ul class="dialog-ul">
          <li
            v-for="(item,index) in portItems"
            :key="index"
            @click="startPortSelect(item)"
          >{{item.name}}
          </li>
        </ul>
      </van-dialog>
      <!-- 目的港 -->
      <van-dialog
        v-model="endPortShow"
        title="目的港"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
      >
        <ul class="dialog-ul">
          <li
            v-for="(item,index) in portItems"
            :key="index"
            @click="endPortSelect(item)"
          >{{item.name}}
          </li>
        </ul>
      </van-dialog>
      <!-- 货种 -->
      <van-dialog
        v-model="goodsShow"
        title="添加货种"
        @confirm="goodsSubmit"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
      >
        <ul class="goods-ul">
          <li @click="goodsList()">
            <span>货种名称</span>
            <span>{{goodsText}}</span>
          </li>
          <li>
            <span>载货吨位</span>
            <input
              type="number"
              placeholder="请输入载货吨位"
              v-model="goodLoad"
            >
          </li>
        </ul>
        <div class="login-click padding">
          <van-button
            type="info"
            size="large"
            @click="goodsSubmit()"
          >添加
          </van-button>
        </div>
      </van-dialog>
      <!-- 货种列表 -->
      <van-dialog
        v-model="goodsListShow"
        title="货种"
        :show-confirm-button="false"
        :close-on-click-overlay="true"
      >
        <ul class="dialog-ul">
          <li
            v-for="(item,index) in goodsItems"
            :key="index"
            @click="goodsSelect(item)"
          >{{item.name}}
          </li>
        </ul>
      </van-dialog>
    </div>
    <van-dialog
      v-model="otherShow"
      title="货种名称"
      @confirm="otherGoods"
      :close-on-click-overlay="true"
      show-cancel-button
    >
      <div class="other-goods">
        <input
          type="text"
          placeholder="请输入货种名称"
          v-model="goodName"
        >
      </div>

    </van-dialog>

  </div>
</template>
<script>
import { shipLockList, goodsLists, postBaoGang } from '@/api/etc.js'
import { setTitle } from '@/utils/cache.js'
// import Vue from 'vue'
// import { Toast } from 'vant'

export default {
  name: 'point',
  data() {
    return {
      items: [],
      loadingSpinner: true,
      shipName: null,
      isCancel: true,
      buttonFlag: false,
      portItems: [],
      loadText: '请选择装载方式',
      loadId: '',
      show: false,
      actions: [
        {
          name: '实装',
          id: 1
        },
        {
          name: '空载',
          id: 0
        }
      ],
      startPortText: '请选择起始港',
      startPortId: '',
      endPortShow: false,
      endPortText: '请选择目的港',
      endPortId: '',
      startPortShow: false,
      isGoods: true,
      goodsShow: false,
      otherShow: false,
      goodName: '',
      goodsText: '请选择货种',
      goodsId: '',
      goodsItems: [],
      goodsListShow: false,
      goodsArr: [],
      goodLoad: '',
      dangerShip: '',
      shipTypeId: '',
      loadNumber: 0,
      typeText: '干货船',
      input: {
        phone: '',
        water: '',
        freeboard: '',
        depth: '',
        height: '',
        tonnage: '',
        DWT: '',
        length: ''
      },
      page: {
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      shipLockFlag: false,
      shipLockList: [],
      shipLock: null,
      shipLockId: null
    }
  },
  created() {
    setTitle(this.$route.meta.title)
    this.getGoodsLists()
    this.getShipLockList()
  },
  methods: {
    // 装载方式
    loadWay() {
      this.show = true
    },
    showShipLock() {
      this.shipLockFlag = true
    },
    getShipLockList() {
      shipLockList().then(response => {
        this.shipLockList = response.data
      })
    },
    onSelectShipLock(item) {
      this.shipLock = item.name
      this.shipLockId = item.id
      this.shipLockFlag = false
    },
    onSelect(value) {
      this.show = false
      this.loadText = value.name
      this.loadId = value.id
      if (value.name === '空载') {
        this.isGoods = false
        this.loadNumber = 0
        this.goodsArr = []
      } else {
        this.isGoods = true
      }
    },
    // 起始港
    startPort() {
      this.startPortShow = true
    },
    startPortSelect(value) {
      if (value.name === this.endPortText) {
        this.$toast('与目的港冲突')
      } else {
        this.startPortShow = false
        this.startPortText = value.name
        this.startPortId = value.id
      }
    },
    // 目的港
    endPort() {
      this.endPortShow = true
    },
    endPortSelect(value) {
      if (value.name === this.startPortText) {
        this.$toast('与起始港冲突')
      } else {
        this.endPortShow = false
        this.endPortText = value.name
        this.endPortId = value.id
      }
    },
    // 货种
    addGoods() {
      this.goodsShow = true
    },
    goodsSubmit() {
      if (this.goodsText === '请选择货种') {
        this.$toast('请选择货种')
        return
      }
      if (!this.goodLoad) {
        this.$toast('请输入载货吨位')
        return
      }
      this.goodsShow = false
      const obj = {}
      obj.name = this.goodsText
      obj.id = this.goodsId
      obj.load = this.goodLoad
      obj.goodTypeMark = this.goodName
      this.goodsArr.push(obj)
      this.goodName = ''
      this.loadNumber = this.loadNumber + Number(this.goodLoad)
    },
    goodsDel(value, i) {
      this.goodsArr.splice(i, 1)
      this.loadNumber = this.loadNumber - Number(value.load)
    },
    goodsList() {
      this.goodsListShow = true
    },
    otherGoods() {
      this.otherShow = false
      this.goodsText = '其他（' + this.goodName + '）'
    },
    goodsSelect(value) {
      this.goodsId = value.id
      this.goodsListShow = false
      if (value.name !== '其他') {
        this.goodsText = value.name
      } else {
        this.otherShow = true
      }
    },
    getGoodsLists() {
      goodsLists().then(response => {
        this.goodsItems = response.data
      })
    },
    portSumitClick() {
      if (this.loadText === '请选择装载方式') {
        this.$toast('请选择装载方式')
        return
      }
      if (!this.input.phone) {
        this.$toast('请输入联系方式')
        return
      }
      if (!this.input.water && this.input.water !== 0) {
        this.$toast('请输入实际吃水量')
        return
      }
      if (!this.input.freeboard && this.input.freeboard !== 0) {
        this.$toast('请输入申报干舷')
        return
      }
      if (!this.input.depth && this.input.depth !== 0) {
        this.$toast('请输入拖泥深度')
        return
      }
      if (!this.input.height && this.input.depth !== 0) {
        this.$toast('请输入净空高度')
        return
      }
      // if (!this.shipTypeId) {
      //   this.$toast('请选择船舶类型')
      //   return
      // }
      if (!this.input.tonnage && this.input.tonnage !== 0) {
        this.$toast('请输入船舶净吨位')
        return
      }
      if (!this.input.DWT && this.input.DWT !== 0) {
        this.$toast('请输入参考载重吨')
        return
      }
      if (!this.input.length) {
        this.$toast('请输入船舶长度')
        return
      }
      const dataObj = {}
      dataObj.type = 1
      dataObj.shipname = this.shipName
      dataObj.phone = Number(this.input.phone)
      dataObj.lockId = this.shipLockId
      dataObj.shipnameid = localStorage.cbdjh
      dataObj.reportFrom = 'APP'
      dataObj.operator = localStorage.userId
      dataObj.reportLocation = 0 // 服务区
      dataObj.reportStart = this.startPortId // 起始港
      dataObj.reportEnd = this.endPortId // 目的港
      dataObj.sfwxp = this.dangerId // 是否危险品
      dataObj.zhzt = this.loadId // 载货状态

      dataObj.chishui = Number(this.input.water) // 吃水
      dataObj.sbgx = Number(this.input.freeboard) // 申报干舷
      dataObj.jkgd = Number(this.input.height) // 高度
      dataObj.tnsd = Number(this.input.depth) // 拖泥深度

      dataObj.shipTypeId = this.shipTypeId
      dataObj.jdw = Number(this.input.tonnage)// 净吨位
      dataObj.ckzzd = Number(this.input.DWT) // 参考载重吨
      dataObj.zjzgl = 0 // this.input.horsepower; // 主机总功率 马力
      dataObj.ckdezj = 0 // 乘客
      dataObj.cz = this.input.length // 长度
      const arr = []
      this.goodsArr.forEach((v) => {
        console.log(v)
        const obj = {}
        obj.goodtypeId = v.id
        obj.zhdw = v.load
        if (v.goodTypeMark) {
          obj.goodTypeMark = v.goodTypeMark
        }
        arr.push(obj)
      })
      dataObj.goodList = arr
      postBaoGang(JSON.stringify(dataObj)).then(response => {
        this.$toast('申报成功！\n' +
          '\n' +
          '过闸金额：0（元）\n' +
          '\n' +
          '等待过闸····')
        setTimeout(() => {
          this.$router.back()
        }, 1500)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .register {
    > ul,
    .goods-ul {
      background: #fff;

      li {
        height: 104px;
        line-height: 104px;
        border-bottom: 1px solid #ddd;
        position: relative;
        padding: 0 24px;

        > span,
        input {
          font-size: 32px;
          color: #333;
        }

        > span:nth-child(1) {
          position: absolute;
          left: 24px;
          top: 0;
        }

        > span:nth-child(2) {
          width: 100%;
          height: 100%;
          display: block;
          padding-left: 140px;
          text-align: right;
          box-sizing: border-box;
        }

        input {
          width: 100%;
          border: 0;
          text-align: right;
          padding-left: 140px;
          box-sizing: border-box;
        }
      }

      .list-title {
        height: 70px !important;
        line-height: 70px !important;
        background: #f2f2f2 !important;
        color: #1989fa;
        font-size: 32px;
      }

      .goods-add {
        .van-icon {
          position: absolute;
          right: 24px;
          line-height: 104px;
          font-size: 40px;
          color: #1989fa;
          font-size: 50px;
        }
      }

      .goods-list {
        label {
          padding-right: 24px;
          font-size: 32px;
          color: #666;
        }

        .van-icon {
          position: absolute;
          right: 24px;
          line-height: 104px;
          font-size: 40px;
          color: #f44;
          font-size: 50px;
        }
      }
    }

    .goods-ul {
      border-top: 1px solid #ddd;
      margin-top: 48px;
    }
  }

  .dialog-ul {
    height: 600px;
    overflow: auto;
    border-top: 1px solid #ddd;
    margin-top: 48px;

    li {
      height: 104px;
      line-height: 104px;
      padding-left: 24px;
      border-bottom: 1px solid #ddd;
    }
  }

  .load-ul {
    height: auto;

    li {
      text-align: center;
    }
  }

  .login-click {
    margin: 50px 0 80px 0;
    padding: 0 36px;
  }

  .other-goods {
    margin: 40px;

    input {
      width: 100%;
      height: 80px;
      line-height: 80px;
      box-sizing: border-box;
      padding-left: 24px;
      background: #f2f2f2;
      border: 0;
    }
  }
}
</style>

<style lang="scss">
// .van-pull-refresh__head {
//   height: 0.8rem;
//   line-height: 0.8rem;
//   top: -0.8rem;
// }
</style>
