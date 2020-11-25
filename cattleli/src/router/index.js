import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/pages/main.vue'
import Order from '@/components/pages/order.vue'
import Detail from '@/components/pages/Detail.vue'
import User from '@/components/pages/User.vue'
import Fav from '@/components/pages/fav.vue'
import List from '@/components/pages/list.vue'
import Reg from '@/components/pages/reg.vue'
import Login from '@/components/pages/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Order',
      name: 'Order',
      component: Order
    },
	{
	  path: '/Main',
	  name: 'Main',
	  component: Main
	},
	{
	  path: '/Detail',
	  name: 'Detail',
	  component: Detail
	},
	{
	  path: '/User',
	  name: 'User',
	  component: User
	},
	{
	  path: '/Fav',
	  name: 'Fav',
	  component: Fav
	},
	{
	  path: '/List',
	  name: 'List',
	  component: List
	},
	{
		path:'/Reg',
		name: 'Reg',
		component: Reg
	},
	{
		path:'/',
		name: 'Login',
		component: Login
	}
  ]
})