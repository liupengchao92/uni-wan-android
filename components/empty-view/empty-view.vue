<template>
	<view class="empty-container">
		
		<image class="icon" src="../../static/empty_article.png"></image>
		
		<text class="text">{{tips}}</text>
		
	</view>
</template>

<script>
	export default {
		name:"empty-view",
		props:{
			tips:{
				type:String,
				default:'没有数据'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	
 page ,.empty-container {
	 width: 100%;
	 height: 100%;
	 display: flex;
	 flex-direction: column;
	 align-items: center;
	 justify-content: center;
	 .icon {
		 width: 120px;
		 height: 120px;
	 }
	 
	 .text {
		 margin-top: 15px;
	 }
 }
</style>