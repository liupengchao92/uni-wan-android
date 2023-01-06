<template>
	<view>
		
		<!-- 搜索组件 -->
		<my-search @click = "searchHandler"></my-search>
		
		<!-- 轮播图区域 -->
		<swiper indicator-dots="true" autoplay="true" aucircular="true">
			<swiper-item v-for="(item,i) in bannerList" :key="i" @click="onSiwperItemClick(item)">
				<view class="banner-item">
					<image class="img" :src="item.imagePath"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 文章区域 -->
		<view class="article-container">
			<block v-for="(article,i) in articleList" :key="i">
				<aritlce-item :article="article" :isShowLike="true" @click-favorite = "favorite"></aritlce-item>
			</block>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//轮播图
				bannerList: [],
				//文章列表
				articleList: [],
				//请求页码,从0开始。
				page: 0,
				//节流阀
				isLoading :false
			};
		},
		mounted() {

			this.getBannerList()
			
			this.getTopArticleList()

			this.getAritcleList()
		},
		//下拉刷新
		onPullDownRefresh() {
			
			this.page = 0
			
			this.articleList = []
			
			this.getTopArticleList()
			
			this.getAritcleList(() => 
				//停止刷新
				uni.stopPullDownRefresh()
			)
		},
		//上拉加载更多
		onReachBottom() {
			
			if(this.isLoading) return
			
			this.page++;
			
			this.getAritcleList()
		},
		methods: {

			//获取轮播图的数据
			async getBannerList() {
				
				const {data: data} = await uni.$http.get('/banner/json')

				if (data.errorCode !== 0) return uni.$showMsg()

				this.bannerList = data.data
			},

			//获取文章列表
			async getAritcleList(callback) {
				//打开节流阀
				this.isLoading = true
				
				const {data: data} = await uni.$http.get('/article/list/' + this.page + '/json')

				//关闭节流阀
				this.isLoading = false
				
				callback&&callback()

				if (data.errorCode !== 0) return uni.$showMsg(data.errorMsg)
				//合并数据
				this.articleList = [...this.articleList,...data.data.datas]
			},
			
			//获取置顶文章
			async getTopArticleList(){
				
				const {data:data} = await uni.$http.get('/article/top/json')
				
				if(data.errorCode !==0) return uni.$showMsg(data.errorMsg)
				
				this.articleList = [...data.data,...this.articleList]
			},
				
			//轮播图的点击事件
			onSiwperItemClick(item){
				uni.navigateTo({
					url:'/subpackages/article_detail/article_detail?url='+item.url
				})	
			},
			
			//跳转到搜索页面
			searchHandler(){				
				uni.navigateTo({
					url:'/subpackages/search/search'
				})
			},
			
			//收藏
			favorite(item){
				console.log(item)
				this.favoriteHandler(item)
			},
			
			//收藏文章
			async favoriteHandler(item){
				//判断收藏状态
				if(item.collect){	
					//取消收藏
					const {data:data} = await uni.$http.post('/lg/uncollect_originId/'+item.id+'/json')
					
					this.articleList.forEach(x =>{
						if(x.id === item.id){
							x.collect = false
						}
					})
					
					uni.showToast({title:'取消成功',duration:1500,icon:'success'})		
					
				}else{
					//收藏
					const {data:data} = await uni.$http.post('/lg/collect/'+item.id+'/json')
							
					if(data.errorCode !==0){
						
						if(data.errorCode===-1001){
							//需要重新登录
							uni.navigateTo({
								url:'/subpackages/login/login'
							})
						}
						
						return uni.$showMsg(data.errorMsg)
					}
							
					this.articleList.forEach(x =>{
						if(x.id === item.id){
							x.collect =  true
						}
					})
					
					uni.showToast({title:'收藏成功',duration:1500,icon:'success'})		
				}		
			},
		}
	}
</script>

<style lang="scss">
	swiper {
		padding: 5px 10px;
		height: 380rpx;
		background-color: $uni-bg-color-grey;

		//并集选择器
		.banner-item,
		image {
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}
	
	.article-container {
		
		background-color: $uni-bg-color-grey;
		
	
	}
	
</style>
