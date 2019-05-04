import Vue from 'vue'
import Router from 'vue-router'
import EPJobDetail from '../components/EPJobDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPJobDetail',
      component: EPJobDetail
    }
  ]
})
