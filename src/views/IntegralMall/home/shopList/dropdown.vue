<template>
  <div class="dropdown">
    <van-dropdown-menu>
      <van-dropdown-item v-model="value" :options="option"/>
      <div class="van-dropdown-menu__item" @click="setPrice">
        <p>价格</p>
        <div class="price-icon">
          <img src="../../../../assets/img/shop/top.png" alt="" v-show="priceFlag===1||priceFlag===0">
          <img class="bottom-img" src="../../../../assets/img/shop/top.png" alt=""
               v-show="priceFlag===2 ||priceFlag===0">
        </div>
      </div>
    </van-dropdown-menu>
  </div>
</template>

<script>
  export default {
    name: 'dropdown',
    data() {
      return {
        value: 0,
        option: [
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 }
        ],
        priceFlag: 0
      }
    },
    watch: {
      priceFlag() {
        this.$store.commit('setPrice', this.priceFlag)
      }
    },
    methods: {
      setPrice() {
        switch (this.priceFlag) {
          case 0:
            this.priceFlag = 1
            break
          case 1:
            this.priceFlag = 2
            break
          case 2:
            this.priceFlag = 1
            break
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .dropdown {
    .van-dropdown-menu__item {
      display: flex;

      .price-icon {
        margin-left: 10px;

        img {
          display: block;
          width: 18px;
        }

        .bottom-img {
          margin-top: 0px;
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
