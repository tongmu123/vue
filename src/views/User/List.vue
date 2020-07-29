<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>

			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="id" label="#" width="80"></el-table-column>

				<el-table-column prop="avatar" label="头像" width="110">
					<template slot-scope="scope">
						<el-image style="width: 50px;border-radius: 50%;" :src="scope.row.avatar"></el-image>
					</template>
				</el-table-column>

				<el-table-column prop="username" label="账号" width="130"></el-table-column>

				<el-table-column prop="fullname" label="姓名" width="110"></el-table-column>

				<el-table-column prop="sex" label="性别" width="110"></el-table-column>

				<el-table-column prop="tel" label="手机" width="110"></el-table-column>

				<el-table-column label="角色" width="110">
					<template slot-scope="scope">
						<el-tag :type="scope.row.role == 1 ? 'success':'' ">{{scope.row.role_name}}</el-tag>
					</template>
				</el-table-column>

				<el-table-column prop="login_time" label="上次登录" width="140"></el-table-column>

				<el-table-column prop="login_count" label="登录次数" width="110"></el-table-column>

				<!-- 点编辑的时候获取当前id的信息  需要路由传参 即根据id传参（Article里面的 路径 path: 'edit/:id',） -->
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" plain @click.stop="openEditModal( scope.row.id,scope.$index)"></el-button>
						<el-button size="mini" icon="el-icon-delete" type="success" :disabled="scope.row.role_name == '超级管理员'" plain
						 @click="handleDelete( scope.row.id,scope.$index)"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-dialog title="修改信息" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="姓名" label-width="120px">
					<el-input v-model="editForm.fullname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex" label-width="120px">
					<el-radio-group v-model="editForm.sex">
						<el-radio label="男">男</el-radio>
						<el-radio label="女">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="电话" label-width="120px">
					<el-input v-model="editForm.tel" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限" label-width="120px">
					<el-select v-model="editForm.role_name">
						<!-- <el-option v-for="item in Limitslist" :value="item.name"></el-option> -->
					</el-select>
				</el-form-item>
				<el-form-item label="头像" label-width="120px">
					<SingleUpload :url='editForm.avatar' @success='handleUploadSuccess($event)' @remove='editForm.avatar=""'></SingleUpload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click='editModalShow = false'>取 消</el-button>
				<el-button type="primary" @click='handleUpdateNode'>保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { User } from '@/api/index'
	import SingleUpload from '@/components/SingleUpload.vue';

	export default {
		components: {
			SingleUpload,
		},
		data() {
			return {
				tableData: [],
				editModalShow: false,
				editForm: {					 
					name: '',
					sex: '',
					tel: '',
					role: '',
					avatar: '',
				},
			}
		},
		created() {
			//生命周期获取数据
			this.loadList();
		},
		methods: {
			//封装一个方法
			async loadList() { /* 加载列表数据 */
				let { status, data, msg } = await User.list();
				if (status) {
					this.tableData = data;
				}
			},
			//删除用户
			handleDelete(id, index) {
				// console.log(index, row);
				this.$confirm('此操作将永久删除该用户, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						//删除管理员
						let { status } = await User.remove({ id });
						if (status) {
							//更新dom
							this.tableData.splice(index, 1);
							this.$message.info('删除成功');
						}

					})
					.catch(() => {
						//取消
						this.$message.info('删除失败');
					})
			},
			//打开编辑Modal
			openEditModal(id, index) {
				this.editForm = this.tableData[index];
				this.editModalShow = true;
			},
			//保存
			async handleUpdateNode() {
				//表单验证
				//ajax
				let { status, msg } = await User.edit({ ...this.editForm });
				if (status) {
					this.$message.success(msg);

					//更新tree节


					this.editModalShow = false;
				}
			},
		}
	}
</script>

<style>
</style>
