<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-tabs v-model="active"  @change="getList(true)" >
        <van-tab :title="item.title" :name="item.name" v-for="(item,i) in tabs" :key="i"></van-tab>
      </van-tabs>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <table class="table">
          <tr>
            <th width="25%">发生日期</th>
            <th width="25%">交易类型</th>
            <th width="25%">发生金额</th>
            <th width="25%">账户余额</th>
          </tr>
          <tr v-for="(item,i) in list" :key="i">
            <td>
              <h4>123</h4>
              <span>2019.02.03</span>
            </td>
            <td>{{item.type}}</td>
            <td :class="item.money>0?'zhang':'die'">{{item.money}}</td>
            <td>12123</td>
          </tr>
        </table>
      </van-list>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "capitalDetails",
  components: {
    navBar
  },
  data() {
    return {
      active: 1,
      tabs: [
        { title: "出金", name: 1 },
        { title: "入金", name: 2 },
        { title: "交易", name: 3 }
      ],
      page: 1,
      list: [],
      loading: false,
      finished: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    getList(isClear) {
      if (isClear) {
        this.page = 1;
        this.finished = false;
        this.list = [];
      }
      this.$SERVER
        .fund_detail({
          type: this.active,
          page: this.page
        })
        .then(res => {
          this.loading = false;
          if (res.data.length == 0) {
            this.finished = true;
            return;
          }
          this.page++;
          this.list = [...this.list, ...res.data];
        });
    }
  }
};
</script>

<style lang="less" scoped>
.table {
  width: 100%;
  text-align: center;
  background: #fff;
  th {
    background: #f7f7f7;
    font-size: 13px;
    padding: 15px 0;
    color: #999999;
  }
  td {
    font-size: 13px;
    color: #333333;
    padding: 15px 0;
    vertical-align: middle;
    h4 {
      font-size: 13px;
      color: #333333;
    }
    span {
      font-size: 13px;
      color: #999999;
    }
  }
}
</style>

