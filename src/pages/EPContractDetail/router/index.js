import Vue from 'vue'
import Router from 'vue-router'
import EPContractDetail from '../components/EPContractDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPContractDetail',
      component: EPContractDetail
    }
  ]
})
