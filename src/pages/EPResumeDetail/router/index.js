import Vue from 'vue'
import Router from 'vue-router'
import EPResumeDetail from '../components/EPResumeDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPResumeDetail',
      component: EPResumeDetail
    }
  ]
})
