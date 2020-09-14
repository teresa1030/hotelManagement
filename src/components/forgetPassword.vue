<template>
    <div>
        <div class="page">
            <img class="photo" src="https://fakeimg.pl/100x100/" alt="">
            <div class="clear"></div>
            <h1>忘記密碼</h1>
            <form v-on:submit.prevent="forget">   
                <label>帳號&nbsp;:&nbsp;</label>
                <input type="text" v-model="employeeNumber" required placeholder="請輸入帳號">
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
        employeeNumber:'',
        accountInfo:[],
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
        });
    },
    methods:{
        forget(){
            let i;
            for(i=0; i<this.accountInfo.length;i++){
                if(this.employeeNumber == this.accountInfo[i].employeeNumber){
                    let userID=this.accountInfo[i]._id;
                    console.log(this.accountInfo[i]._id);
                    this.$router.push({ name: 'verification', params:{userID} });
                    //this.$router.push(`/verification/${userID}`);
                    break;
                }else if( i == this.accountInfo.length-1){    
                    //this.$alert("使用者帳號錯誤!請重新輸入");
                    // alert('使用者帳號錯誤!請重新輸入')
                    this.$fire({
                        title: "Error !!",
                        text: "使用者帳號錯誤!請重新輸入",
                        type: "error",
                        // timer: 3000
                    });
                    this.employeeNumber='';

                }               
            }
        }
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
    float: left;
    margin-left: 45%;
    font-family: 微軟正黑體;
    outline:none;
}
</style>