<template>
  <div id="mine">
    <navBar :title="data.title" />
    <div class="main">
      <div class="content" v-html="data.content">
        
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "aboutDetails",
  components: {
    navBar
  },
  data() {
    return {
        data:{}
    };
  },
  created() {
      this.$SERVER.about({
          type:this.$route.params.id
      }).then(res=>{
          this.data= res.data
      })
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.cell-group{
    margin-top: 15px;
}
</style>

