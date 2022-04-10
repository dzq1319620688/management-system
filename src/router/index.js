import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: ()=>import("../views/Layout"),
    redirect:'/index',
    children:[
      {
        path:'/index',
        name:'Index',
        component:()=>import('../views/index/Index.vue'),
        meta:{bread:['首页']}
      },
      {
        path:'/account/all',
        name:'acconut_all',
        component:()=>import('../views/account/All.vue'),
        meta:{bread:['账户管理','业务人员']}
      },
      {
        path:'/account/manage',
        name:'acconut_manage',
        component:()=>import('../views/account/manage.vue'),
        meta:{bread:['账户管理','管理员']}
      },
      {
        path:'/product/all',
        name:'product_all',
        component:()=>import('../views/product/All.vue'),
        meta:{bread:['产品管理','产品运营']}
      },
      {
        path:'/product/balance',
        name:'product_balance',
        component:()=>import('../views/product/balance.vue'),
        meta:{bread:['产品管理','结算数据']}
      },
      {
        path:'/business/index',
        name:'business',
        component:()=>import('../views/business/index.vue'),
        meta:{bread:['业务管理','业务信息']}
      },
      {
        path:'/personal/index',
        name:'personal',
        component:()=>import('../views/personal/index.vue'),
        meta:{bread:["个人中心"]}
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
