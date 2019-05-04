import Vue from 'vue'
import Router from 'vue-router'
import SendOffer from '../components/EPSendOffer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SendOffer',
      component: SendOffer
    }
  ]
})
