<template>
  <div class="container">
    <div class="content">
     <van-popup
        v-model="showType"
        position="bottom"
      >
        <van-picker :columns="columns" show-toolbar  @cancel="onCancel" @confirm="onConfirm" />
      </van-popup>
      <van-popup
        v-model="showArea"
        position="bottom"
      >
        <van-area :area-list="areaList" @cancel="onCancelArea" @confirm="onConfirmArea"/>
      </van-popup>
      <div class="dateBtn">
        <span @click="showPopupArea">{{areaBtn}} <van-icon name="arrow-down"/></span>
      </div>
      <div class="dateBtn">
        <span @click="showPopupType">{{typeBtn}} <van-icon name="arrow-down"/></span>
      </div>  
      <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
     >
      <van-list
        class="main"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          class="card"
          v-for="item in itemList"
          :key="item.id"
        >
          <div>
            <van-row>
              <van-col :offset="1" span="8">
                <p>{{item.name}}</p>
              </van-col>
              <van-col span="3">
                <span>{{item.attribute===1?'智能':item.attribute===2?'普通':item.attribute===3?'综合':"不明"}}</span>
              </van-col>
              <van-col span="6" :offset="5">
                <p :class="{status1:item.status===2,status2:item.status===3}">{{item.status===1?'空闲':item.status===2?'工作中':item.status===3?'报修中':"状态不明"}}</p>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="8" :offset="1">
                <p>联系人：{{item.contact}}</p>
              </van-col>
              <van-col span="2">
                <p>{{item.mobile}}</p>
              </van-col>
              <van-col span="2" :offset="10">
                <p>{{item.distance}}</p>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="8" :offset="1">
                <p>地址：{{item.address}}</p>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="12" :offset="1">
                <span :class="{active:fomesFun1(item.fomesType||'')}">生活垃圾</span>
                <span :class="{active:fomesFun2(item.fomesType||'')}">生活污水</span>
                <span :class="{active:fomesFun3(item.fomesType||'')}">油污</span>
              </van-col>
            </van-row>
            </div>
          </div>
      </van-list>
    </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import { sewagePoint } from '@/api/sewageDisposal'
