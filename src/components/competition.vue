<template>
  <div>
      <div class="contentCenter">
        <div class="page">
          <span>競爭對手列表</span>
        </div>
      </div>
      <div class="dataArea">
        <div class="phone">
        <template >
          <span>
            <vue-good-table ref="competitionTable" class="el-table" styleClass="vgt-table striped" :rows="companyData"  :columns="columns"
                      @on-selected-rows-change="selectionChanged" :search-options="{ enabled: true }" >
              <template slot="table-row" slot-scope="props">
                <template v-if="props.column.field === 'favorite'">
                  <template>
                    <span v-if="props.row.favorite === true">
                      <!--  :value="[props.row.companyID]" -->
                      <input type="checkbox" class="checkbox" :value="props.row.hotelName" v-model="favoriteList" @change="favoriteFn">
                      <span class="btn-box">
                        <span class="btn1"></span>
                      </span>
                    </span>
                    <span v-else-if="props.row.favorite === false">
                      <!--  :name="[props.row.companyID]" :value="[props.row.companyID]"  -->
                      <input type="checkbox" class="checkbox" :name="props.row.hotelName" :value="props.row.hotelName" v-model="favoriteList" @change="favoriteFn($event)">
                      <span class="btn-box">
                        <span class="btn"></span>
                      </span>
                    </span>
                  </template>
                </template>
            <!-- <template v-if="props.column.type === input"> -->
              <!-- <el-button>QQ</el-button> -->
            <!-- </template> -->
            <!-- <template v-if="props.column.field === 'favorite'">
              <template>
                <span v-if="props.row.favorite===true">
                  <input type="checkbox" :value="[props.row.companyID]" class="checkbox" v-model="favoriteList" @change="favoriteFn">
                  <span class="btn-box">
                    <span class="btn1"></span>
                  </span>
                </span>
                <span v-else-if="props.row.favorite===false">
                  <input type="checkbox" :name="[props.row.companyID]" :value="[props.row.companyID]" class="checkbox" v-model="favoriteList" @change="favoriteFn($event)">
                  <span class="btn-box">
                    <span class="btn"></span>
                  </span>
                </span>
              </template>
            </template> -->
                <!-- <template v-else-if="props.column.field === 'goComment'" class="goCommentDiv">
                  <el-button class="goCommentBtn"><router-link :to="{ name: 'competitionCommentList', params: { collections: props.row.hotelName}}">→評論列表</router-link></el-button>
                </template> -->
                <!--  class="goCommentDiv" -->
                <template v-else-if="props.column.field === 'hotelName'">
                  <!-- <el-button class="goCommentBtn"> -->
                  <router-link :to="{ name: 'competitionCommentList', params: { collections: props.row.hotelName}}">{{props.row.hotelName}}</router-link>
                </template>
              </template>
            </vue-good-table>
          </span>
        <!-- </template> -->
        <!-- :select-options="{enabled: true ,selectOnCheckboxOnly: true, disableSelectInfo: true}" -->
        <!-- <template > -->
        </template>
        </div>
      </div>
          <!-- <div class="clear"></div>
          <div v-for="item in companyData" :key="item._id" class="competitionList">
            <div>
              <label :for="[item.companyID]">
                <template>
                  <span v-if="item.favorite===true">
                    <input type="checkbox" :value="[item.companyID]" class="checkbox" v-model="favoriteList" @change="favoriteFn">
                    <span class="btn-box">
                      <span class="btn1"></span>
                    </span>
                  </span>
                  <span v-else-if="item.favorite===false">
                    <input type="checkbox" :name="[item.companyID]" :value="[item.companyID]" class="checkbox" v-model="favoriteList" @change="favoriteFn($event)">
                    <span class="btn-box">
                      <span class="btn"></span>
                    </span>
                  </span>
                </template>
                <span>{{item.area}}</span>
                <span><router-link :to="{ name: 'competitionCommentList', params: { companyID: item.companyID }}">{{item.company}}</router-link></span>
                <span>{{item.rating}}</span>
              </label>
            </div>
          </div> -->
      <!-- <div class="labelchoose" id="LabelArea">
          <button class="favButton"  @click="favoriteFilter">已釘選</button>
           @change="ALLFilterFunction"
          <el-select  class="formInputCss" placeholder="地區" v-model="areaChoosen">
            <el-option v-for="item in areas" :key="item" :value="item"></el-option>
          </el-select>
      </div> -->
      <!-- <div class="favDiv" v-for="item in favoriteData" :key="item.companyID">
          <div>
            <label :for="[item.companyID]">
              <input type="checkbox" :value="[item.companyID]" class="checkbox" v-model="favoriteList" @change="favoriteFn">
              <span class="btn-box">
                <span class="btn"></span>
              </span>
              <span>{{item.area}}</span>
              <span><router-link :to="{ name: 'competitionCommentList', params: { collection: item.hotelName }}">{{item.hotelName}}</router-link></span>
              <span>{{item.rating}}</span>
            </label>
          </div>
      </div> -->
  </div>
