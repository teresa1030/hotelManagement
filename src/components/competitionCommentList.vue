<template>
  <div>
      <div class="contentCenter">
        <div class="page">
          <span>評論列表</span>
        </div>
      </div>
      <div class="filter">
        <ul>
          <li class='all'>
            <button @click="tagFilter('all')">
              <div class="labelDiv">
                <img src="https://fakeimg.pl/20x20/" alt="">
                <span>全部</span>
              </div>
            </button>
          </li>
          <li v-for="item in labelchoose" :key="item.field" :class="item.field">
            <button  @click="tagFilter(item.field)">
              <div class="labelDiv">
                <img src="https://fakeimg.pl/20x20/" alt="">
                <span>{{item.label}}</span>
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
        <div class="labelchooseArea">
          <div class="labelchoose">
            <input type="checkbox" name="label_all" v-model="checkedtagsALL" @change="checkedALLFilter(checkedtagsALL)" id="checkALL">
            <label for="checkALL">全選</label>
            <div class="clear"></div>
          </div>
          <div class="labelchoose" v-for="item in labelchoose" :key="item.field">
            <input type="checkbox" name="label_checked_col[]" :id="[item.field]" :value="item.field" v-model="checkedtags" @change="checkedALLFilter(checkedtags)" >
            <label :for="[item.field]">{{item.label}}</label>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="dataArea">
        <div class="MultiFilterArea">
          <p class="filterP">篩選</p>
          <el-button @click="clearALL()" class="clearall">全部清除</el-button>
          <div slot="table-actions" class="slot_div">
            <p class="filterTitle">標籤類型</p>
            <template>
              <el-checkbox :indeterminate="TypesIndeterminate" v-model="TypescheckAll" @change="handleCheckAllChange(0)">全選</el-checkbox>
              <el-checkbox-group v-model="typeChoosen" @change="handleCheckedChange(0)">
                <el-checkbox v-for="item in types" :label="item.value" :key="item.value" :value="item.value">{{item.field}}</el-checkbox>
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
          <vue-good-table ref="commentdataTable" class="el-table" styleClass="vgt-table striped" :rows="competitionCommentList"  :columns="columns"
                            @on-selected-rows-change="selectionChanged" :search-options="{ enabled: true }">
            <template slot="table-row" slot-scope="props">
              <template v-if="props.column.label === '評論'" v-bind:value="props.row._id">
                <router-link :to="{ name: 'competitionCommentDetails' , params: { collections: companyName, _id: props.row._id }}">{{props.row.title}}</router-link>
              </template>
              <!-- <template v-else-if="props.column.field === 'resource'">
                <a :href="props.row.resource[0].url" target="_blanket">{{props.row.resource[1].resourceName}}</a>
              </template> -->
            </template>
          </vue-good-table>
          <div class="clear"></div>
        </div>
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
      companyName:  this.$route.params.collections,
      competitionCommentList: [],
      selectedArr: [],
      // labelchoose: [],
      checkedtags: [],
      newComment: [],
      checkedtagsALL: false,
      oneTag: '',
      // oneTagData: [],
      columns: [
        {
          label: '正/負評',
          field: this.fieldFn
        },
        {
          label: '時間',
          field: 'times.comment'
        },
        {
          label: '評論',
          field: this.fieldFn3
        },
        {
          label: '評分',
          field: 'rating',
          type: 'number'
        },
        {
          label: '網站來源',
          field: 'website'
        }
      ],
      // currentPage: 1,
      // pagesize: 10,
      TypesIndeterminate: null,
      TypescheckAll: false,
      titleField: '',
      labelchoose: [
        {
          label: '餐飲',
          field: 'food_drink'
        },
        {
          label: '客房',
          field: 'room'
        },
        {
          label: '設施',
          field: 'amenities'
        },
        {
          label: '服務',
          field: 'service'
        },
        {
          label: '交通',
          field: 'transportation'
        },
        {
          label: '價格',
          field: 'price'
        },
        {
          label: '景觀',
          field: 'view'
        },
        {
          label: '外觀',
          field: 'appearance'
        }
      ],
      types: [
        {
          value: 0,
          field: '正評'
        },
        {
          value: 1,
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
    // console.log(self.companyID)
    axios.get('https://hotelapi.im.nuk.edu.tw/api/comment/' + self.companyName).then(response => {
      self.competitionCommentList = response.data
      self.selectedArr = response.data
    }).catch((error) => {
      console.log(error)
    })
    // axios.get('/api/competitionCommentList/' + self.companyID).then(response => {
    //   self.competitionCommentList = response.data
    //   self.selectedArr = response.data
    //   self.resourceFn(self.competitionCommentList)
    //   console.log(self.competitionCommentList)
    // }).catch((error) => {
    //   console.log(error)
    // })
    // axios.get('/api/labelchoose').then(response => {
    //   self.labelchoose = response.data
    // }).catch((error) => {
    //   console.log(error)
    // })
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
      clearALL(){
      let self = this
      self.typeChoosen = []
      this.TypesIndeterminate = false
      self.competitionCommentList = self.selectedArr
      $('#reportrange span').html('時間')
      return self.competitionCommentList
    },
    handleCheckAllChange (val) {
      let self = this
      if(val === 0){
        if (self.TypescheckAll) {
          self.typeChoosen = Object.values(self.types).map(item => item.value)
          this.TypesIndeterminate = false
        } else {
          self.typeChoosen = []
          this.TypesIndeterminate = false
        }
      }
      self.competitionCommentList = self.handleFilterData()
    },
    handleCheckedChange (value) {
      let self = this
      var arr1 = []
      if (value === 0) {
        let checkedCount = self.typeChoosen.length
        self.TypescheckAll = checkedCount === self.types.length
        self.TypesIndeterminate = checkedCount > 0 && checkedCount < self.types.length
      }
      self.competitionCommentList = self.handleFilterData()
    },
    handleFilterData () {
      let self = this
      var filterObj = {
        pos_neg: self.typeChoosen
      }
      const filterKeys = Object.keys(filterObj)
      return self.selectedArr.filter((item) => {
        return filterKeys.every((key) => {
          if (!filterObj[key].length) { return true }
          return !!~filterObj[key].indexOf(item.labels[key])
        })
      })
    },
    fieldFn (rowObj) {
      // 整個陣列
      if(rowObj.labels.pos_neg === 0){
        return '正評'
      }else{
        return '負評'
      }
    },
    fieldFn3(rowObj){
      if(rowObj.title === ''){
        rowObj.title = rowObj.text.substr(0,10) + '...'
      }
    },
    // resourceFn (data) {
    //   let self = this
    //   self.competitionCommentList = data
    //   for (var i = 0; i < self.competitionCommentList.length; i++) {
    //     for (var j = 0; j <= 5; j++) {
    //       if (self.competitionCommentList[i].resource[0].url === self.resourceName[j].url) {
    //         self.competitionCommentList[i].resource[1].resourceName = self.resourceName[j].value
    //       }
    //     }
    //   }
    //   return self.competitionCommentList
    // },
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
      let self = this
      arr = arr.filter((item) => {
        return (Date.parse(Object.values(item.times)[1]) >= Date.parse(startData._d)) && (Date.parse(Object.values(item.times)[1]) <= Date.parse(endData._d))
      })
      self.competitionCommentList = arr
      return self.competitionCommentList
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
      this.timeFilter(self.selectedArr, self.start, self.end)
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
      $(document).scroll(function () {
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
        $("input[name='label_checked_col[]']").prop('checked', true)
        $("input[name='label_all']").prop('checked', true)
        $('.all').addClass('focus')
        self.checkedtagsALL = false
        self.labelchoose.forEach(item => {
            $('.' + item.field).removeClass('focus')
        })
        self.competitionCommentList = self.selectedArr
        return self.competitionCommentList
      } else {
        $('.all').removeClass('focus')
        self.labelchoose.forEach(item => {
          if(item.field === tag){
            $('.' + tag).addClass('focus')
          }else{
            $('.' + item.field).removeClass('focus')
          }
        })
        arrq = self.selectedArr.filter((item, index, array) => {
            return item.labels[tag] === 1
        })
        self.competitionCommentList = arrq
        // self.oneTagData = arrq
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
        var area = $('.labelchooseArea') // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          // $('#divTop').slideUp('slow');  //滑動消失
          $('.labelchoose').hide(1000) // 淡出消失
        }
      })
    }
  }
}
</script>
<style scoped src= '../assets/css/commentList.css'></style>
<style scoped src= '../assets/css/competition.css'></style>
