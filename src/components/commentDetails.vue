<template>
  <div>
      <div class="contentCenter">
        <div class="page">
          <span>評論詳細內容</span>
        </div>
      </div>
      <div class="dataArea">
        <!-- <p>{{commentData.title}}</p> -->
        <div class="MultiFilterArea1">
          <p class="filterP1">標籤：</p>
          <!--  id="LabelArea"  -->
          <div class="labelchoose1" v-for="item in commentData.tags" :key="item._id">
            <input type="text" name="label_tags" disabled="true" :value="item" class="tagInput">
              <!--  @click="deleteTags(item)" -->
              <label :for="[item]"></label>
          </div>
          <div class="manageTagDiv">
            <button @click="tagCustom"><img src="../assets/icon/add.png"></button>
          </div>
          <div class="manageConditionDiv">
            <p class="filterP1">評論狀態：</p>
            <template>
              <span v-if="commentData.condition === '未處理'">
                <el-button class="none" @click="conditionUpdate(commentData.condition)">{{commentData.condition}}</el-button>
              </span>
              <span v-if="commentData.condition === '處理中'">
                <el-button class="ing" @click="conditionUpdate(commentData.condition)">{{commentData.condition}}</el-button>
              </span>
              <span v-if="commentData.condition === '已完成'">
                <el-button class="done" disabled="disabled">{{commentData.condition}}</el-button>
              </span>
            </template>
          </div>
          <div class="manageReplyDiv">
            <p class="filterP1">回覆狀態：</p>
            <template>
              <span v-if="commentData.reply === true">
                <el-button class="reply" @click="replyUpdate(commentData.reply)">是</el-button>
              </span>
              <span v-else-if="commentData.reply === false">
                <el-button class="reply" @click="replyUpdate(commentData.reply)">否</el-button>
              </span>
            </template>
          </div>
          <p class="score"><span>評分：</span>{{commentData.score}}</p>
          <p class="info"><span>來源：</span>{{commentData.resource[1].resourceName}}</p>
          <p class="time">{{commentData.time}}</p>
          <div class="clear"></div>
          <div class="labelArea">
            <div class="labelchoose2">
              <input type="checkbox" name="label_all" v-model="checkedtagsALL" @change="checkedALLFilter(checkedtagsALL)" id="checkALL">
                <label for="checkALL">全選</label>
            </div>
            <div class="labelchoose2" v-for="item in labelchoose" :key="item._id">
              <input type="checkbox" name="label_checked_col[]" :id="[item.tag]" :value="item.tag" v-model="checkedtags" @change="checkedALLFilter(checkedtags)" >
                <label :for="[item.tag]">{{item.tag}}</label>
            </div>
            <div class="clear"></div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="dataMainArea">
          <p>{{commentData.content}}</p>
        </div>
        <div class="address">
            <p class="addressPeople">處理者：XXX</p>
            <p class="addresstime">處理時間：2020/08/08</p>
        </div>
        <div class="clear"></div>
      </div>
        <!-- <div class="filter-left" >
          <span class="chooseTitle">篩選標籤</span>
          (<button class="manageLabel" @click="editTags">管理標籤</button>)
          <div class="clear"></div>
          <div class="labelchoose" id="LabelArea" v-for="item in commentData.tags" :key="item._id">
            <input type="text" name="label_tags"  disabled="true" :value="item" class="tagInput">
              <label :for="[item]" @click="deleteTags(item)"><img src="../assets/icon/delete.png" class="deleteImg"></label>
          </div>
          <div class="manageDiv">
            <input type="text" placeholder="新增標籤" class="addLabelInput" v-model="addLabel">
            <el-button @click="submitAdd" class="addButton">確定</el-button>
            <el-button @click="submitCancled" class="addButton">取消</el-button>
          </div>
        </div> -->
  </div>
</template>

<script>
import axios from '../../node_modules/axios'
import $ from '../../node_modules/jquery'
export default {
  name: 'commentDetails',
  data () {
    return {
      companyID: 'A',
      commentDetailsID: this.$route.params._id,
      commentData: [],
      newComment: [],
      labelchoose: [],
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
      addLabel: '',
      editLabel: '',
      currentPage: 1,
      pagesize: 10
    }
  },
  mounted () {
    let self = this
    axios.get('/api/comment/' + self.commentDetailsID).then(response => {
      self.commentData = response.data
      self.newComment = response.data
      for (var i in self.resourceName) {
        if (self.commentData.resource[0].url === self.resourceName[i].url) {
          self.commentData.resource[1].resourceName = self.resourceName[i].value
        }
      }
    }).catch((error) => {
      console.log(error)
    })
    axios.get('/api/labelchoose').then(response => {
      self.labelchoose = response.data
    }).catch((error) => {
      console.log(error)
    })
    console.log(self.labelchoose)
  },
  methods: {
    // getTags: function () {
    //   let self = this
    // },
    submitAdd: function () {
      let self = this
      self.commentData.tags.push(self.addLabel)
      self.newComment = self.commentData
      self.updateComment()
    },
    conditionUpdate: function (data) {
      let self = this
      if (data === '未處理') {
        self.commentData.condition = '處理中'
      } else {
        self.commentData.condition = '已完成'
      }
      self.newComment = self.commentData
      self.updateComment()
    },
    replyUpdate: function (data) {
      let self = this
      if (data === true) {
        self.commentData.reply = false
        self.newComment.reply = false
      } else {
        self.commentData.reply = true
        self.newComment.reply = true
      }
      self.updateComment()
    },
    // editTags: function () {
    //   $('.deleteImg').css('display', 'block')
    //   $('.addLabelInput').css('display', 'block')
    //   $('.addButton').css('display', 'block')
    // },
    submitCancled: function () {
      $('.addLabelInput').css('display', 'none')
      $('.addButton').css('display', 'none')
    },
    // deleteTags: function (data) {
    //   let self = this
    //   let x = self.commentData.tags.filter((item) => {
    //     return item !== data
    //   })
    //   self.commentData.tags = x
    //   self.newComment = self.commentData
    //   self.updateComment()
    // },
    updateComment: function () {
      let self = this
      let updateData = self.newComment
      axios.put('/comment/' + self.commentDetailsID, updateData)
        .then((response) => {
        }).catch((err) => {
          console.log(err)
        })
    },
    handleSizeChange: function (size) {
      this.pagesize = size
      // console.log(this.pagesize)
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      // console.log(this.currentPage)
    },
    tagCustom: function () {
      event.stopPropagation()
      $('.labelchoose2').toggle('slow')
      $(document).click(function (event) {
        var area = $('.labelchoose2') // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
          // $('#divTop').slideUp('slow');  //滑動消失
          $('.labelchoose2').hide(1000) // 淡出消失
        }
      })
    }
  }
}
</script>
<style scoped src= '../assets/css/commentDetails.css'></style>
