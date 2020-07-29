<template>
	<div class="list">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>角色列表</span>
				<el-button style="float: right;" icon="el-icon-circle-plus-outline" type="primary" plain @click="openInsertModal">添加角色</el-button>
			</div>

			<el-table :data="tableData" style="width: 100%">

				<el-table-column label="#" width="140">
					<template slot-scope="scope">
						<span>{{ scope.row.id }}</span>
					</template>
				</el-table-column>

				<el-table-column label="角色" width="140">
					<template slot-scope="scope">
						<!-- <span></span> -->
						<el-tag :type="scope.row.id ==1 ? 'success':''">{{ scope.row.name }}</el-tag>
					</template>
				</el-table-column>



				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" type="primary" :disabled="scope.row.name == '超级管理员'" plain @click.stop="openEditModal( scope.row.id,scope.$index)"></el-button>
						<el-button size="mini" icon="el-icon-delete" type="success" :disabled="scope.row.name == '超级管理员'" plain @click="handleDelete( scope.row.id,scope.$index)"></el-button>
						<el-button size="mini" icon="el-icon-setting" type="primary" plain @click='openConfig(scope.row.id,)'></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑角色" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleUpdateNode">保 存</el-button>
			</div>
		</el-dialog>
		<div class="auth" v-if="roleConfig">
			<el-card class="box-card" v-for="(item,index) in roleConfig" :key='item.id'>
				<div slot="header" class="clearfix">
					<div class="congfig"><i class="el-icon-collection-tag"></i>
						<span v-text="item.name"></span></div>
					<el-switch v-model="item.checked" @change="allChecked(item,index)" style="float: right;color: #409EFF;">
					</el-switch>
				</div>
				<div v-for="child in item.children" class="text item">
					{{child.name}}
					<el-switch v-model='child.checked' @change="checked(item,child)" style="float: right;">
					</el-switch>
				</div>
			</el-card>
		</div>
	</div>
</template>

<script>
	//进口
	import { Role } from '@/api/index'

	export default {
		data() {
			return {
				tableData: [],
				editModalShow: false,
				role_id: '',
				roleConfig: '',
				editForm: {
					id: '',
					name: '',
				},
			}

		},
		created() {
			//获取列表数据
			this.loadList();
			// this.loadInfo(this.$route.params.id)
		},
		methods: {
			//获取角色资料
			// async loadInfo(id) {
			// 	let { status, data } = await Role.info({ id });
			// 	if (status) {
			// 		this.form = data;
			// 	}
			// },
			//加载列表数据
			async loadList() {
				//展示加载
				this.isLoading = true;
				let { status, data } = await Role.list();
				this.tableData = data;
			},
			//保存
			async handleUpdateNode() {
				//表单验证
				//ajax
				let { status, msg } = await Role.editrole({ ...this.editForm });
				if (status) {
					this.$message.success(msg);

					//更新tree节


					this.editModalShow = false;
				}
			},

			openInsertModal() {
				this.$prompt('请输入添加的角色名称', '添加角色', {
						inputPattern: /\S/,
						inputErrorMessage: '不能输入空白字符'
					})
					.then(async ({ value }) => {
						let { status, data } = await Role.addrole({ name: value });
						if (status) {
							//更新Dom
							this.tableData.push({ name: value, ...data })
							this.$message.success('添加成功');
						}
					})
					.catch(() => {
						this.$message.info('取消成功');
					})
			},
			handleDelete(id, index) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						//删除角色
						let { status } = await Role.remove({ id });
						if (status) {
							//更新Dom
							this.tableData.splice(index, 1);
							this.$message.info('删除成功');
						}
					})
					.catch(() => {
						//取消
						this.$message.info('取消成功');
					})
			},
			//打开编辑Modal
			openEditModal(id, index) {
				this.editForm = this.tableData[index];
				this.editModalShow = true;
			},
			async openConfig(id) {
				this.role_id = id;
				//打开权限配置
				let { status, data, msg } = await Role.config({ id });
				if (status) {
					this.roleConfig = data;
				}
			},
			checked(item, child) {
				console.log(item);
				let status = false;
				item.children.forEach((item) => {
					if (item.checked) {
						status = true;
					}
				})
				item.checked = status;
				this.handleMenu(item);
				this.handleMenu(child);
			},
			allChecked(item, index) {
				var that = item;
				item.children.forEach((item, idx) => {
					item.checked = that.checked;
					this.$set(that.children, idx, item);
					this.handleMenu(item);
				})
				//判断是添加菜单还是删除菜单
				this.handleMenu(item);
			},
			async handleMenu(item) {
				if (item.checked) {
					//获取
					let data = { role_id: this.role_id, menu_id: item.id }
					console.log(data);
					let res = await Role.menuAdd(data);
					console.log(res);
				} else {
					let data = { role_id: this.role_id, menu_id: item.id }
					console.log(data);
					let res = await Role.menuDel(data);
					console.log(res);
				}
			}

		}
	}
</script>

<style scoped="scoped">
	.box-card {
		width: 550px;
	}

	.articlespn {
		display: inline-block;
		width: 100%;
		height: 40px;
		border-bottom: none;
		font-weight: 500;
		line-height: 40px;
	}

	.list .el-table {
		box-sizing: border-box;
	}

	.list {
		display: flex;
		justify-content: space-between;
	}

	.congfig {
		color: #409EFF;
		display: flex;
		align-items: center;
		font-size: 18px;
	}
</style>