import { getLat, getLng, setTitle } from '@/utils/cache'
export default {
  data() {
    return {
      value1: 0,
      value2: '排污类型',
      option1: [
        { text: '地区', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      columns: [
        '全部类型',
        '生活垃圾',
        '生活污水',
        '油污'
      ],
      areaList:
      {
        province_list: {
          330000: '浙江省'
        },
        city_list: {
          330100: '杭州市',
          330200: '宁波市',
          330300: '温州市',
          330400: '嘉兴市',
          330500: '湖州市',
          330600: '绍兴市',
          330700: '金华市',
          330800: '衢州市',
          330900: '舟山市',
          331000: '台州市',
          331100: '丽水市'
        },
        county_list: {
          330102: '上城区',
          330103: '下城区',
          330104: '江干区',
          330105: '拱墅区',
          330106: '西湖区',
          330108: '滨江区',
          330109: '萧山区',
          330110: '余杭区',
          330111: '富阳区',
          330112: '临安区',
          330122: '桐庐县',
          330127: '淳安县',
          330182: '建德市',
          330203: '海曙区',
          330205: '江北区',
          330206: '北仑区',
          330211: '镇海区',
          330212: '鄞州区',
          330213: '奉化区',
          330225: '象山县',
          330226: '宁海县',
          330281: '余姚市',
          330282: '慈溪市',
          330302: '鹿城区',
          330303: '龙湾区',
          330304: '瓯海区',
          330305: '洞头区',
          330324: '永嘉县',
          330326: '平阳县',
          330327: '苍南县',
          330328: '文成县',
          330329: '泰顺县',
          330381: '瑞安市',
          330382: '乐清市',
          330402: '南湖区',
          330411: '秀洲区',
          330421: '嘉善县',
          330424: '海盐县',
          330481: '海宁市',
          330482: '平湖市',
          330483: '桐乡市',
          330502: '吴兴区',
          330503: '南浔区',
          330521: '德清县',
          330522: '长兴县',
          330523: '安吉县',
          330602: '越城区',
          330603: '柯桥区',
          330604: '上虞区',
          330624: '新昌县',
          330681: '诸暨市',
          330683: '嵊州市',
          330702: '婺城区',
          330703: '金东区',
          330723: '武义县',
          330726: '浦江县',
          330727: '磐安县',
          330781: '兰溪市',
          330782: '义乌市',
          330783: '东阳市',
          330784: '永康市',
          330802: '柯城区',
          330803: '衢江区',
          330822: '常山县',
          330824: '开化县',
          330825: '龙游县',
          330881: '江山市',
          330902: '定海区',
          330903: '普陀区',
          330921: '岱山县',
          330922: '嵊泗县',
          331002: '椒江区',
          331003: '黄岩区',
          331004: '路桥区',
          331022: '三门县',
          331023: '天台县',
          331024: '仙居县',
          331081: '温岭市',
          331082: '临海市',
          331083: '玉环市',
          331102: '莲都区',
          331121: '青田县',
          331122: '缙云县',
          331123: '遂昌县',
          331124: '松阳县',
          331125: '云和县',
          331126: '庆元县',
          331127: '景宁畲族自治县',
          331181: '龙泉市'
        }
      },
      showArea: false,
      showType: false,
      areaBtn: '选择地区',
      typeBtn: '排污类型',
      itemList: [],
      forms1: false,
      forms2: false,
      forms3: false,
      page: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      currentLon: '',
      currentLat: '',
      city: '',
      area: '',
      isLoading: false,
      finished: false,
      loading: false
    }
  },
  created() {
    this.lists()
    setTitle(this.$route.meta.title)
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.page.pageNum = 1
        this.itemList = []
        this.lists()
        this.isLoading = false
        this.finished = false
      }, 500)
    },
    fomesFun1(value) {
      if (value.indexOf('生活垃圾') !== -1) {
        return true
      } else {
        return false
      }
    },
    fomesFun2(value) {
      if (value.indexOf('生活污水') !== -1) {
        return true
      } else {
        return false
      }
    },
    fomesFun3(value) {
      if (value.indexOf('油污') !== -1) {
        return true
      } else {
        return false
      }
    },
    onConfirm(value) {
      console.log(value)
      if (value !== '全部类型') {
        this.page.pageNum = 1
        this.typeBtn = value
        this.showType = false
        this.fomesType = value
        this.itemList = []
        this.lists()
      } else {
        this.page.pageNum = 1
        this.typeBtn = '排污类型'
        this.fomesType = ''
        this.showType = false
        this.itemList = []
        this.lists()
        this.finished = false
      }
    },
    onCancel() {
      this.page.pageNum = 1
      this.typeBtn = '排污类型'
      this.showType = false
      this.fomesType = ''
      this.itemList = []
      this.lists()
      this.finished = false
    },
    onConfirmArea(value) {
      console.log(value)
      this.city = value[1].name
      this.area = value[2].name
      this.areaBtn = this.city + this.area
      this.page.pageNum = 1
      this.itemList = []
      this.lists()
      this.finished = false
      this.showArea = false
    },
    onCancelArea() {
      this.city = ''
      this.area = ''
      this.page.pageNum = 1
      this.itemList = []
      this.lists()
      this.areaBtn = '选择地区'
      this.finished = false
      this.showArea = false
    },
    showPopupType() {
      this.showType = true
    },
    showPopupArea() {
      this.showArea = true
    },
    lists() {
      this.currentLon = getLng()
      this.currentLat = getLat()
      sewagePoint(this.page.pageNum, this.page.pageSize, this.city, this.area, this.fomesType, this.currentLon, this.currentLat).then(response => {
        console.log(response)
        this.page.total = response.data.page.total
        this.itemList = this.itemList.concat(response.data.dataList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.page.pageNum * this.page.pageSize >= this.page.total) {
          this.finished = true
        }
      })
    },
    onLoad() {
      // 异步更新数据
      this.page.pageNum++
      this.lists()
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  .content {
    .dateBtn {
      padding: 28px;
      display: table;
      display: inline-block;
      span {
        display: table-cell;
        height: 54px;
        padding: 0 20px;
        vertical-align: middle;
        background-color: #fff;
        font-size: 24px;
        text-align: center;
        line-height: 54px;
        border-radius: 80px;
      }
    }
    .card {
      padding: 20px 0 40px 0;
      background-color: #fff;
      border-bottom: 1px solid #eeeeee;
      div {
        .van-row {
          p {
            line-height: 50px;
          }
        }
        .van-row:nth-child(1) {
          .van-col:nth-child(1) {
            p {
              text-align: left;
            }
          }
          .van-col:nth-child(3) {
            p {
              font-size: 34px;
              text-align: right;
            }
            .status1 {
              color: #09bb07;
            }
            .status2 {
              color: #f76260;
            }
          }
          .van-col:nth-child(2) {
            height: 50px;
            span {
              padding: 5px 10px;
              font-size: 24px;
              color: #fff;
              display: inline-block;
              vertical-align: middle;
              background-color: #1890ff;
            }
          }
        }
        .van-row:nth-child(2),
        .van-row:nth-child(3) {
          p {
            color: #666666;
            font-size: 28px;
          }
        }
        .van-row:nth-child(4) {
          span {
            border: 1px solid #999999;
            padding: 0 2px;
            color: #999999;
            font-size: 20px;
            text-align: center;
            line-height: 30px;
          }
          .active {
            color: #1890ff;
            border-color: #1890ff;
          }
        }
      }
    }
  }
}
</style>
