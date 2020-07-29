import axios from 'axios'

//获取角色列表
let list = (data) => axios.get('/api/role/list', { params: data });

//获取右侧菜单
let config = (id) => axios.get('/api/role/config',{ params:id});

//为角色添加菜单
let menuAdd = (data) => axios.post('/api/role/menu', data);

//为角色删除菜单
let menuDel = (data) => axios.delete('/api/role/menu', { params: data });

//获取子级菜单
let menulist = (data) => axios.get('/api/menu/sub', { params: data });

//删除角色
let remove = (id) => axios.delete('/api/role', { params: id });

//删除菜单
let removemenu = (id) => axios.delete('/api/menu', { params: id });

//添加菜单
let addmenu = (id) => axios.post('/api/menu', id);

//编辑菜单
let editmenu = (id) => axios.put('/api/menu', id);

//编辑角色
let editrole = (id) => axios.put('/api/role', id);

//添加角色
let addrole = (id) => axios.post('/api/role',id);


let iconList = (data) => axios.get('/api/admin/icon/list',{params:data});
//编辑图标
let editIcon = (data) => axios.put('/api/menu/icon',data);

export default {
	list,
	menulist,
	remove,
	removemenu,
	addmenu,
	editmenu,
	editrole,
	addrole,
	iconList,
	editIcon,
	menuDel,
	menuDel,
	menuAdd,
	config
}
