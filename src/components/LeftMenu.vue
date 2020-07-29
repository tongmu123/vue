<template>
	<div class="left-menu">
		<el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
			<el-submenu index="1">
				<template slot="title">
					<i class="el-icon-goods"></i>
					<span>商品管理</span>
				</template>

				<el-menu-item-group>
					<el-menu-item index="/goods/classify">商品分类</el-menu-item>					
				</el-menu-item-group>

				<el-menu-item-group>
					<el-menu-item index="/goods/release">发布商品</el-menu-item>				
				</el-menu-item-group>
				
				<el-menu-item-group>
					<el-menu-item index="/goods/list">商品列表</el-menu-item>				
				</el-menu-item-group>
			</el-submenu>

		<el-submenu index="2">
			<template slot="title">
				<i class="el-icon-files"></i>
				<span>订单管理</span>
			</template>
			<el-menu-item-group>
				<el-menu-item index="/Order/List">订单列表</el-menu-item>
				
			</el-menu-item-group>
		
		</el-submenu>
		
			<el-submenu index="3">
				<template slot="title">
					<i class="el-icon-setting"></i>
					<span>账户设置</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/Account/list">账户信息</el-menu-item>					
				</el-menu-item-group>

			</el-submenu>

			<!-- <el-menu-item index="4">
				<i class="el-icon-setting"></i>
				<span slot="title">管理员管理</span>
			</el-menu-item> -->
			<el-submenu index="4">
				<template slot="title">
					<i class="el-icon-user"></i>
					<span>用户管理</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/User/List">用户列表</el-menu-item>
				</el-menu-item-group>
			</el-submenu>

			<el-submenu index="5">
				<template slot="title">
					<i class="el-icon-set-up"></i>
					<span>权限设置</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="/Role/Roles">用户角色</el-menu-item>				
				</el-menu-item-group>
				
				<el-menu-item-group>
					<el-menu-item index="/Role/Menu">菜单权限</el-menu-item>				
				</el-menu-item-group>
			</el-submenu>

		</el-menu>

	</div>
</template>

<script>
	export default {
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style>
	.left-menu {
		height: 100vh;
		background-color: #545c64;
	}
	li {
		min-width: 0px !important;
	}

</style>
