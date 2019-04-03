import Vue from 'vue'
import Router from 'vue-router'
import Interview from '../components/Interview.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Interview',
      component: Interview
    }
  ]
})
