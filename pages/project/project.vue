<template>
	<view>
		项目
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//项目分类数据
				projectTreeList:[],
				//项目表数据
				projetList:[]
			};
		},
		methods:{
			
			//获取项目分类数据
			async getProjectTreeList(){
				
				const{data:data} = await uni.$http.get('/project/tree/json')
				
				if(data.errorCode !==0) return uni.$showMsg(data.errorMsg)
				
				this.projectTreeList = data.data
			},
						
			//获取项目列表数据
			async getProjectList(){
				
				const {data:data} = await uni.$http.get('')
				
			}
		}
	}
</script>

<style lang="scss">

</style>
