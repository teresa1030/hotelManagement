<template>
    <div>
        <button @click="changePage(0)">評論動態</button>
        <button @click="changePage(1)">個人動態</button>
        <button @click="record()">態</button>
        <div>
            <template>
                <span v-if="page === 0">
                    <p>555</p>
                </span>
                <span v-else-if="page === 1">
                    <p>666</p>
                </span>
            </template>
        </div>
    </div>
    
</template>
<script>
import axios from 'axios';
import dateTime from '../assets/js/dateTime';

export default {
    name: 'history',
    data(){
        return{
            // msg: 'hello',
            historyData:[],
            commentFilter: [],
            personFilter: [],
            logout: {
             "employeeNumber": "info01",
            "logoutTime":"2020/10/11"
            },
            // page === 0 顯示評論動態，page === 1顯示個人動態
            page: 0
        }
    },
    mounted(){
        let self = this
        var value = 0
        //  + value
        var logining = localStorage.getItem('token')
        axios.get('https://hotelapi.im.nuk.edu.tw/api/history/' + JSON.parse(logining).companyName).then((response) => {
          self.historyData = response.data
          console.log(self.historyData)
        }).catch((error) => {
          console.log(error)
        })
    },
    methods:{
      changePage: function(value){
        let self = this
        // self.commentFilter = self.historyData.dataset.data.filter((item) => {
        //   var x = Object.keys(item)
        //   return x[0] === 'user'
        // })          
        // console.log(self.commentFilter)
      },
      record:function(){
        let record = 'logout';
        
        var logining = localStorage.getItem('token')
        axios.put('https://hotelapi.im.nuk.edu.tw/api/history/'+ JSON.parse(logining).companyName + '/' + record, this.logout)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        })
      },
      DateTime:function(){
        var date,Time;
        date=dateTime.recordDate();
        console.log(date);
        Time=dateTime.recordTime();
        console.log(Time);
      }
    }
}
</script>