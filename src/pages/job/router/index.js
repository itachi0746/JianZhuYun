import Vue from 'vue'
import Router from 'vue-router'
import Job from '../components/Job.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Job',
      component: Job
    }
  ]
})
