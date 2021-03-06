import Vue from 'vue'
import Router from 'vue-router'
import accountList from '@/components/accountList'
import accountDetial from '@/components/accountDetial'
import login from '@/components/login'
import firstLogin from '@/components/firstLogin'
import changePassword from '@/components/changePassword'
import forgetPassword from '@/components/forgetPassword'
import verification from '@/components/verification'
//comment
import commentList from '@/components/commentList'
import commentDetails from '@/components/commentDetails'
import competition from '@/components/competition'
import competitionCommentList from '@/components/competitionCommentList'
import competitionCommentDetails from '@/components/competitionCommentDetails'
import statistic from '@/components/statistic'
import history from '@/components/history'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  //  依據用戶近來的頁面回應給用戶不同的頁面
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/accountList',
      name: 'accountList',
      component: accountList
    },
    {
      path: '/accountDetial/:userID',
      name: 'accountDetial',
      component: accountDetial
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/firstLogin',
      name: 'firstLogin',
      component: firstLogin
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: changePassword
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/verification/:userID',
      name: 'verification',
      component: verification
    },
    //comment
    {
      path: '/commentList',
      name: 'commentList',
      component: commentList
    },
    {
      path: '/commentDetails/:_id',
      name: 'commentDetails',
      component: commentDetails
    },
    {
      path: '/competition/:collections',
      name: 'competition',
      component: competition
    },
    {
      path: '/competitionCommentList/:collections',
      name: 'competitionCommentList',
      component: competitionCommentList
    },
    {
      path: '/competitionCommentDetails/:collections/:_id',
      name: 'competitionCommentDetails',
      component: competitionCommentDetails
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: statistic
    },
    {
      path: '/statistic/:time',
      name: 'statistic',
      component: statistic
    },
    {
      path: '/history/:company',
      name: 'history',
      component: history
    },
    {
      path: '/history/:company/:record',
      name: 'history',
      component: history
    },
    // {
    //   path: '/history/:value',
    //   name: 'history',
    //   component: history
    // }
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
