<template>
  <div class="grade">
    <img :src="icon" />
  </div>
</template>

<script>
export default {
  props: ["grade"],
  data() {
    return {
      icon: ""
    };
  },
  created() {
    switch (this.grade) {
      case "1":
        this.icon = require("@/assets/images/v1.png");
        break;
      case "2":
        this.icon = require("@/assets/images/v2.png");
        break;
      case "3":
        this.icon = require("@/assets/images/v3.png");
        break;
      case "4":
        this.icon = require("@/assets/images/v4.png");
        break;
      case "5":
        this.icon = require("@/assets/images/v5.png");
        break;
      case "6":
        this.icon = require("@/assets/images/v6.png");
        break;
      case "7":
        this.icon = require("@/assets/images/v7.png");
        break;
      case "8":
        this.icon = require("@/assets/images/v8.png");
        break;
      case "9":
        this.icon = require("@/assets/images/v9.png");
        break;
      case "10":
        this.icon = require("@/assets/images/v10.png");
        break;
    }
  }
};
</script>

<style lang="less" scoped>
.grade {
    display: inline-block;
    img {
        height: 15px;
        width: auto;
        padding: 0 5px;
    }
}
</style>