<template>
  <div>
      <div class="contentCenter">
        <div class="page">
          <span>評論詳細內容</span>
        </div>
      </div>
      <div class="dataArea">
        <p class="CommentTtle">{{commentData.title}}</p>
        <div class="MainComment">
          <span class="subtitle">評分</span><span class="spaceRight">{{commentData.rating}}</span>
          <span class="subtitle">評論日期</span><span class="spaceRight">{{commentData.times.comment}}</span>
          <span class="subtitle">住客國家</span><span class="spaceRight">{{commentData.locale}}</span>
          <span class="subtitle">入住時間</span><span class="spaceRight">{{commentData.times.checkin}}</span>
          <span class="subtitle">房型</span><span class="spaceRight">{{commentData.room_type}}</span>
          <span class="subtitle">來源網站</span><span>{{commentData.website}}</span>
          <div class="Maincontent">
            <span class="commentContent">{{commentData.text}}</span>
          </div>
        </div>

        <div class="ReplyAddress">
          <div class="MultiFilterArea1">
            <div class="manageConditionDiv">
              <p class="filterP1">評論狀態</p>
              <template>
                <span v-if="commentData.labels.condition === 0">
                  <el-button class="none" @click="conditionUpdate(commentData.condition)">未處理</el-button>
                </span>
                <span v-if="commentData.labels.condition === 1">
                  <el-button class="ing" @click="conditionUpdate(commentData.condition)">處理中</el-button>
                </span>
                <span v-if="commentData.labels.condition === 2">
                  <el-button class="done" disabled="disabled">已完成</el-button>
                </span>
              </template>
              <div class="clear"></div>
            </div>
            <div class="manageReplyDiv">
              <p class="filterP1">回覆狀態</p>
              <template>
                <span v-if="commentData.labels.reply === 1">
                  <el-button class="reply" @click="replyUpdate(commentData.reply)">是</el-button>
                </span>
                <span v-else-if="commentData.labels.reply === 0">
                  <el-button class="reply" @click="replyUpdate(commentData.reply)">否</el-button>
                </span>
              </template>
              <div class="clear"></div>
            </div>
            <div class="manageTags">
              <p class="filterP1">標籤</p>
              <!-- <div class="labelchoose1" v-for="item in commentData.tags" :key="item._id"> -->
                <!-- <input type="text" name="label_tags" disabled="true" :value="item" class="tagInput"> -->
                  <!--  @click="deleteTags(item)" -->
                <!-- <label :for="[item]"></label> -->
              <!-- </div> -->
              <template>
                <div class="tags" v-for="item in label_tags" :key="item.field">
                  <el-button>{{item.label}}</el-button>
                </div>
              </template>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
            <div class="replyArea">
              <p>回覆內容</p>
              <template v-if="commentData.response_body === '' || commentData.labels.reply === 0">
                <p>尚未回覆</p>
              </template>
              <template v-else-if="commentData.response_body !== '' || commentData.labels.reply === 1">
                <p>{{commentData.response_body}}</p>
              </template>
            </div>
            <div class="clear"></div>
          </div>
          
          <div class="addressArea">
            <p>address再看要不要</p>

          </div>
        </div>
        <div class="clear"></div>
      </div>
  </div>
</template>

<script>
import axios from '../../node_modules/axios'
import $ from '../../node_modules/jquery'
export default {
  name: 'commentDetails',
  data () {
    return {
      companyName: '',
      commentDetailsID: this.$route.params._id,
      commentData: [],
      newComment: [],
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
      label_tags: []
      // addLabel: '',
      // editLabel: '',
      // currentPage: 1,
      // pagesize: 10
    }
  },
  mounted () {
    let self = this
    if(!self.companyName){
      var logining = localStorage.getItem('token')
      var loginData = JSON.parse(logining)
      self.companyName = loginData.companyName
    }
    axios.get('/api/commentDetails/' + self.companyName + '/' + self.commentDetailsID).then(response => {
      self.commentData = response.data
      self.newComment = response.data
      if(self.commentData.title === ''){
          self.commentData.title = self.commentData.text.substr(0,10) + '...'
        }
        self.label_tags = self.labelchoose.filter((item) => {
          if(self.commentData.labels[item.field] === 1){
            return item.label
          }
        })
    }).catch((error) => {
      console.log(error)
    })
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
      // self.updateComment()
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
      // self.updateComment()
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
