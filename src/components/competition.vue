<template>
  <div>
      <div class="contentCenter">
        <div class="page">
          <span>競爭對手列表</span>
        </div>
      </div>
      <div class="dataArea">
        <!-- :select-options="{enabled: true ,selectOnCheckboxOnly: true, disableSelectInfo: true}" -->
        <vue-good-table ref="competitionTable" class="el-table" styleClass="vgt-table striped" :rows="companyData"  :columns="columns"
                      @on-selected-rows-change="selectionChanged" :search-options="{ enabled: true }" >
          <template slot="table-row" slot-scope="props">
            <!-- <template v-if="props.column.type === input"> -->
              <!-- <el-button>QQ</el-button> -->
            <!-- </template> -->
            <template v-if="props.column.field === 'favorite'">
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
            </template>
            <template v-else-if="props.column.field === 'goComment'" class="goCommentDiv">
              <el-button class="goCommentBtn"><router-link :to="{ name: 'competitionCommentList', params: { companyID: props.row.companyID }}">→評論列表</router-link></el-button>
            </template>

          </template>
        </vue-good-table>
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
      <div class="labelchoose" id="LabelArea">
          <button class="favButton"  @click="favoriteFilter">已釘選</button>
          <el-select  class="formInputCss" placeholder="地區" v-model="areaChoosen" @change="ALLFilterFunction">
            <el-option v-for="item in areas" :key="item" :value="item"></el-option>
          </el-select>
      </div>
      <div class="favDiv" v-for="item in favoriteData" :key="item.companyID">
          <div>
            <label :for="[item.companyID]">
              <input type="checkbox" :value="[item.companyID]" class="checkbox" v-model="favoriteList" @change="favoriteFn">
              <span class="btn-box">
                <span class="btn"></span>
              </span>
              <span>{{item.area}}</span>
              <span><router-link :to="{ name: 'competitionCommentList', params: { companyID: item.companyID }}">{{item.company}}</router-link></span>
              <span>{{item.rating}}</span>
            </label>
          </div>
      </div>
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
          field: 'company'
        },
        {
          label: '區域',
          field: 'area'
        },
        {
          label: '分數',
          field: 'rating'
        },
        {
          label: '排名',
          field: 'ranking'
        },
        {
          label: '連結',
          field: 'goComment',
          thClass: 'custom-th-class',
          tdClass: 'custom-td-class'
        }
      ],
      companyID: this.$route.params.companyID,
      companyData: [],
      selectedArr: [],
      areas: '',
      areaChoosen: '',
      favoriteList: [],
      favoriteData: [],
      favoriteOpen: false,
      count: 0
    }
  },
  mounted () {
    let self = this
    axios.get('/api/competition/' + self.companyID).then(response => {
      self.companyData = response.data
      self.selectedArr = response.data
      self.rating()
      self.splitString()
      self.favoriteDataFilter()
    }).catch((error) => {
      console.log(error)
    })
  },
  computed: {
    ALLFilterFunction () {
      var self = this
      if (self.count === 0) {
        self.count++
      } else {
        let arr = []
        arr = this.areaFilter(self.selectedArr, self.areaChoosen)
        self.companyData = arr
      }
      return self.companyData
    }
  },
  methods: {
    rating: function () {
      let self = this
      self.companyData.sort(function (a, b) {
        return a.rating - b.rating
      })
    },
    splitString: function () {
      let self = this
      var y = new Set()
      var repeat = new Set()
      self.areas = new Set()
      self.companyData.forEach(item => {
        let x = item.area.split('台灣', 2)
        item.area = x[1]
        y.add(x[1])
      })
      self.areas.add('請選擇')
      y.forEach((item) => {
        y.has(item) ? self.areas.add(item) : repeat.add(item)
      })
    },
    favoriteDataFilter: function () {
      let self = this
      self.favoriteList = []
      self.favoriteData = self.companyData.filter((item) => {
        return item.favorite === true
      })
      self.companyData.filter((item) => {
        if (item.favorite === true) {
          self.favoriteList.push(item.companyID)
        }
      })
    },
    areaFilter: function (arr, area) {
      if (area === '請選擇' || area === '') {
        return arr
      } else {
        let arr1 = arr.filter((item) => {
          return item.area === area
        })
        return arr1
      }
    },
    favoriteFn: function ($event) {
      let self = this
      self.companyData.forEach((item) => {
        self.favoriteList.filter((item) => {
          if ($event.target.checked === true && item === $event.target.value) {
            $event.target.checked = false
          }
        })
        if (item.companyID === $event.target.value) {
          item.favorite = $event.target.checked
          axios.put('/competition/' + item.companyID, item).then((response) => {
          }).catch((err) => {
            console.log(err)
          })
        }
        self.favoriteDataFilter()
      })
    },
    favoriteFilter: function () {
      let self = this
      if (self.favoriteOpen === false) {
        $('.favDiv').css('display', 'block')
        self.favoriteOpen = true
      } else {
        $('.favDiv').css('display', 'none')
        self.favoriteOpen = false
      }
    }
  }
}
</script>
<style scoped src= '../assets/css/competition.css'></style>
