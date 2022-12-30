<template>
	<view class="search-cotainer">
		<view class="search-box" @click="searchHandler">
			<uni-icons type="search" ></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			searchHandler(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss">
.search-cotainer {
	height: 55px;
	background-color: #007aff;
	display: flex;
	justify-content: center;
	
	.search-box {
		display: flex;
		height: 36px;
		width: 90%;
		background-color: white;
		border-radius: 50px;
		align-items: center;
		justify-content: center;
		align-content: center;
		margin-top: 5px;
		
		.placeholder {
			margin-left: 10px;
			color: #333333;
			font-size: 14px;
		}
	}
}
</style>