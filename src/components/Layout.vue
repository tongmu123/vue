<template>
	<el-container>
		<!-- title -->
		<el-header>
			<NavBar></NavBar>
		</el-header>
		
		<el-container>
			
			<!-- 侧边栏菜单 -->
			<el-aside width="200px">				
				<LeftMenu></LeftMenu>
			</el-aside>
			
			<!-- 主体内容 -->
			<el-main>				
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	//进口
	import NavBar from '@/components/NavBar.vue';
	import LeftMenu from '@/components/LeftMenu.vue';

	// 注册
	export default {
		components: {
			NavBar,
			LeftMenu
		}
	}
</script>

<style>
	.el-header{
		padding: 0 !important;
	}
	.main {
		display: flex;

	}

	.content {
		padding: 10px;
	}
</style>
