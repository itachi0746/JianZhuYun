import Vue from 'vue'
import Router from 'vue-router'
import ResumeDetail from '../components/ResumeDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ResumeDetail',
      component: ResumeDetail
    }
  ]
})