<template lang="html">
  <div class="wrap">
    <!-- BASIC -->
    <div class="header">
      <div class="headerContent">
        <a class="showMenu" href="#"><img src="https://fakeimg.pl/15x15/" alt=""></a>
        <div class="company">
          <!-- <img class="companyImg" src="https://fakeimg.pl/30x30/" alt=""> -->
          <p class="title">旅館評論管理系統</p>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
        <div class="menu">
          <p>功能列</p>
          <ul>
            <li><a href="#"><img src="https://fakeimg.pl/15x15/" alt="">帳號管理</a></li>
            <!-- , params: { companyID: companyID } -->
            <li><router-link :to="{ name: 'commentList', params: { companyID: companyID }}"><img src="https://fakeimg.pl/15x15/" alt="">評論管理</router-link></li>
            <li><router-link :to="{ name: 'statistic' }"><img src="https://fakeimg.pl/15x15/" alt="">統計結果</router-link></li>
            <li><router-link :to="{ name: 'competition', params: { companyID: companyID }}"><img src="https://fakeimg.pl/15x15/" alt="">競爭對手</router-link></li>
            <li><a href="#"><img src="https://fakeimg.pl/15x15/" alt="">歷史紀錄</a></li>
          </ul>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="content">
      <div class="contentTop">
        <div class="breadcrumb">
          <a class="breadcrumb-item" href="#">首頁</a>
          <a class="breadcrumb-item" href="/commentlist">評論管理</a>
          <a href="#">評論列表</a>
          <div class="clear"></div>
        </div>
        <div class="identity">
          <img class="photo" src="https://fakeimg.pl/15x15/" alt="">
          <p>後台管理員</p>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="contentCenter">
        <div class="page">
          <span>評論列表</span>
        </div>
      </div>
      <div class="dataArea">
        <div class="MultiFilterArea">
          <p class="filterP">篩選</p>
          <div slot="table-actions" class="slot_div">
            <p class="filterTitle">標籤類型</p>
            <template>
              <el-checkbox :indeterminate="TypesIndeterminate" v-model="TypescheckAll" @change="handleCheckAllChange">全選</el-checkbox>
              <el-checkbox-group v-model="typeChoosen" @change="handleCheckedChange(0)">
                <el-checkbox v-for="item in types" :label="item.field" :key="item.value" :value="item.field">{{item.field}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </div>
          <div slot="table-actions" class="slot_div">
            <p class="filterTitle">評論分數</p>
            <!-- <el-select v-model="conditionChoosen" class="formInputCss" placeholder="狀態" @change="ALLFilterFunction">
              <el-option v-for="item in conditions" :key="item.value" :label="item.label" :value="item.field"></el-option>
            </el-select> -->
          </div>
          <div slot="table-actions" class="slot_div">
            <p class="filterTitle">評論時間</p>
            <div id="reportrange" style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #DCDFE6;" >
            <!-- <i class="fas fa-calendar"></i> -->
              <span @click="dateRange" class="timeSpan">時間
            <!-- <i class="el-select__caret el-input__icon el-icon-arrow-up"></i> -->
              </span>
            </div>
          </div>
        </div>
        <div class="dataRightArea">
          <div class="filter">
            <ul>
              <li>
                <button @click="tagFilter('all')">
                  <div class="labelDiv">
                    <img src="https://fakeimg.pl/20x20/" alt="">
                    <span>全部評論</span>
                    <!-- <button>全部評論</button> -->
                  </div>
                </button>
              </li>
              <li v-for="item in labelchoose" :key="item._id" >
                <button  @click="tagFilter(item.tag)">
                  <div class="labelDiv">
                    <img src="https://fakeimg.pl/20x20/" alt="">
                    <span>{{item.tag}}</span>
                  </div>
                </button>
              </li>
              <li>
                <button @click="tagCustom()">
                  <div class="labelDiv">
                    <img src="https://fakeimg.pl/20x20/" alt="">
                    <span>自訂</span>
                  </div>
                </button>
              </li>
            </ul>
            <div class="clear"></div>
            <div class="labelchoose">
              <input type="checkbox" name="label_all" v-model="checkedtagsALL" @change="checkedALLFilter(checkedtagsALL)" id="checkALL">
                <label for="checkALL">全選</label>
            </div>
            <div class="labelchoose" v-for="item in labelchoose" :key="item._id">
              <input type="checkbox" name="label_checked_col[]" :id="[item.tag]" :value="item.tag" v-model="checkedtags" @change="checkedALLFilter(checkedtags)" >
                <label :for="[item.tag]">{{item.tag}}</label>
            </div>
            <div class="clear"></div>
          </div>
          <vue-good-table ref="commentdataTable" class="el-table" styleClass="vgt-table striped" :rows="competitionCommentList"  :columns="columns"
                            @on-selected-rows-change="selectionChanged" :search-options="{ enabled: true }">
            <template slot="table-row" slot-scope="props">
              <template v-if="props.column.field === 'title'" v-bind:value="props.row._id">
                <router-link :to="{ name: 'competitionCommentDetails', params: { _id: props.row. _id }}">{{props.row.title}}</router-link>
              </template>
              <template v-else-if="props.column.field === 'resource'">
                <a :href="props.row.resource[0].url" target="_blanket">{{props.row.resource[1].resourceName}}</a>
              </template>
            </template>
          </vue-good-table>
          <div class="clear"></div>
        </div>
      </div>
    </div>
    <div class="footer">
      <ul class="phoneMenu">
          <li><a href="#"><img src="https://fakeimg.pl/27x27/" alt=""></a></li>
          <li><a href="#"><img src="https://fakeimg.pl/27x27/" alt=""></a></li>
          <li><a href="#"><img src="https://fakeimg.pl/27x27/" alt=""></a></li>
          <li><a href="#"><img src="https://fakeimg.pl/27x27/" alt=""></a></li>
      </ul>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import axios from '../../node_modules/axios'
import $ from '../../node_modules/jquery'
export default {
  name: 'competitionCommentList',
  data () {
    return {
      companyID: this.$route.params.companyID,
      competitionCommentList: [],
      selectedArr: [],
      labelchoose: [],
      checkedtags: [],
      newComment: [],
      checkedtagsALL: false,
      oneTag: '',
      oneTagData: [],
      columns: [
        {
          label: '部門',
          field: 'relateDep'
        },
        {
          label: '時間',
          field: 'time'
        },
        {
          label: '評論',
          field: 'title'
        },
        {
          label: '評分',
          field: 'score',
          type: 'number'
        },
        {
          label: '網站來源',
          field: 'resource'
        }
      ],
      // currentPage: 1,
      // pagesize: 10,
      TypesIndeterminate: null,
      TypescheckAll: false,
      resourceName: [
        {
          value: 'BOOKING.com',
          url: 'https://www.booking.com/'
        },
        {
          value: 'HOTELS',
          url: 'https://tw.hotels.com/'
        },
        {
          value: 'Agoda',
          url: 'https://www.agoda.com/'
        },
        {
          value: 'Expedia',
          url: 'https://www.expedia.com.tw/'
        },
        {
          value: 'trip.com',
          url: 'https://hk.trip.com/'
        },
        {
          value: 'TripAdvisor',
          url: 'https://www.tripadvisor.com.tw/'
        }
      ],
      types: [
        {
          value: '0',
          field: '正評'
        },
        {
          value: '1',
          field: '負評'
        }
      ],
      typeChoosen: [],
      start: '',
      end: '',
      count: 0
    }
  },
  mounted () {
    let self = this
    var moment = require('moment')
    var start = moment().subtract(6, 'month')
    var end = moment()
    console.log(self.companyID)
    axios.get('/competitionCommentList/' + self.companyID).then(response => {
      self.competitionCommentList = response.data
      self.selectedArr = response.data
      self.resourceFn(self.competitionCommentList)
      console.log(self.competitionCommentList)
    }).catch((error) => {
      console.log(error)
    })
    axios.get('/labelchoose').then(response => {
      self.labelchoose = response.data
    }).catch((error) => {
      console.log(error)
    })
    self.start = start
    self.end = end
  },
  computed: {
    // ALLFilterFunction () {
    //   var self = this
    //   if (self.count === 0) {
    //     self.count++
    //   } else {
    //     let arr = []
    //     arr = this.conditionFilter(self.selectedArr, self.conditionChoosen)
    //     arr = this.timeFilter(arr, self.start, self.end)
    //     if (self.checkedtagsALL === true || self.checkedtags.length !== 0) {
    //       arr = self.checkedFun(arr, self.checkedtags)
    //     }
    //     self.competitionCommentList = arr
    //   }
    //   return self.competitionCommentList
    // }
  },
  methods: {
    handleCheckAllChange (val) {
      let self = this
      if (self.TypescheckAll) {
        self.typeChoosen = Object.values(self.types).map(item => item.field)
        this.TypesIndeterminate = false
      } else {
        self.typeChoosen = []
        this.TypesIndeterminate = false
      }
    },
    handleCheckedChange (value) {
      let self = this
      var arr1 = []
      if (value === 0) {
        let checkedCount = self.typeChoosen.length
        self.TypescheckAll = checkedCount === self.types.length
        self.TypesIndeterminate = checkedCount > 0 && checkedCount < self.types.length
      }
      self.competitionCommentList = self.handleFilterData(arr1)
    },
    handleFilterData (replyArr) {
      let self = this
      var filterObj = {
        type: self.typeChoosen
      }
      const filterKeys = Object.keys(filterObj)
      return self.selectedArr.filter((item) => {
        return filterKeys.every((key) => {
          if (!filterObj[key].length) { return true }
          return !!~filterObj[key].indexOf(item[key])
        })
      })
    },
    resourceFn (data) {
      let self = this
      self.competitionCommentList = data
      for (var i = 0; i < self.competitionCommentList.length; i++) {
        for (var j = 0; j <= 5; j++) {
          if (self.competitionCommentList[i].resource[0].url === self.resourceName[j].url) {
            self.competitionCommentList[i].resource[1].resourceName = self.resourceName[j].value
          }
        }
      }
      return self.competitionCommentList
    },
    // conditionFilter (arr, factor) {
    //   if (factor === '請選擇' || factor === '') {
    //     return arr
    //   } else {
    //     const arr1 = arr.filter((item) => {
    //       return item.condition === factor
    //     })
    //     return arr1
    //   }
    // },
    timeFilter: function (arr, startData, endData) {
      arr = arr.filter((item) => {
        return (Date.parse(item.time) >= Date.parse(startData._d)) && (Date.parse(item.time) <= Date.parse(endData._d))
      })
      return arr
    },
    checkedALLFilter: function (data) {
      var self = this
      // 全選
      if (self.checkedtagsALL === true && data === self.checkedtagsALL) {
        $("input[name='label_checked_col[]']").prop('checked', true)
        self.checkedtags = []
        self.labelchoose.forEach((item) => {
          self.checkedtags.push(item.tag)
        })
        // 點其它時是全選
      } else if (self.checkedtagsALL === true && data === self.checkedtags) {
        self.checkedtagsALL = false
        $(event.target).prop('checked', false)
        // 取消全選
      } else if (self.checkedtagsALL !== true && data === self.checkedtagsALL) {
        $("input[name='label_checked_col[]']").prop('checked', false)
        self.checkedtags = []
        // 點其它時不是全選
      } else if (self.checkedtagsALL !== true && data === self.checkedtags) {
        $(event.target).prop('checked', false)
      }
      self.ALLFilterFunction()
    },
    checkedFun: function (arr, chtags) {
      var arr1 = []
      arr.forEach((item) => {
        for (var i in item.tags) {
          var count = 0
          for (var j in chtags) {
            if (item.tags[i] === chtags[j]) {
              arr1.push(item)
              count++
              break
            }
          }
          if (count !== 0) {
            break
          }
        }
      })
      return arr1
    },
    cb: function (start, end) {
      var self = this
      $('#reportrange span').html(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'))
      self.start = start
      self.end = end
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
          'Yesterday': [moment().subtract(1, 'days'), moment()],
          'Last Week': [moment().subtract(6, 'days'), moment()],
          'Last Month': [moment().subtract(30, 'days'), moment()],
          'Last Six Months': [moment().subtract(6, 'month'), moment()]
        }
      }, self.cb)
      var p = 0
      var t = 0
      var ori = 0
      $('.wrap').scroll(function () {
        p = $(this).scrollTop()
        if (t < p) {
          // 下滾
          ori = $('#reportrange').offset().top
          $('.daterangepicker').css('top', ori + 35)
        } else {
          // 上滾
          $('#reportrange').daterangepicker('hide')
        }
        t = $(this).scrollTop()
      })
    },
    tagFilter: function (tag) {
      let self = this
      var arrq = []
      self.oneTag = tag
      if (tag === 'all') {
        self.checkedtags = []
        $("input[name='label_checked_col[]']").prop('checked', false)
        $("input[name='label_all']").prop('checked', false)
        self.checkedtagsALL = false
        self.competitionCommentList = self.selectedArr
        return self.competitionCommentList
      } else {
        self.selectedArr.filter((item, index, array) => {
          item.tags.filter((element, index, array) => {
            if (element === tag) {
              arrq.push(item)
            }
          })
        })
        self.competitionCommentList = arrq
        self.oneTagData = arrq
        self.checkedtags = []
        $("input[name='label_checked_col[]']").prop('checked', false)
        $("input[name='label_all']").prop('checked', false)
        self.checkedtagsALL = false
        return self.competitionCommentList
      }
    },
    tagCustom: function () {
      let self = this
      self.oneTag = ''
      event.stopPropagation()
      $('.labelchoose').toggle('slow')
      $(document).click(function (event) {
        var area = $('.labelchoose') // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          // $('#divTop').slideUp('slow');  //滑動消失
          $('.labelchoose').hide(1000) // 淡出消失
        }
      })
    }
  }
}
</script>
<style scoped src= '../assets/css/competition.css'></style>
