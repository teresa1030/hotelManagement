<template lang="html">
      <div class="content">
        <div class="RealTime">
          <p>即時</p>
          <ul>
              <li class="flex-1">
                <div>
                  <span class="subti">總評論則數</span>
                  <p>{{todayData[0].data.reviews_num}}
                    <span v-if="rise[0].value === 0">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[0].value === 1">
                      <img src="../assets/icon/down.png">
                    </span>
                    <span v-else-if="rise[0].value === 2" class="equal">
                      <img src="../assets/icon/safe.png">
                    </span>
                  </p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span class="subti">正評則數</span>
                  <p>{{todayData[0].data.labels.positive}}
                    <span v-if="rise[1].value === 0">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[1].value === 1">
                      <img src="../assets/icon/down.png">
                    </span>
                    <span v-else-if="rise[1].value === 2" class="equal">
                      <img src="../assets/icon/safe.png">
                    </span>
                  </p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span class="subti">負評則數</span>
                  <p>{{todayData[0].data.labels.negative}}
                    <span v-if="rise[2].value === 0">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[2].value === 1">
                      <img src="../assets/icon/down.png">
                    </span>
                    <span v-else-if="rise[2].value === 2" class="equal">
                      <img src="../assets/icon/safe.png">
                    </span>
                  </p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span class="subti">評分</span>
                  <p>{{todayData[0].data.avg_rating}}
                    <span v-if="rise[3].value === 0">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[3].value === 1">
                      <img src="../assets/icon/down.png">
                    </span>
                    <span v-else-if="rise[3].value === 2" class="equal">
                      <img src="../assets/icon/safe.png">
                    </span>
                  </p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span class="subti">總排名</span>
                  <p>{{todayRank}}
                    <span v-if="rise[4].value === true">
                      <img src="../assets/icon/rise.png">
                    </span>
                    <span v-else-if="rise[4].value === false">
                      <img src="../assets/icon/down.png">
                    </span>
                  </p>
                </div>
              </li>
              
          </ul>
        </div>
        <div class="filterTime">
          <p>篩選：</p>
          <div id="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #DCDFE6;" >
            <span @click="dateRange" class="timeSpan">時間</span>
          </div>
          <div id="showmonthMenu">
            <el-select placeholder="請選擇月份" v-model="chosenmonthData"  @change="callSingleDate()">
              <el-option v-for="(item, index) in months" :value="item.field" :key="index">{{item.field}}</el-option>
            </el-select>
          </div>
          <div class="cancle">
            <el-button @click="cancle">清除</el-button>
          </div>
        </div>
        <div class="demo-wrapper">
        <div class="demo-container">
          <div>
    <button id="parentIframe" v-on:click="mapFun()">GDP</button>
            <p class="allP">各國留言數量</p>
          </div>
            <div id="svgMapGPD"></div>

        </div>

        </div> 
        <!-- <div id="world-map" style="width: 600px; height: 400px"></div> -->
        <div class="statisticTop">
          <!-- <div class="main flex-2">
            <ul>
              <li>
                <div>
                  <span>總評論則數</span>
                  <p>{{todayData[0].data.labels.positive + todayData[0].data.labels.negative}}</p>
                </div>
              </li>
              <li>
                <div>
                  <span>評分</span>
                  <p>{{todayData[0].data.avg_rating}}</p>
                </div>
              </li>
              <li>
                <div>
                  <span>總排名</span>
                  <p>{{avg_rank}}</p>
                  <p>{{todayData[0].data.labels.positive + todayData[0].data.labels.negative}}</p>
                </div>
              </li>
            </ul>
          </div> -->
          <div class="Rank flex-1">
            <div class="statisticRank">
              <p class="allP">總排名趨勢</p>
              <line-chart :chart-data="Rankcollection" :options="options" style="width: 95%; height: 80%; margin-right: 2%; margin-left: 2%;"></line-chart>
            </div>
            <div class="clear"></div>
          </div>
          <div class="statisticComment flex-3">
            <div>
              <p class="allP1">正負評比例</p>
              <doughnut-chart :chart-data="Commentcollection" :options="options2" style="width: 90%; height: 90%; margin-left: 30px;"></doughnut-chart>
              <div class="clear"></div>
            </div>
          </div>
        </div>
        <div class="statisticCenter">
          <!-- <div class="statisticComment flex-2">
            <div>
              <p class="allP1">正負評比例</p>
              <doughnut-chart :chart-data="Commentcollection" :options="options2" style="width: 90%; height: 90%; margin-left: 30px;"></doughnut-chart>
              <div class="clear"></div>
            </div>
          </div> -->
          <div class="statistic flex-1">
            <div>
              <p class="allP">正評趨勢</p>
              <line-chart :chart-data="positiveDatacollection" :options="options4" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%; margin-bottom: 10px"></line-chart>
            </div>
          </div>
          <div class="statistic flex-1">
            <div>
              <p class="allP">負評趨勢</p>
              <line-chart :chart-data="negativeDatacollection" :options="options" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%; margin-bottom: 10px"></line-chart>
            </div>
          </div>
          <div class="statisticService flex-1">
            <div>
              <p class="allP">各標籤比例</p>
              <bar-chart :chart-data="Servicecollection" :options="options1" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%; margin-bottom: 10px"></bar-chart>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="statisticBottom">
          <div class="statisticWeb flex-1">
            <div>
              <p class="allP1">各平台留言數量比例</p>
              <doughnut-chart class="travel" :chart-data="this.webCommentcollection" :options="options2" style="width: 70%; height: 50%; margin-left: 40px;"></doughnut-chart>
            </div>
          </div>
          <div class="statisticWeb flex-1">
            <div>
              <p class="allP1">旅遊類型比例</p>
              <doughnut-chart class="travel" :chart-data="this.tripTypecollection" :options="options2" style="width: 80%; height: 60%; margin-left: 40px;"></doughnut-chart>
              <div class="clear"></div>
            </div>
          </div>
          <div class="statisticWeb flex-1">
            <div>
              <p class="allP1">各國留言數量比</p>
              <!-- <doughnut-chart :chart-data="countrycollection" :options="options2" style="width: 80%; height: 80%; margin-left: 30px;"></doughnut-chart> -->
            </div>
          </div>
         
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
</template>

