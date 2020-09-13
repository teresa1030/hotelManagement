<template>
    <div class="content">
        <div class="page">
            <img class="photo" src="https://fakeimg.pl/100x100/" alt="">
            <div class="clear"></div>
            <h1>登入成功!!請修改密碼!!</h1>
            <form v-on:submit.prevent="confirm">   
                <label>新密碼&nbsp;:&nbsp;</label>
                <input type="password" v-model="passWord" required>
                <div class="clear"></div>
                <label>再次輸入&nbsp;:&nbsp;</label>
                <input type="password" v-model="passWord2" required>
                <div class="clear"></div>
                <button type="submit">確&nbsp;認</button>
            </form>
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'changePassword',
    data () {
    return {
        passWord: '',
        passWord2: '',
        accountInfo:[],
        logingAccount:{},
        userID:""
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
        confirm:function(){
            var logining = localStorage.getItem('token');
            var loginData = JSON.parse(logining);
            this.userID = loginData.id;
            let i;
            if(this.password==this.password2){
                for(i=0; i<this.accountInfo.length;i++){
                    if( this.userID==this.accountInfo[i]._id ){
                        this.logingAccount = this.accountInfo[i];
                        this.logingAccount.password = this.password;
                        this.updateAccount();
                        this.$router.push('/accountList');
                        break;
                    }
                }
            }else{
                // alert("密碼不相符，請重新輸入");
                this.$fire({
                        title: "Error !!",
                        text: "密碼不相符，請重新輸入",
                        type: "error",
                        // timer: 3000
                    });
                this.logingAccount.password = '';
                this.logingAccount.password2 = '';
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
    }
}
</script>



<style scoped>
.content{
    background-color: #E9E5E5;
    height: 100vh;
    padding-top: 60px;
}
.page{
    margin: auto;
    background-color: #FFFFFF;
    width: 440px;
    height: 520px;
    border: 0.5px solid #707070 ;
    border-radius:10px;
}
.page img{
    float: left;
    margin: 40px 0 40px 168px;
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
</style>