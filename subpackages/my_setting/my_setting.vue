<template>
	<view class="setting-container">
		<view class="version-box">
			<image class="icon" src="../../static/learn.png"></image>
			<text class="app-name">EasyWanAndroid</text>
			<text class="version-no">当前版本：1.0.0</text>
		</view>
		<view class="setting-item">
			<view class="item-website" @click="clickSetting('website')">
				<text>官网</text>
			</view>
			<view class="line"></view>
			<view class="item-website" @click="clickSetting('github')">
				<text>GitHub</text>
			</view>
		</view>
		
		<view class="item-logout" @click="clickSetting('logout')">退出</view>

	</view>
</template>

<script>
	
	import {mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
	
			try {
				//获取缓存信息
				const res = uni.getStorageInfoSync();
				console.log(res.keys);
				console.log(res.currentSize);
				console.log(res.limitSize);
			} catch (e) {
				// error
			}
		},
		methods:{
			...mapMutations('m_user',['clearLoginInfo']),
			//相关设置
			clickSetting(type){
				console.log(type)
				switch(type){
					case 'website':
					let websiteUrl = 'https://www.wanandroid.com/index'
					uni.navigateTo({
						url:'/subpackages/article_detail/article_detail?url='+ websiteUrl
					})
					break;
					case 'github':
					
					let githubUrl = 'https://github.com/liupengchao92'
					uni.navigateTo({
						url:'/subpackages/article_detail/article_detail?url='+ githubUrl
					})

					break;
					case 'logout':
					
					uni.showModal({
						content:'是否退出？',
						success:function(res){
							if(res.confirm){
								//调用接口
								this.logout()
							}
						}.bind(this)
					})
					
					break;
				}
			},
			
			async logout(){
				
				const {data:data} = await uni.$http.get('/user/logout/json')
				
				if(data.errorCode !==0) return uni.$showMsg(data.errorMsg)
				
				//清空用户信息
				this.clearLoginInfo()
				
				uni.navigateBack()
				
			}
		}
	}
</script>

<style lang="scss">
	
page,.setting-container {
		width: 100%;
		height: 100%;
		background-color: #ebebeb;
		display: flex;
		flex-direction: column;
		
		.version-box {
			background-color: white;
			height: 250px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.icon{
				height: 80px;
				width: 80px;
			}
			
			.app-name{
				margin-top: 10px;
				font-size: 18px;
				color: #333333;
			}
			
			.version-no {
				margin-top: 10px;
				font-weight: bold;
				color: #999999;
				font-size: 13px;
			}
		}
		
		.setting-item {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 0px 10px;
			background-color: white;
			margin-top: 10px;
			
			.item-website {
				width: 100%;
				display: flex;
				height: 45px;
				color: #333333;
				align-items: center;
			}
			
			.line {
				height: 1px;
				background-color: #efefef;
				width: 98%;
			}
		}
		
		.item-logout{
			margin-top: 10px;
			background-color: white;
			display: flex;
			width: 100%;
			height: 45px;
			color: #333333;
			align-items: center;
			justify-content: center;
		}
		
	}

</style>
