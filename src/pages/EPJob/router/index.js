import Vue from 'vue'
import Router from 'vue-router'
import EPJob from '../components/EPJob.vue'
import Search from '../components/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPJob',
      component: EPJob
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
