<template>
  <div class="container" id="home">
    <navBar :goback="false" title>
      <van-tabs v-model="activeType" slot="title" :border="false" @click="$router.push(activeType)">
        <van-tab title="自选" name="optional"></van-tab>
        <van-tab title="行情" name="quotation"></van-tab>
      </van-tabs>
    </navBar>
    <div class="main">
      <div class="search">
        <van-search placeholder="请输入搜索关键词" v-model="searchValue" @input="searchFn" />
        <table class="table">
          <tr
            v-for="(item,index) in searchList"
            :key="index"
            @click="$router.push('/quotationDetails/'+item[2])"
          >
            <td>{{item[0]}}</td>
            <td>{{item[2]}}</td>
          </tr>
        </table>
      </div>
      <div class="box">
        <dl v-for="(value,key) in stocklist" :key="key">
          <dt>{{value[0]}}</dt>
          <dd>
            <p :class="value[1]>0?'zhang':'die'">{{$METHOD.format45(value[1],100)}}</p>
            <p>
              <span :class="value[2]>0?'zhang':'die'">{{$METHOD.format45(value[2],100)}}</span>
              <span :class="value[3]>0?'zhang':'die'">{{value[3]}}%</span>
            </p>
          </dd>
        </dl>
      </div>

      <div class="title">
        <h3>热门行业</h3>
        <span @click="$router.push('/sinahyList')">
          更多
          <van-icon name="arrow" color="#999" />
        </span>
      </div>
      <van-grid :column-num="3" class="hot">
        <van-grid-item v-for="(item,index) in sinahy" :key="index" :to="'/stockList/0/'+item[0]">
          <h3>{{item[1]}}</h3>
          <h4 :class="item[5]>0?'zhang':'die'">{{$METHOD.format45(item[5],100)}}%</h4>
          <h5>{{item[12]}}</h5>
          <p>
            <span>{{item[10]}}</span>
            <span>{{$METHOD.format45(item[9],100)}}%</span>
          </p>
        </van-grid-item>
      </van-grid>

      <div class="title">
        <h3>涨幅榜</h3>
        <span @click="$router.push('/stockList/1')">
          更多
          <van-icon name="arrow" color="#999" />
        </span>
      </div>
      <stock :data="stock_top10" />

      <div class="title">
        <h3>跌幅榜</h3>
        <span @click="$router.push('/stockList/2')">
          更多
          <van-icon name="arrow" color="#999" />
        </span>
      </div>

      <stock :data="stock_bot10" />
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import stock from "@/components/stock.vue";
export default {
  name: "quotation",
  data() {
    return {
      activeType: "quotation",
      stocklist: {
        hq_str_s_sh000001: hq_str_s_sh000001.split(","),

        hq_str_s_sz399001: hq_str_s_sz399001.split(","),

        hq_str_s_sz399006: hq_str_s_sz399006.split(",")
      },
      sinahy: [],
      stock_top10: [],
      stock_bot10: [],

      searchValue: "",
      searchList: []
    };
  },
  components: {
    navBar,
    stock
  },
  created() {
    this.$SERVER.stocklist().then(res => {
      this.sinahy = res.data.sinahy.slice(0, 6);
      this.stock_top10 = res.data.stock_top10;
      this.stock_bot10 = res.data.stock_bot10;
    });
  },
  mounted() {},
  methods: {
    searchFn() {
      if (this.searchValue.length == 0) {
        this.searchList = [];
        return;
      }
      var head = document.getElementsByTagName("head")[0];
      var script = document.createElement("script");
      script.src = "http://suggest3.sinajs.cn/suggest/?key=" + this.searchValue;
      head.appendChild(script);
      setTimeout(() => {
        var searchList = suggestvalue.split(";");
        for (let i = 0; i < searchList.length; i++) {
          searchList[i] = searchList[i].split(",");
        }
        this.searchList = searchList;
      }, 500);
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  background: #fff;
  padding: 15px 15px 0;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  dl {
    width: 33%;
    dt {
      font-size: 15px;
      line-height: 14px;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 10px;
    }
    dd {
      p {
        font-size: 18px;
        line-height: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        text-align: center;
        span {
          display: block;
          width: 50%;
          font-size: 11px;
        }
      }
    }
  }
}
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

.table {
  background: #fff;
  width: 100%;
  td {
    font-size: 15px;
    padding: 5px 10px;
    vertical-align: middle;
  }
  h3 {
    font-size: 15px;
  }
  span {
    font-size: 13px;
    color: #999999;
  }
  .btn {
    width: 100%;
    height: 25px;
    line-height: 25px;
    background-color: #f64c50;
    border-radius: 13px;
    font-size: 13px;
    color: #ffffff;
  }
  .die-btn {
    background: #05aa74;
  }
}
</style>

