<template>
  <van-grid :column-num="2" class="grid">
    <van-grid-item>
      <h3>买盘档</h3>
      <table border="0">
        <tr>
          <td>买一</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.buy_one_price}}</td>
          <td>{{data.buy_one_amount}}</td>
        </tr>
        <tr>
          <td>买二</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.buy_two_price}}</td>
          <td>{{data.buy_two_amount}}</td>
        </tr>
        <tr>
          <td>买三</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.buy_three_price}}</td>
          <td>{{data.buy_three_amount}}</td>
        </tr>
        <tr>
          <td>买四</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.buy_four_price}}</td>
          <td>{{data.buy_four_amount}}</td>
        </tr>
        <tr>
          <td>买五</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.buy_five_price}}</td>
          <td>{{data.buy_five_amount}}</td>
        </tr>
      </table>
    </van-grid-item>

    <van-grid-item>
      <h3>卖盘档</h3>
      <table border="0">
        <tr>
          <td>卖一</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.sell_one_price}}</td>
          <td>{{data.sell_one_amount}}</td>
        </tr>
        <tr>
          <td>卖二</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.sell_two_price}}</td>
          <td>{{data.sell_two_amount}}</td>
        </tr>
        <tr>
          <td>卖三</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.sell_three_price}}</td>
          <td>{{data.sell_three_amount}}</td>
        </tr>
        <tr>
          <td>卖四</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.sell_four_price}}</td>
          <td>{{data.sell_four_amount}}</td>
        </tr>
        <tr>
          <td>卖五</td>
          <td :class="data.changepercent>0?'zhang':'die'">{{data.sell_five_price}}</td>
          <td>{{data.sell_five_amount}}</td>
        </tr>
      </table>
    </van-grid-item>
  </van-grid>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="less" scoped>
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
    }
  }
}
</style>