<template>
	<view class="login-container">
		
		<text class="title"> Wan Android</text>
		<view class="username">
			<uni-easyinput placeholder="请输入用户名"  @input="inputUsername"></uni-easyinput>
		</view>
		<view class="password">
			<uni-easyinput placeholder="请输入密码" type="password" v-model="password" @input="inputPassword"></uni-easyinput>
		</view>
		<button type="primary" class="btn-login" @click="loginHandler">登录</button>
		<text class="tips">若无此账号，请前往官网注册。</text>
		
	</view>
</template>

<script>
	
	import {mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				//定时器
				timer:null,
				//用户名
				username:'',
				//密码
				password:''
			};
		},
		onLoad() {
			
			
		},
		methods:{
			//导入mutations中的方法
			...mapMutations('m_user',['updateCookies', 'updateUserInfo']),
			//输入用户名
			inputUsername(event){
				//清除倒计时
				clearTimeout(this.timer)
				//延时器
				this.timer = setTimeout(() =>{
									
					this.username = event
				},500)
			},
			
			//输入密码
			inputPassword(event){
				//清除倒计时
				clearTimeout(this.timer)
				//延时器
				this.timer = setTimeout(() =>{
					
					this.password = event					
					
				},500)
			},
			
			//登录点击事件
			loginHandler(){
				
				if(this.username.length === 0) return uni.$showMsg('用户名不能为空')
				
				if(this.password.length === 0) return uni.$showMsg('密码不能为空')
				
				this.login()
			},
			
			//登录
			async login(){
				const params = {
					username:this.username,
					password:this.password
				}
				
				const paramsStr = 'username='+this.username+'&password='+this.password
				//通过传递data 参数发起请求一直报错，通过拼接地址可以。
				const res = await uni.$http.post('/user/login?'+ paramsStr)
								
				 console.log(res)
				 
				if(res.statusCode !==200) return uni.$showMsg(res.errMsg)
				
				if(res.data.errorCode !==0) return uni.$showMsg(res.data.errorMsg)
				
				//保存cookies
				this.updateCookies(res.cookies)
				
				this.updateUserInfo(res.data.data)
				
				uni.$showMsg('登录成功！')
				
				//返回之前的页面
				uni.navigateBack()
			}
		
		}
	}
</script>

<style lang="scss">
	
page ,.login-container {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background: linear-gradient(to bottom,#007aff ,#ffffff);
	
	.title {
		color: #fff;
		font-size: 24px;
		margin-bottom: 10px;
	}
	
	.username,.password {
		width: 90%;
		margin: 6px 0;
	}
		
	.btn-login {
		margin-top: 10px;
		margin-bottom: 100px;
		background-color: #007aff;
		border-radius: 8px;
		width: 90%;
	}
	
	.tips {
		font-size: 11px;
		color: $uni-color-subtitle;
	}
}
</style>
