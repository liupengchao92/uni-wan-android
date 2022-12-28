//1.导入vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'
//导入用户模块的store
import moduleUser from './user.js'

//2.将Vuex安装为Vue的插件
Vue.use(Vuex)

//3.创建Store的实例对象
const store = new Vuex.Store({
	
	//挂载store的module模块
	modules:{
		//
		m_user:moduleUser,
	},
	
})

//4.向外共享Store的实例对象

export default store




