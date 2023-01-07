<template>
	<view class="fav-container">
		<uni-swipe-action>
			<!-- 收藏列表 -->
			<block v-for="(item,i) in favoriteList" :key="i">
				<uni-swipe-action-item :right-options="options" :disabled="false" @click="deleteHandler(item)" >
					<view class="fav-item" @click="itemClickHandler(item)">
						<view class="title">{{item.title}}</view>
						<view class="author">{{item.author}}</view>
						<view class="date">{{item.niceDate}}</view>
					</view>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		<!-- 加载更多 -->
		<uni-load-more status="noMore" v-if="favoriteList.length!==0"></uni-load-more>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//收藏列表数据
				favoriteList:[],
				//当前页数
				currPage:0,
				//总数量
				total:0,
				//记载状态
				status:'more',
				options:[
					{
						text:'删除',
						style: {
							backgroundColor: '#c00000'
						}
					}
				]
			}
		},
		onLoad() {
			
			//获取收藏列表
			this.getFavoriteList()
		},
		onReachBottom() {
			
			if(this.favoriteList.length >= this.total){
				this.status = 'noMore'
				return
			}
			
			this.currPage++
			
			this.status = 'loading'
			
			this.getFavoriteList()
		},
		methods: {
			
			async getFavoriteList(){
				
				const {data:data} = await uni.$http.get('/lg/collect/list/'+this.currPage+'/json')
				
				this.status = 'more'
				
				if(data.errorCode !==0) return  uni.$showMsg(data.errorMsg)
				
				this.favoriteList = [...this.favoriteList,...data.data.datas]
				
				this.total = data.data.total
			},
			
			//删除收藏
			async deleteHandler(item){
				//取消收藏
				const {data:data} = await uni.$http.post('/lg/uncollect_originId/'+item.originId+'/json')
								
				if(data.errorCode !==0) return uni.$showMsg(data.errorMsg)
				
				//删除元素
				this.favoriteList =	this.favoriteList.filter(x =>x.originId != item.originId)	
				
			},
			//跳转详情
			itemClickHandler(item){
				console.log(item)
				uni.navigateTo({
					url:'/subpackages/article_detail/article_detail?url='+ item.link
				})
			},
		
		}
	}
</script>

<style lang="scss">

.fav-container {
	padding: 5px 10px;
	background-color: $uni-bg-color-grey;
	
	.fav-item {		
		margin-top: 5px;
		padding: 10px;
		background-color: white;
		border-radius: 5px;
		
		.title {
			font-size: 14px;
		}
		.author {
			margin-top: 5px;
			color: #999;
			font-size: 12px;
		}
		.date {
			margin-top: 5px;
			color: #999;
			font-size: 12px;
		}
	}
}
</style>
