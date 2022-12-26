<template>
	<view class="project-container">
		<!-- TabLayout导航栏 -->
		<scroll-view class="tab-layout" scroll-x="true" :style="{width:windowWidth +'px'}">
			<block v-for="(tab,i) in projectTreeList" :key="i">
				<view :class="['tab',i===current?'select':'']" @click="onTabChangeHandler(i)">{{tab.name}}</view>
			</block>	
		</scroll-view>
		
		<!-- 项目列表 -->
		<view class="project-list">
			<block v-for="(project,i) in projetList" :key="i">
				<view class="project-item" @click="goToArticleDetailHandler(project)">
					<!-- 左边-封面 -->
					<view class="item-left-pic">
						<image class="pic" :src="project.envelopePic"></image>
					</view>
					<!-- 右边信息 -->
					<view class="item-right-info">
						<view class="top-info">
							<view class="project-title">{{project.title}}</view>
							<view class="project-desc">{{project.desc}}</view>	
						</view>
						<view class="project-date-fav">
							<view class="project-date">{{project.niceDate}}</view>
							<uni-icons type="heart" size="20"></uni-icons>
						</view>	
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
				//项目分类数据
				projectTreeList:[],
				//项目表数据
				projetList:[],
				//可用屏幕宽度
				windowWidth:0,
				//当前选中的位置
				current:0,
				//当前项目种类id
				cid:'',
				//分页数
				page:1,
				//节流阀
				isLoading:false
			};
		},
		
		onLoad() {
			//获取设备信息
		   const sysInfo = uni.getSystemInfoSync()
		   
		   this.windowWidth = sysInfo.windowWidth
		   
		   this.getProjectTreeList()
		   
		},
		//上拉加载更多
		onReachBottom() {
			
			if(this.isLoading) return
			
			this.page++
			
			this.getProjectList()
		},
		methods:{
			
			//获取项目分类数据
			async getProjectTreeList(){
				
				const{data:data} = await uni.$http.get('/project/tree/json')
				
				if(data.errorCode !==0) return uni.$showMsg(data.errorMsg)
				
				this.projectTreeList = data.data
				
				this.cid = this.projectTreeList[this.current].id
				
				this.getProjectList()
			},
						
			//获取项目列表数据
			async getProjectList(){
				
				this.isLoading = true
				
				const {data:data} = await uni.$http.get('/project/list/'+ this.page +'/json?cid=' + this.cid)
				
				this.isLoading = false
				
				if(data.errorCode !==0) return uni.$showMsg(data.errorMsg)
				
				this.projetList = [...this.projetList,...data.data.datas]
			},
			
			//tab发生改变
			onTabChangeHandler(position){
				
				this.current = position
				
				this.page = 1
				
				this.projetList = []
				
				this.cid = this.projectTreeList[position].id
				
				this.getProjectList()
			},
			
			//点击ite跳转到文章详情
			goToArticleDetailHandler(project){
				uni.navigateTo({
					url:'/subpackages/article_detail/article_detail?url=' + project.link
				})
			}
		}
	}
</script>

<style lang="scss">
	
.project-container {
	
	.tab-layout {
		position: sticky;
		z-index: 999;
		top: 0;
		background-color: #007aff;
		height: 45px;
		width: 100%;
		white-space: nowrap;
		
		.tab {
			align-items: center;
			height: 100%;
			margin: 0 6px;
			display: inline-flex;
			font-size: 13px;
			color: lightgray;
				
			&.select {
				font-size: 14px;
				color: white;
				position: relative;
				
				&::after {
					content: '';
					display: block;
					width: 100%;
					height: 3px;
					background-color: white;
					position: absolute;
					bottom: 2px;
					left: 0;
					border-radius: 5px;
				}
			}
		}
	}
}

.project-list {
	
	.project-item {
		display: flex;
		justify-content: flex-start;
		padding: 5px 8px;
		border-bottom: 1px solid #efefef;

		.item-left-pic {
			margin-right: 10px;
			.pic {
				width: 80px;
				height: 115px;
			}
		}
		
		.item-right-info {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.top-info {
				.project-title {
					font-size: 13px;
					overflow: hidden;
					color: $uni-color-title;
					-webkit-line-clamp: 2;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					text-overflow: ellipsis;
				}
				
				.project-desc {
					margin-top: 5px;
					color:$uni-color-subtitle;
					font-size: 12px;
					display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
					overflow: hidden;
					word-break: break-all;  /* break-all(允许在单词内换行。) */
					text-overflow: ellipsis;  /* 超出部分省略号 */
					-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
					-webkit-line-clamp: 3; /** 显示的行数 **/
				}
			}
			.project-date-fav {
				align-items: center;
				display: flex;
				justify-content: space-between;
				
				.project-date {
					color:$uni-color-subtitle;
					font-size: 12px;
				}
			}	
		}
	}
}
</style>
