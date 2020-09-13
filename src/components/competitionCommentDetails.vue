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
            <!-- , params: { companyID: companyID } -->
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
    axios.get('/comment/' + self.commentDetailsID).then(response => {
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
