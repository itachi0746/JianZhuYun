import Vue from 'vue'
import Router from 'vue-router'
import EPInterResult from '../components/EPInterResult.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPInterResult',
      component: EPInterResult
    }
  ]
})
