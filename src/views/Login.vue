<template>
	<div class="bg">
		<el-card class="login-card">
			<div slot="header" class="clearfix">
				<span>登录</span>
			</div>
			<el-form :rules="rules" ref="form" :model="form" label-width="80px">
				<el-form-item label="账户" prop="username">
					<el-input prefix-icon="el-icon-user" v-model="form.username" placeholder="请输入账户"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input prefix-icon="el-icon-key" show-password v-model="form.password" placeholder="请输入密码">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleLogin('form')">登录</el-button>
				</el-form-item>
				<div class="action-box">
					<router-link to="/register">注册用户</router-link>
					<router-link to="/">忘记密码</router-link>
				</div>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	//进口
	import {
		Goods
	} from '@/api/index';

	export default {
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
							required: true,
							type: 'string',
							message: '请输入账户名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 5,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						type: 'string',
						message: '请输入密码',
						trigger: 'blur'
					}, {
						pattern: /^\d{3,}$/,
						message: '至少3位数字',
						trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			handleLogin(formName) {
				// console.log(form);
				this.$refs[formName].validate(async (valid) => {
					if (!valid) {
						//验证失败
						return false;
					}
					//校验通过
					let {
						status,
						msg,
						data
					} = await Goods.login({ ...this.form
					});
					if (status) {
						// 登陆成功储存Token,id,editRole
						sessionStorage.token = data.token;
						sessionStorage.uid = data.id;
						sessionStorage.role = data.role;
						this.$message.success(msg);
						this.$router.replace('/goods/list')
					}
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.bg {
		position: relative;
		background: url(../assets/img/login-bg.jpg) top center no-repeat;
		background-size: cover;
		height: 100vh;
	}

	.login-card {
		position: absolute;
		top: 50%;
		right: 40px;
		transform: translateY(-50%);
	}

	.action-box {
		font-size: 13px;
		justify-content: space-between;
		display: flex;

	}
</style>
