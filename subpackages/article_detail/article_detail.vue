<template>
	<view>
		<!-- webview -->
		<web-view :src="url" :webview-styles="webviewStyles" fullscreen="true"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//webview加载路径
				url:'',
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}			
				}
			};
		},
		onLoad(options) {
			//获取传递的参数
			 this.url = options.url || ''
		}
	}
</script>

<style lang="scss">

</style>
