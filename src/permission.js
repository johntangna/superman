import Vue from 'vue';
import router from './router';
import store from './store';
import { getToken } from 'utils/authority'
/* 
   @params to 目标路径
   @params from 当前路径
   @params next 回调函数
 */
const whiteList = ['/login']
router.beforeEach((to,from,next)=>{
  const hasToken = getToken()
  if(hasToken){
    if(to.path == '/login'){
      next({path : '/'})
    } else {
      next()
    }
  } else {
    //存在白名单
    if(whiteList.indexOf(to.path) != -1){
      next()
    } else {
      next({path : '/login'})
    }
  }
})