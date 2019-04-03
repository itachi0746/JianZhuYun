import Vue from 'vue'
import Router from 'vue-router'
import EPHireDB from '../components/EPSigningDB.vue'
import Search from '../components/Search.vue'
import Handle from '../components/Handle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPHireDB',
      component: EPHireDB
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/handle',
      name: 'Handle',
      component: Handle
    }
  ]
})