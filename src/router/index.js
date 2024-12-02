import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout/app-index.vue'
import Home from '@/views/home/Home-index.vue'
import Result from '@/views/result/result-index.vue'
import Result_index from '@/views/result/result_index/result_index.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',   //根路由，组件为layout下的app-index.vue
  component: Layout,
  children: [    //子路由
    {
      path: '/',  //一级子路由'/'，默认显示，内容为home下的Home-index.vue，即首页内容
      name: 'home',
      component: Home,
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
      children: [
        {
          path: 'index',
          name: Result_index,
          component: Result_index
        }
      ]
    }
  ]
}
]

const router = new VueRouter({
  mode: 'history',
  historyApiFallback: true,
  routes
})

export default router
