<template>
  <div id="myChart" style="width:100%;height:500px;"></div>
</template>
<script>
import echarts from "echarts"; // 百度图表
export default {
  name: "kline",
  props: ["data"],
  data() {
    return {
      rawData: [],
      myChart: null,
      option: {
        textStyle: {
          color: "#fff"
        },
        animation: true,
        dataZoom: [
          {
            type: "inside",
            xAxisIndex: [0, 1],
            start: 80,
            end: 100
          },
          {
            show: false,
            xAxisIndex: [0, 1],
            type: "slider",
            top: "85%",
            start: 80,
            end: 100
          }
        ],
        animation: false,
        legend: {
          bottom: 10,
          left: "center",
          data: ["Dow-Jones index", "MA5", "MA10", "MA20", "MA30"],
          textStyle: {
            color: "#fff"
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          backgroundColor: "rgba(245, 245, 245, 0.8)",
          borderWidth: 1,
          borderColor: "#fff",
          padding: 10,
          textStyle: {
            color: "#fff"
          },
          position: function(pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          }
          // extraCssText: 'width: 170px'
        },
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#999"
          }
        },
        visualMap: {
          show: false,
          seriesIndex: 5,
          dimension: 2,
          pieces: [
            {
              value: 1,
              color: "#ec0000"
            },
            {
              value: -1,
              color: "#00da3c"
            }
          ]
        },
        grid: [
          {
            left: "10%",
            right: "8%",
            height: "50%"
          },
          {
            left: "10%",
            right: "8%",
            top: "63%",
            height: "16%"
          }
        ],
        xAxis: [
          {
            type: "category",
            data: [],
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            splitLine: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            axisPointer: {
              z: 100
            },
            textStyle: {
              color: "#fff"
            }
          },
          {
            type: "category",
            gridIndex: 1,
            data: [],
            scale: true,
            boundaryGap: false,
            axisLine: { onZero: false },
            axisTick: { show: false },
            splitLine: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
            textStyle: {
              color: "#fff"
            }
          }
        ],
        yAxis: [
          {
            scale: true,
            splitArea: {
              show: true
            }
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "Dow-Jones index",
            type: "candlestick",
            data: [],
            itemStyle: {
              normal: {
                color: "#00da3c",
                color0: "#ec0000",
                borderColor: null,
                borderColor0: null
              }
            },
            tooltip: {
              formatter: function(param) {
                param = param[0];
                return [
                  "Date: " + param.name + '<hr size=1 style="margin: 3px 0">',
                  "Open: " + param.data[0] + "<br/>",
                  "Close: " + param.data[1] + "<br/>",
                  "Lowest: " + param.data[2] + "<br/>",
                  "Highest: " + param.data[3] + "<br/>"
                ].join("");
              }
            }
          },
          {
            name: "MA5",
            type: "line",
            data: [],
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA10",
            type: "line",
            data: [],
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA20",
            type: "line",
            data: [],
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "MA30",
            type: "line",
            data: [],
            smooth: true,
            lineStyle: {
              normal: { opacity: 0.5 }
            }
          },
          {
            name: "Volume",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: []
          }
        ]
      }
    };
  },
  watch: {
    data(newval) {
      var that = this;
      if (newval.code == 1) {
        that.rawData = newval.data;
      } else if (newval.code == 2) {
        that.rawData.splice(-1, 1, newval.data);
      } else if (newval.code == 3) {
        that.rawData.push(newval.data);
        console.log(that.rawData);
      }
      var data = that.splitData(JSON.parse(JSON.stringify(that.rawData)));
      that.option.xAxis[0].data = data.categoryData;
      that.option.xAxis[1].data = data.categoryData;
      that.option.series[0].data = data.values;
      that.option.series[1].data = that.calculateMA(5, data);
      that.option.series[2].data = that.calculateMA(10, data);
      that.option.series[3].data = that.calculateMA(20, data);
      that.option.series[4].data = that.calculateMA(30, data);
      that.option.series[5].data = data.volumes;
      that.drawKline(that.option);
    }
  },
  computed: {
    progress() {
      return 10;
    }
  },
  methods: {
    splitData(rawData) {
      var categoryData = [];
      var values = [];
      var volumes = [];
      for (var i = 0; i < rawData.length; i++) {
        var temp = rawData[i];
        categoryData.push(temp.splice(0, 1)[0]);
        values.push(temp);
        volumes.push([i, temp[4], temp[0] > temp[1] ? 1 : -1]);
      }
      return {
        categoryData: categoryData,
        values: values,
        volumes: volumes
      };
    },
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.values.length; i < len; i++) {
        if (i < dayCount) {
          result.push("-");
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += Number(data.values[i - j][1]);
        }
        result.push(+(sum / dayCount).toFixed(3));
      }
      return result;
    },
    drawKline(data) {
      var that = this;
      that.myChart.setOption(data, true);
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
    that.myChart.on("datazoom", function(params) {
      that.option.dataZoom[0].start = params.batch[0].start;
      that.option.dataZoom[0].end = params.batch[0].end;
    });
  }
};
</script>