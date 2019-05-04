import Vue from 'vue'
import Router from 'vue-router'
import Offer from '../components/Offer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Offer',
      component: Offer
    }
  ]
})
