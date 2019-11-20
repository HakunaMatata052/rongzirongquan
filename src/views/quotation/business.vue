<template>
  <div class="container" id="home">
    <navBar />
    <div class="main">
      <!-- <van-tabs v-model="activeType" class="tabs">
        <van-tab title="买入" name="1"></van-tab>
        <van-tab title="卖出" name="2"></van-tab>
        <van-tab title="撤单" name="3"></van-tab>
        <van-tab title="持仓" name="4"></van-tab>
      </van-tabs>-->
      <div class="box">
        <div class="top">
          <div class="name">
            <h3>{{data.name}}</h3>
            <span>{{data.code}}</span>
          </div>
          <dl>
            <dt :class="data.changepercent>0?'zhang':'die'">{{data.trade}}</dt>
            <dd :class="data.changepercent>0?'zhang':'die'">44.64%</dd>
          </dl>
          <van-button plain type="warning" icon="search" @click="searchShow=true">搜索股票</van-button>
        </div>
        <van-divider />
        <div class="bottom">
          <dl>
            <dt>最高</dt>
            <dd>{{data.highest}}</dd>
          </dl>
          <dl>
            <dt>最低</dt>
            <dd>{{data.lowest}}</dd>
          </dl>
          <dl>
            <dt>涨停</dt>
            <dd>{{$METHOD.format45(data.yesterday_price*0.1+data.yesterday_price*1,100)}}</dd>
          </dl>
          <dl>
            <dt>跌停</dt>
            <dd>{{$METHOD.format45(data.yesterday_price-data.yesterday_price*0.1,100)}}</dd>
          </dl>
        </div>
      </div>
      <trading :data="data" />
      <div class="stepper-box">
        <div class="label">
          <van-dropdown-menu>
            <van-dropdown-item v-model="value" :options="option" @change="onSelect" />
          </van-dropdown-menu>
        </div>
        <van-stepper
          v-model="price"
          class="stepper"
          :step="step"
          :min="priceMin"
          :max="priceMax"
          :disabled="priceDisabled"
        />
      </div>
      <div class="stepper-box">
        <div class="label">数量</div>
        <van-stepper v-model="num" class="stepper" :step="100" />
      </div>
      <div class="tips">
        <div class="text">
          委托金额：
          <span>{{$METHOD.format45(price*num,100)}}</span>
        </div>
        <div class="text">
          可用金额：
          <span>{{usercancash}}</span>
        </div>
      </div>

      <div class="btn-group" v-if="$route.params.type==1">
        <van-button type="primary" block @click="buy(1)">买涨</van-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <van-button type="warning" block @click="buy(2)">买跌</van-button>
      </div>
      <!-- <van-panel title="持仓">
        <table class="table">
          <tr>
            <th width="25%">名称</th>
            <th width="25%">可用/持仓</th>
            <th width="25%">现价/成本</th>
            <th width="25%">盈亏/市值</th>
          </tr>
          <tr v-for="(item,index) in stocktrade" :key="index">
            <td>{{item.stock_name}}</td>
            <td>{{item.bull_num}}</td>
            <td>{{item.stock_name}}</td>
            <td>{{item.stock_name}}</td>
          </tr>
        </table>
      </van-panel>-->
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import trading from "@/components/trading.vue";
export default {
  name: "business",
  components: {
    navBar,
    trading
  },
  data() {
    return {
      activeType: this.$route.params.type,
      data: {},
      stocktrade: [],
      usercancash: "",
      timer1: null,
      price: 0,
      show: true,
      value: 1,
      option: [{ text: "限价", value: 2 }, { text: "市价", value: 1 }],
      priceDisabled: true,
      step: 0,
      num: 0,
      priceMin: 0,
      priceMax: 0
    };
  },
  computed: {
    typeName() {
      if (this.activeType == 1) {
        return "买入";
      } else {
        return "卖出";
      }
    }
  },
  created() {
    this.$SERVER
      .stockdetails({
        code: this.$route.params.code
      })
      .then(res => {
        this.data = res.data;
        this.price = res.data.trade;
        this.priceMin =
          this.$METHOD.format45(
            res.data.yesterday_price - res.data.yesterday_price * 0.1,
            100
          ) + 0.01;
        this.priceMax =
          this.$METHOD.format45(
            res.data.yesterday_price * 0.1 + res.data.yesterday_price * 1,
            100
          ) - 0.01;
      });
    this.usermoney();
    this.stocktradeFn();
  },
  mounted() {
    setTimeout(() => {
      this.timer = setInterval(() => {
        this.getDetail();
      }, 5000);
    }, 500);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    usermoney() {
      this.$SERVER.usermoney().then(res => {
        this.usercancash = res.data.usercancash;
      });
    },
    stocktradeFn() {
      this.$SERVER.stocktrade().then(res => {
        this.stocktrade = res.data;
      });
    },
    getDetail() {
      this.$SERVER
        .stockdetails({
          code: this.$route.params.code
        })
        .then(res => {
          this.data = res.data;
        });
    },
    onSelect(value) {
      if (value == 2) {
        this.price = this.data.sell_one_price;
        this.priceDisabled = false;
        this.step = 0.01;
      } else {
        this.price = this.data.trade;
        this.step = 0;
        this.priceDisabled = true;
      }
    },
    buy(type) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确认购买？"
        })
        .then(() => {
          this.$SERVER
            .buy({
              type: "bull",
              code: this.$route.params.code,
              buy_type: type,
              price_type: this.value,
              buy_num: this.num,
              buys_price: this.price
            })
            .then(res => {
              this.usermoney();
              this.stocktradeFn();
              this.$toast.success(res.message);
            });
        })
        .catch(() => {
          // on cancel
        });
    }
  }
};
</script>
<style lang="less">
.stepper {
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 0 10px;
  button {
    width: 29px;
    height: 29px;
    border-radius: 2px;
    color: #fff;
    &:first-child {
      background-color: #05aa3b;
    }
    &:last-child {
      background-color: #fe6a51;
    }
  }
  input {
    flex-grow: 1;
  }
}
</style>
<style lang="less" scoped>
.tabs {
  margin-top: 15px;
}
.box {
  padding: 15px;
  background: #fff;
  margin-top: 10px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .name {
    h3 {
      font-size: 18px;
      font-weight: bold;
      color: #333333;
    }
    span {
      font-size: 15px;
      color: #999999;
    }
  }
  dl {
    dt {
      font-size: 21px;
      font-weight: bold;
    }
    dd {
      font-size: 15px;
    }
  }
}
.btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
}
.bottom {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    width: 50%;
    dt {
      font-size: 15px;
      line-height: 30px;
      color: #999999;
      padding: 0 5px;
      flex-shrink: 0;
    }
  }
}

.grid {
  margin-top: 15px;
  h3 {
    font-size: 15px;
    color: #333333;
    margin-bottom: 10px;
  }
  table {
    width: 100%;
    text-align: center;
    td {
      font-size: 14px;
      line-height: 30px;
      color: #999;
      text-align: center;
    }
  }
}

.stepper-box {
  display: flex;
  width: 345px;
  height: 44px;
  background-color: #ffffff;
  border-radius: 2px;
  border: solid 1px #ebebeb;
  margin: 10px auto;
  .label {
    width: 75px;
    height: 44px;
    line-height: 44px;
    border-radius: 2px;
    border-right: solid 1px #ebebeb;
    text-align: center;
    font-size: 15px;
  }
}

.tips {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  .text {
    padding: 5px 0;
    font-size: 13px;
    color: #333;
    span {
      color: #fe6a50;
    }
  }
}
.btn {
  width: 345px;
  display: block;
  margin: 10px auto;
}
.table {
  width: 100%;
  padding: 15px;
  line-height: 25px;
  font-size: 13px;
  th {
    color: #999;
  }
  td {
    font-size: 14px;
    line-height: 30px;
    text-align: center;
  }
}
</style>

