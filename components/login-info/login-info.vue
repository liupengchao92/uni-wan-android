<template>
	<!-- 用户信息界面 -->
	<view class="info-container">
		<!-- 基本信息 -->
		<view class="base-info">
			<image class="usericon" src="../../static/head_man.png"></image>
			<text class="username">{{userinfo.username}}</text>
		</view>
		<!-- 其它信息 -->
		<view class="other-info">
			<view class="info-item" @click="goToFavorite">
				<view class="item-left">
					<image class="icon" src="../../static/my/my_favorite.png" ></image>
					<text class="title">我的收藏</text>
				</view>
				<view class="item-right">
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<view class="info-item" @click="goToCoin">
				<view class="item-left">
					<image class="icon" src="../../static/my/my_coin.png" ></image>
					<text class="title">积分排行</text>
				</view>
				<view class="item-right">
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<view class="info-item" @click="goToShare">
				<view class="item-left">
					<image class="icon" src="../../static/my/my_share.png" ></image>
					<text class="title">我的分享</text>
				</view>
				<view class="item-right">
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<view class="info-item" @click="goToSetting">
				<view class="item-left">
					<image class="icon" src="../../static/my/my_setting.png" ></image>
					<text class="title">设置</text>
				</view>
				<view class="item-right">
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	import { mapState,mapMutations} from 'vuex'
	
	export default {
		name:"login-info",
		data() {
			return {
				
			};
		},
		
		mounted() {
			console.log('mounted')
			//获取用户信息
			this.getUserInfo()
		},
		
		//这个方法不执行
		onLoad() {
			console.log('onLoad')
			//获取用户信息
			this.getUserInfo()
		},
		computed:{
			//导入userStore中的数据
			...mapState('m_user',['userinfo']),
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo']),
			
			async getUserInfo(){
				
				const {data:data} = await uni.$http.get('/user/lg/userinfo/json')
				
				if(data.errorCode !==0) return uni.$showMsg(data.errorMsg)
				
				this.updateUserInfo(data.data.userInfo)
			
			},
			
			//跳转到收藏
			goToFavorite(){
				uni.navigateTo({
					url:'/subpackages/my_favorite/my_favorite'
				})
			},
			//跳转到积分排行
			goToCoin(){
				uni.navigateTo({
					url:'/subpackages/my_coin/my_coin'
				})
			},
			
			//跳转到分享
			goToShare(){
				uni.navigateTo({
					url:'/subpackages/my_share/my_share'
				})
			},
			
			goToSetting(){
				console.log('========>>')
				uni.navigateTo({
					url:'/subpackages/my_setting/my_setting'
				})
			}
			
		},
		
	}
</script>

<style lang="scss">
	
.info-container {
	
	.base-info {
		display: flex;
		background-color: #007aff;
		align-items: center;
		justify-content: flex-start;
		height: 150px;
		
		.usericon {
			border-radius: 100%;
			width: 80px;
			height: 80px;
			margin-left: 10px;
			margin-right: 8px;
		}
		.username {
			font-size: 21px;
			color: white;
		}
	}
	.other-info {
		
		margin-top: 50px;
		
		.info-item {
			padding: 0 10px;
			display: flex;
			height: 45px;
			align-items: center;
			justify-content: space-between;
			border-bottom: 1px solid #efefef;
			
			.item-left {
				display: flex;
				align-items: center;
				.icon {
					height: 26px;
					width: 26px;
				}
				.title {
					font-size: 15px;
					margin-left: 8px;
				}
			}

		}
		
	}
}
</style>