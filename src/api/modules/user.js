import axios from 'axios'

//获取管理员列表
let list = (data) => axios.get('/api/admin/list', { params: data });

//获取管理员个人资料
let info = (data) => axios.get('/api/admin', { params: data }); 

//删除管理员
let remove = (id) => axios.delete('/api/admin',{params:id});

//编辑管理员
let edit = (id) => axios.put('/api/admin', id);

export default {
	list,
	remove,
	edit,
	info
}
