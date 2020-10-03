<template lang="html">
      <div class="content">
        <div class="RealTime">
          <p>即時</p>
          <ul>
              <li class="flex-1">
                <div>
                  <span>總評論則數</span>
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
                  <span>正評則數</span>
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
                  <span>負評則數</span>
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
                  <span>評分</span>
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
                  <span>總排名</span>
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
        <div class="statisticTop">
          <div class="main flex-2">
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
                  <!-- <p>{{todayData[0].data.labels.positive + todayData[0].data.labels.negative}}</p> -->
                </div>
              </li>
            </ul>
          </div>
          <div class="map flex-1">
          </div>
          <div class="Rank flex-1">
            <div class="statisticRank">
              <p class="allP">總排名趨勢</p>
              <div id="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #DCDFE6;" >
                <span @click="dateRange" class="timeSpan">時間</span>
              </div>
              <line-chart :chart-data="Rankcollection" :options="options" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%;"></line-chart>
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <div class="statisticCenter">
          <div class="statisticComment flex-2">
            <div>
              <p class="allP1">正負評比例</p>
              <doughnut-chart :chart-data="Commentcollection" :options="options2" style="width: 90%; height: 90%; margin-left: 30px;"></doughnut-chart>
              <div class="clear"></div>
            </div>
          </div>
          <div class="statistic flex-1">
            <div>
              <p class="allP">正負評趨勢</p>
              <line-chart :chart-data="datacollection" :options="options" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%; margin-bottom: 10px"></line-chart>
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
              <!-- <doughnut-chart :chart-data="webCommentcollection" :options="options2" style="width: 80%; height: 80%; margin-left: 30px;"></doughnut-chart> -->
            </div>
          </div>
          <div class="statisticWeb flex-1">
            <div>
              <p class="allP1">旅遊類型比例</p>
              <doughnut-chart class="travel" :chart-data="tripTypecollection" :options="options2" style="width: 80%; height: 60%; margin-left: 40px;"></doughnut-chart>
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
// import ChartDataLabels from 'chartjs-plugin-datalabels'

