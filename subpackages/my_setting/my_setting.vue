<template>
	<view class="setting-container">
		<view class="version-box">
			<image class="icon" src="../../static/learn.png"></image>
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
			<view class="line"></view>
			<view class="item-logout" @click="clickSetting('logout')">退出</view>
			<view class="line"></view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
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
								console.log("确定退出。。。")
							}
						}
					})
					
					break;
				}
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
		justify-content: space-between;
		
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
			
			.version-no {
				margin: 10px 0px;
				font-weight: bold;
				color: #333333;
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
			margin-bottom: 60px;

			.item-website {
				width: 100%;
				display: flex;
				height: 45px;
				color: #333333;
				align-items: center;
			}
			
			.item-logout{
				display: flex;
				width: 100%;
				height: 45px;
				color: #333333;
				align-items: center;
				justify-content: center;
			}
			
			.line {
				height: 1px;
				background-color: #efefef;
				width: 98%;
			}
		}
	}

</style>