<script>
import axios from '../../node_modules/axios'
import lineChart from '../assets/js/lineChart'
import barChart from '../assets/js/barChart'
import doughnutChart from '../assets/js/doughnutChart'
import $ from '../../node_modules/jquery'
import worldMap from '../assets/js/map'
// import ChartDataLabels from 'chartjs-plugin-datalabels'

export default {
  name: 'statistic',
  components: {
    lineChart,
    barChart,
    doughnutChart,
    // ChartDataLabels
  },
  data () {
    return {
      timeout:null,
      companyName: '',
      // time: 'August',
      statisticAllData: [],
      statisticData: [],
      start: '',
      end: '',
      yesterday: '',
      today: '',
      todayEnd: '',
      week: '',
      month: '',
      minDate: '',
      months: [],
      chosenmonthData: [],
      todayRank: '',
      RankFilterData: [],
      avg_rank: '',
      todayData: [],
      yesterdayData: [],
      RangeLabelData: [],
      selectedArr: [],
      rise: [
        {
          label: 'allComment',
          value: 0
        },
        {
          label: 'positive',
          value: 1
        },
        {
          label: 'negative',
          value: 2
        },
        {
          label: 'rating',
          value: 0
        },
        {
          label: 'rank',
          value: 1
        }
      ],

      // statisticRank: [],
      Rankcollection: null,
      Commentcollection: null,
      positiveDatacollection: null,
      negativeDatacollection: null,
      Servicecollection: null,
      webCommentcollection: null,
      tripTypecollection: null,
      countrycollection: null,
      // option再想一下
      options: null,
      options1: {
        plugins: {
          datalabels: {
            color: '#36A2EB'
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            stack: true,
            ticks: {
              beginAtZero: true,
              min: 0
            },
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            stacked: true
          }]
        },
        legend: {
          position: 'right',
          align: 'start',
          labels: {
            padding: 20
          }
        }
      },
      options2: {
        yAxes: [{
            ticks:
              {
                stepSize: 1
              }
            // ]
          }],
        responsive: true,
        animation: {
          duration: 2000,
          animateScale: true, // 由中心往外
          animateRotate: true // 旋轉
        },
        cutoutPercentage: 60, // 調整寬度 0:pie 50:doughnut
        legend: {
          display: true,
          position: 'right',
          labels: { // 調整標籤
            boxWidth: 15,
            padding: 10,
            fontSize: 14,
            fontFamily: '微軟正黑體'
          }
          // 可以加onclick
        }
      },
      // labelX: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      labelX: [
        {
          value: '01',
          field: 'January'
        },
        {
          value: '02',
          field: 'Feburary'
        },
        {
          value: '03',
          field: 'March'
        },
        {
          value: '04',
          field: 'April'
        },
        {
          value: '05',
          field: 'May'
        },
        {
          value: '06',
          field: 'June'
        },
        {
          value: '07',
          field: 'July'
        },
        {
          value: '08',
          field: 'August'
        },
        {
          value: '09',
          field: 'September'
        },
        {
          value: '10',
          field: 'October'
        },
        {
          value: '11',
          field: 'November'
        },
        {
          value: '12',
          field: 'December'
        }
      ],
      labelX1: ['餐飲', '交通', '服務', '客房', '設施','價格','外觀','景觀'],
      labelX2: ['Expedia', 'Agoda', 'Booking', 'Hotels', 'Tripadvisor', 'Trip'],
      labelX3: []
    }
  },
  mounted:function () {
    let self = this
    var time = []
    var arr = []
    var arr1 = []
    var moment = require('moment')
    var start = moment().subtract(7, 'days')
    var end = moment()
    self.minDate = moment('2020/08/01')
    self.start = start
    self.end = end
    self.date()
    if(!self.companyName){
      var logining = localStorage.getItem('token')
      var loginData = JSON.parse(logining)
      self.companyName = loginData.companyName
    }
    axios.get('https://hotelapi.im.nuk.edu.tw/api/statistic').then(response => {
      self.statisticAllData = response.data
      self.statisticAllData.filter((item) => {
        item.data.filter((child) => {
         if(child.hotelName === self.companyName){
           arr.push({time: item.time, data: child})
         }
       })
      })
      self.statisticData = arr
      self.todayData = self.statisticData.filter((item) => {
        if((Date.parse(item.time) >= Date.parse(self.today._d)) && (Date.parse(item.time) <= Date.parse(self.todayEnd._d))){
          return item.data
        }
      })
      self.yesterdayData = self.statisticData.filter((item) => {
        if((Date.parse(item.time) >= Date.parse(self.yesterday._d)) && (Date.parse(item.time) <= Date.parse(self.today._d))){
          return item.data
        }
      })
      self.labelX3 = self.todayData[0].data.travel_types.map((ele) => {
        return ele.type
      })
      self.rate()
      self.RankData(3)
      self.commentData(3)
      self.positiveData(3)
      self.negativeData(3)
      self.ServiceData()
      self.webCommentData(3, self.statisticData)
    
    }).catch((error) => {
      console.log(error)
    })  
    
    // this.renderChart(this.chartdata, this.options)
  },
  methods: {
    cancle(){
      let self = this
      var moment = require('../../node_modules/moment')
      var start = moment().subtract(7, 'days')
      var end = moment()
      self.RankFilterData = []
      self.minDate = moment('2020/08/01')
      self.start = start
      self.end = end
      self.RankData(3)
      self.commentData(3)
      self.positiveData(3)
      self.negativeData(3)
      self.ServiceData()
      self.webCommentData(3, self.statisticData)
      $('#reportrange span').html('時間')
      $('#showmonthMenu').css('display', 'none')
      self.chosenmonthData = ''
    },
    getSelfCompany(arr){
      let self = this
      arr.filter((item) => {
        // item.filter((child) => {
          if(item.hotelName === self.companyName){
            arr = item
          }
        // })
      })
      return arr
    },
    momentChange(value){
      var newValue = value + 1
      if(newValue < 10){
        return '0'+ newValue
      }else{
        return newValue
      }
    },
    callSingleDate(){
      let self = this
      self.RankData(2)
      self.commentData(2)
      self.positiveData(2)
      self.negativeData(2)
      
      // self.fillData(2)
    },
    mapFun(){
      worldMap.map()
    },
    date(){
      let self = this
      var moment = require('moment')
      self.today = moment().subtract(1, 'days')
      self.todayEnd = moment()
      self.yesterday = moment().subtract(2, 'days')
      for(var i = self.minDate._d.getMonth(); i < self.todayEnd._d.getMonth(); i++){
        // 加個判斷大小判斷有沒有到隔年
        self.months.push({year: self.minDate._d.getFullYear(), month: self.labelX[i].value, field: self.minDate._d.getFullYear() + '/' + self.labelX[i].value})
      }
    },
    rate(){
      let self = this
      var allAdd = (self.todayData[0].data.reviews_num) - (self.yesterdayData[0].data.reviews_num)
      var positiveAdd = self.todayData[0].data.labels.positive - self.yesterdayData[0].data.labels.positive
      var negativeAdd = self.todayData[0].data.labels.negative - self.yesterdayData[0].data.labels.negative
      var ratingAdd = self.todayData[0].data.avg_rating - self.yesterdayData[0].data.avg_rating
      if(allAdd === 0){
        self.rise[0].value = 2
      }else if(allAdd > 0){
        self.rise[0].value = 0
      }else{
        self.rise[0].value = 1
      }
      if(positiveAdd === 0){
        self.rise[1].value = 2
      }else if(positiveAdd > 0){
        self.rise[1].value = 0
      }else{
        self.rise[1].value = 1
      }
      if(negativeAdd === 0){
        self.rise[2].value = 2
      }else if(negativeAdd > 0){
        self.rise[2].value = 0
      }else{
        self.rise[2].value = 1
      }
      if(ratingAdd === 0){
        self.rise[3].value = 2
      }else if(ratingAdd > 0){
        self.rise[3].value = 0
      }else{
        self.rise[3].value = 1
      }
    },
    cb: function (value, start, end) {
      var self = this
      $('#reportrange span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'))
      $('#reportrange').css({'width':'160px'})
      $('#reportrange span').css({'font-size':'12px', 'width':'170px'})
      self.start = start
      self.end = end
      this.RankData(value)
      this.commentData(value)
      this.positiveData(value)
      this.negativeData(value)

      // this.fillData(value)
    },
    dateRange: function (arr) {
      var moment = require('moment')
      var self = this
      var start = self.start
      var end = self.end
      self.chosenmonthData = ''
      $('#showmonthMenu').css('display', 'none')
      $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
          '本日': [moment(), moment()],
          '本週': [moment().subtract(6, 'days'), moment()],
          '本月': [moment().subtract(30, 'days'), moment()],
          '本年': [self.minDate, moment()],
          '自訂月份':[]
        },
        showCustomRangeLabel: false,
        alwaysShowCalendars: false
      }, function(start, end){
          $('#reportrange').on('apply.daterangepicker', function(ev, picker){
          if(picker.chosenLabel === '自訂月份'){
            $('#showmonthMenu').css('display', 'inline-block')
          }else if(picker.chosenLabel === '本月'){
            self.cb(0, start, end)
          }else if(picker.chosenLabel === '本年'){
            self.cb(1, start, end)
          }else{
            self.cb(3, start, end)
          }
        })
      })
    },
    // 總排名趨勢
    RankData (value) {
      let self = this
      var arr = []
      var monthLabel = []
      let promises = []
      var time = ''
      var moment = require('moment')
      self.RankFilterData = []
      self.RangeLabelData = []
      self.month = self.end._d.getMonth() - self.start._d.getMonth()      
      if(value === 0){
        time = moment()._d.getMonth()
        self.statisticAllData.filter((item) => {
          if(moment(item.time)._d.getMonth() === time){
            self.RankFilterData.push(item)
            return item
          }
          // return moment(item.time)._d.getMonth() === time
        }).forEach((child) => {
          self.RangeLabelData.push(child.time)
        })
      }else if(value === 1){
        for(var i = 0; i< self.months.length; i++){
          const cors = 'https://cors-anywhere.herokuapp.com/'
          const url = 'https://hotelapi.im.nuk.edu.tw/stat?month=' + self.months[i].month + '&year=' + self.months[i].year
          promises.push(
            axios.get(`${cors}${url}`).then((response) => {
              self.RankFilterData.push(response.data)
            })
          )
        }
        Promise.all(promises).then(() => {
          for(var i = self.start._d.getMonth(); i < self.end._d.getMonth(); i++){
            monthLabel.push(self.labelX[i].field)
          }
          self.RangeLabelData = monthLabel
          self.positiveData(value)
          self.negativeData(value)
          // self.fillData(value)
        })
      }else if(value === 2){
        var x = self.months.filter((item) => {
          return item.field === self.chosenmonthData
        })
        self.statisticAllData.filter((item) => {
          if(self.momentChange(moment(item.time)._d.getMonth()) === x[0].month){
            self.RankFilterData.push(item)
            return item
          } 
        }).forEach((child) => {
          self.RangeLabelData.push(child.time)
        })
      }else{
        self.statisticAllData.filter((item) => {
          if((Date.parse(item.time) >= Date.parse(self.start._d)) && (Date.parse(item.time) <= Date.parse(self.end._d))){
            self.RankFilterData.push(item)
            return item
          }
          // return (Date.parse(item.time) >= Date.parse(self.start._d)) && (Date.parse(item.time) <= Date.parse(self.end._d))
        }).forEach((item) => {
          self.RangeLabelData.push(item.time)
        })
      }
      Promise.all(promises).then(() => {
        this.Rankcollection = {
          labels: self.RangeLabelData,
          datasets: [
            {
              label: '排名',
              borderColor: 'green',
              borderWIdth: 1,
              pointStrokeColor: 'green',
              scaleShowGridLines: false,
              backgroundcolor: 'none',
              fill: false,
              pointDotRadius: 4,
              data: this.calculate(self.RankFilterData)
            }
          ]
        }
        this.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks:{
                min: 1,
                stepSize: 1,
                reverse: true,
                max: Math.max.apply(null, this.calculate(self.RankFilterData))+2
              }
            }],
            xAxes: [{
              gridLines: {
                display: false
              }
            }]
          },
          legend: {
            position: 'right',
            align: 'start',
            labels: {
              padding: 20
            }
           
          }
        }
      })
    },
    calculate(arr){
      let self = this
      var Rank = []
      var avg = 0
      arr.forEach((item) => {
        item.data.sort(function(a,b) {
          return a.avg_rating > b.avg_rating ? -1 : 1
        })
      })
      arr.forEach((item) => {
        item.data.filter((element, index) => {
          if(element.hotelName === self.companyName){
            Rank.push(index+1)
          }
        })
      })
      self.todayRank = Rank[Rank.length-1]
      Rank.forEach((item) => {
        avg +=item
      })
      self.avg_rank = avg/Rank.length
      return Rank
    },
    // 正負評比例
    commentData (value) {
      let self = this
      let promises = []
      var data = []
      var moment = require('moment')
      if(value === 2){
        var x = self.months.filter((item) => {
          return item.field === self.chosenmonthData
        })
        const cors = 'https://cors-anywhere.herokuapp.com/'
        const url = 'https://hotelapi.im.nuk.edu.tw/stat?month=' + x[0].month + '&year=' + x[0].year
        promises.push(
          axios.get(`${cors}${url}`).then((response) => {
            data = response.data
            data = Object.values(data)
            data = data[0]
            self.webCommentData(value, data)
          })
        )
      }else{
        data = []
      }
      Promise.all(promises).then(() => {
        this.Commentcollection = {
          labels: ['正評', '負評'],
          datasets: [
            {
              backgroundColor: [
                '#F75019',
                '#178D8F'
              ],
              // 用data[]取 , 要以什麼為基準??
              data: self.getCommentData(value, data)
            }
          ]
        }
      })
      
    },
    getCommentData(value, data){
      let self = this
      let promises = []
      // var data = []
      var moment = require('moment')
      if(value === 2){
        data = self.getSelfCompany(data)
        return [data.labels.positive, data.labels.negative]
      }else{
        var data1 = [self.todayData[0].data.labels.positive, self.todayData[0].data.labels.negative]
        return data1
      }
    },
    // 正負評趨勢
    positiveData (value) {
      let self = this
      var data = []
      // var max = Math.max.apply(null, this.getData(value))
      this.positiveDatacollection = {
        labels: self.RangeLabelData,
        datasets: [
          {
            label: '正評',
            borderColor: 'green',
            borderWIdth: 1,
            pointStrokeColor: 'green',
            scaleShowGridLines: false,
            backgroundcolor: 'none',
            fill: false,
            pointDotRadius: 4,
            data: this.getData(value)
          }
        ]
      }
      this.options4 = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks:{
              // min: Math.max.apply(null, this.getData(value))-5,
              stepSize: 1,
              max: Math.max.apply(null, this.getData(value))+5
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          position: 'right',
          align: 'start',
          labels: {
            padding: 20
          }
        }
      }
    },
    negativeData (value) {
      let self = this
      var data = []
      // var max1 = Math.max.apply(null, this.getData1(value))
      this.negativeDatacollection = {
        labels: self.RangeLabelData,
        datasets: [
          {
            label: '負評',
            borderColor: 'red',
            borderWIdth: 1,
            pointStrokeColor: 'red',
            backgroundcolor: 'none',
            scaleShowGridLines: false,
            fill: false,
            pointDotRadius: 4,
            data: this.getData1(value)
          }
        ]
      }
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks:{
              // min: Math.max.apply(null, this.getData1(value))-5,
              stepSize: 1,
              max: Math.max.apply(null, this.getData1(value))+5
            }
          }],
          xAxes: [{
            gridLines: {
              display: false
            }
          }]
        },
        legend: {
          position: 'right',
          align: 'start',
          labels: {
            padding: 20
          }
        }
      }
    },
    getData (value) {
      let self = this
      var arr = []
      var data1 = []
      if(value === 1 || value === 2) {
        arr = self.RankFilterData
        // console.log('//')
        console.log(self.RankFilterData)
      }else{
        // console.log('?/')
        arr = self.statisticAllData.filter((item) => {
          return (Date.parse(item.time) >= Date.parse(self.start._d)) && (Date.parse(item.time) <= Date.parse(self.end._d))
        })
      }
      arr.filter((item) => {
        item.data.filter((child) => {
          if(child.hotelName === self.companyName){
            data1.push(child.labels.positive)
          }
        })
      })
      console.log(data1)
      return data1
    },
    getData1 (value) {
      let self = this
      var arr = []
      var data2 = []
      if(value === 1 || value === 2){
        arr = self.RankFilterData
      }else{
        arr = self.statisticAllData.filter((item) => {
          return (Date.parse(item.time) >= Date.parse(self.start._d)) && (Date.parse(item.time) <= Date.parse(self.end._d))
        })
      }
      arr.filter((item) => {
        item.data.filter((child) => {
          if(child.hotelName === self.companyName){
            data2.push(child.labels.negative)
          }
        })
      })
      return data2
    },
    // 各評論比例
    ServiceData () {
      let self = this
      this.Servicecollection = {
        labels: self.labelX1,
        datasets: [
          {
            label: '評論則數',
            // stack: 'Stack 0',
            barPercentage: 0.6,
            backgroundColor: 'gray',
            data: this.getService()
          }
        ]
      }
    },
    getService () {
      let self = this
      var data = []
      Object.keys(self.todayData[0].data.labels).forEach((item) => {
        if(item === 'positive' || item === 'negative' || item === 'reply'){

        }else{
          // console.log(item)
          data.push(self.todayData[0].data.labels[item])
        }
      })
      return data
    },
    // 三個圓餅圖
    webCommentData (value, data) {
      // 再改成顯示%數
      let self = this
      this.webCommentcollection = {
        labels: self.labelX2,
        datasets: [
          {
            backgroundColor: [
              '#F75019',
              '#178D8F',
              '#3591B0',
              '#872403',
              '#AD3937',
              '#F53431'
            ],
            data: self.getWebsiteData(value, data)
          }
        ]
      }
      this.tripTypecollection = {
        labels: self.labelX3,
        datasets: [
          {
            backgroundColor: [
              '#F75019',
              '#178D8F',
              '#3591B0',
              '#872403',
              '#AD3937',
              '#F53431',
              '#F53435'
            ],
            data: self.getTripTypesData(value, data)
          }
        ]
      }
      this.countrycollection = {
        // labels: self.labelX2,
        datasets: [
          {
            backgroundColor: [
              '#F75019',
              '#178D8F',
              '#3591B0',
              '#872403',
              '#AD3937',
              '#F53431'
            ]
            // data: [20, 30, 20, 30, 50, 70]
          }
        ]
      }
    },
    getWebsiteData(value, data){
      let self = this
      console.log(value)
      if(value === 2){
        data = self.getSelfCompany(data)
        console.log(data)

        data = data.websites_count.map((element) => {
          return element.number
        })
        return data
      }
      data = self.todayData[0].data.websites_count.map((element) => {
        return element.number
      })
      return data
      // console.log(data)
    },
    getTripTypesData (value, data) {
      let self = this
      var data1 = []
      if(value === 2){
        data = self.getSelfCompany(data)
        console.log(data)
        data = data.travel_types.map((element) => {
          return element.rate
        })
        return data
      }else{
        data1 = self.todayData[0].data.travel_types.map((element) => {
         return element.number 
        })
        return data1
      }
    }
  },
  created: function(){
      this.timeout = setTimeout(function() {
        worldMap.map();
      }, 3000);
  },
  beforeDestroy: function(){    //換到別頁的時候把timeout清掉
    // alert("beforeDestroy");  
    // console.log("beforeDestroy");
    clearTimeout(this.timeout);
  }

}
</script>
<style type="text/css">
  #showmonthMenu{
    display: none;
  }
  .daterangepicker{
    width: 140px;
    height: 160px;
  }
  .daterangepicker .drp-calendar.left{
    display: none;
  }
  .daterangepicker .drp-calendar.right{
    display: none;
  }
  .daterangepicker.show-calendar .drp-buttons{
    display: none;
  }
  .svgMap-map-wrapper{
    background: white;
  }
  .demo-wrapper{
    width: 400px;
    height: 300px;
    /* padding: 2%; */
  } 
  #svgMapGPD{
    width: 400px;
    height: 300px;
  }
  
  .svgMap-map-image{
    width: 80%;
    height: 100%;
  }
</style>
<style scoped src= '../assets/css/statistic.css'></style>