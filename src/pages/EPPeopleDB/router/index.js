import Vue from 'vue'
import Router from 'vue-router'
import EPPeopleDB from '../components/EPPeopleDB.vue'
import Search from '../components/Search.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPPeopleDB',
      component: EPPeopleDB
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    }
  ]
})
