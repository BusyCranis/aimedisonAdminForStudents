<template>
  <div class="dashboard-editor-container">
    <!-- <github-corner class="github-corner" /> -->

    <!-- <panel-group @handleSetLineChartData="handleSetLineChartData" /> -->

    <!-- <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row> -->





    <el-row :gutter="32">


      일별 사용량(글자 수) 집계 <br>

      <select  v-model="startTCyear">
        <option   v-for="item in yearTCvalue"   :value="item"> {{ item }} </option>  
      </select>년 
      <select   v-model="startTCmonth" >
        <option   v-for="item in monthTCvalue"    :value="item"  > {{ item }} </option>
      </select>월 
      <input type="number"    v-model="startTCday"   />일  ~  

      <select   v-model="endTCyear"> 
        <option   v-for="item in yearTCvalue"   :value="item"> {{ item }} </option>  
      </select>년 
      <select   v-model="endTCmonth" >
        <option   v-for="item in monthTCvalue"    :value="item"  > {{ item }} </option>
      </select>월 
      <input type="number"    v-model="endTCday"    />일        

      <button   @click="searchChatTokenCountByDate" > 검색 </button>
      <button   @click="setChatTokenCountAllPeriod" > 전체기간 보기 </button>

      <br><br>

      <el-col>
        <div class="chart-wrapper">
          <div id="chattokencountchart" :class="className" :style="{height:height,width:width}" />
        </div>
      </el-col>





      <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>





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

      <!-- <el-form-item>
        <el-input    type="textarea"    class="article-textarea">
        </el-input>
      </el-form-item> -->

    </el-row>






    <el-form      class="form-container">
      <div class="createPost-main-container">
        <el-form-item       style="margin-bottom: 40px;" label-width="70px" label="검색어:">
          <el-input   v-model="searchUserAccountName"   :rows="1"     type="textarea"    style="max-width: 100px;"    class="article-textarea">
          </el-input>

          <button     type="button"    @click="submitUserAccountNameSearch"> 검색 </button>
          <button   type="button"    style="min-width: 600px;     visibility: hidden;" >  a  </button>
          <button     type="button"    @click=""> 참여 횟수 리셋 </button>
        </el-form-item>
      </div>
    </el-form>






    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 8}" :lg="{span: 4}" :xl="{span: 4}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>

      <!-- <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <todo-list />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
        <box-card />
      </el-col> -->

      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 20}" :xl="{span: 20}" style="padding-right:8px;margin-bottom:30px;">
        <UserChatHistoryList />
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
import UserChatHistoryList from './components/UserChatHistoryList'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './components/mixins/resize'
import axios from 'axios'
import { mapMutations } from 'vuex'


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
    UserChatHistoryList,
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


      searchUserAccountName: "",



    }
  },
  created() {
    window["aimedisonkeyworduserlist"] = [];
    // console.log(this.$store.state);


    console.log(this.$store.state.aimedison);
    // aimedisonKeywordUserList

    console.log(this.$store.state.aimedison.aimedisonKeywordUserList);



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

      this.initTokenCountChart()

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

    },


    initTokenCountChart() {
      console.log(this.dailyStatResponse.data)
      const monthlyKeyNamesForAggr = Object.keys(this.dailyStatResponse.data)
      const dailyValueArray = []

      console.log(monthlyKeyNamesForAggr)

      for (let i = 0; i < monthlyKeyNamesForAggr.length; i++) {
        let dailyChatTokenCount = 0;



        console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]])
        for(let j = 0; j <= this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length; j++) {
          // console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]][j].answerObjectDetail.tokenlength.total_tokens);
          if(j <= this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length - 1) {
            console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]][j].answerObjectDetail.tokenlength.total_tokens);
            dailyChatTokenCount = dailyChatTokenCount + this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]][j].answerObjectDetail.tokenlength.total_tokens;
          } else if(j === this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length) {
            dailyValueArray.push(dailyChatTokenCount);
          }
        }

      }


     
      this.tokenCountChart = echarts.init(document.getElementById('chattokencountchart'), 'macarons')





      console.log(dailyValueArray)
      // window["dailyChatKeyNamesForAggr"] = monthlyKeyNamesForAggr;
      // window["aimedisonDailyChatValueDataArray"] = dailyValueArray;

      this.tokenCountChart.setOption({
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
          name: '사용량(글자 수)',
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



    async searchChatTokenCountByDate() {
      console.log(this.startTCyear)
      console.log(this.startTCmonth)
      console.log(this.startTCday)
      console.log(this.endTCyear)
      console.log(this.endTCmonth)
      console.log(this.endTCday)

      if(this.startTCyear === 0 || this.startTCmonth === 0 || this.startTCday === 0 || this.endTCyear === 0 || this.endTCmonth === 0 || this.endTCday === 0) {
        window.alert("올바른 날짜를 선택해주세요.")

        return
      } else if(this.startTCyear > this.endTCyear) {
        window.alert("올바른 기간을 선택해주세요.")

        return
      } else if(this.startTCyear === this.endTCyear && this.startTCmonth > this.endTCmonth) {
        window.alert("올바른 기간을 선택해주세요.")

        return
      } else if(this.startTCyear === this.endTCyear && this.startTCmonth === this.endTCmonth && this.startTCday > this.endTCday) {
        window.alert("올바른 기간을 선택해주세요.")

        return
      } else {
        let searchResult = await axios.post("http://175.119.224.227:5003/admin/search/daily/chatcount", {
          shopId: 'aimedison',
          dailyChatStatResponse: this.dailyStatResponse.data,
          startYear: this.startTCyear,
          startMonth: this.startTCmonth,
          startDay: this.startTCday,
          endYear: this.endTCyear,
          endMonth: this.endTCmonth,
          endDay: this.endTCday
        })



        console.log(searchResult);
        console.log(searchResult.data);

        const monthlyKeyNamesForAggr = Object.keys(searchResult.data)
        const dailyValueArray = []

        console.log(monthlyKeyNamesForAggr)

        for (let i = 0; i < monthlyKeyNamesForAggr.length; i++) {
          let dailyChatTokenCount = 0;

          console.log(searchResult.data[monthlyKeyNamesForAggr[i]])
          for(let j = 0; j <= searchResult.data[monthlyKeyNamesForAggr[i]].length; j++) {
         
            if(j <= searchResult.data[monthlyKeyNamesForAggr[i]].length - 1) {
              console.log(searchResult.data[monthlyKeyNamesForAggr[i]][j].answerObjectDetail.tokenlength.total_tokens);
              dailyChatTokenCount = dailyChatTokenCount + searchResult.data[monthlyKeyNamesForAggr[i]][j].answerObjectDetail.tokenlength.total_tokens;
            } else if(j === searchResult.data[monthlyKeyNamesForAggr[i]].length) {
              dailyValueArray.push(dailyChatTokenCount);
            }
          }

        }





        console.log(dailyValueArray)

        this.tokenCountChart.setOption({
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
            name: '사용량(글자 수)',
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



    async setChatTokenCountAllPeriod() {
      console.log(this.dailyStatResponse.data)
      const monthlyKeyNamesForAggr = Object.keys(this.dailyStatResponse.data)
      const dailyValueArray = []

      console.log(monthlyKeyNamesForAggr)

      for (let i = 0; i < monthlyKeyNamesForAggr.length; i++) {
        let dailyChatTokenCount = 0;



        console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]])
        for(let j = 0; j <= this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length; j++) {
          // console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]][j].answerObjectDetail.tokenlength.total_tokens);
          if(j <= this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length - 1) {
            console.log(this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]][j].answerObjectDetail.tokenlength.total_tokens);
            dailyChatTokenCount = dailyChatTokenCount + this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]][j].answerObjectDetail.tokenlength.total_tokens;
          } else if(j === this.dailyStatResponse.data[monthlyKeyNamesForAggr[i]].length) {
            dailyValueArray.push(dailyChatTokenCount);
          }
        }

      }







      console.log(dailyValueArray)

      this.tokenCountChart.setOption({
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
          name: '사용량(글자 수)',
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


    async submitUserAccountNameSearch() {
      console.log(this.searchUserAccountName)
      let userSearchResult = await axios.post("http://175.119.224.227:5003/keywordapp/admin/search/user", {
        shopId: "aimedison",
        searchUserAccountName: this.searchUserAccountName
      })


      console.log(userSearchResult)
      console.log(userSearchResult.data);


      window["aimedisonkeyworduserlist"] = userSearchResult.data;

   

      this.$store.commit("aimedison/setAimedisonKeywordUserList", userSearchResult.data);


     



    },










  }
}

</script>

<style lang="scss" scoped>

@import "~@/styles/mixin.scss";


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



.createPost-main-container {
  padding: 40px 45px 20px 50px; 
}


.article-textarea ::v-deep {
  textarea {
    padding-right: 0px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}




@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
