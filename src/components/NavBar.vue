<template>
	<div class="navbar">
		<div class="left">
			<img src="@/assets/img/logo.png" alt="">
			<i class="el-icon-s-fold"></i>
		</div>
		<div class="rgt">
			<el-avatar size="small" :src="ruleForm.avatar"></el-avatar>
			<el-dropdown>
				<span style="color: white;" class="el-dropdown-link">
					{{ruleForm.username}}
					<i class="el-icon-arrow-down el-icon--right"></i>						
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>信息</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>

</template>

<script>
	import { User } from '@/api/index';
	
		export default {
			data() {
				return {
					ruleForm: {
						username: '',
						fullname: '',
						sex: '',
						tel: '',
						role: '',
						avatar: '',
					},
				};
			},
			created() {
				this.loadList();
			},
			methods: {
				//获取信息
				async loadList() {
					let id = sessionStorage.uid;
					let { status, data } = await User.info({ id });
					if (status) {
						this.ruleForm = data;
					}
				},
			}
		}
</script>

<style>
	.navbar {
		display: flex;
		flex-direction: row;
		background-color: black;
		color: white;
		height: 55px;
		line-height: 55px;
	}

	.el-icon-s-fold {
		display: inline-block;
		position: relative;
		top: -20px;
	}

	.navbar .left img {
		width: 200px;
		height: 55px;
	}

	.navbar .rgt {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		right: 30px;
	}

	.el-dropdown-link{
		display: inline-block;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
