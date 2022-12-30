<template>
	<view>
		<view class="test" :style="{'background-color':color}">
			A
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				color:'',
				
			};
		},
		onLoad() {
			this.color = this.getRandomColor()
		},
		methods:{
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
 .test {
	 width: 100px;
	 height: 100px;
	 background-color: lightcoral;
 }
</style>
