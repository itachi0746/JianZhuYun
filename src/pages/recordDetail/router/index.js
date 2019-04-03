import Vue from 'vue'
import Router from 'vue-router'
import RecordDetail from '../components/RecordDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RecordDetail',
      component: RecordDetail
    }
  ]
})
