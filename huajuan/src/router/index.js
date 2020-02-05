import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Goodsdetail from '@/views/goods/detail'
import Videosdetail from '@/views/videos/detail'
import Hongren from '@/views/hongren'
import List from '../views/list'
import Login from '../views/login'
import Shoppingcar from '../views/shoppingcar'
import Video from '../views/video'
import Goods from '../views/goods'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    component: Home
  },
  {
    path: '/video',
    component: Video,
    children: [
      {
        path: 'detail*',
        component: Videosdetail
      }
    ]
  },
  {
    path: '/goods',
    component: Goods,
    children: [
      {
        path: 'detail*',
        component: Goodsdetail
      }
    ]
  },
  {
    path: '/hongren',
    component: Hongren
  },
  {
    path: '/list*',
    component: List
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/shoppingcar',
    component: Shoppingcar
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  routes
})

export default router
