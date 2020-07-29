<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>菜单权限</span>
			</div>
			<div class="tips">
				<i class="el-icon-warning"></i>
				<div class="tips_content">
					<span class="tips_content_tips">Tips</span>
					<p>设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。</p>
				</div>
			</div>

			<!-- 树形组件 -->
			<el-tree ref="tree" lazy :load="loadNode" node-key="id" :default-expanded-keys="[1]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data}">
					<span>{{ node.label }}</span>
					<span>

						<el-popover placement="left" width="100" font-size='20px' trigger="hover">
							<i :class="`el-icon-${data.icon}`" style="font-size: 25px;"></i>
							<el-button slot="reference" type="text" @click.stop='openIconModal(node,data)' :icon="`el-icon-${data.icon}`"
							 :disabled="node.level==0" size="mini">
								图标
							</el-button>
						</el-popover>

						<el-button type="text" icon="el-icon-edit" :disabled="node.level==1" size="mini" @click.stop="() => openEditModal(node,data)">
							编辑
						</el-button>

						<el-button type="text" icon="el-icon-plus" size="mini" @click.stop="() => openInsertModal(node,data)">
							添加
						</el-button>

						<el-button type="text" icon="el-icon-delete" size="mini" @click.stop="() => remove(node, data,id)">
							删除
						</el-button>

						<span style="font-size: 11px; margin-left: 5px;">显示序号：</span>


						<el-tag>{{data.order}}</el-tag>


					</span>

				</span>
			</el-tree>
		</el-card>
		<!-- 图标弹窗 -->
		<el-dialog title="修改图标" :visible.sync="editIconShow" width="79%">
			<ul class="icon_box">
				<div v-for="(item,index) in iconList" :class="{icon_active:item.checked}" @click.stop='iconActive(item,index)' >
					<li :class="`el-icon-${item.name}`"></li>
					<p v-text="item.name"></p>
				</div>
			</ul>
			<el-pagination background layout="prev,pager, sizes, next" :page-size="30" @size-change="handleSizeChange" style="float: right;"
			 :page-sizes="pageNum" :total='300' @current-change='currentchange '>
			</el-pagination>
			<div slot="footer" class="dialog-footer">
				<el-button @click='cancel'>取 消</el-button>
				<el-button type="primary" @click="handleIconEdit('editForm')">保 存</el-button>
			</div>
		</el-dialog>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm">
				<el-form-item label="菜单名称" label-width="120px">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="链接地址" label-width="120px">
					<el-input autocomplete="off" placeholder="指定此菜单的链接地址,选填"></el-input>
				</el-form-item>

				<el-form-item label="显示序号" label-width="120px">
					<el-input v-model="insertForm.order" autocomplete="off" placeholder="先顺序按照数字从大到小,如2001"></el-input>
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
				<el-form-item label="菜单名称" label-width="120px">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>

				<el-form-item label="链接地址" label-width="120px">
					<el-input autocomplete="off" v-model="editForm.address" placeholder="指定此菜单的链接地址,选填"></el-input>
				</el-form-item>

				<el-form-item label="显示序号" label-width="120px">
					<el-input v-model="editForm.order" autocomplete="off"></el-input>
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
	import { Role } from '@/api/index'

	export default {
		data() {
			return {
				defaultProps: {
					label: 'name',
					order: 'order',
				},

				insertForm: {
					name: '',
					pId: '',
					order: ''
				},
				editForm: {
					id: '',
					name: '',
					pId: '',
					order: '',
					address: ''
				},
				iconEdit: {
					id: '',
					icon: '',
					name: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				editIconShow: false,
				insertModalShow: false,
				editModalShow: false,
				iconList: [],
				pageNum: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
				isActive:false,

			};
		},
		methods: {
			async loadNode(node, resolve) {
				//node:节点对象
				//resolve:返回节点数据的方法
				if (node.level === 0) {
					let { status, data } = await Role.menulist({ pId: 0 });
					return resolve(data);
				}

				//取出父级节点iD
				let pId = node.data.id;
				//获取子级节点数据
				let { status, data } = await Role.menulist({ pId });
				if (status) {
					return resolve(data);
				}
			},
			//打开编辑Modal
			openEditModal(node, data) {
				this.editForm = { ...data };
				this.node = node;
				this.nodeData = data;
				this.editModalShow = true;

			},
			//编辑节点
			async handleUpdateNode() {
				//表单验证
				//ajax
				let { status, msg } = await Role.editmenu({ ...this.editForm });
				if (status) {
					this.$message.success(msg);

					//更新tree节

					this.node.data = this.editForm;
					this.editModalShow = false;
				}
			},
			//打开图标编辑
			currentchange(val) {
				this.pageIndex = val;
				this.iconPage();
			},
			//分页器
			handleSizeChange(val) {
				this.pageSize = val;
				this.iconPage();
			},
			//打开icon模板
			async openIconModal(node, data) {
				this.nodeData = data;
				this.editIconShow = true;
				this.iconPage();
				this.iconEdit.id = data.id;
			},
			//获取图标列表
			async iconPage() {
				let res = await Role.iconList({ pageSize: this.pageSize, pageIndex: this.pageIndex })
				this.total = res.total;
				this.iconList = res.icons
				this.iconList.forEach((item) => {
					item.checked = false;
				})
			},
			cancel() {
				this.insertModalShow = false;
				this.editModalShow = false;
				this.editIconShow = false;
				this.editForm = { name: '', pId: '', img: '' };
				this.insertForm = { name: '', id: '', img: '' }
			},
			//图标点击激活
			iconActive(choose, index) {
				let that = this;
				this.iconList.forEach((item, index) => {
					if (choose == item) {
						item.checked = true;
						that.iconEdit.icon = item.id;
						that.iconEdit.name = item.name;
					} else {
						item.checked = false;
					}
					this.$set(this.iconList, index, item)
				})
			},
			//改变图标
			async handleIconEdit() {
				let { msg, status } = await Role.editIcon({ ...this.iconEdit })
				if (status && this.iconEdit) {
					this.nodeData.icon = this.iconEdit.name;
					let data = { icon_name: this.iconEdit.name, id: this.nodeData.id }
					// New.$emit('updata', data)
				}
				this.editIconShow = false;
			},
			//打开添加model
			openInsertModal(node, data) {
				this.insertForm = {
						name: '',
						pId: '',
						order: ''
					},
					//node：节点对象    data：节点数据
					this.nodeData = data;
				this.node = node;
				this.insertForm.pId = data.id;
				this.insertModalShow = true;
			},
			//插入节点
			async handleInsertNode() {
				//1.表单校验
				//2.校验通过 ajax
				let { status, msg, data } = await Role.addmenu({ ...this.insertForm });
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
						let { status, msg } = await Role.removemenu({ id });
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
		

		}
	};
</script>

<style scoped="scoped">
	.tips {
		box-sizing: border-box;
		background-color: #fdf6ec;
		border-radius: 4px;
		padding: 4px 16px;
		display: flex;
		justify-content: flex-start;
		margin-left: 5px;
		margin-bottom: 20px;
		color: #e6a23c;
		height: 60px;
	}

	.tips_content {
		margin-left: 8px;
	}

	.tips_content_tips {
		font-size: 13px;
		font-weight: 700;
		color: #e6a23c;
		display: inline-block;
		position: relative;
		top: 5px;
	}

	p {
		font-size: 12px;
	}

	.el-icon-warning {
		font-size: 28px;
		font-size: 28px;
		color: #e6a23c;
		line-height: 50px;
	}

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
	
	.icon_active{
	            background-color: #409EFF;
	        }

	.item {
		margin: 6px;
	}
	ul {
			height: 400px;
		}
	
		ul div {
			height: 100px;
			width: 100px;
			float: left;
			border: 1px solid #D9D9D9;
			text-align: center;
		}
	
		ul div:hover {
			background-color: #409EFF;
		}
	
		ul div li {
			margin-top: 15px;
	
		}
	
</style>
