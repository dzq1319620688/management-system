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
        name: "account",
        path:'/account/manage',
        component:()=>import('../views/account/manage.vue'),
        meta:{bread:['账户管理','人员管理']}
    },
      {
        path:'/product/index',
        name:'product',
        component:()=>import('../views/product/index.vue'),
        meta:{bread:['商品管理','商品列表']}
      },
      {
        path:'/orderManage/index',
        name:'business',
        component:()=>import('../views/orderManage/index.vue'),
        meta:{bread:['订单管理','所有订单']}
      },
      {
        path:'/orderManage/orderChart',
        name:'orderChart',
        component:()=>import('../views/orderManage/orderChart.vue'),
        meta:{bread:['订单管理','订单报表']}
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
  },
  
]

const router = new VueRouter({
  routes
})

export default router