</template>

<script>
import axios from '../../node_modules/axios'
import $ from '../../node_modules/jquery'
export default {
  name: 'competition',
  data () {
    return {
      columns: [
        {
          label: '收藏',
          field: 'favorite'
        },
        {
          label: '公司名稱',
          field: 'hotelName'
        },
        {
          label: '分數',
          field: 'avg_rating'
        },
        // {
        //   label: '排名',
        //   field: 'ranking'
        // },
        // {
        //   label: '連結',
        //   field: 'goComment',
        //   thClass: 'custom-th-class',
        //   tdClass: 'custom-td-class'
        // }
      ],
      companyName: this.$route.params.companyName,
      loginData: [],
      account: [],
      // company:['EasternPlazaHotelTaipei', 'GaiaHotelTaipei', 'GrandHyattTaipei', 'GrandHotelTaipei', 'OkuraPrestigeTaipei', 'PalaisDeChineHotel', 'RegentTaipei', 'RoyalNikkoTaipei', 'SheratonGrandTaipei', 'W_Taipei'],
      companyData: [],
      selectedArr: [],
      areas: '',
      areaChoosen: '',
      favoriteList: [],
      favoriteData: [],
      favoriteOpen: false,
      count: 0,
    }
  },
  mounted () {
    let self = this
    var logining = localStorage.getItem('token')
    self.loginData = JSON.parse(logining)
    if(!self.companyName){
      self.companyName = self.loginData.companyName
    }
    axios.get('/api/account/'+ self.loginData.id).then(response => {
      self.account = response.data
      console.log(self.account)
    }).catch((error) => {
      console.log(error)
    })
    axios.get('/api/competition/' + self.companyName).then(response => {
      self.companyData = response.data
      self.selectedArr = self.companyData.data.filter((item) => {
        return item.hotelName !== self.companyName
      })
      self.companyData = self.selectedArr
      self.rating()
      self.favorite()
      self.favoriteList = self.account.favorite
    })
    // $(document).ready(function(){
    //   // var self = this
    //     $(window).resize(function() {
    //       var t = $(window).width()
    //         if(t < 768){
    //           self.isshow = false
    //         }else{
    //           self.isshow = true
    //         }
    //     });
    // });
  },
  computed: {

    // ALLFilterFunction () {
    //   var self = this
    //   if (self.count === 0) {
    //     self.count++
    //   } else {
    //     let arr = []
    //     arr = this.areaFilter(self.selectedArr, self.areaChoosen)
    //     self.companyData = arr
    //   }
    //   return self.companyData
    // }
  },
  methods: {
    favorite: function(){
      let self = this
      self.companyData.forEach((item) => {
        item["favorite"] = false
      })
      self.companyData.forEach((item) => {
        self.account.favorite.filter((child) => {
          if(item.hotelName === child){
            item["favorite"] = true
          }
        })
      })
      self.companyData.sort(function(item) {
        return item.favorite ? -1 : 1
      })
    },
    favoriteFn: function($event){
      let self = this
      self.companyData.forEach((item) =>{
        if(item.hotelName === $event.target.value){
          item["favorite"] = $event.target.checked
          self.account.favorite = self.favoriteList
          axios.put('/api/account/' + self.loginData.id, self.account).then((response) => {
          }).catch((err) => {
            console.log(err)
          })
        }
      })
      self.companyData.sort(function(item) {
        return item.favorite ? -1 : 1
      })
    },
    rating: function () {
      let self = this
      self.companyData.sort(function (a, b) {
        return b.avg_rating - a.avg_rating
      })
    },
    selectionChanged(params){}

    // goComment(params){
    //   let goComment = params.row
    //   this.$router.push(({ name: 'competitionCommentList', params: { collections: goComment.hotelName}}))
    // },
    // favoriteDataFilter: function () {
    //   let self = this
    //   self.favoriteList = []
    //   self.favoriteData = self.companyData.filter((item) => {
    //     return item.favorite === true
    //   })
    //   self.companyData.filter((item) => {
    //     if (item.favorite === true) {
    //       self.favoriteList.push(item.companyID)
    //     }
    //   })
    // },

    // favoriteFilter: function () {
    //   let self = this
    //   if (self.favoriteOpen === false) {
    //     $('.favDiv').css('display', 'block')
    //     self.favoriteOpen = true
    //   } else {
    //     $('.favDiv').css('display', 'none')
    //     self.favoriteOpen = false
    //   }
    // }
  }
}
</script>
<style scoped src= '../assets/css/competition.css'></style>
