import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout'),
    redirect: "/index",
    children: [
      {
        path: "/index",//可以加'/'也可以不加,加是代表整个路径是/indexs,不加是接着父级路径写
        name: "index",
        component: () => import("@/views/index/index.vue")
      },
      {
        path: '/account',
        name: 'Account',
        redirect: "/account/all"
      },
      {
        path: "/account/all",
        name: "account_all",
        meta: {
          bread: ["账户管理", "所有人员"]
        },
        component: () => import("@/views/account/all.vue")
      },
      {
        path: "/account/business",
        name: "account_business",
        meta: {
          bread: ["账户管理", "业务人员"]
        },
        component: () => import("@/views/account/business.vue")
      },
      {
        path: "/account/audit",
        name: "account_audit",
        meta: {
          bread: ["账户管理", "审核人员"]
        },
        component: () => import("@/views/account/audit.vue")
      },
      {
        path: "/account/risk",
        name: "account_risk",
        meta: {
          bread: ["账户管理", "风控经理"]
        },
        component: () => import("@/views/account/risk.vue")
      },
      {
        path: "/account/admin",
        name: "account_admin",
        meta: {
          bread: ["账户管理", "管理员"]
        },
        component: () => import("@/views/account/admin.vue")
      },
      {
        path: "/product/all",
        name: "product_all",
        meta: {
          bread: ["产品管理", "全部产品"],
          keepAlive: true,
        },
        component: () => import("@/views/product/all.vue"),
      },
      {
        path: "/product/carConsumption",
        name: "product_carConsumption",
        meta: {
          bread: ["账产品管理", "汽车消费"]
        },
        component: () => import("@/views/product/carConsumption.vue")
      },
      {
        path: "/product/estate",
        name: "product_estate",
        meta: {
          bread: ["产品管理", "房产消费"]
        },
        component: () => import("@/views/product/estate.vue")
      },
      {
        path: "/product/mortgage",
        name: "product_mortgage",
        meta: {
          bread: ["产品管理", "抵押贷款"]
        },
        component: () => import("@/views/product/mortgage.vue")
      },
      {
        path: "/product/detail",
        name: "product_detail",
        meta: {
          bread: ["产品管理", "全部产品", "产品详情"],
          keepAlive: true,
        },
        component: () => import("@/views/product/detail.vue")
      },
      {
        path: "/order/all",
        name: "order_all",
        meta: {
          bread: ["订单管理", "所有订单"]
        },
        component: () => import("@/views/order/all.vue")
      },
      {
        path: "/client/info",
        name: "client_info",
        meta: {
          bread: ["客户管理", "基本信息"]
        },
        component: () => import("@/views/client/info.vue")
      },
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
