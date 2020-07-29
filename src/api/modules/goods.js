import axios from 'axios';

//api接口

//登录
let login = (data) => axios.post('/api/admin/login', data);

// 管理员注册
let register = (data) => axios.post('/api/admin/register', data);

//获取子级分类
let subcate = (data) => axios.get('/api/category/sub', { params: data });


//编辑分类
let edit = (data) => axios.put('/api/category', data);

//添加分类
let addcategory = (data) => axios.post('/api/category', data);

//删除分类
let removecategory = (id) => axios.delete('/api/category', { params: id });

//发布商品
let addgoods = (data) => axios.post('/api/admin/goods', data);

//商品列表
let list = (data) => axios.get('/api/admin/goods/list', { params: data });

//删除商品
let removegoods = (id) => axios.delete('/api/admin/goods', { params: id })

//编辑商品
let editgoods = (data) => axios.put('/api/admin/goods', data);

//获取商品详情
let acquire = (data) => axios.get('/api/admin/goods', { params: data });

export default {
	login,
	register,
	subcate,
	addgoods,
	list,
	edit,
	addcategory,
	removecategory,
	removegoods,
	editgoods,
	acquire
}
