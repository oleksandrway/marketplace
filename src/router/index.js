import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import AuthGuard from './auth-guard';
import Ad from '@/components/Ads/Ad'

import AddList from '@/components/Ads/AddList'
import NewAd from '@/components/Ads/NewAd'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Orders from '@/components/User/Orders'

Vue.use(VueRouter)

const routes = [
 
  {
    path: '',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  },
  {
    path: '/orders',
    name: 'orders',
    component: Orders,
    beforeEnter: AuthGuard

  },
  {
    path: '/ad/:id',
    props: true,
    name: 'Ad',
    component: Ad
  },
  {
    path: '/new',
    name: 'newAd',
    component: NewAd,
    beforeEnter: AuthGuard

    
  },
  {
    path: '/list',
    name: 'list',
    component: AddList,
    beforeEnter: AuthGuard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;


