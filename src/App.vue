<template>
  <div id="app" class="warp">
    <div class="header">
        <div class="headerContent">
            <!-- <a class="showMenu" href="#"><img src="https://fakeimg.pl/15x15/" alt=""></a> -->
            <!-- <img class="companyImg" src="https://fakeimg.pl/50x50/" alt=""> -->
            <!-- <div class="company">
                <p class="title">旅館評論管理系統</p>
                <div class="clear"></div>
            </div> -->
            <div class="menu" id="menu">
                <p>功能列</p>
                <ul>
                    <!-- <img src="./assets/icon/info9.svg" class="icons" alt=""> -->
                    <li><router-link :to="{ name: 'accountList'}"><img src="https://fakeimg.pl/15x15/" alt="">帳號管理</router-link></li>
                    <!-- <img src="./assets/icon/comment.svg" class="icons" alt=""> -->
                    <li><router-link :to="{ name: 'commentList', params: { collections: companyName }}"><img src="https://fakeimg.pl/15x15/" alt="">評論管理</router-link></li>
                    <li><router-link :to="{ name: 'statistic', params: { collections: companyName }}"><img src="https://fakeimg.pl/15x15/" alt="">統計結果</router-link></li>
                    <li><router-link :to="{ name: 'competition', params: { collections: companyName }}"><img src="https://fakeimg.pl/15x15/" alt="">競爭對手</router-link></li>
                    <!-- <img src="./assets/icon/info9.svg" class="icons" alt=""> -->
                    <li><router-link :to="{ name: 'history', params: { value: 0 }}"><img src="https://fakeimg.pl/15x15/" alt="">歷史紀錄</router-link></li>
                    <div class="clear"></div>

                </ul>
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="clear"></div>
    </div>
    <div class="content">
      <div class="contentTop">
        <a class="showMenu" href="#"><img src="https://fakeimg.pl/15x15/" alt=""></a>
        <div class="breadcrumb" id="breadcrumb">
          <a class="breadcrumb-item" href="#">首頁</a>
          <a class="breadcrumb-item" href="/commentlist">評論管理</a>
          <a href="#">評論列表</a>
          <div class="clear"></div>
        </div>
        <div class="personalInfo">
            <img class="photo" src="https://fakeimg.pl/20x20/" alt="" v-on:click="personalState()">
            <p>後台管理員</p>
            <div class="clear"></div>
        </div>
        <div class="loginingInfo" id="logining">
            <div class="nameEmail">
                <img src="https://fakeimg.pl/50x50/" alt="">
                <ul>
                    <li>{{userAccountDetail.userName}}</li>
                    <li>{{userAccountDetail.email}}</li>
                </ul>
                <div class="clear"></div>     
            </div>
            <div class="personalMenu">
                <ul>
                    <li><button v-on:click="link('accountDetial')"><img src="https://fakeimg.pl/20x20/" alt="">個人資料</button></li>
                    <li><button v-on:click="link('')"><img src="https://fakeimg.pl/20x20/" alt="">歷史紀錄</button></li>
                    <li><img src="https://fakeimg.pl/20x20/" alt=""><button  v-on:click="logout()" >登出</button></li>
                </ul>
            </div>
            <div class="clear"></div>
        </div>
        <div class="logoutInfo" id="logoutInfo">
            <img class="photo" src="https://fakeimg.pl/50x50/" alt="">
            <div class="clear"></div>
            <button  v-on:click="login()" >登入</button>
        </div>
        <div class="clear"></div>
      </div>
      <router-view></router-view>
    </div>
    <div class="clear"></div>
    <div class="footer">
        <ul class="phoneMenu">
            <li><a href="#"><img src="https://fakeimg.pl/27x27/" alt=""></a></li>
            <li><a href="#"><img src="https://fakeimg.pl/27x27/" alt=""></a></li>
            <li><a href="#"><img src="https://fakeimg.pl/27x27/" alt=""></a></li>
            <li><a href="#"><img src="https://fakeimg.pl/27x27/" alt=""></a></li>
        </ul>
        <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import $ from '../node_modules/jquery'
