import axios from 'axios';
//loading 服务方式
import { Loading,Message } from 'element-ui';
//loading 实例
let loading;
//路由实例
import router from '@/router/index';

axios.defaults.baseURL = 'http://localhost:3003';

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
	// console.log(config);

	//开启loading
	loading = Loading.service({ background: 'rgba(0, 0, 0, 0.3)'});	
	
	//携带token
	//判断是否携带token
	if(config.url == '/goods/register' || config.url == '/goods/login'){
		//如果是上面俩页面的话。就不做任何操作
		return config; //发出请求
	}
	//获取token
	let token = sessionStorage.token;
	//无token
	if(!token) {
		//提示用户
		Message.error("无效的token 请重新登录");
		//延时一秒，提示用户，跳转登录
		setTimeout(() => {
			loading.close();
			console.log(router);
			//传参，返回到开始的那一个页面
			router.replace('/login');
		},2000)
		
	}
	//有token
	config.headers.Authorization = `Bearer ${token}`;
	
	return config;   
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


// 添加响应拦截器
axios.interceptors.response.use(function(response) {
	let {status,data} = response;
	//关闭loading
	loading.close();
	//在这里你可以判断后台返回数据携带的状态码
	// console.log(response);
	// 	switch (status) {
	// 	case 400:
	// 		break;
	// 	case 404:
	// 		break;
	// 	case 500:
	// 		break;
	// 	default:
	// 		break;
	// }
	return data;
}, function(error) {
	// 对响应错误做点什么
	return Promise.reject(error);
});
