import Vue from 'vue'
import Router from 'vue-router'
import InterviewDetail from '../components/InterviewDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InterviewDetail',
      component: InterviewDetail
    }
  ]
})