export default {
  name: 'App',
  data(){
    return {
        userID:'',
        companyName:'',
        userAccountDetail:{},
    }
  },
  mounted(){
      let self = this;
      if(localStorage.getItem('token')){
        var loginData = JSON.parse(localStorage.getItem('token'))
        self.companyName = loginData.companyName;
        self.userID = loginData.id;
        document.getElementById('menu').style.visibility="visible";
        document.getElementById('breadcrumb').style.visibility="visible";

        axios.get('/api/account/'+self.userID).then((response) => {
            console.log(response.data); 
            self.userAccountDetail = response.data;
        }).catch((error) => {
            console.log(error);
        })
      }else{
        document.getElementById('menu').style.visibility="hidden";
        document.getElementById('breadcrumb').style.visibility="hidden";
      }
  },
  methods:{
    // openPersonalInfo:function(){
    //     document.getElementById("logining").style.visibility="visible";
    // },
    // closePersonalInfo:function(){
    //     document.getElementById("logining").style.visibility="hidden";
    // },
    editWindow: function(){
        event.stopPropagation()
        $('#logining').toggle('fast')
        $(document).click(function (event) {
        var area = $('#logining') // 設定目標區域
        if (!area.is(event.target) && area.has(event.target).length === 0) {
                // $('#divTop').slideUp('slow');  //滑動消失
            $('#logining').hide(100) // 淡出消失
            }
        })
    },
    logout:function(){
        $('#logining').hide(100) // 淡出消失
        localStorage.removeItem('token');
        this.userID='';
        this.companyName='';
        this.userAccountDetail={};
        document.getElementById('menu').style.visibility="hidden";
        document.getElementById('breadcrumb').style.visibility="hidden";
        this.$router.push('/login');
    },
    login:function(){
        this.$router.push('/login');
        $('#logining').hide(100) // 淡出消失
    },
    personalState:function(){
        if( localStorage.getItem('token')){
            // var loging = JSON.parse(localStorage.getItem('token'));
            // this.userID = loging.id;
            //console.log(this.userID);
            event.stopPropagation()
            $('#logining').toggle('fast')
            $(document).click(function (event) {
            var area = $('#logining') // 設定目標區域
            if (!area.is(event.target) && area.has(event.target).length === 0) {
                // $('#divTop').slideUp('slow');  //滑動消失
                $('#logining').hide(100) // 淡出消失
                }
            })
            // if(document.getElementById("logining").style.visibility=="visible"){
            //     this.closePersonalInfo();
            // }else{
            //     this.openPersonalInfo();
            // }
        }else{
            event.stopPropagation()
            $('#logoutInfo').toggle('fast')
            $(document).click(function (event) {
            var area = $('#logoutInfo') // 設定目標區域
            if (!area.is(event.target) && area.has(event.target).length === 0) {
                // $('#divTop').slideUp('slow');  //滑動消失
                $('#logoutInfo').hide(100) // 淡出消失
                }
            })
            // if(document.getElementById("logoutInfo").style.visibility=="visible"){
            //     document.getElementById("logoutInfo").style.visibility="hidden";
            // }else{
            //     document.getElementById("logoutInfo").style.visibility="visible";
            // }
        }
    },
    link:function(page){
        $('#logining').hide(100)
        let toPage = page;
        console.log(toPage);
        var logingData = JSON.parse(localStorage.getItem('token'))
        this.$router.push(({ path: `/${toPage}/${logingData.id}` }))
    }
  }

}

</script>
<style>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
a{
    text-decoration:none;
}
.icons{
    width: 20px;
    height: 20px;
}
.warp{
    width: 100%;
    margin: auto;
    height: 100vh;
    font-family: 微軟正黑體;  
    background-color: #F7F7F7;
    overflow-x: hidden;
}

.header{
    width: 10.5%;
    height: 100vh;
    float: left;
}

