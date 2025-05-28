<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'
import axios from 'axios'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,

      dailyStatResponse: {}

    }
  },
  created() {
    // console.log(axios)
    // console.log(this.dailyStatResponse)
    // this.dailyStatResponse = await axios.post('http://175.119.224.227:5003/admin/daily/chatcount', {
    //   shopId: 'aimedison'
    // })

    // console.log(this.dailyStatResponse)
    // console.log(this.dailyStatResponse.data)
  },

  async mounted() {
    this.dailyStatResponse = await axios.post('http://175.119.224.227:5003/admin/daily/chatcount', {
      shopId: 'aimedison'
    })

    // console.log(this.dailyStatResponse)
    // console.log(this.dailyStatResponse.data)

    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      console.log(this.dailyStatResponse.data)
      const monthlyKeyNamesForAggr = Object.keys(this.dailyStatResponse.data)
      const dailyValueArray = []

      console.log(monthlyKeyNamesForAggr)

      for (let i = 0; i < monthlyKeyNamesForAggr.length; i++) {
        console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]])

        dailyValueArray.push(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length)
      }

      this.chart = echarts.init(this.$el, 'macarons')

      console.log(dailyValueArray)

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // data: ['월요일', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          data: monthlyKeyNamesForAggr,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          // data: [79, 52, 200, 134, 190, 130],
          data: dailyValueArray,
          animationDuration
        }
        // {
        //   name: 'pageB',
        //   type: 'bar',
        //   stack: 'vistors',
        //   barWidth: '60%',
        //   data: [80, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }, {
        //   name: 'pageC',
        //   type: 'bar',
        //   stack: 'vistors',
        //   barWidth: '60%',
        //   data: [30, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }
        ]
      })
    }
  }
}
</script>
