<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->





    <el-row :gutter="32">



      







    일별 대화 수 집계 <br>

    <select  v-model="startYear">
      <option   v-for="item in yearValue"   :value="item"> {{ item }} </option>  
    </select>년 
    <select   v-model="startMonth" >
      <option   v-for="item in monthValue"    :value="item"  > {{ item }} </option>
    </select>월 
    <input type="number"    v-model="startDay"   />일  ~  

    <select   v-model="endYear"> 
      <option   v-for="item in yearValue"   :value="item"> {{ item }} </option>  
    </select>년 
    <select   v-model="endMonth" >
      <option   v-for="item in monthValue"    :value="item"  > {{ item }} </option>
    </select>월 
    <input type="number"    v-model="endDay"    />일        

    <button   @click="searchChatCountByDate" > 검색 </button>
    <button   @click="setAllPeriodChatChart" > 전체기간 보기 </button>

    <br><br>

      <el-col>
        <div class="chart-wrapper">
          <div id="barchartcomponent" :class="className" :style="{height:height,width:width}" />
        </div>
      </el-col>



    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import GithubCorner from '@/components/GithubCorner'
// import PanelGroup from './components/PanelGroup'
// import LineChart from './components/LineChart'
// import RaddarChart from './components/RaddarChart'
// import PieChart from './components/PieChart'
// import BarChart from './components/BarChart'
import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './components/mixins/resize'
import axios from 'axios'

const animationDuration = 2000

export default {
  name: 'DashboardAdmin',
  components: {
    // GithubCorner,
    // PanelGroup,
    // LineChart,
    // RaddarChart,
    // PieChart,
    // BarChart,
    TransactionTable,
    TodoList,
    BoxCard
  },
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

      dailyStatResponse: {},

      yearValue: [2024, 2025],
      monthValue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

      startYear: 0,
      startMonth: 0,
      startDay: 0,

      endYear: 0,
      endMonth: 0,
      endDay: 0,




      tokenCountChart: null,

      dailyTokenCountRes: {},

      yearTCvalue: [2024, 2025],
      monthTCvalue: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

      startTCyear: 0,
      startTCmonth: 0,
      startTCday: 0,

      endTCyear: 0,
      endTCmonth: 0,
      endTCday: 0,


    }
  },
  created() {
    // this.yearValue = [2024, 2025]

    // this.monthValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

  },

  async mounted() {
    // this.yearValue = [2024, 2025]

    console.log(this.startYear)

    this.dailyStatResponse = await axios.post('http://175.119.224.227:5003/admin/daily/chatcount', {
      shopId: 'aimedison'
    })

    console.log(this.$el)

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

      // this.chart = echarts.init(this.$el, 'macarons')

      this.chart = echarts.init(document.getElementById('barchartcomponent'), 'macarons')

      console.log(dailyValueArray)

      // window["dailyChatKeyNamesForAggr"] = monthlyKeyNamesForAggr;

      // window["aimedisonDailyChatValueDataArray"] = dailyValueArray;


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
          name: '대화 수',
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
    },


    async searchChatCountByDate() {
      console.log(this.startYear)
      console.log(this.startMonth)
      console.log(this.startDay)
      console.log(this.endYear)
      console.log(this.endMonth)
      console.log(this.endDay)
      console.log(this.dailyStatResponse.data)
      // console.log(window["dailyChatKeyNamesForAggr"])
      // console.log(window["aimedisonDailyChatValueDataArray"])



      if(this.startYear === 0 || this.startMonth === 0 || this.startDay === 0 || this.endYear === 0 || this.endMonth === 0 || this.endDay === 0) {
        window.alert("올바른 날짜를 선택해주세요.")

        return
      } else if(this.startYear > this.endYear) {
        window.alert("올바른 기간을 선택해주세요.")

        return
      } else if(this.startYear === this.endYear && this.startMonth > this.endMonth) {
        window.alert("올바른 기간을 선택해주세요.")

        return
      } else if(this.startYear === this.endYear && this.startMonth === this.endMonth && this.startDay > this.endDay) {
        window.alert("올바른 기간을 선택해주세요.")

        return
      } else {
        let searchResult = await axios.post("http://175.119.224.227:5003/admin/search/daily/chatcount", {
          shopId: 'aimedison',
          dailyChatStatResponse: this.dailyStatResponse.data,
          startYear: this.startYear,
          startMonth: this.startMonth,
          startDay: this.startDay,
          endYear: this.endYear,
          endMonth: this.endMonth,
          endDay: this.endDay
        })



        console.log(searchResult);
        console.log(searchResult.data);

        const monthlyKeyNamesForAggr = Object.keys(searchResult.data)
        const dailyValueArray = []

        console.log(monthlyKeyNamesForAggr)

        for (let i = 0; i < monthlyKeyNamesForAggr.length; i++) {
          console.log(searchResult.data[monthlyKeyNamesForAggr[i]])

          dailyValueArray.push(searchResult.data[monthlyKeyNamesForAggr[i]].length)
        }




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
            name: '대화 수',
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






    },



    async setAllPeriodChatChart() {
      console.log(this.dailyStatResponse.data)
      const monthlyKeyNamesForAggr = Object.keys(this.dailyStatResponse.data)
      const dailyValueArray = []

      console.log(monthlyKeyNamesForAggr)

      for (let i = 0; i < monthlyKeyNamesForAggr.length; i++) {
        console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]])

        dailyValueArray.push(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length)
      }





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
          name: '대화 수',
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

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
