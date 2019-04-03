import Vue from 'vue'
import Router from 'vue-router'
import PeopleDetail from '../components/PeopleDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/resumeDetail',
      name: 'PeopleDetail',
      component: PeopleDetail
    }
  ]
})
