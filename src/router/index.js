import Vue from 'vue'
import VueRouter from 'vue-router'
import OceanIndex from '../views/index.vue' //应用平台首页

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'OceanIndex',
  component: OceanIndex,
  meta: {
    title: "海洋卫星遥感应用平台"
  },
  // redirect: "/",
  children: [
    {
      path: '/environmentDiolag',
      name: 'environmentDiolag',
      component: () => import('@/views/diolag/environmentDiolag.vue'),
      meta: {
        title: "近海海洋环境",
        icon: 'hynbf'
      },
    },
    {
      path: '/temperatureDiolag',
      name: 'temperatureDiolag',
      component: () => import('@/views/diolag/temperatureDiolag.vue'),
      meta: {
        title: "海洋生态监测",
        icon: 'hyms'
      },
    },
    {
      path: '/monitorDiolag',
      name: 'monitorDiolag',
      component: () => import('@/views/diolag/monitorDiolag.vue'),
      meta: {
        title: "海洋资源规划",
        icon: 'hygc'
      },
    },
    {
      path: '/preventingDiolag',
      name: 'preventingDiolag',
      component: () => import('@/views/diolag/preventingDiolag.vue'),
      meta: {
        title: "防灾减灾",
        icon: 'fzjztb'
      },
    },
    {
      path: '/queryDiolag',
      name: 'queryDiolag',
      component: () => import('@/views/diolag/queryDiolag.vue'),
      meta: {
        title: "产品生产",
        icon: 'cp'
      },
    },
    {
      path: '/applicationDiolag',
      name: 'applicationDiolag',
      component: () => import('@/views/diolag/applicationDiolag.vue'),
      meta: {
        title: "专业定制服务",
        icon: "dz"
      },
    },
  ]
},
]

const router = new VueRouter({
  base: '/provinceVisual/',
  routes
})

export default router