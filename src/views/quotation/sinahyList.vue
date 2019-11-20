<template>
  <div class="container" id="home">
    <navBar />
    <div class="main">
      <div class="title">
        <h3>热门行业</h3>
      </div>
      <van-grid :column-num="3" class="hot">
        <van-grid-item v-for="(item,index) in sinahy" :key="index"  :to="'/stockList/0/'+item[0]">
          <h3>{{item[1]}}</h3>
          <h4 :class="item[5]>0?'zhang':'die'">{{$METHOD.format45(item[5],100)}}%</h4>
          <h5>{{item[12]}}</h5>
          <p>
            <span>{{item[10]}}</span>
            <span>{{$METHOD.format45(item[9],100)}}%</span>
          </p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "sinahyList",
  data() {
    return {
      activeType: "quotation",
      sinahy:[],
    };
  },
  components: {
    navBar
  },
  created() {
    this.$SERVER.stocklist().then(res=>{
      this.sinahy = res.data.sinahy
    })
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f7f7f7;
  width: 100%;
  background: #fff;
  margin-top: 15px;
  box-sizing: border-box;
  h3 {
    font-size: 17px;
    color: #333333;
    border-left: 4px solid #f64c50;
    padding-left: 7px;
    font-weight: bold;
  }
  span {
    font-size: 13px;
    color: #999999;
  }
}
.hot {
  text-align: center;
  background: #fff;
  h3 {
    font-size: 15px;
    font-weight: bold;
    color: #333333;
  }
  h4 {
    font-size: 18px;
  }
  h5 {
    font-size: 13px;
    color: #999999;
  }
  p {
    width: 100%;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    box-sizing: border-box;
    span {
      font-size: 11px;
      color: #999;
    }
  }
}

</style>

