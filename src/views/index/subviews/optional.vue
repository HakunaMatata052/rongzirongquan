<template>
  <div class="container" id="home">
    <navBar :goback="false" title>
      <van-tabs v-model="activeType" slot="title" :border="false" @click="$router.push(activeType)">
        <van-tab title="自选" name="optional"></van-tab>
        <van-tab title="行情" name="quotation"></van-tab>
      </van-tabs>
    </navBar>
    <div class="main">
      <div class="box">
        <dl v-for="(value,key) in stocklist" :key="key">
          <dt>{{value[0]}}</dt>
          <dd>
            <p
              :class="value[1]>0?'zhang':'die'"
            >{{$METHOD.format45(value[1],100)}}</p>
            <p>
              <span :class="value[2]>0?'zhang':'die'">{{$METHOD.format45(value[2],100)}}</span>
              <span :class="value[3]>0?'zhang':'die'">{{value[3]}}%</span>
            </p>
          </dd>
        </dl>
      </div>
      <table class="table" border="0">
        <thead>
          <tr>
            <th align="left">名称</th>
            <th>最新</th>
            <th>涨幅</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(item,i) in list" :key="i">
            <td>
              <h3>{{item.name}}</h3>
              <span>{{item.code}}</span>
            </td>
            <td align="center" :class="item.trade>0?'zhang':'die'">{{item.trade}}</td>
            <td align="center" :class="item.trade>0?'zhang':'die'">{{item.changepercent}}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
export default {
  name: "optional",
  data() {
    return {
      activeType: "optional",
      list:[],
      stocklist:{
        hq_str_s_sh000001:hq_str_s_sh000001.split(','),
        
        hq_str_s_sz399001:hq_str_s_sz399001.split(','),
        
        hq_str_s_sz399006:hq_str_s_sz399006.split(',')
      }
    };
  },
  components: {
    navBar
  },
  created() {
    var that =this
    this.$SERVER
      .attention({
        type: 3
      })
      .then(res => {
        var arr = [];
        for (var i = 0; i < res.data.length; i++) {
          arr.push(res.data[i].code);
        }
        that.$SERVER
          .stocktypedetal({
            code: arr.join(",")
          })
          .then(res2 => {
            that.list = res2.data;
          });
      });
  },
  mounted() {},
  methods: {}
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
.table {
  background: #fff;
  margin-top: 15px;
  width: 100%;
  thead {
    padding: 5px 0;
    border-bottom: 1px solid #f7f7f7;
    font-size: 13px;
    color: #999999;
    th {
      padding: 10px;
    }
  }
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
}
</style>

