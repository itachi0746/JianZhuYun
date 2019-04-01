import Vue from 'vue'
import Router from 'vue-router'
import CompanyDetail from '../components/CompanyDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CompanyDetail',
      component: CompanyDetail
    }
  ]
})
