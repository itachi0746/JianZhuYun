import Vue from 'vue'
import Router from 'vue-router'
import EPRegister from '../components/EPRegister.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPRegister',
      component: EPRegister
    }
  ]
})
