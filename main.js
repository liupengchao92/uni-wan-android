import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

//网络请求的配置
import { $http } from "@escook/request-miniprogram"

uni.$http = $http

//配置请求很路径
$http.baseUrl = 'https://www.wanandroid.com'

// 请求开始之前做一些事情
$http.beforeRequest = function (options){
	
	
	//处理登录的cookies请求
    const cookies =	uni.getStorageSync('cookies')||''
	if(cookies!==''){
		options.header = {
			cookie: cookies
		}
	}

	//显示加载框
	uni.showLoading({
		title:'数据加载中...'
	})
}

// 请求完成之后做一些事情
$http.afterRequest = function (){
	//隐藏加载框
	uni.hideLoading()
}

//自定义吐司
uni.$showMsg = function (title ='数据请求失败',duration = 1500) {
	uni.showToast({
		title:title,
		duration:duration,
		icon:'none'
	})
}

