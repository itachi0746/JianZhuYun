import Vue from 'vue'
import Router from 'vue-router'
import EPPeopleDetail from '../components/EPPeopleDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPPeopleDetail',
      component: EPPeopleDetail
    }
  ]
})
