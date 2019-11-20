<template>
  <div class="container" id="home">
    <navBar title>
      <template v-if="$route.params.type==1" slot="title">涨幅榜</template>
      <template v-else-if="$route.params.type==2" slot="title">跌幅榜</template>
    </navBar>
    <div class="main">
      <div class="title" v-if="$route.params.type!=0">
        <h3 v-if="$route.params.type==1">涨幅榜</h3>
        <h3 v-else-if="$route.params.type==2">跌幅榜</h3>
      </div>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <stock :data="stock" />
      </van-list>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import stock from "@/components/stock.vue";
export default {
  name: "stockList",
  data() {
    return {
      activeType: "quotation",
      stock: [],
      page: 1,
      loading: false,
      finished: false
    };
  },
  components: {
    navBar,
    stock
  },
  created() {},
  mounted() {},
  methods: {
    getList() {
      var that = this;
      if (this.$route.params.type == 1) {
        this.$SERVER.stocklist().then(res => {
          this.stock = res.data.stock_top10;
          this.finished = true;
        });
      } else if (this.$route.params.type == 2) {
        this.$SERVER.stocklist().then(res => {
          this.stock = res.data.stock_bot10;
          this.finished = true;
        });
      } else {
        that.$SERVER
          .stocktype({
            industry_code: that.$route.params.code,
            page: that.page
          })
          .then(res => {
            that.loading = false;
            that.page++;
            var arr = [];
            for (var i = 0; i < res.data.length; i++) {
              arr.push(res.data[i].code);
            }
            that.$SERVER
              .stocktypedetal({
                code: arr.join(",")
              })
              .then(res2 => {
                that.stock = [...that.stock, ...res2.data];
              });
          })
          .catch(err => {
            that.loading = false;
            that.finished = true;
          });
      }
    }
  }
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
</style>

