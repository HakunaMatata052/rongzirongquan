<template>
  <table class="table" border="0">
    <tbody>
      <tr>
        <th align="left">名称</th>
        <th>价格</th>
        <th>涨跌</th>
      </tr>
      <tr v-for="(item,index) in data" :key="index" @click="$router.push('/quotationDetails/'+item.code)">
        <td>
          <h3>{{item.name}}</h3>
          <span>{{item.code}}</span>
        </td>
        <td align="center" :class="item.changepercent>0?'zhang':'die'">{{item.trade}}</td>
        <td align="center">
          <div :class="item.changepercent>0?'btn':'die-btn'">{{item.changepercent}}%</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="less" scoped>
.table {
  background: #fff;
  width: 100%;
  th {
    color: #999;
    font-size: 15px;
    padding: 5px 10px;
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
  .btn {
    width: 100%;
    height: 25px;
    line-height: 25px;
    background: #f64c50;
    border-radius: 13px;
    font-size: 13px;
    color: #ffffff;
  }
  .die-btn {
    width: 100%;
    height: 25px;
    line-height: 25px;
    border-radius: 13px;
    font-size: 13px;
    color: #ffffff;
    background: #05aa74;
  }
}
</style>