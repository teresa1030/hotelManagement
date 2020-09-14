<template>
    <div>
        <div class="page">
            <img class="photo" src="https://fakeimg.pl/100x100/" alt="">
            <div class="clear"></div>
            <h1>登入</h1>
        <!-- the submit event will no longer reload the page -->
            <form v-on:submit.prevent="login">   
                <label>帳號&nbsp;:&nbsp;</label>
                <input type="text" v-model="userName" required placeholder="請輸入員工號碼">
                <div class="clear"></div>
                <label>密碼&nbsp;:&nbsp;</label>
                <input type="password" v-model="passWord" required placeholder="請輸入密碼">
                <div class="clear"></div>
                <router-link :to="'../forgetPassword'" class="link">忘記密碼 ?</router-link>
                <button type="submit">確&nbsp;認</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'login',
    data () {
    return {
        userName: '',
        passWord: '',
        accountInfo:[],
        logingAccount:{}
      }
    },
    mounted(){
    let self = this
    axios.get('/api/account')
    .then((response) => {
      self.accountInfo = response.data; 
    })
    .catch((error) => {
      console.log(error);
    })  
  },
    methods:{
        login(){
            console.log("login");
            let i;
            for(i=0; i<this.accountInfo.length;i++){
                if( this.userName == this.accountInfo[i].employeeNumber && this.passWord == this.accountInfo[i].password ){               
                    this.logingAccount = this.accountInfo[i];
                    //var userID = this.accountInfo[i]._id;
                    var currentTime = new Date().getTime(); //取得從 1970-01-01 00:00:00 UTC 累計的毫秒數
                    this.recordLogingTime();               
                    localStorage.setItem('token', JSON.stringify({id:this.logingAccount._id,time:currentTime}));
                    this.updateAccount();
                    if(this.accountInfo[i].firstLogin){
                        this.$router.push({ name: 'changePassword'});
                        break;
                    }else{
                        this.$router.push({ name: 'commentList'});
                        break;
                    } //決定登入後要導到哪一頁
                } else if( i == this.accountInfo.length-1){    
                    // alert('使用者帳號密碼錯誤!請重新登入')
                    this.$fire({
                        title: "Error !!",
                        text: "使用者帳號密碼錯誤!請重新登入",
                        type: "error",
                        // timer: 3000
                    });
                }
            }           
        },
        updateAccount:function(){
            let updateUser = this.logingAccount;
            let id = this.logingAccount._id;
            axios.put('http://localhost:8080/api/account/'+id,updateUser) 
            .then((response) => {
                //this.userAccountDetail=updateUser;
                //寫在mounted的如果數據改會自動更著改且不會重新整理
                console.log(response)        
            }).catch((error) => {
                console.log(error);
            });  
        },
        recordLogingTime:function(){
            var today = new Date();
            var ampm = 'AM';
            var year = today.getFullYear();
            var month = today.getMonth()+1;
            var date = today.getDate();
            var minutes = today.getMinutes();
            var hour = today.getHours();
            if(month.toString().length == 1){
                month = '0'+month;
            }
            if(date.toString().length == 1){
                date = '0'+date;
            }
            if(hour.toString().length == 1){
                hour = '0'+hour;
            }else if(hour > 12){
                ampm = 'PM';
                hour -= 12;
                if(hour.toString().length == 1){
                    hour = '0'+hour;
                }
            }
            if(minutes.toString().length == 1){
                minutes = '0'+minutes;
            }

            this.logingAccount.lastLoginDate = year+'/'+month+'/'+date;
            this.logingAccount.lastLoginTime = ampm+' '+hour+':'+minutes;
        }

    }
}
</script>
<style scoped>
.personalInfo{
    display: none;
}
.page{
    width: 50%;
    height: 500px;
    border-radius:10px;
    margin-left: 20%;
}
.page img{
    float: left;
    margin: 40px 0 40px 43%;
}
.page h1{
    font-size: 28px;
    margin: auto;
    font-weight: bolder;
    text-align: center;
}
.page form{
    margin-top: 40px;
    text-align: center;
}
.page label{
    font-size: 20px;
    font-weight: bolder;
}
.page input{
    width: 200px;
    border: 1px solid #707070;
    border-radius: 3px;
    margin-bottom: 40px;
    padding: 5px;
    font-size: 15px;
    font-family: 微軟正黑體;
    outline:none;
}
.link{
    text-decoration:underline;
    margin-left: 33%;
    float: left;
    margin-top: 5px;
    color: #707070;
}
.page button{
    background-color: #49BE8B;
    border: 0.5px solid #707070;
    border-radius: 3px;
    width: 70px;
    color:#FFFFFF;
    font-size: 14px;
    padding: 5px;
    float: left;
    margin-left: 70px;
    font-family: 微軟正黑體;
    outline:none;
}
</style>