.footer{
    background-color: #F7F7F7;
}
/* header */
.headerContent{
    width: 10.5%;
    height: 100vh;
    position: fixed;
    top: 0;
    padding-right: 5px;
    background-color: rgb(47, 58, 76);
    /* offset-x | offset-y | blur-radius | spread-radius | color */
    box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.2);
    color: white;
}

/* .company{
    margin-top: 25px;
    padding-top: 20px;
    margin-left: 10px;
    margin-right: 5px;
}

.companyImg{
    float: left;
    margin-bottom: 10px;
}

.title{
    float: left;
    margin-top: 15px;
    font-size: 18px;
} */

.menu{
    margin-top: 25px;
    margin-left: 15px;
    font-size: 16px;
    z-index: 100;
    position: absolute;
}
.menu li{
    margin: 20px 0px;
}
.menu li a{
    font-size: 16px;
    letter-spacing: 5px;
    padding: 15px 20px;
    color: white;
    display: block;
}
.menu p{
    font-size: 14x;
    margin-left: 10px;
    color: #A89090;
}
.menu img{
    margin-right: 5px;
}
.menu li:hover{
    cursor: pointer;
    background-color: rgb(182, 96, 96);
}
.showMenu{
    display: none;
}
#logout{
    display: none;
}

/* Content */
.content{
    float: left;
    width: 89.5%;
    height: 100%;
    
}

.contentTop{
    width: 100%;
    padding: 1% 0%;
    box-shadow: 1px 0.5px 2px 0.5px rgba(0, 0, 0, 0.096);
    background-color: #fff;
}

.breadcrumb{
    float: left;
    width: 70%;
    margin-left: 20px;
}
.breadcrumb a{  
    display: inline;
    /* float: left; */
    font-size: 14px;
    color: black;
}

.breadcrumb-item::after{
    content: "\00a0 >\00a0 ";
    color: black;
}
.personalInfo{
    float: right;
    padding-right: 30px;
    /* margin-right: 5%; */
}
.personalInfo p{
    float: right;
    margin-right: 10px;
}
.photo{
    float: right;
    /* margin-top: 10px; */
}

.el-table th,.el-table td{
    text-align: center;
}

.phoneMenu{
    display: none;
}
.page{
    font-size: 24px;
    font-weight: bold;
    display: inline-block;
    margin: 20px;  
}

/* 不是basic但comment共用 */
.dataArea{
    position: relative;
    float: left;
    width: 97%;
    margin-left: 20px;
    overflow: hidden;
}


/* footer */
.phoneMenu{
    display: none;
}

/* 這裡改版過還沒重寫!!!! */

@media (max-width: 768px){
    .page{
        font-size: 18px;
        margin-top: 0px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .header{
        height: 0;
    }
    .headerContent{
        width: 100%;
        height: 0;
    }
    .companyImg{
        display: none;
    }
    .title{
        font-size: 16px;
        margin: 5 auto;
        width: 65%;
        padding: 10px;
        text-align: center;
    }
    .photo{
        display: none;
    }
    .identity{
        display: none;
    }
    .breadcrumb{
        display: none;
    }
    .menu{
		/*隱藏選單開始*/
		max-height: 0;
		overflow: hidden;
		/*隱藏選單結束*/
		/*漸變效果*/
    	transition: max-height 0.5s;
        margin-top: 0px;
        margin-right: 0px;
    	/*絕對定位疊在網頁上*/
    	position: absolute;
    	/*權重*/
    	z-index: 100;
    	/*header 80px+1px boder 線條*/
    	top: 35px;
    	/* left:0 right:0表示滿版 */
    	left: 0;
   		right: 0;
    	background: black;
    }
    .menu li{
        width: 100%;
        float: none;
        text-align: center;
        border-top: #ccaf6f solid 1px;    
	}
	.menu li a{
        padding: 15px;
        transition: all 0.3s;
        font-size: 14px;
  	}
	.menu li a:hover{
    	background: rgb(182, 96, 96) ;
    	color: #fff;
  	}
	.showMenu{
        width: 10%;
    	display: block;
        float: right;
        padding-top: 12px;
        margin-left: 7%;
    }
    #logout{
        display: block;
    }
    /*jQuery點擊後動態在 body 加上 class */
  	.menu-show .menu{
        max-height: 500px;
    }
    .phoneMenu{
        width: 100%;
        display: block;
        position: fixed;
        bottom: 0;
        text-align: center;
        background-color: rgb(47, 58, 76);
    }
    .phoneMenu li{  
        width: 25%;
        padding-top: 5px;
        padding-bottom: 5px;
        float: left;
        text-align: center;
    }
    .content{
        padding-top: 20px;
    }
}

