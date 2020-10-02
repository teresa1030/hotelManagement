<template>
  <div>
      <div class="contentCenter">
        <div class="page">
          <span>帳號詳細內容</span>
        </div>
      </div>
<!-- route {{"route.params:"+this.$route.params.userID}} -->
<!-- userID {{"userID:"+userID}} -->
<!-- <ul>
  <li>{{userAccountDetail._id}}</li>
  <li>{{userAccountDetail.id}}</li>
  <li>{{userAccountDetail.userName}}</li>
  <li>{{userAccountDetail.employeeNumber}}</li>
  <li>{{userAccountDetail.department}}</li>
  <li>{{userAccountDetail.employeeLimit}}</li>
</ul>
 <button class="" type="submit" method="post" v-on:click="updateAccount()" >更新</button> -->

    <div class="detail">
      <div class="leftContent">
        <a href="#"><img src="https://fakeimg.pl/125x125/" alt=""></a>
      </div>
      <div class="rightContent">
        <h2>個人資料</h2>
        <!-- <input type="button" id="personal" v-on:click="editPersonal()" value="編輯"> -->
        <button id="personal" v-on:click="editPersonal()" >編輯</button>
        <div class="clear"></div>
        <div class="personalDetail">
          <ul>
            <li>所屬單位&nbsp;:&nbsp;<input type="text" readonly="readonly" v-model="userAccountDetail.department" id="department" ></li>
            <li>姓名&nbsp;:&nbsp;<input type="text" readonly="readonly" v-model="userAccountDetail.userName" id="userName"></li>
            <li>員工編號&nbsp;:&nbsp;<input type="text" readonly="readonly" v-model="userAccountDetail.employeeNumber" id="employeeNumber"></li>
          </ul>
        </div>
        <h2>聯絡資訊</h2>
        <button v-on:click="editContactInfo()" id="contact">編輯</button>
        <div class="clear"></div>
        <div class="contactInfo">
          <ul>
            <li>手機&nbsp;:&nbsp;<input type="text" readonly="readonly" id="phone"></li>
            <li>信箱&nbsp;:&nbsp;<input type="text" readonly="readonly" v-model="userAccountDetail.email" id="email"></li>
          </ul>
        </div>
        <h2>隱私權</h2>
        <div class="clear"></div>
        <div class="private">
          <ul>
            <li>權限&nbsp;:&nbsp;<input type="text" readonly="readonly" :value="userAccountDetail.employeeLimit"></li>
            <li>密碼&nbsp;:&nbsp;<input type="password" readonly="readonly" :value="userAccountDetail.password"></li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default { 
  name: 'accountDetial',
  data () {
    return {
      userAccountDetail:{},
      userID:this.$route.params.userID,
      editPersonalBtn:false,
      editContactInfoBtn:false    
    }
  },
  mounted(){
    let self = this 
    axios.get('/api/account/'+self.userID)
    .then((response) => {
      console.log(response.data); 
      self.userAccountDetail = response.data;

      console.log(self.userAccountDetail);
      // self.id=response.data.id;
      // self.name=response.data.name;
    })
    .catch((error) => {
      console.log(error);
    })
  },
  methods:{
    updateAccount:function(){
      let updateUser = this.userAccountDetail;
      let id = this.userID;
      axios.put('/api/account/'+id,updateUser) 
      .then((response) => {
        //this.userAccountDetail=updateUser;
        //寫在mounted的如果數據改會自動更著改且不會重新整理
         console.log(response)        
     }).catch((error) => {
          console.log(error);
    });  
    },
    editPersonal:function(){
      if(this.editPersonalBtn){
         console.log("true 編輯");
         this.updateAccount();
        console.log(this.userAccountDetail);
        document.getElementById("personal").innerHTML="編輯";
        document.getElementById("department").setAttribute("readOnly",true);
        document.getElementById("department").style.cssText="border:none;";
        document.getElementById("userName").setAttribute("readOnly",true);
        document.getElementById("userName").style.cssText="border:none;";
        document.getElementById("employeeNumber").setAttribute("readOnly",true); 
        document.getElementById("employeeNumber").style.cssText="border:none;"; 
        
        this.editPersonalBtn=false;      
      }else{
        console.log("false 儲存");
        document.getElementById("personal").innerHTML="儲存";
        document.getElementById("department").removeAttribute("readOnly");
        document.getElementById("department").style.cssText="border:1px solid;";
        document.getElementById("userName").removeAttribute("readOnly");
        document.getElementById("userName").style.cssText="border:1px solid;";
        document.getElementById("employeeNumber").removeAttribute("readOnly");
        document.getElementById("employeeNumber").style.cssText="border:1px solid;";
        console.log(this.userAccountDetail);
        this.editPersonalBtn=true;
      }       
    },
    editContactInfo:function(){
      if(this.editContactInfoBtn){
         console.log("true 編輯");
         this.updateAccount();
        document.getElementById("contact").innerHTML="編輯";
        document.getElementById("phone").setAttribute("readOnly",true);
        document.getElementById("phone").style.cssText="border:none;";
        document.getElementById("email").setAttribute("readOnly",true);
        document.getElementById("email").style.cssText="border:none;";
        this.updateAccount();
      
        this.editContactInfoBtn=false;      
      }else{
        console.log("false 儲存");
        document.getElementById("contact").innerHTML="儲存";
        document.getElementById("phone").removeAttribute("readOnly");
        document.getElementById("phone").style.cssText="border:1px solid;";
        document.getElementById("email").removeAttribute("readOnly");
        document.getElementById("email").style.cssText="border:1px solid;";
        this.editContactInfoBtn=true;
      }       
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
    background-color: #F7F7F7;
    padding-top: 40px;
    height: 100vh;
    padding-left: 7%;
    /* position: relative;  */
}
.breadcrumb{
    margin-top: 10px;
}
.breadcrumb a{  
    float: left;
    font-size: 16px;
    color: black;
}
.breadcrumb-item::after{
    content: "\00a0 >\00a0 ";
    color: black;
}
.page{
    font-size: 25px;
    font-weight: bold;
    margin-top: 30px;  
    margin-right: 20%;
}
.detail{
  width: 75%;
  margin-left: 8%;
  margin-top: 30px;
  background-color: #E9E9E982;
  padding-bottom: 50px;
}
.detail h2{
  font-size: 22px;
  line-height: 33px;
  font-weight: bold;
  float: left;
}
.detail button{
  float: right;
  margin-top: 10px;
}
.leftContent{
  float: left;
  margin-left: 50px;
  margin-top: 40px;
}
.rightContent{
  margin-top: 20px;
  margin-left: 70px;
  float: left;
  width: 70%;
}
.rightContent li {
  font-size: 18px;
  margin-left: 40px;
  line-height: 25px;
  font-weight: 600;
  margin-bottom: 10px;
}
.personalDetail{
  width: 100%;
  background-color: #FFFFFF;
  margin-top: 15px;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.contactInfo{
  width: 100%;
  background-color: #FFFFFF;
  margin-top: 15px;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 20px;
}
.private{
  width: 100%;
  background-color: #FFFFFF;
  margin-top: 15px;
  padding-top: 20px;
  padding-bottom: 10px;
}
.rightContent input{
  border: none;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  font-family: 微軟正黑體;
  outline: none;
}
@media (max-width: 425px) {
  .contentCenter{
    /* background: blue; */
    width: 100%;
    margin-top: 30px;
  }
  .detail{
    width: 100%;
    margin: 0;
    padding: 0;
    background-color: #F7F7F7;
    margin-bottom: 50px;
  }
  .leftContent{
    width: 100%;
    margin: 25px auto;
    text-align:center;
  }
  .rightContent{
    background-color: #F7F7F7;
    width: 90%;
    margin:auto;
    float: none;
  }
  .rightContent h2{
    /* background: red; */
    margin: 10px 0;
  
  }
  .rightContent li{
    /* background: #000; */
    margin: 10 15px;
  }
  .personalDetail{
    background: #FFFFFF;
    margin: 0;
  }
  .contactInfo{
    background: #FFFFFF;
    margin: 0;
  }
  .private{
    background: #FFFFFF;
    margin: 0;
  }
  .rightContent input{
    margin: 3px 0;
    padding: 3px 5px;
    font-weight:normal;
    
  }
}
</style>
