import Vue from 'vue'
import Router from 'vue-router'
import JobDetail from '../components/JobDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JobDetail',
      component: JobDetail
    }
  ]
})
