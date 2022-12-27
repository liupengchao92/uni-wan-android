<template>
	<view>
		<view class="login-container">
		   <!-- 提示登录的图标 -->
		   <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		   <!-- 登录按钮 -->
		   <button type="primary" class="btn-login" @click="goToLoginHandler">一键登录</button>
		   <!-- 登录提示 -->
		   <view class="tips-text">登录后尽享更多权益</view>
		 </view>
	</view>
</template>

<script>
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			//跳转到登录页页面
			goToLoginHandler(){
				uni.navigateTo({
					url:'/subpackages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	
.login-container {
	height: 750rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #f8f8f8;
	position: relative;
	overflow: hidden;
	
	&::after {
		content: '';
		display: block;
		height: 40px;
		width: 100%;
		background-color: white;
		position: absolute;
		left: 0;
		bottom: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	
	 // 登录按钮的样式
	  .btn-login {
	    width: 90%;
	    border-radius: 100px;
	    margin: 15px 0;
	    background-color: #007aff;
	  }
	
	  // 按钮下方提示消息的样式
	  .tips-text {
	    font-size: 12px;
	    color: gray;
	  }
	
}
</style>