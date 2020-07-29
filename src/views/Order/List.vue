<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>订单列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="40"></el-table-column>
			<el-table-column>
				<template slot-scope="scope">
					<el-table :data="scope.row.goodsList">
						<el-table-column label="商品" width="400">
							<template slot-scope="scope">
									<el-image style="width: 80px" :src="scope.row.img_md"></el-image>
									<p class="goods_p">{{scope.row.name}}</p>
							</template>
						</el-table-column>
						<el-table-column prop="goods_price" label="单价">
						</el-table-column>
						<el-table-column prop="goods_num" label="数量">
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="payment" label="付款总额" width="120"></el-table-column>

			<el-table-column prop="create_time" label="下单时间" width="180"></el-table-column>

			<el-table-column prop="status" label="状态" width="100"></el-table-column>

			<!-- 点编辑的时候获取当前id的信息  需要路由传参 即根据id传参（Article里面的 路径 path: 'edit/:id',） -->
			<el-table-column label="操作" width="200">
				<template slot-scope="scope">
					<el-button type="primary" plain icon="el-icon-edit" size="mini"></el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Order } from '@/api/index'

	export default {

		data() {
			return {
				tableData: [],
			}
		},
		created() {
			//生命周期获取数据
			this.loadList();
		},
		methods: {
			//封装一个方法
			async loadList() { /* 加载列表数据 */
				let { status, data, msg } = await Order.list(); /* pagesize 为参数 100 为一个number值 表示100页 pageindex 表示 传第一页*/
				if (status) {
					this.tableData = data;
				}
			},
			//删除文章列表
			// removeArticle(id, index) {
			// 	this.$confirm('此操作将永久删除该管理员, 是否继续?', '删除管理员', {
			// 		type: 'warning'
			// 	}).then(async () => {
			// 		let { status, data } = await Article.remove({ id });
			// 		if (status) {
			// 			//更新DOM
			// 			this.tableData.splice(index, 1);
			// 			this.$message.success('删除成功!');
			// 		}
			// 	}).catch(() => {
			// 		this.$message.info('取消删除');
			// 	});
			// },
		}
	}
</script>

<style scoped="scoped">
	.goods_p {
		position: absolute;
		top: 10px;
		left: 100px;
	}
</style>
