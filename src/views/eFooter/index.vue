<!-- 底部服务热线 -->
<template>
  <div class='footer'>
    <div class="footer-item">本服务由浙江政务服务网、杭州市人社保局提供</div>
    <div class="footer-item">服务咨询热线：<span>0571-88808880</span></div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    // 这里存放数据
    return {

    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
  beforeCreate() { }, // 生命周期 - 创建之前
  beforeMount() { }, // 生命周期 - 挂载之前
  beforeUpdate() { }, // 生命周期 - 更新之前
  updated() { }, // 生命周期 - 更新之后
  beforeDestroy() { }, // 生命周期 - 销毁之前
  destroyed() { }, // 生命周期 - 销毁完成
  activated() { } // 如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style scoped lang="scss">
// @import url(); 引入公共css类
.footer {
  padding: 36px 0;
  width: 100%;
  .footer-item {
    font-size: 24px;
    color: #999999;
    text-align: center;
    span {
      color: #1492ff;
      font-size: 24px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 400;
    }
  }
}
</style>
