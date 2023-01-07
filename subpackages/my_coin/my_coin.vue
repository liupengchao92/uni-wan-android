<template>
	<view>
		<!-- 我的积分 -->
		 <view class="my-coin-box">
			 <view class="my-rank-container" v-if="coinInfo!==null">
				 <image class="icon" src="../../static/my_rank.png" ></image>	 
				 <view class="total">总积分:{{coinInfo.coinCount}}</view>	 
				 <view class="my-rank">我的排名:{{coinInfo.rank}}</view>	 
			 </view>
		 </view>
		 <!-- 积分列表 -->
		 <view class="rank-list">
			 <block v-for="(item,i) in rankList" :key="i">
				<view class="rank-item">	
					<view class="rank">
						<image class="rank-icon" :src="item.icon" v-if="item.icon"></image>
						<view class="rank-text" v-else>{{item.rank}}</view>
					</view>
					<view class="username">{{item.username}}</view>
					<view class="coin">{{item.coinCount}}</view>
				</view> 
			 </block>
			 <!-- 加载更多 -->
			 <uni-load-more :status="status"  v-if="rankList.length!==0"></uni-load-more>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//积分信息
				coinInfo:null,
				//积分列表
				rankList:[],
				//当前页数
				page:1,
				//加载状态
				status:'more'
			};
		},
		onLoad() {
			//获取积分信息
			this.getMyCoinInfo()
			//获取积分排行
			this.getCoinRank()
		},
		onReachBottom() {
			
			this.page++;
			
			this.status = 'loading'
			
			this.getCoinRank()
			
		},
		methods:{
			
			async getMyCoinInfo(){
				
				const {data:data} = await uni.$http.get('/lg/coin/userinfo/json')
				
				if (data.errorCode !== 0) return uni.$showMsg()
				
				this.coinInfo = data.data
			},
			
			async getCoinRank(){
				
				const {data:data} = await uni.$http.get('/coin/rank/'+this.page+'/json')
				
				this.status = 'more'
				
				if (data.errorCode !== 0) return uni.$showMsg()
				
				data.data.datas.forEach(item =>{
					switch(item.rank){
						case '1':
						item.icon = '../../static/rank1.png'
						break
						case '2':
						item.icon = '../../static/rank2.png'
						break
						case '3':
						item.icon = '../../static/rank3.png'
						break
					}
				})
				this.rankList = [...this.rankList,...data.data.datas]
			}
		}
	}
</script>

<style lang="scss">
	
.my-coin-box {
	padding-top: 20px;
	width: 100%;
	background: linear-gradient(to bottom ,#007aff,#ffffFf);
	height: 150px;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.my-rank-container {
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 90%;
		height: 100%;
		border-radius: 10px 10px 0px 0px;
		justify-content: space-evenly;
		
		.icon {
			width: 50px;
			height: 50px;
		}
		.total {
			font-size: 18px;
			font-weight: bold;
			color: red;
		}
		.my-rank {
			font-size: 13px;
			color: #888888;
		}
	}
}

.rank-list {
	margin-top: 15px;
	.rank-item {
		padding: 8px 10px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #efefef;
		
		.rank {
			width: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
			.rank-icon {
				width: 22px;
				height: 22px;
			}
			.rank-text {
				font-size: 15px;
			}
		}
		.username {
			font-size: 13px;
		}
		.coin {
			margin-right: 6px;
			font-size: 14px;
			font-weight: bold;
			color: red;
		}
	}
}
</style>
