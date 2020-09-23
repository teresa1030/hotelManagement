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
            <!-- <el-select placeholder="回覆狀態設定" class="editButton" v-model="replyModify"> -->
              <!-- <el-option v-for="item in replys" :key="item.value" :value="item.field"></el-option> -->
            <!-- </el-select> -->
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
                <el-checkbox v-for="item in types" :label="item.value" :key="item.value" :value="item.value">{{item.field}}</el-checkbox>
              </el-checkbox-group>
            </template>
          </div>
          <div slot="table-actions" class="slot_div">
            <p class="filterTitle">評論處理狀態</p>
            <template>
              <el-checkbox :indeterminate="ConditionIndeterminate" v-model="ConditioncheckAll" @change="handleCheckAllChange">全選</el-checkbox>
              <el-checkbox-group v-model="conditionChoosen" @change="handleCheckedChange(1)">
                <el-checkbox v-for="item in conditions" :label="item.value" :key="item.value" :value="item.value">{{item.field}}</el-checkbox>
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
                <el-checkbox v-for="item in reply" :label="item.value" :key="item.value" :value="item.value" class="elcheckbox">{{item.field}}</el-checkbox>
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
              <li v-for="item in labelchoose" :key="item.field" >
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
            <div class="labelchoose">
              <input type="checkbox" name="label_all" v-model="checkedtagsALL" @change="checkedALLFilter(checkedtagsALL)" id="checkALL">
                <label for="checkALL">全選</label>
            </div>
            <div class="labelchoose" v-for="item in labelchoose" :key="item.field">
              <input type="checkbox" name="label_checked_col[]" :id="[item.field]" :value="item.label" v-model="checkedtags" @change="checkedALLFilter(checkedtags)" >
                <label :for="[item.label]">{{item.label}}</label>
            </div>
            <div class="clear"></div>
          </div>
          <vue-good-table ref="commentdataTable"  class="el-table" styleClass="vgt-table striped" :rows="commentData"  :columns="columns" @on-selected-rows-change="selectionChanged" :search-options="{ enabled: true }" :select-options="{enabled: true ,selectOnCheckboxOnly: true, disableSelectInfo: true}">
            <template slot="table-row" slot-scope="props">
              <template v-if="props.column.label === '狀態'">
                <span v-if="props.row.labels.condition === 0">
                  <el-button class="none" @click="conditionUpdate(props.row._id)">未處理</el-button>
                </span>
                <span v-else-if="props.row.labels.condition === 1">
                  <el-button class="ing" @click="conditionUpdate(props.row._id)">處理中</el-button>
                </span>
                <span v-else-if="props.row.labels.condition === 2">
                  <el-button class="done" disabled="disabled">已完成</el-button>
                </span>
              </template>
              <template v-else-if="props.column.field === 'title'" v-bind:value="props.row._id">
                <router-link :to="{ name: 'commentDetails', params: { _id: props.row._id }}">{{props.row.title}}</router-link>
              </template>
              <!-- <template v-else-if="props.column.field === 'website'"> -->
                <!-- <a :href="props.row.resource[0].url" target="_blanket">{{props.row.resource}}</a> -->
              <!-- </template> -->
            </template>
          </vue-good-table>
          <div class="clear"></div>
        </div>
      </div>
  </div>
