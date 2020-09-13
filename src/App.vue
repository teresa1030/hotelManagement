<template>
  <div id="app" class="warp">
    <div class="header">
            <div class="headerContent">
                <a class="showMenu" href="#"><img src="https://fakeimg.pl/15x10/" alt=""></a>
                <img class="companyImg" src="https://fakeimg.pl/50x50/" alt="">
                <div class="title">旅館評論管理系統</div>
                <div class="personalInfo">
                    <img class="photo" src="https://fakeimg.pl/50x50/" alt="" v-on:click="personalState()">
                    <div class="identity">後台管理員</div>
                </div>
                <div class="loginingInfo" id="logining">
                    
                    <div class="nameEmail">
                        <img src="https://fakeimg.pl/50x50/" alt="">
                        <ul>
                            <li>XXX</li>
                            <li>a1063343@gmail.com</li>
                        </ul>
                        <div class="clear"></div>     
                    </div>
                    <div class="personalMenu">
                            <ul>
                                <li><img src="https://fakeimg.pl/20x20/" alt="">個人資料</li>
                                <li><img src="https://fakeimg.pl/20x20/" alt="">歷史紀錄</li>
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
                
                <ul class="menu">
                    <li><router-link :to="'../accountList'">帳號管理</router-link></li>
                    <li><router-link :to="'../commentList'">評論管理</router-link></li>
                    <li><a href="#">統計結果</a></li>
                    <li><a href="#" >競爭對手</a></li>
                    <li><a href="#">歷史紀錄</a></li>
                    <li><a id="logout" href="#">登出</a></li>
                </ul>
                    
                <div class="clear"></div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="clear"></div>
    <router-view></router-view>
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
export default {
  name: 'App',
  data(){
    return {
        userID:""
    }
  },
  methods:{
    openPersonalInfo:function(){
        document.getElementById("logining").style.visibility="visible";
    },
    closePersonalInfo:function(){
        document.getElementById("logining").style.visibility="hidden";
    },
    logout:function(){
        this.closePersonalInfo();
        localStorage.removeItem('token');
        this.$router.push('/login');
    },
    login:function(){
        this.$router.push('/login');
        document.getElementById("logoutInfo").style.visibility="hidden";
    },
    personalState:function(){
        if( localStorage.getItem('token') ){
            var loging = JSON.parse(localStorage.getItem('token'));
            this.userID = loging.id;
            console.log(this.userID);
            if(document.getElementById("logining").style.visibility=="visible"){
                this.closePersonalInfo();
            }else{
                this.openPersonalInfo();
            }
        }else{
            if(document.getElementById("logoutInfo").style.visibility=="visible"){
                document.getElementById("logoutInfo").style.visibility="hidden";
            }else{
                document.getElementById("logoutInfo").style.visibility="visible";
            }
        }
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

.warp{
    width: 100%;
    margin: auto;
    font-family: 微軟正黑體;  
    
}
.clear{
    clear: both;
}
.header{
    height: 60px;
    box-shadow:3px 3px 5px 6px black;
}

.footer{
    background-color: #F7F7F7;
}
/* hrader */
.headerContent{
    width: 100%;
    position: fixed;
    top: 0;
    display: block;
    background-color: #226A4D;
    color: white;
    z-index: 2;
}
.companyImg{
    float: left;
    margin-left: 100px;
    margin-top: 15px;
    margin-bottom: 13px;
}
.title{
    float: left;
    padding-left: 20px;
    padding-top: 25px;
    font-size: 25px;
}
.photo{
    cursor: pointer;
    float: right;
    margin-right: 100px;
    margin-top: 15px;
    margin-bottom: 13px;
}
.identity{
    color: red;
    float: right;
    margin-top: 35px;
    margin-right: 20px;
    font-size: 20px;
}
.menu{
    float: right;  
    margin-top: 35px;
    margin-right: 30px;
}
.menu li{
    float: left;
    margin-right: 20px;
}
.menu li a{
    font-size: 16px;
    letter-spacing: 2px;
    color: white;
    display: block;
}
.showMenu{
    display: none;
}
#logout{
    display: none;
}
/* footer */
.phoneMenu{
    display: none;
}
@media (max-width: 768px){
    .page{
        font-size: 18px;
        margin-top: 0px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .header{
        height: 35px;
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
    	transition: max-height 2.3s;
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
    	background: #226A4D;
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
    	background: #ccaf6f ;
    	color: #fff;
  	}
	.showMenu{
        width: 10%;
    	display: block;
        float: left;
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
        background-color: #226A4D;
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
    top: 80px;
    color:  black;
    right:100px;
    position: absolute;
    width: 260px;
    height: 260px;
    border: #CAC7C7 solid 0.5px;
}
#logining{
    visibility: hidden;
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
    visibility: hidden;
}


</style>
