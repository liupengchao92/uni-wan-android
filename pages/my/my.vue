<template>
	<view>
		<my-login v-if="!cookies"></my-login>
		<login-info v-else></login-info>
	</view>
</template>

<script>
	
	import {mapMutations,mapState} from 'vuex'
	
	export default {
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['cookies'])
		}
	}
</script>

<style lang="scss">
	

</style>
