<template>
  <div class="insideContent">
      <div class="contentCenter">
        <div class="page">
          <span>帳號列表</span>
        </div>
      </div>
    <div class="vueGoodTable" >
      <div class="addUser" id="addNewUser">
        <span class="addAccount" >新增帳號</span>
        <button class="closeAdd" v-on:click="close()" > X </button>
        <div class="clear"></div>
        <form v-on:submit.prevent="createAccount">       
        <div class="input">
          <input id="employeeNumber" type="text" v-model="newAccount.employeeNumber" required> <span>*員工編號&nbsp;:&nbsp;</span>  
          <!-- &nbsp; 不換行空格 -->
          <div class="clear"></div>
          <input id="email" type="email" v-model="newAccount.email" required><span>*信箱&nbsp;:&nbsp;</span>
          <div class="clear"></div>
          <input id="password" type="text" v-model="newAccount.password" required><span>*密碼&nbsp;: &nbsp;</span>
          <div class="clear"></div>
        </div>
        <div class="input">
          <select v-model="newAccount.department" class="addSelect">
            <option>資訊部</option>  
            <option>行銷部</option>
          </select>
          <span>所屬單位&nbsp;: &nbsp;</span>  
          <div class="clear"></div>
          <select v-model="newAccount.employeeLimit" class="addSelect">
            <option>後台管理者</option>
            <option>主管使用者</option>
            <option>一般使用者</option>
          </select>
          <span>員工權限&nbsp;: &nbsp;</span>
          <div class="clear"></div>
          <input id="userName" type="text" v-model="newAccount.userName" required><span>*姓名&nbsp;: &nbsp;</span>
          <div class="clear"></div>
        </div>       
        <div class="clear"></div>       
          <button class="functionButton" id="tableActionsBtn" type="submit">確認</button>
        </form>
        <button class="functionButton"  v-on:click="close()" >取消</button>
      
      
      </div>
      <vue-good-table class="el-table" styleClass="vgt-table striped" :columns="columns" :rows="accountList" 
        max-height="500px" :fixed-header="true" :search-options="{ enabled: true }" text-align="center"
        @on-selected-rows-change="selectionChanged" :select-options="{ enabled: true }" @on-cell-click="linkAccountDetial" >
        <div slot="table-actions">      
          <span>所屬單位</span>
          <select v-model="chooseDepartment" class="selectBox" v-on:click="selection()" >
            <option chooseDepartment>請選擇</option>
            <option>資訊部</option>  
            <option>行銷部</option>
          </select>
          <span>員工權限</span>
          <select v-model="chooseLimit" class="selectBox" v-on:click="selection()">
            <option chooseLimit>請選擇</option>
            <option>後台管理者</option>
            <option>主管使用者</option>
            <option>一般使用者</option>
          </select>
          <button class="functionButton"  v-on:click="deleteAccount()">刪除</button>
          <button class="functionButton"  v-on:click="open()" >新增</button>
        </div>
      </vue-good-table>
      <div class="clear"></div>
      <!-- <button v-on:click="logout()">Log out</button> -->
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import axios from 'axios';
export default { 
  name: 'accountList',
  components: {
  'vue-good-table': require('vue-good-table').VueGoodTable,
  },
  data () {
    return {
      hotels:[],
      chooseDepartment:"請選擇",
      chooseLimit:"請選擇",
      checkedAccount:[],
      // checkedAccount:勾選的，accountList:最後要顯示的
      accountList:[],
      newAccount:{
        companyName:"",
        department: "資訊部",
        employeeNumber: "",
        employeeLimit: "一般使用者",
        email: "",
        userName: "",
        password: "",
        lastLoginDate: "",
        lastLoginTime: "",    
        firstLogin:true
      },
      columns:[
        {
          label:'所屬單位',
          field:'department'
        },
        {
          label:'員工編號',
          field:'employeeNumber'
        },
        {
          label:'姓名',
          field:'userName'
        },
        {
          label:'信箱',
          field:'email'
        },
        {
          label:'權限等級',
          field:'employeeLimit'
        },
        {
          label:'上次登入時間',
          field:'lastLoginDate'
        }
      ],
      rowSelection: []
    }  
  },
  mounted(){
    let self = this
    // var r = 0;
    axios.get('/api/account')
    .then((response) => {
      //console.log(response.data);
      self.hotels = response.data;
      self.accountList=self.hotels;
      //self.accountList=self.hotels;

      // self.id=response.data.id;
      // self.name=response.data.name;
    })
    .catch((error) => {
      console.log(error);
    })
    
  },
  methods:{
    selectionChanged(params){
      let k;
      let self = this;
      this.checkedAccount=[];
      this.rowSelection = params.selectedRows;
      for(k=0;k<self.rowSelection.length;k++){
        this.checkedAccount.push(this.rowSelection[k]._id)
        console.log(this.checkedAccount);
       // console.log(this.checkedAccount._id);
      }

    },
    linkAccountDetial(params){
      let nowAccount = params.row;
      console.log(nowAccount._id);
      this.$router.push(({ path: `/accountDetial/${nowAccount._id}` }))
    },
    deleteAccount:function(){
      let k;
      let self = this;
      this.$fire({
        title: '你確定要刪除嗎?',
        text: '刪除後將不可復原',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '對!刪掉!!',
        cancelButtonText:'取消'
      }).then((result) => {
        if (result.value) {
            for(k=0;k<self.checkedAccount.length;k++){
              //console.log("id:"+self.checkedAccount[k])
              //var check = new String(self.checkedAccount[k]);
              let check = self.checkedAccount[k];
              //console.log(typeof(check));
              //找陣列裡的物件中的值
              var index = self.hotels.findIndex( s => s._id == check )
              console.log(index);
              self.hotels.splice(index,1);
              console.log("delete:"+self.checkedAccount[k]);
              axios.delete('http://localhost:8080/api/account/'+self.checkedAccount[k])
              .then((response) => {
                self.checkedAccount=[];   
              // console.log("delete successed:");    
              // console.log(this.checkedAccount);
                  this.$fire({
                    title: "Success !!",
                    text: "成功刪除",
                    type: "success",
                  });  
              });
            } 
        }
      })
           
      //window.location.reload(); 網頁重新整理
    },
    createAccount:function(){
      let newUser = this.newAccount;
      console.log(newUser);
      axios.post('http://localhost:8080/api/account',newUser) 
      .then((response) => {
         // this.accountList.push(newUser);
          this.hotels.push(newUser);
         // this.searchResults.push(newUser);
         this.$fire({
          title: "Success !!",
          text: "成功新增使用者:"+newUser.userName,
          type: "success",
        });     
     }).catch((error) => {
          console.log(error);
    });  
      this.close();
      
    },
      selection:function(){
      let j;
       //console.log("begineselection:"+this.accountList)
      this.accountList=[];
      for(j=0;j<this.hotels.length;j++){
        if(this.hotels[j].department==this.chooseDepartment && this.hotels[j].employeeLimit==this.chooseLimit){
          this.accountList.push(this.hotels[j])
        }else if(this.hotels[j].department==this.chooseDepartment && this.chooseLimit=="請選擇"){
          this.accountList.push(this.hotels[j])
        }else if(this.chooseDepartment=="請選擇"&& this.hotels[j].employeeLimit==this.chooseLimit){
          this.accountList.push(this.hotels[j])
        }else if(this.chooseDepartment=="請選擇" && this.chooseLimit=="請選擇"){
          this.accountList.push(this.hotels[j])
        }
        //console.log("inFor:accountList:"+this.accountList)
      }
      //console.log("accountList:"+this.accountList)
      //return this.accountList;     
    },
    close:function(){
      document.getElementById("addNewUser").style.visibility="hidden";
      document.getElementById('employeeNumber').removeAttribute("required");
      document.getElementById('email').removeAttribute("required");
      document.getElementById('password').removeAttribute("required");
      document.getElementById('userName').removeAttribute("required");
      this.newAccount={};
      this.newAccount.department="資訊部";
      this.newAccount.chooseLimit="一般使用者";
      
     
      console.log("close")
    },
    open:function(){
      document.getElementById('employeeNumber').required = true;
      document.getElementById('email').required = true;
      document.getElementById('password').required = true;
      document.getElementById('userName').required = true;
      document.getElementById("addNewUser").style.visibility="visible";
      console.log("open")
    },
    logout(){
    localStorage.removeItem('token');
    this.$router.push('/login');
    } 
  }
  // compoted:{
  //   countID:function(){
  //     let i;
  //     this.maxID=this.hotels[0].id;
  //     for(i=0;i<this.hotels.length;i++){
  //       if(this.hotels[i].id > this.maxID){
  //         this.maxID=this.hotels[i].id;
  //       }
  //     }
  //     return this.maxID;
  //     console.log(this.maxID);
  //   }
  // }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


/* function */
.function{
  margin-right: 10%;
  margin-top: 30px;
  font-size: 16px;
  line-height: 21px;
}
.selectBox{  
  margin-right: 50px;
  margin-left: 5px;
  margin-top: 5px;
  width: 120px;
  height: 25px;
  border-radius: 3px;
  border-color: #707070;
  font-family: "微軟正黑體";
}
.inputBox{
  float: right;
  width: 150px;
  height: 23px;
  border: #707070 solid 1px;
  padding:0px;
  border-radius: 3px;
  font-family: "微軟正黑體";
  margin-left: 70px;
}
.functionButton{
  float: right;
  width: 55px;
  height: 22px;
  cursor:pointer;
  background-color: #E6E6E6;
  border: #828282 solid 0.5px ;
  border-radius: 3px;
  font-size: 14px;
  color: #8C8C8C;
  margin-left: 10px;
  margin-right: 15px;
  margin-top: 5px;
  font-family: "微軟正黑體";
  box-shadow: 0px 3px 6px #00000029;
}
.accountList  td{
  padding: 0px 5px;
  border-top:#656565 solid 1.5px ;
  line-height: 24px;
  text-align: center;
  vertical-align: middle;
}
.accountList a{
  padding: 5px 0px;
  display: block;
  color:black;
}
.accountList  tr:hover a{
  /* background-color: #656565; */
  color: red;
}
.vueGoodTable{
  width: 97%;
  margin-left: 20px;
  /* margin-top: 20px; */
  position: relative;
}
/* increasing User */
.addUser{
  margin-left: 150px;
  margin-top: 50px;
  width: 898px;
  height: 446px;
  background-color: #FFFFFFE8;
  position: absolute;
  z-index: 1;
}
#addNewUser{
  /* display: none; */
  visibility:hidden;
}
.addAccount{
  float: left;
  margin-left: 30px;
  margin-top: 20px;
  font-size: 23px;
}
.closeAdd{
  float: right;
  cursor:pointer;
  background-color: #FFFFFFE8;
  border:none ;
  font-size: 25px;
  margin-right: 30px;
  margin-top: 18px;
}
.input{
  float: right;
  margin-top: 60px;
  margin-right: 140px;
}
.input input{
  margin-bottom: 60px;
  float:right;
}
.input span{
  float:right;
}
#tableActionsBtn{
  margin-right: 330px;
  margin-left: 100px;
}
.addSelect{
  float:right;
  width: 165px;
  height: 23px;
  border: #707070 solid 1px;
  border-radius: 3px;
  font-family: "微軟正黑體";
  margin-bottom: 60px;
}
</style>
