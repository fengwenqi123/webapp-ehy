<template>
    <div class="container">
      <div class="main">
        <div class="value">
          <p>船舶综合积分</p>
          <span>{{point}}</span>
        </div>
      </div>
    </div>
</template>

<script>
import { allPoints } from '@/api/sewageDisposal'
export default {
  data() {
    return {
      point: 0
    }
  },
  created() {
    this.getAllPoint()
  },
  methods: {
    getAllPoint() {
      allPoints().then(response => {
        this.point = response.data
      })
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 680px;
  height: 198px;
  background: url("../../../assets/img/sewage/background-tip.png") no-repeat;
  background-size: 100% 100%;
  background-position: center;
  margin: 0 auto;
  .value {
    margin-left: 210px;
    padding-top: 62px;
  }
  p {
    font-size: 30px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  span {
    display: block;
    font-size: 40px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-top: 6px;
  }
}
</style>