export default {
  name: 'statistic',
  components: {
    lineChart,
    barChart,
    doughnutChart
    // ChartDataLabels
  },
  data () {
    return {
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
      todayRank: '',
      avg_rank: '',
      todayData: [],
      yesterdayData: [],
      weekData: [],
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
      datacollection: null,
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
      labelX: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      labelX1: ['餐飲', '交通', '服務', '客房', '設施','價格','外觀','景觀'],
      labelX2: ['Trip.com', 'Agoda', 'Booking', 'TripAdvisor', 'Hotels.com', 'Expedia'],
      labelX3: []
    }
  },
  mounted () {
    let self = this
    var time = []
    var arr = []
    var moment = require('moment')
    var start = moment().subtract(6, 'days')
    var end = moment()
    self.start = start
    self.end = end
    self.date()
    if(!self.companyName){
      var logining = localStorage.getItem('token')
      var loginData = JSON.parse(logining)
      self.companyName = loginData.companyName
    }
    axios.get('/api/statistic').then(response => {
      self.statisticAllData = response.data
      console.log(self.statisticAllData)
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
      self.RankData()
      self.commentData()
      self.fillData()
      self.ServiceData()
      self.webCommentData()
    }).catch((error) => {
      console.log(error)
    })

    // this.renderChart(this.chartdata, this.options)
  },
  methods: {
    date(){
      let self = this
      var moment = require('moment')
      self.today = moment().subtract(1, 'days')
      self.todayEnd = moment()
      self.yesterday = moment().subtract(2, 'days')
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
    cb: function (start, end) {
      var self = this
      $('#reportrange span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'))
      self.start = start
      self.end = end
      this.RankData()
      this.fillData()
    },
    dateRange: function (arr) {
      var moment = require('moment')
      var self = this
      var start = self.start
      var end = self.end
      $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
          'Today': [moment(), moment()],
          // 'Yesterday': [moment().subtract(1, 'days'), moment()],
          'Last Week': [moment().subtract(6, 'days'), moment()],
          'Last Month': [moment().subtract(30, 'days'), moment()],
          // 'Last Six Months': [moment().subtract(6, 'month'), moment()]
        }
      }, self.cb)
      // var p = 0
      // var t = 0
      // var ori = 0
      // $(document).scroll(function () {
      //   p = $(this).scrollTop()
      //   if (t < p) {
      //     // 下滾
      //     ori = $('#reportrange').offset().top
      //     $('.daterangepicker').css('top', ori + 35)
      //   } else {
      //     // 上滾
      //     $('#reportrange').daterangepicker('hide')
      //   }
      //   t = $(this).scrollTop()
      // })
    },
    // 總排名趨勢
    RankData () {
      let self = this
      var arr = []
      self.weekData = []
      arr = self.statisticAllData.filter((item) => {
        return (Date.parse(item.time) >= Date.parse(self.start._d)) && (Date.parse(item.time) <= Date.parse(self.end._d))
      })
      arr.forEach((item) => {
        self.weekData.push(item.time)
      })
      this.Rankcollection = {
        labels: self.weekData,
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
            data: this.getRank()
          }
        ]
      }
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
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
    getRank () {
      let self = this
      var Rank = []
      var avg = 0
      var arr = self.statisticAllData.filter((item) => {
        return (Date.parse(item.time) >= Date.parse(self.start._d)) && (Date.parse(item.time) <= Date.parse(self.end._d))
      })
      arr.forEach((item) => {
        // self.weekData = item.time
        item.data.sort(function(a, b){
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
        avg += item
      })
      self.avg_rank = avg/Rank.length
      return Rank
      // var Rank = $.map(arr, function(item, index) {
      //   return item.time
      // }).indexOf(self.companyName)
      // console.log(Rank)
      // self.eachData(arr)
      // self.AllCompany.sort(function(a, b){
      //   return a.data.map(el => el.avg_rating).reduce((c,d) => c+d) > b.data.map(el => el.avg_rating).reduce((c,d) => c+d) ? -1 : 1
      // })
      // console.log(self.AllCompany)
      // var Rank = $.map(self.AllCompany, function(item, index) {
      //   return item.name
      // }).indexOf(self.companyName)
      // Rank += 1
      // return Rank
      // var Rank = $.map(self.statisticData, function (item, index) {
      //   return item.time
      // }).indexOf(self.companyName)
      // Rank += 1
      // return Rank
    },
    // 正負評比例
    commentData () {
      let self = this
      this.Commentcollection = {
        labels: ['正評', '負評'],
        datasets: [
          {
            backgroundColor: [
              '#F75019',
              '#178D8F'
            ],
            // 用data[]取 , 要以什麼為基準??
            data: [self.todayData[0].data.labels.positive, self.todayData[0].data.labels.negative]
          }
        ]
      }
    },
    // 正負評趨勢
    fillData () {
      let self = this
      this.datacollection = {
        labels: self.weekData,
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
            data: this.getData()
          },
          {
            label: '負評',
            borderColor: 'red',
            borderWIdth: 1,
            pointStrokeColor: 'red',
            backgroundcolor: 'none',
            scaleShowGridLines: false,
            fill: false,
            pointDotRadius: 4,
            data: this.getData1()
          }
        ]
      }
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
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
    getData () {
      let self = this
      var arr = []
      var data1 = []
      arr = self.statisticAllData.filter((item) => {
        return (Date.parse(item.time) >= Date.parse(self.start._d)) && (Date.parse(item.time) <= Date.parse(self.end._d))
      })
      arr.filter((item) => {
        item.data.filter((child) => {
          if(child.hotelName === self.companyName){
            data1.push(child.labels.positive)
          }
        })
      })
      return data1
    },
    getData1 () {
      let self = this
      var arr = []
      var data2 = []
      arr = self.statisticAllData.filter((item) => {
        return (Date.parse(item.time) >= Date.parse(self.start._d)) && (Date.parse(item.time) <= Date.parse(self.end._d))
      })
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
          console.log(item)
          data.push(self.todayData[0].data.labels[item])
        }
      })
      return data
    },
    // 三個圓餅圖
    webCommentData () {
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
            data: [20, 30, 20, 30, 50, 70]
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
              '#F53431'
            ],
            data: self.getTripTypesData()
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
    getTripTypesData () {
      let self = this
      var data = []
      data = self.todayData[0].data.travel_types.map((element) => {
         return element.number 
      })
      return data
    }
  }
}
</script>
<style scoped src= '../assets/css/statistic.css'></style>
