import Vue from 'vue'
import Router from 'vue-router'
import Reset from '../components/Reset.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Reset',
      component: Reset
    }
  ]
})
