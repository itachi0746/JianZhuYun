import Vue from 'vue'
import Router from 'vue-router'
import EPOfferDetail from '../components/EPOfferDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPOfferDetail',
      component: EPOfferDetail
    }
  ]
})
