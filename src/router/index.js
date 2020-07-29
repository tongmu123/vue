import Vue from 'vue'
import VueRouter from 'vue-router'
//loading 服务方式
import { Message } from 'element-ui';

Vue.use(VueRouter)

//页面级组件
//配置路由
import Layout from '@/components/Layout.vue';

const routes = [{
		path: "/login",
		name: 'Login',
		alias: '/',
		meta: { requiresAuth: false },
		component: () => import('@/views/Login.vue')
	}, {
		path: "/register",
		name: 'Register',
		meta: { requiresAuth: false },
		component: () => import('@/views/Register.vue')
	}, {
		//商品管理
		path: "/goods",
		name: 'Goods',
		meta: { requiresAuth: true },
		component: Layout,
		children: [{
				path: 'list',
				name: 'GoodsList',
				component: () => import('@/views/Goods/List.vue')
			}, {
				path: 'classify',
				name: 'GoodsClassify',
				component: () => import('@/views/Goods/Classify.vue')
			}, {
				path: 'release',
				name: 'GoodsRelease',
				component: () => import('@/views/Goods/Release.vue')
			}, {
				path: 'edit/:id',
				name:'GoodsEdit',
				component: () => import('@/views/Goods/Edit.vue'),
				props: true,
			}
		]

	}, {
		//订单管理
		path: "/order",
		name: "Order",
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'OrderList',
			component: () => import('@/views/Order/List.vue')
		}]
	}, {
		//账户设置
		path: "/account",
		name: "Account",
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'AccountList',
			component: () => import('@/views/Account/List.vue')
		}]
	}, {
		//用户管理
		path: "/user",
		name: "User",
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'UserList',
			component: () => import('@/views/User/List.vue')
		}]
	}, {
		//权限设置
		path: "/role",
		name: "Role",
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'menu',
			name: 'RoleMenu',
			component: () => import('@/views/Role/Menu.vue')
		}, {
			path: 'roles',
			name: 'UserRoles',
			component: () => import('@/views/Role/Roles.vue')
		}]
	}

]

const router = new VueRouter({
	routes
})
//全局守卫
router.beforeEach((to, from, next) => {
	console.log(to);
	console.log(from);
	//登录、注册页面不进行校验，直接放行
	console.log(to.matched);
	//根据meta元信息，校验路由是否需要授权登录
	let isRequireAuth = to.matched.some((path) => path.meta.requiresAuth);
	//如果不需要登录授权，直接放行
	if (!isRequireAuth) {
		next();
		return;
	}
	//检验token
	//提取出token
	let token = sessionStorage.token;
	if (token) {
		next();
		return;
	}
	//无token强制跳转登录
	Message.error('无效的token，请重新登录！');
	setTimeout(() => {
		next(`/login?redirect=${to.path}`);
	}, 2000)

});
export default router
