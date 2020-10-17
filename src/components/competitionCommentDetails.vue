<template>
  <div>
      <div class="contentCenter">
        <div class="page">
          <span>評論詳細內容</span>
        </div>
      </div>
      <div class="dataArea">
        <div class="MainComment">
          <p class="CommentTtle">{{commentData.title}}</p>
          <span class="subtitle">評分</span><span class="spaceRight">{{commentData.rating}}</span>
          <span class="subtitle">評論日期</span><span>{{commentData.times.comment}}</span>
          <div class="Maincontent">
            <span class="commentContent">{{commentData.text}}</span>
          </div>
          <p class="space"><span class="subtitle">住客國家</span><span>{{commentData.locale}}</span></p>
          <p class="space"><span class="subtitle">入住時間</span><span>{{commentData.times.checkin}}</span></p>
          <p class="space"><span class="subtitle">房型</span><span>{{commentData.room_type}}</span></p>
          <p class="space"><span class="subtitle">來源網站</span><span>{{commentData.website}}</span></p>
        </div>
        
        <div class="ReplyAddress">
          <div class="MultiFilterArea1">
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
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <!-- <div class="MultiFilterArea1"> -->
          <!-- <p class="filterP1">標籤：</p>
          <div class="labelchoose1" v-for="item in commentData.tags" :key="item._id">
            <input type="text" name="label_tags" disabled="true" :value="item" class="tagInput">
              <label :for="[item]"></label>
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
        <div class="clear"></div> -->
      </div>
  </div>
</template>

<script>
import axios from '../../node_modules/axios'
import $ from '../../node_modules/jquery'
export default {
  name: 'competitionCommentDetails',
  data () {
    return {
      companyName: this.$route.params.collections,
      commentDetailsID: this.$route.params._id,
      commentData: [],
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

      // resourceName: [
      //   {
      //     value: 'BOOKING.com',
      //     url: 'https://www.booking.com/'
      //   },
      //   {
      //     value: 'HOTELS',
      //     url: 'https://tw.hotels.com/'
      //   },
      //   {
      //     value: 'Agoda',
      //     url: 'https://www.agoda.com/'
      //   },
      //   {
      //     value: 'Expedia',
      //     url: 'https://www.expedia.com.tw/'
      //   },
      //   {
      //     value: 'trip.com',
      //     url: 'https://hk.trip.com/'
      //   },
      //   {
      //     value: 'TripAdvisor',
      //     url: 'https://www.tripadvisor.com.tw/'
      //   }
      // ]
    }
  },
  mounted () {
    let self = this
    // console.log(self.commentDetailsID)
    axios.get('https://hotelapi.im.nuk.edu.tw/api/commentDetails/' + self.companyName + '/' + self.commentDetailsID).then(response => {
      self.commentData = response.data
      console.log(self.commentData)
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
  }
}
</script>
<style scoped src= '../assets/css/commentDetails.css'></style>
