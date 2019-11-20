<template>
  <div class="container" id="home">
    <navBar title>
      <div class="title" slot="title">
        {{data.name}}
        <span>{{data.code}}</span>
      </div>
    </navBar>
    <div class="main">
      <div class="box">
        <div class="left">
          <h3 :class="data.changepercent>0?'zhang':'die'">{{data.trade}}</h3>
          <p :class="data.changepercent>0?'zhang':'die'">
            <span>0.05</span>
            <span>{{data.changepercent}}%</span>
          </p>
        </div>
        <div class="right">
          <dl>
            <dt>今开</dt>
            <dd>{{data.open_price}}</dd>
          </dl>
          <dl>
            <dt>最高</dt>
            <dd>{{data.highest}}</dd>
          </dl>
          <dl>
            <dt>昨收</dt>
            <dd>{{data.yesterday_price}}</dd>
          </dl>
          <dl>
            <dt>最低</dt>
            <dd>{{data.lowest}}</dd>
          </dl>
        </div>
        <van-divider class="divider" />
        <div class="bottom">
          <dl>
            <dt>成交量</dt>
            <dd>{{$METHOD.format45(data.volume/10000,100)}}万</dd>
          </dl>
          <dl>
            <dt>市盈率</dt>
            <dd>{{data.pe_ratio}}</dd>
          </dl>
          <dl>
            <dt>换手率</dt>
            <dd>{{data.turnover_rate}}%</dd>
          </dl>
          <dl>
            <dt>成交额</dt>
            <dd>{{$METHOD.format45(data.turnover,100)}}万</dd>
          </dl>
          <dl>
            <dt>市净率</dt>
            <dd>{{data.pb_ratio}}</dd>
          </dl>
          <dl>
            <dt>总市值</dt>
            <dd>{{data.total_market_value}}亿</dd>
          </dl>
        </div>
      </div>
      <div class="box2">
        <van-tabs v-model="activeType" :lazy-render="false" @change="tabsChange">
          <van-tab title="分时" :name="1">
            <div class="echarts" id="m-line"></div>
          </van-tab>
          <van-tab title="日K" :name="2"></van-tab>
          <van-tab title="周K" :name="3"></van-tab>
          <van-tab title="月K" :name="4"></van-tab>
        </van-tabs>
      </div>
      <div class="echarts" id="k-content" v-if="activeType!=1"></div>

      <trading :data="data" />
    </div>
    <div class="bottom-btn">
      <div class="btn zx" @click="attention">加自选</div>
      <div class="btn m1" @click="go('/waptrade.php#http')">卖出</div>
      <div class="btn m2" @click="$router.push('/business/1/'+data.code)">买入</div>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import trading from "@/components/trading.vue";
export default {
  name: "quotationDetails",
  data() {
    return {
      activeType: 1,
      data: {},
      echartsData: [],
      timer1: null
    };
  },
  components: {
    navBar,
    trading
  },
  created() {
    this.getDetail();
  },
  mounted() {
    setTimeout(() => {
      this.minute();
      this.timer = setInterval(() => {
        this.minute();
        this.getDetail();
      }, 2000);
    }, 500);
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    minute() {
      this.$SERVER
        .minute({
          code: this.$route.params.code
        })
        .then(res => {
          var mChart = echarts.init(document.getElementById("m-line"));
          mChart.setOption(initMOption(res.data, "hs"));
        }).catch(err=>{
           clearInterval(this.timer);
        })
    },
    getDetail() {
      this.$SERVER
        .stockdetails({
          code: this.$route.params.code
        })
        .then(res => {
          this.data = res.data;
        }).catch(err=>{
           clearInterval(this.timer);
        })
    },
    tabsChange() {
      if (this.activeType == 2) {
        this.$SERVER
          .dayk({
            code: this.$route.params.code
          })
          .then(res => {
            this.Kline(res.data);
          });
      } else if (this.activeType == 3) {
        this.$SERVER
          .weekk({
            code: this.$route.params.code
          })
          .then(res => {
            this.Kline(res.data);
          });
      } else if (this.activeType == 4) {
        this.$SERVER
          .monthk({
            code: this.$route.params.code
          })
          .then(res => {
            this.Kline(res.data);
          });
      }
    },
    Kline(kdata) {
      var kChart = echarts.init(document.getElementById("k-content"));
      kChart.setOption(initKOption(kdata));
    },
    attention(){
      this.$SERVER.attention({
        type:1,
        code:this.$route.params.code
      }).then(res=>{
        this.$toast.success(res.message)
      })
    },
    
    go(url){
      if(url.indexOf('http')>-1){
        this.$METHOD.jump_url(url)
      }else{
        this.$router.push(url)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  span {
    font-size: 15px;
    color: #999;
    font-weight: normal !important;
  }
}
.box {
  margin-top: 15px;
  background: #fff;
  padding: 15px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  .left,
  .right {
    padding: 0 15px;
  }
  .left {
    flex-grow: 1;
    h3 {
      font-size: 24px;
      font-weight: bold;
    }
    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 15px;
      }
    }
  }
  .right {
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    dl {
      width: 50%;
    }
  }
  dl {
    width: 33%;
    display: flex;
    align-items: center;
    font-size: 14px;
    dt {
      line-height: 30px;
      color: #999999;
      padding: 0 5px;
      flex-shrink: 0;
      margin-right: 5px;
    }
  }
  .divider {
    width: 100%;
  }
  .bottom {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
.box2 {
  margin-top: 15px;
  background: #fff;
}
.bottom-btn {
  display: flex;
  height: 49px;
  line-height: 49px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  .zx {
    flex-grow: 1;
    color: #999999;
  }
  .m1 {
    width: 125px;
    background-color: #05aa3b;
  }
  .m2 {
    width: 125px;
    background-color: #f64c50;
  }
}
</style>

