<template>
    <div>
        <div class="page">
            <img class="photo" src="https://fakeimg.pl/100x100/" alt="">
            <div class="clear"></div>
            <h1>已寄送驗證碼到此信箱</h1>
            <div class="clear"></div>
            <div class="send" >
                <input type="text" readonly="true" v-model="userAccountDetail.email"> <button v-on:click="sendEmail()">重新寄送</button>
            </div>
            <div class="clear"></div>
            <form v-on:submit.prevent="confirm">   
                <label>請輸入驗證碼&nbsp;:&nbsp;</label>
                <div class="clear"></div>
                <input type="text" v-model="check" required placeholder="請輸入驗證碼">
                <div class="clear"></div>
                <button type="submit">確&nbsp;認</button>
            </form>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import emailjs from 'emailjs-com';
import dateTime from '../assets/js/dateTime';
export default {
    name: 'verification',
    data () {
    return {
        userID:this.$route.params.userID,
        userAccountDetail:{},
        certification:'',
        check:'',
        login:{
            employeeNumber: "",
            loginTime: ""
        }
      }
    },
    mounted(){
        let self = this;
        // this.certification = Math.round(Math.random()*1000000);    //取六位整數
        // console.log(self.certification);
        axios.get('https://hotelapi.im.nuk.edu.tw/api/account/'+self.userID)
        .then((response) => {
            self.userAccountDetail = response.data;
            console.log(self.userAccountDetail);
            this.sendEmail();
        })
        .catch((error) => {
            console.log(error);
        });
    },
    methods:{
        sendEmail:function(){
            this.certification = Math.round(Math.random()*1000000);    //取六位整數
            console.log(this.certification);
            console.log('sendEmail');
            var emailData = {
                user_name: this.userAccountDetail.userName,
                user_email: 'jingjing10301030@gmail.com',  //this.userAccountDetail.email
                message: this.certification
            };
            // emailjs.sendForm('gmail', 'template_ih27sAiz', emailData, 'user_claUepgayYZIqK8g01tnK')
            // .then((result) => {
            //     console.log('SUCCESS!', result.status, result.text);
            // }, (error) => {
            //     console.log('FAILED...', error);
            // });
            emailjs.send('gmail', 'template_ih27sAiz', emailData, 'user_claUepgayYZIqK8g01tnK')
            .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
            console.log('FAILED...', error);
            });
        },
        confirm(){
            if(this.check == this.certification){
                var currentTime = new Date().getTime(); //取得從 1970-01-01 00:00:00 UTC 累計的毫秒數
                this.recordLogingTime();               
                // localStorage.setItem('token', JSON.stringify({id:this.userID,time:currentTime}));
                localStorage.setItem('token', JSON.stringify({id: this.userAccountDetail._id,time: currentTime, companyName: this.userAccountDetail.companyName}));
                this.updateAccount();
                this.loginRecord();
                this.$router.push({ name: 'changePassword'});
                window.location.reload(); 
            }else{
                //alert('驗證碼錯誤!!請重新輸入或點選『重新寄送』按鈕');
                 this.$fire({
                        title: "Error !!",
                        text: "驗證碼錯誤!!請重新輸入或點選『重新寄送』按鈕",
                        type: "error",
                        // timer: 3000
                    });
                this.check='';
            }
        },
        updateAccount:function(){
            let updateUser = this.userAccountDetail;
            let id = this.userID;
            axios.put('https://hotelapi.im.nuk.edu.tw/api/account/'+id,updateUser) 
            .then((response) => {
                //this.userAccountDetail=updateUser;
                //寫在mounted的如果數據改會自動更著改且不會重新整理
                console.log(response)        
            }).catch((error) => {
                console.log(error);
            });  
        },
        loginRecord:function(){
            let record = 'login';
            let company = this.userAccountDetail.companyName;
            this.login.employeeNumber = this.userAccountDetail.employeeNumber;
            this.login.loginTime = this.userAccountDetail.lastLoginDate +' '+this.userAccountDetail.lastLoginTime;
            axios.put('https://hotelapi.im.nuk.edu.tw/api/history/'+company+'/'+record,this.login)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            })
        },
        recordLogingTime:function(){
            this.userAccountDetail.lastLoginDate = dateTime.recordDate();
            this.userAccountDetail.lastLoginTime = dateTime.recordTime();
        }
    }
}
</script>

<style scoped>
.personalInfo{
    visibility: hidden;
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
    float: left;
    margin-left: 30%;
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

.page button{
    background-color: #49BE8B;
    border: 0.5px solid #707070;
    border-radius: 3px;
    width: 70px;
    color:#FFFFFF;
    font-size: 14px;
    padding: 5px;
    float: right;
    margin-right: 83px;
    font-family: 微軟正黑體;
    outline:none;
}
.send{
    float: left;
    margin-top: 40px;
    margin-left: 30%;
}
.send input{
    border-right:none ;
}
.send button{
    border-left:none ;
    height: 32px;
}
form button{
    text-align: center;
}
form input{
    margin-top: 5px;
    
}
</style>

