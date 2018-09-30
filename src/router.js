import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      // redirect: Layout,
      component: ()=>import(/* webpackChunkName: "login" */ './views/login')
    },
    {
      path: '/home',
      component: Layout,
      children: [
        {
          path: '/',
          name: '首页',
          component: () => import(/* webpackChunkName: "login" */ './views/home')
        }, {
          path: '/addGoods',
          name: '添加商品',
          meta:['添加数据','添加商品'],
          component: () => import(/* webpackChunkName: "add" */ './views/dataAdd/addGoods')
        }, {
          path: '/addShop',
          name: '添加商铺',
          meta:['添加数据','添加商铺'],
          component: () => import(/* webpackChunkName: "add" */ './views/dataAdd/addShop')
        }, {
          path: '/adminList',
          name: '管理员列表',
          meta:['数据管理','管理员列表'],
          component: () => import(/* webpackChunkName: "dataManage" */ './views/dataManage/adminList')
        }, {
          path: '/foodList',
          name: '食品列表',
          meta:['数据管理','食品列表'],
          component: () => import(/* webpackChunkName: "dataManage" */ './views/dataManage/foodList')
        }, {
          path: '/orderList',
          name: '订单列表',
          meta:['数据管理','订单列表'],
          component: () => import(/* webpackChunkName: "dataManage" */ './views/dataManage/orderList')
        }, {
          path: '/shopList',
          name: '商铺列表',
          meta:['数据管理','商铺列表'],
          component: () => import(/* webpackChunkName: "dataManage" */ './views/dataManage/shopList')
        }, {
          path: '/userList',
          name: '用户列表',
          meta:['数据管理','用户列表'],
          component: () => import(/* webpackChunkName: "dataManage" */ './views/dataManage/userList')
        }, {
          path: '/chart1',
          name: 'chart1',
          meta:['图表','chart1'],
          component: ()=>import(/* webpackChunkName: "echarts" */ './views/echarts/chart1')
        },{
          path: '/chart2',
          name: 'chart2',
          meta:['图表','chart2'],
          component: ()=>import(/* webpackChunkName: "echarts" */ './views/echarts/chart2')
        },{
          path: '/chart3',
          name: 'chart3',
          meta:['图表','chart3'],
          component: ()=>import(/* webpackChunkName: "echarts" */ './views/echarts/chart3')
        },{
          path: '/chart4',
          name: 'chart4',
          meta:['图表','chart4'],
          component: ()=>import(/* webpackChunkName: "echarts" */ './views/echarts/chart4')
        },{
          path: '/chart5',
          name: 'chart5',
          meta:['图表','chart5'],
          component: ()=>import(/* webpackChunkName: "echarts" */ './views/echarts/chart5')
        },{
          path: '/userLocation',
          name: '用户分布',
          meta:['图表','用户分布'],
          component: ()=>import(/* webpackChunkName: "echarts" */ './views/echarts/userLocation')
        },{
          path: '/textEdit',
          name: '文本编辑',
          meta:['编辑','文本编辑'],
          component: ()=>import(/* webpackChunkName: "edit" */ './views/edit/textEdit')
        },{
          path: '/adminSetting',
          name: '用户设置',
          meta:['设置','用户设置'],
          component: ()=>import(/* webpackChunkName: "settings" */ './views/settings/adminSetting')
        },{
          path: '/explain',
          name: '说明',
          meta:['说明','说明'],
          component: ()=>import(/* webpackChunkName: "explain" */ './views/explain')
        },
      ]
    }
  ]
})
