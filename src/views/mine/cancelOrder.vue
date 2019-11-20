<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
        <table class="table">
          <tr>
            <th width="25%">名称代码</th>
            <th width="25%">委托价/委托量</th>
            <th width="25%">状态/时间</th>
            <th width="25%">方向/操作</th>
          </tr>
          <tr v-for="(item,i) in list" :key="i">
            <td>
              <h4>{{item.name}}</h4>
              <span>{{item.code}}</span>
            </td>
            <td>
              <h4>{{item.price}}</h4>
              <span>{{item.num}}</span>
            </td>
            <td>
              <h4>已委托</h4>
              <span>{{item.stock_trust_time}}</span>
            </td>
            <td>
              <h4 v-if="item.trust_type==1">买入委托</h4>
              <h4 v-else>卖出委托</h4>
              <span>
                <van-tag plain @click="cancelOrder(item.id)">撤单</van-tag>
              </span>
            </td>
          </tr>
        </table>
      </van-list>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "cancelOrder",
  components: {
    navBar
  },
  data() {
    return {
      active: this.$route.params.type,
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
        .withdrawal({
          type: 1,
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
    },
    cancelOrder(id) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认撤单？"
        })
        .then(() => {
          this.$SERVER
            .withdrawal({
              id: id,
              type: 2
            })
            .then(res => {
              this.$toast.success(res.message);
              this.getList(true);
            });
        });
    }
  }
};
</script>

<style lang="less" scoped>
.tabs {
  margin-top: 15px;
}
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

