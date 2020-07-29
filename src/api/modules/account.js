import axios from 'axios'

//获取账户列表
let list = (data) => axios.get('/api/admin/list',data);

//获取管理员个人资料
let accounts = (id) => axios.put('/api/admin', id);

export default{
	list,
	accounts
}