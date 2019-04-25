import Vue from 'vue'
import Router from 'vue-router'
import EPRecordDetail from '../components/EPRecordDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPRecordDetail',
      component: EPRecordDetail
    }
  ]
})
