
//到处当前模块
export default {
	
	//为当前模块开启命名空间
	namespaced : true,
	
	//模块的state数据
	state:()=>({	
		//cookies
		cookies:uni.getStorageSync('cookies')||'',
		//用户信息
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}')
		
	}),
	
	//模块的mutations 方法
	mutations:{
		
		//更新用户的cookies
		updateCookies(state,cookies){
			
			//Cookies序列化为字符串存储
			state.cookies = JSON.stringify(cookies)
			
			this.commit('m_user/saveCookies')
		},
		
		//持久化存储cookies
		saveCookies(state){
			
			console.log(state.cookies)
			
			uni.setStorageSync('cookies',state.cookies)
		},
		
		//更新用户信息
		updateUserInfo(state,info){
			
			state.userinfo = info
									
			this.commit('m_user/saveUserInfo')
		},
		
		//保存用户信息
		saveUserInfo(state){
			
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		
		//清除用户信息
		clearLoginInfo(state){
			state.cookies = ''
			state.userinfo = null
			
			this.commit('m_user/clearStorage')
		},
		
		//清除本地信息
		clearStorage(){
			uni.removeStorageSync('cookies')
			uni.removeStorageSync('userinfo')
		}
		
	},
	
	
	//模块的getter属性
	getters:{
		
	}
	
	
}