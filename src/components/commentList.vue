<template>
  <div>
      <div class="contentCenter">
        <div class="page">
          <span>評論列表</span>
        </div>
        <div class="editArea">
          <button class="editButton" @click="editFUn"><img src="../assets/icon/edit.png"><span class="editSpan">編輯</span></button>
          <div class="edit">
            <p>編輯評論狀態</p>
            <el-select placeholder="評論狀態設定" class="editButton" v-model="conditionModify">
              <el-option v-for="item in conditions" :key="item.value" :value="item.field"></el-option>
            </el-select>
            <p>編輯回覆狀態</p>
            <el-select placeholder="回覆狀態設定" class="editButton" v-model="replyModify">
              <el-option v-for="item in replys" :key="item.value" :value="item.field"></el-option>
            </el-select>
            <button @click="editUpdate" class="confirmButton">確認</button>
            <button @click="editCancle" class="confirmButton">取消</button>
            <div class="clear"></div>
          </div>
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
            <p class="filterTitle">評論處理狀態</p>
            <template>
              <el-checkbox :indeterminate="ConditionIndeterminate" v-model="ConditioncheckAll" @change="handleCheckAllChange">全選</el-checkbox>
              <el-checkbox-group v-model="conditionChoosen" @change="handleCheckedChange(1)">
                <el-checkbox v-for="item in conditions" :label="item.field" :key="item.value" :value="item.field">{{item.field}}</el-checkbox>
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
            <p class="filterTitle">評論回覆狀態</p>
            <template>
              <el-checkbox :indeterminate="ReplyIndeterminate" v-model="ReplycheckAll" @change="handleCheckAllChange">全選</el-checkbox>
              <el-checkbox-group v-model="replyChoosen" @change="handleCheckedChange(2)">
                <el-checkbox v-for="item in replys" :label="item.field" :key="item.value" :value="item.field" class="elcheckbox">{{item.field}}</el-checkbox>
              </el-checkbox-group>
            </template>
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
          <vue-good-table ref="commentdataTable"  class="el-table" styleClass="vgt-table striped" :rows="commentData"  :columns="columns" @on-selected-rows-change="selectionChanged" :search-options="{ enabled: true }" :select-options="{enabled: true ,selectOnCheckboxOnly: true, disableSelectInfo: true}">
            <template slot="table-row" slot-scope="props">
              <template v-if="props.column.field === 'condition'">
                <span v-if="props.row.condition === '未處理'">
                  <el-button class="none" @click="conditionUpdate(props.row._id)">{{props.row.condition}}</el-button>
                </span>
                <span v-else-if="props.row.condition === '處理中'">
                  <el-button class="ing" @click="conditionUpdate(props.row._id)">{{props.row.condition}}</el-button>
                </span>
                <span v-else-if="props.row.condition === '已完成'">
                  <el-button class="done" disabled="disabled">{{props.row.condition}}</el-button>
                </span>
              </template>
              <template v-else-if="props.column.field === 'title'" v-bind:value="props.row._id">
                <router-link :to="{ name: 'commentDetails', params: { _id: props.row._id }}">{{props.row.title}}</router-link>
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
</template>
<script>
import axios from '../../node_modules/axios'
import $ from '../../node_modules/jquery'
export default {
  name: 'commentList',
  components: {
  'vue-good-table': require('vue-good-table').VueGoodTable,
  },
  data () {
    return {
      // table data area
      companyID: 'A',
      commentData: [],
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
          label: '狀態',
          field: 'condition'
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
          label: '回覆',
          field: this.fieldFn
        },
        {
          label: '網站來源',
          field: 'resource'
        }
      ],
      // currentPage: 1,
      // pagesize: 10,
      // filter area
      TypescheckAll: false,
      ConditioncheckAll: false,
      ReplycheckAll: false,
      // 選取數量為不確定:true
      TypesIndeterminate: null,
      ConditionIndeterminate: null,
      ReplyIndeterminate: null,
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
      conditions: [
        // {
        //   value: 'all',
        //   field: '請選擇'
        // },
        {
          value: 'none',
          field: '未處理'
        },
        {
          value: 'ing',
          field: '處理中'
        },
        {
          value: 'done',
          field: '已完成'
        }
      ],
      types: [
        // {
        //   value: 'all',
        //   field: '全部'
        // },
        {
          value: 'good',
          field: '正評'
        },
        {
          value: 'bad',
          field: '負評'
        }
      ],
      replys: [
        {
          value: 'true',
          field: '是'
        },
        {
          value: 'false',
          field: '否'
        }
      ],
      conditionChoosen: [],
      conditionModify: '',
      typeChoosen: [],
      replyChoosen: [],
      replyModify: '',
      start: '',
      end: '',
      count: 0
      // reveal: false
    }
  },
  // 在一個條件後面會跟著一個問號 (?)
  // 如果條件是 truthy，在冒號(:)前的表達式會被執行
  // 如果條件是 false，在冒號後面的表達式會被執行
  // 這個運算子常常被用來當作 if 的簡潔寫法
  // condition ? exprIfTrue : exprIfFalse
  mounted () {
    let self = this
    var moment = require('moment')
    var start = moment().subtract(6, 'month')
    var end = moment()
    axios.get('/api/comment').then(response => {
      self.commentData = response.data
      self.selectedArr = response.data
      self.resourceFn(self.commentData)
      console.log(self.commentData)
    }).catch((error) => {
      console.log(error)
    })
    axios.get('/api/labelchoose').then(response => {
      self.labelchoose = response.data
    }).catch((error) => {
      console.log(error)
    })
    self.start = start
    self.end = end
  },
  // 剩多重篩選&分數
  computed: {
    // ALLFilterFunction () {
    //   var self = this
    //   if (self.count === 0) {
    //     self.count++
    //   } else {
    //     let arr = []
    //     if (self.oneTag.length !== 0) {
    //       var arr1 = self.oneTagData
    //       arr = this.handleFilterData()
    //     }
    //   }
    // },
    // ALLFilterFunction () {
    //   var self = this
    //   if (self.count === 0) {
    //     self.count++
    //   } else {
    //     let arr = []
    //     if (self.oneTag !== '' && self.oneTag !== 'all') {
    //       var arr1 = self.oneTagData
    //       arr = this.conditionFilter(arr1, self.conditionChoosen)
    //       arr = this.timeFilter(arr, self.start, self.end)
    //       if (self.checkedtagsALL === true || self.checkedtags.length !== 0) {
    //         arr = self.checkedFun(arr, self.checkedtags)
    //       }
    //       self.commentData = arr
    //     } else {
    //       arr = this.conditionFilter(self.selectedArr, self.conditionChoosen)
    //       arr = this.timeFilter(arr, self.start, self.end)
    //       if (self.checkedtagsALL === true || self.checkedtags.length !== 0) {
    //         arr = self.checkedFun(arr, self.checkedtags)
    //       }
    //       self.commentData = arr
    //     }
    //   }
    //   return self.commentData
  },
  methods: {
    // selectionChanged(params){

    // },
    handleCheckAllChange (val) {
      let self = this
      if (self.TypescheckAll) {
        self.typeChoosen = Object.values(self.types).map(item => item.field)
        this.TypesIndeterminate = false
      } else {
        self.typeChoosen = []
        this.TypesIndeterminate = false
      }
      if (self.ConditioncheckAll) {
        self.conditionChoosen = Object.values(self.conditions).map(item => item.field)
        this.ConditionIndeterminate = false
      } else {
        self.conditionChoosen = []
        this.ConditionIndeterminate = false
      }
      if (self.ReplycheckAll) {
        self.replyChoosen = Object.values(self.replys).map(item => item.field)
        this.ReplyIndeterminate = false
      } else {
        self.replyChoosen = []
        this.ReplyIndeterminate = false
      }
    },
    handleCheckedChange (value) {
      let self = this
      var arr1 = []
      if (value === 0) {
        let checkedCount = self.typeChoosen.length
        self.TypescheckAll = checkedCount === self.types.length
        self.TypesIndeterminate = checkedCount > 0 && checkedCount < self.types.length
      } else if (value === 1) {
        let checkedCount = self.conditionChoosen.length
        self.ConditioncheckAll = checkedCount === self.conditions.length
        self.ConditionIndeterminate = checkedCount > 0 && checkedCount < self.conditions.length
      } else if (value === 2) {
        let checkedCount = self.replyChoosen.length
        self.ReplycheckAll = checkedCount === self.replys.length
        self.ReplyIndeterminate = checkedCount > 0 && checkedCount < self.replys.length
      }
      for (var i in self.replyChoosen) {
        if (self.replyChoosen[i] === '是') {
          arr1[i] = true
        } else {
          arr1[i] = false
        }
      }
      self.commentData = self.handleFilterData(arr1)
    },
    handleFilterData (replyArr) {
      let self = this
      var filterObj = {
        type: self.typeChoosen,
        condition: self.conditionChoosen,
        reply: replyArr
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
      self.commentData = data
      for (var i = 0; i < self.commentData.length; i++) {
        for (var j = 0; j <= 5; j++) {
          if (self.commentData[i].resource[0].url === self.resourceName[j].url) {
            self.commentData[i].resource[1].resourceName = self.resourceName[j].value
          }
        }
      }
      return self.commentData
    },
    fieldFn (rowObj) {
      if (rowObj.reply === false) {
        return '否'
      } else {
        return '是'
      }
    },
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
      // 記得回來打開
      // self.ALLFilterFunction()
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
    // conditionUpdate: function (id) {
    //   let self = this
    //   self.commentData.forEach((item) => {
    //     if (item._id === id) {
    //       if (item.condition === '未處理') {
    //         item.condition = '處理中'
    //       } else {
    //         item.condition = '已完成'
    //       }
    //       self.newComment = item
    //       self.updateComment(id)
    //     }
    //   })
    //   return self.commentData
    // },
    editFUn: function () {
      // let self = this
      event.stopPropagation()
      $('.edit').toggle('slow')
      $(document).click(function (event) {
        var area = $('.edit') // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          // $('#divTop').slideUp('slow');  //滑動消失
          $('.edit').hide(1000) // 淡出消失
        }
      })
    },
    editUpdate: function () {
      let self = this
      if (self.conditionModify.length !== 0) {
        self.$refs['commentdataTable'].selectedRows.forEach((item) => {
          item.condition = self.conditionModify
          self.newComment = item
          self.updateComment(item._id)
        })
      }
      if (self.replyModify.length !== 0) {
        if (self.replyModify === '是') {
          self.$refs['commentdataTable'].selectedRows.forEach((item) => {
            item.reply = true
            self.newComment = item
            self.updateComment(item._id)
          })
        } else {
          self.$refs['commentdataTable'].selectedRows.forEach((item) => {
            item.reply = false
            self.newComment = item
            self.updateComment(item._id)
          })
        }
      }
    },
    updateComment: function (id) {
      let self = this
      let updateData = self.newComment
      let updateId = id
      axios.put('/comment/' + updateId, updateData)
        .then((response) => {
        }).catch((err) => {
          console.log(err)
        })
      self.editCancle()
    },
    editCancle: function () {
      let self = this
      self.conditionModify = []
      self.replyModify = []
      $('.edit').hide(1000) // 淡出消失
    },
    // handleSizeChange: function (size) {
    //   this.pagesize = size
    // },
    // handleCurrentChange: function (currentPage) {
    //   this.currentPage = currentPage
    // },
    tagFilter: function (tag) {
      let self = this
      var arrq = []
      self.oneTag = tag
      if (tag === 'all') {
        self.checkedtags = []
        $("input[name='label_checked_col[]']").prop('checked', false)
        $("input[name='label_all']").prop('checked', false)
        self.checkedtagsALL = false
        self.commentData = self.selectedArr
        return self.commentData
      } else {
        self.selectedArr.filter((item, index, array) => {
          item.tags.filter((element, index, array) => {
            if (element === tag) {
              arrq.push(item)
            }
          })
        })
        self.commentData = arrq
        self.oneTagData = arrq
        self.checkedtags = []
        $("input[name='label_checked_col[]']").prop('checked', false)
        $("input[name='label_all']").prop('checked', false)
        self.checkedtagsALL = false
        return self.commentData
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
<style scoped src= '../assets/css/commentList.css'></style>
