import Vue from 'vue'
import Router from 'vue-router'
import OfferDetail from '../components/OfferDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'OfferDetail',
      component: OfferDetail
    }
  ]
})
