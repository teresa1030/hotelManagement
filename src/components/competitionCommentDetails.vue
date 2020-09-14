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
  </div>
</template>

<script>
import axios from '../../node_modules/axios'
import $ from '../../node_modules/jquery'
export default {
  name: 'competitionCommentDetails',
  data () {
    return {
      // companyID: this.$route.params.companyID,
      commentDetailsID: this.$route.params._id,
      commentData: [],
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
      ]
    }
  },
  mounted () {
    let self = this
    console.log(self.commentDetailsID)
    axios.get('/api/comment/' + self.commentDetailsID).then(response => {
      self.commentData = response.data
      for (var i in self.resourceName) {
        if (self.commentData.resource[0].url === self.resourceName[i].url) {
          self.commentData.resource[1].resourceName = self.resourceName[i].value
        }
      }
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
  }
}
</script>
<style scoped src= '../assets/css/commentDetails.css'></style>
