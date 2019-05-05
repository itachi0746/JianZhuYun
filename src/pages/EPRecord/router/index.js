import Vue from 'vue'
import Router from 'vue-router'
import EPRecord from '../components/EPRecord.vue'
import Search from '../components/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPRecord',
      component: EPRecord
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
