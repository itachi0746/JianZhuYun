import Vue from 'vue'
import Router from 'vue-router'
import ContractDetail from '../components/ContractDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ContractDetail',
      component: ContractDetail
    }
  ]
})
