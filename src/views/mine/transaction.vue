<template>
  <div class="container">
    <navBar />
    <div class="main">
      <van-tabs type="card" v-model="type" @change="getList(true)" class="card">
        <van-tab title="当前" :name="1"></van-tab>
        <van-tab title="近一周" :name="2"></van-tab>
        <van-tab title="近一月" :name="3"></van-tab>
        <van-tab title="自定义时间" :name="4">
          <div class="date">
            <div class="start">
              <h3>开始时间</h3>
              <span @click="selectTime(0)">
                {{start_time}}
                <van-icon name="arrow-down" color="#c9c9c9" />
              </span>
            </div>
            <div class="icon">
              <van-icon name="exchange" color="#c9c9c9" />
            </div>
            <div class="end">
              <h3>结束时间</h3>
              <span @click="selectTime(1)">
                {{end_time}}
                <van-icon name="arrow-down" color="#c9c9c9" />
              </span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="list">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="getList">
          <van-panel class="item" v-for="(item,index) in list" :key="index">
            <div class="title" slot="header">
              <h3>{{item.stock_name}}</h3>
              <span>{{item.stock_code}}</span>
            </div>
            <div class="con">
              <dl>
                <dt>时间：</dt>
                <dd>{{item.sell_trust_time}}</dd>
              </dl>
              <dl>
                <dt>类型：</dt>
                <dd v-if="item.buy_type==1" class="zhang">买涨</dd>
                <dd v-else-if="item.buy_type==2" class="die">买跌</dd>
              </dl>
              <dl>
                <dt>成交价：</dt>
                <dd>{{item.sell_price}}</dd>
              </dl>
              <dl>
                <dt>留仓费：</dt>
                <dd>{{item.save_money}}</dd>
              </dl>
              <dl>
                <dt>买入手续费：</dt>
                <dd>{{item.bull_cost_money}}</dd>
              </dl>
              <dl>
                <dt>卖出手续费：</dt>
                <dd>{{item.sell_cost_money}}</dd>
              </dl>
              <dl>
                <dt>数量(手）：</dt>
                <dd>{{item.bull_num}}</dd>
              </dl>
              <dl>
                <dt>盈亏：</dt>
                <dd :class="item.gain>0?'zhang':'die'">{{item.gain}}</dd>
              </dl>
            </div>
          </van-panel>
        </van-list>
        <van-popup v-model="popupShow" position="bottom">
          <van-datetime-picker v-model="currentDate"  type="date" @confirm="onConfirm" />
        </van-popup>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "transaction",
  data() {
    return {
      list: [],
      type: 1,
      page: 1,
      start_t: new Date(),
      end_t: new Date(),
      loading: false,
      finished: false,
      popupShow: false,
      currentDate: new Date(),
      timeType: null
    };
  },
  computed: {
    start_time() {
      return this.$METHOD.format(this.start_t.getTime() / 1000, "yyyy/MM/dd");
    },
    end_time() {
      return this.$METHOD.format(this.end_t.getTime() / 1000, "yyyy/MM/dd");
    }
  },
  components: {
    navBar
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
        .deal_detail({
          page: this.page,
          type: this.type,
          start_time: this.start_time,
          end_time: this.end_time
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
    selectTime(type) {
      this.popupShow = true;
      this.timeType = type;
    },
    onConfirm(value) {
      if (this.timeType == 0) {
        this.start_t = value;
      } else if (this.timeType == 1) {
        this.end_t = value;
      }
      this.popupShow = false;
      if (this.start_t.getTime() - this.end_t.getTime() > 0) {
        this.$toast.fail("结束时间不能早与起始时间！");
        return;
      }
      this.getList();
    }
  }
};
</script>
<style lang="less" scoped>
.card {
  margin-top: 10px;
}
.date {
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  h3 {
    font-size: 13px;
    color: #999999;
    margin-bottom: 10px;
    padding: 0 10px;
  }
  span {
    width: 150px;
    background-color: #fff;
    border-radius: 3px;
    padding: 9px 12px;
    box-sizing: border-box;
    font-size: 13px;
    color: #333333;
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #c9c9c9;
    border-radius: 50%;
    text-align: center;
    font-size: 16px;
    box-sizing: border-box;
  }
}
.list {
  .item {
    margin-top: 10px;
    .title {
      padding: 13px 16px;
      border-bottom: 1px solid #e6e6e6;
      h3 {
        font-size: 15px;
        font-weight: bold;
        color: #333333;
        margin-right: 5px;
        display: inline-block;
      }
      span {
        font-size: 13px;
        color: #999999;
      }
    }
    .con {
      padding: 10px 15px;
      font-size: 13px;
      color: #333333;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      dl {
        width: 50%;
        font-size: 13px;
        line-height: 25px;
        color: #333333;
        display: flex;
      }
    }
  }
}
</style>

