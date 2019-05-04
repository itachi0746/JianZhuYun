import Vue from 'vue'
import Router from 'vue-router'
import Invitation from '../components/EPInvitation.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Invitation',
      component: Invitation
    }
  ]
})
