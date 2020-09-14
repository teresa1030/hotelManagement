<template lang="html">
      <div class="content">
        <div class="RealTime">
          <p>即時</p>
          <ul>
              <li class="flex-1">
                <div>
                  <span>總評論則數</span>
                  <p>{{statisticData[0].labels[0].positive + statisticData[0].labels[0].negative}}</p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span>正評則數</span>
                  <p>{{statisticData[0].labels[0].positive}}</p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span>負評則數</span>
                  <p>{{statisticData[0].labels[0].negative}}</p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span>評分</span>
                  <p>{{statisticData[0].avg_rating}}</p>
                </div>
              </li>
              <li class="flex-1">
                <div>
                  <span>總排名</span>
                  <p>{{statisticData[0].avg_rating}}</p>
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
                  <p>{{statisticData[0].labels[0].positive + statisticData[0].labels[0].negative}}</p>
                </div>
              </li>
              <li>
                <div>
                  <span>評分</span>
                  <p>{{statisticData[0].avg_rating}}</p>
                </div>
              </li>
              <li>
                <div>
                  <span>總排名</span>
                  <p>{{statisticData[0].avg_rating}}</p>
                </div>
              </li>
            </ul>
          </div>
          <div class="map flex-1">

          </div>
          <div class="Rank flex-1">
            <div class="statisticRank">
              <p class="allP">總排名趨勢</p>
              <line-chart :chart-data="Rankcollection" :options="options" style="width: 96%; height: 80%; margin-right: 2%; margin-left: 2%;"></line-chart>
            </div>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="statisticCenter">
          <div class="statisticComment flex-2">
            <div>
              <p class="allP1">正負評比例</p>
            <!-- 寫在中間加數字 -->
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
                <doughnut-chart :chart-data="webCommentcollection" :options="options2" style="width: 80%; height: 80%; margin-left: 30px;"></doughnut-chart>
              </div>
            </div>
            <div class="statisticWeb flex-1">
              <div>
                <p class="allP1">旅遊類型比例</p>
                <doughnut-chart :chart-data="tripTypecollection" :options="options2" style="width: 80%; height: 80%; margin-left: 30px;"></doughnut-chart>
              </div>
            </div>
            <div class="statisticWeb flex-1">
              <div>
                <p class="allP1">旅遊類型比例</p>
                <doughnut-chart :chart-data="tripTypecollection" :options="options2" style="width: 80%; height: 80%; margin-left: 30px;"></doughnut-chart>
              </div>
            </div>
            <div class="statisticWeb1 flex-1">
              <div>
                <p class="allP1">各國留言數量比</p>
                <doughnut-chart :chart-data="countrycollection" :options="options2" style="width: 80%; height: 80%; margin-left: 30px;"></doughnut-chart>
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
import ChartDataLabels from 'chartjs-plugin-datalabels'

export default {
  name: 'statistic',
  components: {
    lineChart,
    barChart,
    doughnutChart,
    ChartDataLabels
  },
  data () {
    return {
      companyName: 'OkuraPrestigeTaipei',
      companyID: 'A',
      time: 'August',
      statisticData: [],
      statisticRank: [],
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
            padding: 20,
            fontSize: 14,
            fontFamily: '微軟正黑體'
          }
          // 可以加onclick
        }
      },
      labelX: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      labelX1: ['服務', '交通', '餐飲', '設施', '客房'],
      labelX2: ['Trip.com', 'Agoda', 'Booking', 'TripAdvisor', 'Hotels.com', 'Expedia'],
      labelX3: ['家庭旅遊', '商務旅客', '團體出遊', '情侶出遊', '親子旅遊']
    }
  },
  mounted () {
    let self = this
    axios.get('/api/statistic').then(response => {
      self.statisticData = response.data
      self.fillData()
      self.ServiceData()
      self.webCommentData()
    }).catch((error) => {
      console.log(error)
    })
    axios.get('/api/statistic/' + self.time).then(response => {
      self.statisticRank = response.data
      self.RankData()
      self.commentData()
    }).catch((error) => {
      console.log(error)
    })

    // this.renderChart(this.chartdata, this.options)
  },
  methods: {
    // 總排名趨勢
    RankData () {
      let self = this
      this.Rankcollection = {
        labels: [self.statisticRank[0].time],
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
            data: [this.getRank()]
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
      self.statisticRank[0].data.sort(function (a, b) {
        return a.avg_rating > b.avg_rating ? -1 : 1
      })
      var Rank = $.map(self.statisticRank[0].data, function (item, index) {
        return item.name
      }).indexOf(self.companyName)
      Rank += 1
      return Rank
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
            data: [self.statisticRank[0].data[0].labels.positive, self.statisticRank[0].data[0].labels.negative]
          }
        ]
      }
    },
    // 正負評趨勢
    fillData () {
      this.datacollection = {
        labels: this.labelX,
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
      var data1 = []
      self.statisticData.forEach(element => {
        element.labels.forEach(item => {
          data1.push(item.positive)
        })
      })
      return data1
    },
    getData1 () {
      let self = this
      var data2 = []
      self.statisticData.forEach(element => {
        element.labels.forEach(item => {
          data2.push(item.negative)
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
            label: '正評',
            stack: 'Stack 0',
            barPercentage: 0.6,
            backgroundColor: '#af90ca',
            data: [20, 30, 50, 60, 1]
            // data: [this.getService().service, this.getService().transportation, this.getService().food_drink, this.getService().amenities, this.getService().room]
          },
          {
            label: '負評',
            stack: 'Stack 0',
            barPercentage: 0.6,
            backgroundColor: 'pink',
            data: [7, 50, 20, 10, 5]
            // data: [this.getService().service, this.getService().transportation, this.getService().food_drink, this.getService().amenities, this.getService().room]
          }
        ]
      }
    },
    getService () {
      let self = this
      var arr = self.statisticData.filter(item => {
        return item.time === self.time
      })
      return arr
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
      var data3 = self.statisticData.filter((item) => {
        if (item.time === self.time) {
          console.log(item)
          return item
        }
      })
      data3[0].travel_types.forEach(element => {
        data.push(element.number)
      })
      return data
    }
  }
}
</script>
<style scoped src= '../assets/css/statistic.css'></style>
