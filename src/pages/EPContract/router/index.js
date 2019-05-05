import Vue from 'vue'
import Router from 'vue-router'
import EPContract from '../components/EPContract.vue'
import Search from '../components/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPContract',
      component: EPContract
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
