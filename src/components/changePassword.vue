<template>
    <div>
        <div class="page">
            <img class="photo" src="https://fakeimg.pl/100x100/" alt="">
            <div class="clear"></div>
            <h1>登入成功!!請修改密碼!!</h1>
            <form v-on:submit.prevent="confirm">   
                <label>新密碼&nbsp;:&nbsp;</label>
                <input type="password" v-model="password" required>
                <div class="clear"></div>
                <label>再次輸入&nbsp;:&nbsp;</label>
                <input type="password" v-model="password2" required>
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
        password: '',
        password2: '',
        accountInfo:[],
        logingAccount:{},
        userID:""
      }
    },
    mounted(){
        let self = this
        axios.get('https://hotelapi.im.nuk.edu.tw/api/account')
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
                        this.logingAccount.firstLogin = false;
                        this.updateAccount();
                        
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
            axios.put('https://hotelapi.im.nuk.edu.tw/api/account/'+id,updateUser) 
            .then((response) => {
                //this.userAccountDetail=updateUser;
                //寫在mounted的如果數據改會自動更著改且不會重新整理
                console.log(response)    
                this.$fire({
                    title: "Successful !!",
                    text: "成功修改密碼",
                    type: "success",
                }).then(r => {
                    document.getElementById('menu').style.visibility="visible";
                    document.getElementById('breadcrumb').style.visibility="visible";
                    this.$router.push({ name: 'commentList', params: { collections: this.logingAccount.companyName} });
                });
                            
            }).catch((error) => {
                console.log(error);
            });  
        },
    }
}
</script>



<style scoped>

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