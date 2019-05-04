import Vue from 'vue'
import Router from 'vue-router'
import EPRelease from '../components/EPRelease.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPRelease',
      component: EPRelease
    }
  ]
})
