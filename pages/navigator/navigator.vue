<template>
	<view class="navi-container">
		<!-- 左边导航分类 -->
		<scroll-view class="navi-left" scroll-y="true" :style="{height:windowH +'px'}">
			<block v-for="(item,i) in naviList" :key="i">
				<view :class="['navi-left-item',i===selectPosition?'select':'']" @click="onSelectChange(i)">{{item.name}}</view>
			</block>	
		</scroll-view>
		<!-- 右边导航 -->
		<view class="navi-right" >
			<block v-for="(item2,i2) in naviChildrenList" :key="i2">
				<view class="navi-right-item" :style="{'background-color':item2.color}"  @click="goToArticleDetailHandler(item2)">{{item2.title}}</view>
			</block>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//导航分类数据
				naviList:[],
				//分类列表数据
				naviChildrenList:[],
				//选中的位置
				selectPosition:0,
				//屏幕可用高度
				windowH:0,
			};
		},
		onLoad() {
			
			const sysInfo = uni.getSystemInfoSync()
					
			this.windowH = sysInfo.windowHeight
			
			this.getNaviList()
		},
		methods:{
			
			//获取导航数据
			async getNaviList(){
				
				const {data:data} = await uni.$http.get('/navi/json')
				
				if(data.errorCode !== 0) uni.$showMsg(data.errorMsg)
				
				//一级导航数据
				this.naviList = data.data
				//二级导航数据
				this.naviChildrenList = this.getNaviChildrenList(0)
			},
			
			//选中的位置发生改变
			onSelectChange(position){
				
				this.selectPosition = position
				//重新赋值数据
				this.naviChildrenList = this.getNaviChildrenList(position)
			},
			
			//跳转到详情页面
			goToArticleDetailHandler(item){
				uni.navigateTo({
					url:'/subpackages/article_detail/article_detail?url=' + item.link
				})
			},
			
			//获取二级目录数据
			getNaviChildrenList(position){
				
				const articles = this.naviList[position].articles
				
				articles.forEach(item =>{
					item.color = this.getRandomColor()
				})	
				return articles
			},
			
			//获取随机颜色值
			getRandomColor() {
			   const rgb = []
			       for (let i = 0; i < 3; ++i) {
			           let color = Math.floor(Math.random() * 256).toString(16)
			           color = color.length == 1 ? '0' + color : color
			           rgb.push(color)
			       }
			       return '#' + rgb.join('')
			   }        
		}	
	}
</script>

<style lang="scss">
.navi-container {
	display: flex;
	.navi-left {
		width: 135px;
		background-color: $uni-bg-color-grey;
		.navi-left-item {
			text-align: center;
			height: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 5px;
			background-color: white;
			border-radius: 4px;
			box-shadow: 0 0 1px gray;
			
			&.select {
				background-color: #007aff;
				color: white;
			}
			
		}
	}
	.navi-right {
		width: 100%;
		background-color:white;
		display: flex;
		flex-wrap: wrap;
		align-items: flex-start;
		justify-content: space-around;
		align-content: center;
		
		.navi-right-item {
			padding: 3px 8px;
			font-size: 12px;
			text-align: center;
			margin: 10px 5px;
			border-radius: 15px;
			//border: 1px solid #007aff;
			color: white;
		}
	}
}	
</style>
