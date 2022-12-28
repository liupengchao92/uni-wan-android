<template>
	<!-- 用户信息界面 -->
	<view class="info-container">
		<!-- 基本信息 -->
		<view class="base-info">
			<image class="usericon" src="../../static/my_icon.jpg"></image>
			<text class="username">{{userinfo.username}}</text>
		</view>
		<!-- 其它信息 -->
		<view class="other-info">
			<view class="info-item">
				<view class="item-left">
					<image class="icon" src="../../static/my/my_favorite.png" ></image>
					<text class="title">我的收藏</text>
				</view>
				<view class="item-right">
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					<image class="icon" src="../../static/my/my_coin.png" ></image>
					<text class="title">积分排行</text>
				</view>
				<view class="item-right">
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<view class="info-item">
				<view class="item-left">
					<image class="icon" src="../../static/my/my_share.png" ></image>
					<text class="title">我的分享</text>
				</view>
				<view class="item-right">
					<uni-icons type="right" size="18"></uni-icons>
				</view>
			</view>
			<view class="info-item">
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
		
		onLoad() {
			
		},
		computed:{
			//导入userStore中的数据
			...mapState('m_user',['userinfo']),
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo'])
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