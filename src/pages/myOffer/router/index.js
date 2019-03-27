import Vue from 'vue'
import Router from 'vue-router'
import MyOffer from '../components/MyOffer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyOffer',
      component: MyOffer
    }
  ]
})