/* 個人資料 */
.loginingInfo{
    background-color: #fff;
    padding-top: 20px;
    font-size: 16px;
    top: 7%;
    right: 2%;
    color:  black;
    position: absolute;
    width: 260px;
    height: 260px;
    border: #CAC7C7 solid 0.5px;
    border-radius: 5px;
    box-shadow: 1px 2px 2px 1px #a0a0a02f;
    z-index: 100;
}
#logining{
    /* visibility: hidden; */
    display: none;
}
.loginingInfo .nameEmail{
    padding-bottom: 20px;
    width: 240px;
    margin: auto;
    border-bottom:#707070 solid 0.5px ;
}
.nameEmail img{
    float: left;
}
.nameEmail li{
    float: left;
    padding: 5px 5px 5px 10px;
}
.personalMenu{
    font-size: 18px;
    margin-top: 30px;
}
.personalMenu ul{
    margin-left:35px;
}
.personalMenu li{
    margin-top:30px;
    vertical-align: middle;
}
.personalMenu img{
    margin-right: 15px;
}
.logoutInfo{
    background-color: #fff;
    padding-top: 20px;
    font-size: 16px;
    top: 80px;
    color:  black;
    right:100px;
    position: absolute;
    width: 260px;
    height: 260px;
    border: #CAC7C7 solid 0.5px;
}
#logoutInfo{
    /* visibility: hidden; */
    display: none;

}

.clear{
    clear: both;
}
@media (max-width: 425px) {
    .headerContent{
       display: inline;
    }
    .showMenu{
       display: block;
    }
    .contentTop{
        position: absolute;
        background-color: rgb(47, 58, 76);
        height: 30px;
        margin: 0;
    }
    .content{
        width: 100%;
        padding: 0;
    }
    .personalInfo{
        display: none;
    }
    .header{
        height: 0;
    }
    .headerContent{
        background: #000;
        width: 100%;
        height: 0;
    }
    .company{
        display: none;
    }
    .companyImg{
        display: none;
    }
    .photo{
        display: none;
    }
    .identity{
        display: none;
    }
    .breadcrumb{
        display: none;
    }
    .menu{
		/*隱藏選單開始*/
		max-height: 0;
		overflow: hidden;
		/*隱藏選單結束*/
		/*漸變效果*/
    	transition: max-height 0.5s;
        margin-top: 0px;
        margin-right: 0px;
    	/*絕對定位疊在網頁上*/
    	position: relative;
    	/*權重*/
    	z-index: 100;
    	/*header 80px+1px boder 線條*/
    	top: 39px;
    	/* left:0 right:0表示滿版 */
    	left: 0;
   		right: 0;
        background-color: rgb(192, 214, 250);
        margin: 0;
    }
    .menu li{
        width: 100%;
        /* float: none; */
        text-align: center;
        border-top: white solid 1px;  
        background: rgb(47, 58, 76);
        padding: 20px 0 ; 
        float: left;
        margin: 0;
    }
    .menu p{
         display: none;
	}
	.menu li a{
        padding: 0px;
        transition: all 0.3s;
        font-size: 20px;
        /* border: none; */
  	}
	.menu li a:hover{
    	background-color: rgb(182, 96, 96);
    	color: #fff;
  	}
	.showMenu{
        width: 10%;
    	display: block;
        float: left;
        padding-top: 10px;
        margin-left: 7%;
    }
    #logout{
        display: block;
    }
    /*jQuery點擊後動態在 body 加上 class */
  	.menu-show .menu{
        max-height: 500px;
    }
}
</style>
