<template>
  <div id="myChart" style="width:100%;height:300px;"></div>
</template>
<script>
import echarts from "echarts"; // 百度图表
export default {
  name: "kline",
  props: ["data"],
  data() {
    return {
      xAxis: [],
      series: [],
      myChart: null,
      option:{
        color: "rgba(14,189,255,1)",
        dataZoom: [
          {
            // 第一个 dataZoom 组件
            xAxis: [0, 2] // 表示这个 dataZoom 组件控制 第一个 和 第三个 xAxis
          },
          {
            // 第二个 dataZoom 组件
            xAxis: 3 // 表示这个 dataZoom 组件控制 第四个 xAxis
          }
        ],
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value",
          scale: true
        },
        series: [
          {
            data: [],
            type: "line",
            areaStyle: {
              color: "rgba(14,189,255,.3)"
            }
          }
        ]
      }
    };
  },
  watch: {
    data(newval) {
      this.xAxis.push(newval.last_price);
      this.series.push(newval.datetime);
      this.drawKline({
        xAxis: {
          data:this.series
        },
        series: {
          data: this.xAxis,
        }
      });
    }
  },
  computed: {
    progress() {
      return 10;
    }
  },
  methods: {
    drawKline(data) {
      var that = this;
      that.myChart.setOption(data);
      that.myChart.dispatchAction({
        type: "brush",
        areas: [
          {
            brushType: "lineX",
            coordRange: ["2016-06-02", "2019-10-20"],
            xAxisIndex: 0
          }
        ]
      });
    }
  },
  mounted() {
    let that = this;
    that.myChart = echarts.init(document.getElementById("myChart"));
    that.drawKline(that.option);
  }
};
</script>