</template>
<script>
// import { filter } from 'vue/types/umd'
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
      companyName:  this.$route.params.collections,
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
          label: '正/負評',
          field: this.fieldFn
        },
        {
          label: '狀態',
          field: this.fieldFn2
        },
        {
          label: '回覆',
          field: this.fieldFn1
        },

        {
          label: '評論',
          field: 'superlative'
        },
        {
          label: '評分',
          field: 'rating',
          type: 'number'
        },
        // ?
        {
          label: '時間',
          field: 'times.comment'
        },
        {
          label: '網站來源',
          field: 'website'
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
      resourceName: ['Trip', 'Hotels', 'Agoda', 'Booking', 'TripAdvisor', 'Expedia'],
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
      conditions: [
        {
          value: 0,
          field: '未處理'
        },
        {
          value: 1,
          field: '處理中'
        },
        {
          value: 2,
          field: '已完成'
        }
      ],
      // 在label裡了
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
      reply: [
        {
          value: 1,
          field: '是'
        },
        {
          value: 0,
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
    axios.get('/api/comment/' + self.companyName).then(response => {
      self.commentData = response.data
      self.selectedArr = response.data
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
        self.typeChoosen = Object.values(self.types).map(item => item.value)
        this.TypesIndeterminate = false
      } else {
        self.typeChoosen = []
        this.TypesIndeterminate = false
      }
      if (self.ConditioncheckAll) {
        self.conditionChoosen = Object.values(self.conditions).map(item => item.value)
        this.ConditionIndeterminate = false
      } else {
        self.conditionChoosen = []
        this.ConditionIndeterminate = false
      }
      if (self.ReplycheckAll) {
        self.replyChoosen = Object.values(self.reply).map(item => item.value)
        this.ReplyIndeterminate = false
      } else {
        self.replyChoosen = []
        this.ReplyIndeterminate = false
      }
    },
    handleCheckedChange (value) {
      let self = this
      // var arr1 = []
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
        self.ReplycheckAll = checkedCount === self.reply.length
        self.ReplyIndeterminate = checkedCount > 0 && checkedCount < self.reply.length
      }
      self.commentData = self.handleFilterData()
    },
    handleFilterData (replyArr) {
      let self = this
      var arr = []
      var filterObj = {
        pos_neg: self.typeChoosen,
        condition: self.conditionChoosen,
        reply: self.replyChoosen
      }
      console.log(filterObj)
      const filterKeys = Object.keys(filterObj)
      console.log(filterKeys)
      return self.selectedArr.filter((item) => {
        console.log(item)
        return filterKeys.every((key) => {
          console.log(filterKeys[key])
          console.log(key)
          if(!filterObj[key].length){ return true }
          console.log(item.labels[key])
          console.log(filterObj[key])
          console.log(!!~filterObj[key].indexOf(item.labels[key]))
          return !!~filterObj[key].indexOf(item.labels[key])
          })
      })
    },
    // resourceFn (data) {
    //   let self = this
    //   self.commentData = data
    //   for (var i = 0; i < self.commentData.length; i++) {
    //     for (var j = 0; j <= 5; j++) {
    //       if (self.commentData[i].resource[0].url === self.resourceName[j].url) {
    //         self.commentData[i].resource[1].resourceName = self.resourceName[j].value
    //       }
    //     }
    //   }
    //   return self.commentData
    // },
    fieldFn (rowObj) {
      // 整個陣列
      if(rowObj.labels.pos_neg === 0){
        return '正評'
      }else{
        return '負評'
      }
    },
    fieldFn1 (rowObj) {
      if(rowObj.response_body === '' || rowObj.response_body === null){
        return '否'
      }else{
        return '是'
      }
    },
    fieldFn2(rowObj){
      if(rowObj.labels.condition === 0){
        return '未處理'
      }else if(rowObj.labels.condition === 1){
        return '處理中'
      }else{
        return '已完成'
      }
    },
    timeFilter: function (arr, startData, endData) {
      let self = this
      arr = arr.filter((item) => {
        return (Date.parse(Object.values(item.times)[1]) >= Date.parse(startData._d)) && (Date.parse(Object.values(item.times)[1]) <= Date.parse(endData._d))
      })
      console.log(arr)
      self.commentData = arr
      return self.commentData
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
      $('#reportrange span').html(start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD'))
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
      // self.oneTag = tag
      // console.log(self.oneTag)
      if (tag === 'all') {
        self.checkedtags = []
        $("input[name='label_checked_col[]']").prop('checked', false)
        $("input[name='label_all']").prop('checked', false)
        self.checkedtagsALL = false
        self.commentData = self.selectedArr
        return self.commentData
      } else {
        arrq = self.selectedArr.filter((item, index, array) => {
          // if(item.labels[key] === tag){
          // }
          // Object.keys(item.labels).every((key) => {
            // return indexOf()
            // console.log(key)
            // if(key === tag){
              // return indexOf()
            // }
            console.log(Object.keys(item.labels))
            console.log(item.labels[tag].indexOf(1))
          // })
          // console.log(item.labels)
          // item.labels.every(() => {
            // return indexOf(item.labels[tag] === 1)
          // })
          // item.labels.filter((element, index, array) => {
          //   console.log(element)
          //   if (element === tag) {
          //     console.log(element)
          //     arrq.push(item)
          //   }
          // })
        })
        console.log(arrq)
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
