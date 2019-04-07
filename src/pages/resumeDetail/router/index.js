import Vue from 'vue'
import Router from 'vue-router'
import ResumeDetail from '../components/ResumeDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/resumeDetail',
      name: 'ResumeDetail',
      component: ResumeDetail
    }
  ]
})
