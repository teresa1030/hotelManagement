<template>
    <div>
        <button @click="changePage(0)">評論動態</button>
        <button @click="changePage(1)">個人動態</button>
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
            // historyData:[],
            commentFilter: [],
            personFilter: [],
            // page === 0 顯示評論動態，page === 1顯示個人動態
            page: 0
        }
    },
    mounted(){
        let self = this
        var value = 0
        axios.get('/api/history/' + value).then((response) => {
          self.commentFilter = response.data
        }).catch((error) => {
          console.log(error)
        })
    },
    methods:{
      changePage: function(value){
        axios.get('/api/history/' + value).then((response) => {
          if(value === '0'){
            self.commentFilter = response.data
          }else{
            self.personFilter = response.data
          }
        }).catch((error) => {
          console.log(error)
        })
      },
      record:function(){
        let record = 'logout';
        axios.put('/api/history/'+record,this.logout)
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