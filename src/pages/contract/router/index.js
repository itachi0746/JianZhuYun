import Vue from 'vue'
import Router from 'vue-router'
import MyContract from '../components/Contract.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyContract',
      component: MyContract
    }
  ]
})
