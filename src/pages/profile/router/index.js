import Vue from 'vue'
import Router from 'vue-router'
import Profile from '../components/Profile.vue'
import Config from '../components/Config.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/config',
      name: 'Config',
      component: Config
    },
  ]
})
