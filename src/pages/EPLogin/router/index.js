import Vue from 'vue'
import Router from 'vue-router'
import EPLogin from '../components/EPLogin.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPLogin',
      component: EPLogin
    }
  ]
})
