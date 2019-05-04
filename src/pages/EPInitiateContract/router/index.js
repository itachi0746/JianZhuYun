import Vue from 'vue'
import Router from 'vue-router'
import InitiateContract from '../components/EPInitiateContract.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InitiateContract',
      component: InitiateContract
    }
  ]
})
