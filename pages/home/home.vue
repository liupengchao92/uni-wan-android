<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper indicator-dots="true" autoplay="true" aucircular="true">
			<swiper-item v-for="(item,i) in bannerList" :key="i">
				<view class="banner-item">
					<image class="img" :src="item.imagePath"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 文章区域 -->
		<view class="article-container">
			<block v-for="(article,i) in articleList" :key="i">
				<!-- 文章item -->
				<view class="article-item" @click="onItemClick(article)">
					<!-- 文章左边信息 -->
					<view class="article-info">
						<!-- 文章标题上半部分 -->
						<view class="article-info-top">
							<view class="fresh" v-if = "article.fresh">新</view>
							<view class="article-title">{{article.title}}</view>
						</view>
						<!-- 文章下半部分 -->
						<view class="article-info-bottom">
							<view class="top" v-if="article.type!==0">置顶</view>
							<view class="author-date">{{getAuthorDate(article)}}</view>
						</view>
						<!-- 标签 -->
						<view class="tags-container" v-if="article.tags.length !==0">
							<view class="tag-item" v-for="(tag,i2) in article.tags" :key="i2">
								{{tag.name}}
							</view>
						</view>
					</view>
					<!-- 收藏按钮 -->
					<view class="favorite">
						<uni-icons type="heart" size="24"></uni-icons>
					</view>
				</view>
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

			this.getAritcleList()
		},
		//下拉刷新
		onPullDownRefresh() {
			
			this.page = 0
			
			this.articleList = []
			
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

				if (data.errorCode !== 0) return uni.$showMsg()
				//合并数据
				this.articleList = [...this.articleList,...data.data.datas]
			},
			//拼接作者和日期
			getAuthorDate(item){
				let author = item.author || item.shareUser 
				let date = item.niceDate || item.niceShareDate
				
				return author + "   "+date
			},
			
			onItemClick(item){
				uni.navigateTo({
					url:'/subpackages/article_detail/article_detail'
				})
			}
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
	
	.article-item {
		background-color: $uni-bg-color;
		margin: 5px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 5px;
		padding: 15rpx 20rpx;
		
		.article-info {
			
			.article-info-top {
				display: flex;
				align-items:flex-start;
				.fresh {
					padding: 0 2px;
					font-size: 11px;
					border: 1px solid #c00000;
					color: #c00000;
					margin-right: 5px;
				}
				.article-title {
					font-size: 14px;
					color: $uni-text-color;
				}
			}
			
			.article-info-bottom {
				margin-top: 5px;
				display: flex;
				align-items: center;
				.top {
					padding: 0 2px;
					font-size: 11px;
					border: 1px solid $uni-color-primary;
					color: $uni-color-primary;
					margin-right: 5px;
				}
				.author-date {
					font-size: 12px;
					color: $uni-color-subtitle;
				}
			}
			
			.tags-container {
				display: flex;
				margin-top: 5px;
				
				.tag-item {
					margin-right: 5px;
					font-size: 11px;
					padding: 0 2px;
					color: $uni-color-primary;
					border: 1px solid $uni-color-primary;
				}
			}
		}
	}
}
	
</style>
