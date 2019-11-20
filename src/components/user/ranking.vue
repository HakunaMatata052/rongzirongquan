<template>
  <div class="ranking">
    <img :src="icon" alt v-if="index<3" />
    <span v-else>{{index+1}}</span>
  </div>
</template>

<script>
export default {
  props: ["index"],
  data() {
    return {
      icon: ""
    };
  },
  created() {
    switch (this.index) {
      case 0:
        this.icon = require("@/assets/images/ic_rank_1.png");
        break;
      case 1:
        this.icon = require("@/assets/images/ic_rank_2.png");
        break;
      case 2:
        this.icon = require("@/assets/images/ic_rank_3.png");
        break;
    }
  }
};
</script>

<style lang="less" scoped>
.ranking {
  width: 20px;
  height: 20px;
  line-height: 20px;
  position: absolute;
  left: 50%;
  bottom: 0;
  margin-left: -15px;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    display: block;
    width: 100%;
    height: 100%;
    background: #ccc;
    font-size: 13px;
    font-family: Bahnschrift;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    text-align: center;
    border-radius: 50%;
    // border:2px solid rgba(102, 102, 102, .1);
  }
}
</style>