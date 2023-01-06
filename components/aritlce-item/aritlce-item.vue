<template>
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
		<view class="favorite" @click.stop="favoriteHandler(article)" v-if="isShowLike">
			<uni-icons type="heart-filled" color="#007aff" size="20" v-if="article.collect"></uni-icons>
			<uni-icons type="heart" size="20" v-else></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:"aritlce-item",
		data() {
			return {
				
			};
		},
		//自定义属性
		props:{
			//文章
			article:{
				type:Object,
				default:{}
			},
			//是否展示收藏
			isShowLike:{
				type:Boolean,
				default:false
			}

		},
		methods:{
			
			//拼接作者和日期
			getAuthorDate(item){
				let author = item.author || item.shareUser 
				let date = item.niceDate || item.niceShareDate
				return author + "   "+date
			},
			
			//点击文章跳转
			onItemClick(item){
				uni.navigateTo({
					url:'/subpackages/article_detail/article_detail?url='+item.link
				})
			},
			//收藏文章
			favoriteHandler(item){
				this.$emit('click-favorite',item)
			}
		}
	}
</script>

<style lang="scss">
	
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
					border: 1px solid #09bb07;
					color: #09bb07;
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

	
</style>