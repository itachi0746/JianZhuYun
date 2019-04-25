import Vue from 'vue'
import Router from 'vue-router'
import InterviewResult from '../components/EPInterviewDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InterviewResult',
      component: InterviewResult
    }
  ]
})
