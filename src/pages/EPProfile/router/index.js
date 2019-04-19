import Vue from 'vue'
import Router from 'vue-router'
import EPProfile from '../components/EPProfile.vue'
import Config from '../components/Config.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPProfile',
      component: EPProfile
    },
    {
      path: '/config',
      name: 'Config',
      component: Config
    }
  ]
})
