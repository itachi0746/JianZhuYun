import Vue from 'vue'
import Router from 'vue-router'
import OfferLetter from '../components/EPOffer.vue'
import Search from '../components/Search.vue'
import Handle from '../components/Handle.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'OfferLetter',
      component: OfferLetter
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/handle',
      name: 'Handle',
      component: Handle
    }
  ]
})
