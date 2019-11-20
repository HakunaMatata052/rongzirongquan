<template>
  <div id="mine">
    <navBar />
    <div class="main">
      <van-cell-group class="cell-group">
        <van-cell :title="item.name" :to="item.path" is-link v-for="(item,index) in list" :key="index" @click="$router.push('/aboutDetails/'+item.id)"/>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "aboutList",
  components: {
    navBar
  },
  data() {
    return {
        list:[
            {name:'新手指引',id:"2"},
            {name:'公司简介',id:"3"},
            {name:'联系我们',id:"4"},
            {name:'优惠活动',id:"5"},
            {name:'公司资质',id:"6"},
            {name:'办公环境',id:"7"},
            {name:'安全保障',id:"8"},
            {name:'常见问题',id:"9"},
            {name:'隐私条款',id:"10"},
            {name:'风险揭示书',id:"11"}
        ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.cell-group{
    margin-top: 15px;
}
</style>

