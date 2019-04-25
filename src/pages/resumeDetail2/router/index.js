import Vue from 'vue'
import Router from 'vue-router'
import ResumeDetail from '../components/ResumeDetail2.vue'
import EditPage from '../components/EditPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ResumeDetail',
      component: ResumeDetail
    },
    {
      path: '/editPage',
      name: 'EditPage',
      component: EditPage
    }
  ]
})
