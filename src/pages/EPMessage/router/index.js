import Vue from 'vue'
import Router from 'vue-router'
import EPMessage from '../components/EPMessage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPMessage',
      component: EPMessage
    }
  ]
})
