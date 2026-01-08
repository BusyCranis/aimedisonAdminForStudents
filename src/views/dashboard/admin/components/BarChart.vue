<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
// import axios from 'axios'

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,

      dailyStatResponse: {},
    };
  },
  created() {},

  async mounted() {
    console.log(this.$el);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      console.log(this.dailyStatResponse.data);
      const monthlyKeyNamesForAggr = Object.keys(this.dailyStatResponse.data);
      const dailyValueArray = [];

      console.log(monthlyKeyNamesForAggr);

      for (let i = 0; i < monthlyKeyNamesForAggr.length; i++) {
        console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]]);

        dailyValueArray.push(
          this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length
        );
      }

      this.chart = echarts.init(this.$el, "macarons");

      console.log(dailyValueArray);

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            // data: ['월요일', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            data: monthlyKeyNamesForAggr,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "대화 수",
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            // data: [79, 52, 200, 134, 190, 130],
            data: dailyValueArray,
            animationDuration,
          },
        ],
      });
    },
  },
};
</script>
