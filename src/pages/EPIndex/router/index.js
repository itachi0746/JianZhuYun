import Vue from 'vue'
import Router from 'vue-router'
import EPIndex from '../components/EPIndex.vue'
import Search from '../components/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPIndex',
      component: EPIndex
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
