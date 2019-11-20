<template>
  <div class="container" id="shop">
    <navBar/>
    <div class="main">
      <iframe src="/waporder.php" frameborder="0" class="iframe"></iframe>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "order",
  components: {
    navBar
  },
  created() {
  }
};
</script>
<style lang="less" scoped>
</style>