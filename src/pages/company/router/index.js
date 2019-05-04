import Vue from 'vue'
import Router from 'vue-router'
import Company from '../components/Company.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Company',
      component: Company
    }
  ]
})
