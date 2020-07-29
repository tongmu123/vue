<template>
	<div>
		<el-card class="box-card">
			<div slot="header">
				<span>分类列表</span>
			</div>
			<!-- 树形组件 -->
			<el-tree ref="tree" lazy :load="loadNode" node-key="id" :default-expanded-keys="[1]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data}">
					<span>{{ node.label }}</span>
					<span>
						<el-button type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini" @click.stop="() => openEditModal(node,data)">
							编辑
						</el-button>
						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="() => openInsertModal(node,data)">
							添加
						</el-button>
						<el-button type="text" icon="el-icon-delete" size="mini" @click.stop="() => remove(node, data,id)">

							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="名称" label-width="40px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="图片">
					<SingleUpload :url='insertForm.img' @success='handleUploadSuccess($event)' @remove='insertForm.img=""'></SingleUpload>

				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleInsertNode">添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm">
				<el-form-item label="分类名称" label-width="70px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="图片" style="margin-left: 30px;">
					<SingleUpload :url='editForm.img' @success='handleUploadSuccess($event)' @remove='editForm.img=""'></SingleUpload>

				</el-form-item>

			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="handleUpdateNode">保 存</el-button>
			</div>
		</el-dialog>
	</div>

</template>

<script>
	import { Goods } from '@/api/index';
	import SingleUpload from '@/components/SingleUpload.vue'

	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					pId: '',
					img: '',
				},
				editForm: {
					id: '',
					name: '',
					pId: '',
					img: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
			};
		},
		methods: {
			async loadNode(node, resolve) {
				//node:节点对象
				//resolve:返回节点数据的方法
				if (node.level === 0) {
					let { status, data } = await Goods.subcate({ pId: 0 });
					return resolve(data);
				}

				//取出父级节点iD
				let pId = node.data.id;
				//获取子级节点数据
				let { status, data } = await Goods.subcate({ pId });
				if (status) {
					return resolve(data);
				}
			},
			//打开编辑Modal
			openEditModal(node, data) {

				this.editForm = { ...data };
				this.node = node;
				this.editModalShow = true;

			},
			//保存
			async handleUpdateNode() {
				//表单验证
				//ajax
				let { status, msg } = await Goods.edit({ ...this.editForm });
				if (status) {
					this.$message.success(msg);

					//更新tree节
					this.node.data = this.editForm;
					this.editModalShow = false;
				}
			},
			//打开添加model
			openInsertModal(node, data) {
				//node：节点对象    data：节点数据
				//同步名称
				// this.insertForm.name = data.name;
				this.insertForm = {
					name: '',
					pId: '',
					img: '',
				}
				this.node = node;
				this.insertForm.pId = data.id;
				this.insertModalShow = true;
			},
			//插入节点
			async handleInsertNode() {
				//1.表单校验
				//2.校验通过 ajax
				let { status, msg, data } = await Goods.addcategory({ ...this.insertForm });
				if (status) {
					this.$message.success(msg);

					//更新页面，更新tree节
					//插入新的节点
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);

					this.insertModalShow = false;
				}
			},
			remove(node, data) {
				let id = data.id;
				this.$confirm('此操作将永久删除该菜单, 是否继续?', {
						type: 'warning'
					})
					.then(async () => {
						//删除角色
						let { status, msg } = await Goods.removecategory({ id });
						if (status) {
							//更新Dom
							this.$refs.tree.remove({ ...data });
							this.$message.info('删除成功');
						}
					})
					.catch(() => {
						//取消
						this.$message.info('取消成功');
					})
			},
			//头像上传成功
			handleUploadSuccess(res) {
				console.log(res);
				this.editForm.img = res.src;
				this.insertForm.img = res.src;
			},

		}
	};
</script>

<style scoped="scoped">
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
