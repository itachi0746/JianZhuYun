import Vue from 'vue'
import Router from 'vue-router'
import EPRecord from '../components/EPRecord.vue'
import Search from '../components/Search.vue'
import Handle from '../components/Handle.vue'
import ResumeDetail from '../components/ResumeDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPRecord',
      component: EPRecord
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
    },
    {
      path: '/resumeDetail',
      name: 'ResumeDetail',
      component: ResumeDetail
    }
  ]
})
