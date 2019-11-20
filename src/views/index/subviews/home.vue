<template>
  <div class="container">
    <navBar/>
    <div class="main">
      <iframe src="/wapindex2.php" frameborder="0" class="iframe"></iframe>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "home",
  data() {
    return {
    };
  },
  components: {
    navBar
  },
  created() {
  },
  mounted() {},
  methods: {
  }
};
</script>

<style lang="less" scoped>
</style>

