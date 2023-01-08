<template>
	<view>
		<!-- 搜索区域 -->
		<view class="search-cotainer">	
			<view class="search-box">
				<uni-search-bar bgColor="#fff" radius="50" placeholder="请输入搜索内容" v-model="searchModel" maxlength="15" cancelButton="none" @input="inputHandler"></uni-search-bar>
			</view>
		</view>
		<!-- 搜索关键词区域 -->
		<view class="search-key_container" v-if="searchResult.length===0">
			<!-- 搜索热词 -->
			<view class="hotkey-box">
				<!-- 标题 -->
				<view class="hotkey-title">
					<image class="hot-icon" src="../../static/hot.png"></image>
					<text class="hot-text">搜索热词</text>
				</view>
				<view class="hotkey">
					<!-- 热词内容 -->
					<block v-for="(item,i) in hotKeyList" :key="i">
						<view class="hotkey-item">
							<uni-tag :inverted="true" :text="item.name" type="primary" @click="clickTag(item.name)"/>
						</view>		  
					</block>
				</view>
			</view>
			<!-- 搜索历史 -->
			<view class="search-history" v-if="historyList.length!==0">
				<!-- 标题部分 -->
				<view class="history-title">
					<text class="title">搜索历史</text>
					<image class="clear" src="../../static/clear.png" @click="clearHandler"></image>
				</view>
				<view class="history-list">
					<block v-for="(item,i) in historyList" :key="i">
						<view class="hotkey-item">
							<uni-tag :text="item" type="default" circle="true"  @click="clickTag(item)"/>
						</view>		  
					</block>
				</view>
			</view>
		</view>
		<!-- 搜索结果列表 -->
		<view class="search-result" v-else>
			
			<block v-for="(item,i) in searchResult" :key="i">
				<aritlce-item :article="item"></aritlce-item>
			</block>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//搜索热词
				hotKeyList:[],
				//搜索结果
				searchResult:[],
				//搜索历史
				historyList:[],
				//延迟器
				timer:null,
				//搜索框绑定的值
				searchModel:''
				
			};
		},
		onLoad() {
			//获取搜索热词
			this.getHotKeyList()
			//获取搜索历史
			this.historyList = JSON.parse(uni.getStorageSync('search-history') || '[]')
			
		},
		methods:{
			
			async getHotKeyList(){
				
				const {data:data} = await uni.$http.get('/hotkey/json')
				
				if(data.errorCode !==0) return  uni.$showMsg(data.errorMsg)
				
				this.hotKeyList = data.data

			},
			
			//搜索输入监听
			inputHandler(event){
				//清除延迟器
				clearTimeout(this.timer)
				//重新设置延迟器
				this.timer = setTimeout(() =>{
					//字符串是否为空
					if(event.length === 0){
						this.searchResult = []
						return
					}
					
					this.seach(event)
					
				},500)
			},
			
			//搜索
			async seach(keyword){
				
				const{data:data} = await uni.$http.post('/article/query/0/json?k='+ keyword)
				
				this.addHistory(keyword)
				
				if(data.errorCode !==0) return  uni.$showMsg(data.errorMsg)
				
				this.searchResult = data.data.datas
			},
			//添加到历史
			addHistory(keyword){
				//转化成Set集合
				var set = new Set(this.historyList)
				//删除旧的
				set.delete(keyword)
				//添加新的
				set.add(keyword)
				//将Set转换成数组，并且反转数组。
				this.historyList = Array.from(set).reverse()
				//持久化存储
				uni.setStorageSync('search-history',JSON.stringify(this.historyList))
			},
			//清空搜索历史
			clearHandler(){
				uni.showModal({
					content:'是否清空搜索历史？',
					success:function(res){
						if(res.confirm){
							this.historyList = []
							uni.removeStorageSync('search-history')
						}
					}.bind(this)
				})
			},
			//搜索热词
			clickTag(keyword){
				//点击标签搜索
				//this.seach(keyword)
				this.searchModel = keyword
			}
		}
	}
</script>

<style lang="scss">
	
 .search-cotainer {
	 background-color: #007aff;
 }
 
.search-key_container {
	display: flex;
	flex-direction: column;
	
	.hotkey-box {
		 padding: 10px 10px;
		 border-bottom: 1px solid #efefef;
		 display: flex;
		 flex-direction: column;
	
		 .hotkey-title {
			 display: flex;
			 align-items: center; 
			 .hot-icon {
				 width: 20px;
				 height: 20px;
			 }
			 .hot-text {
				 font-size: 15px;
				 margin-left: 10px;
			 }
		 }
		 .hotkey {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: flex-start; 
			margin-top: 5px;
			
			.hotkey-item {
				margin: 5px;
			}
		 }
	}
	
	.search-history {
		display: flex;
		flex-direction: column;
		align-items: center;
		border-bottom: 1px solid #efefef;
		
		.history-title {
			margin-top: 5px;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title {
				margin-left: 10px;
				font-size: 15px;
			}
			.clear {
				margin-top: 10px;
				margin-right: 10px;
				width: 20px;
				height: 20px;
			}
		}
		.history-list {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: flex-start;
			margin-top: 5px;
			padding-left: 10px;
			padding-bottom: 10px;
			
			.hotkey-item {
				margin: 5px;
			}	
		}
	}

}

.search-result {
	
		background-color: $uni-bg-color-grey;
	}
 
</style>
