import Vue from 'vue'
import Router from 'vue-router'
import EPPeopleDB from '../components/EPPeopleDB.vue'
import Search from '../components/Search.vue'
import Invitation from '../components/Invitation.vue'
import InterviewResult from '../components/InterviewResult.vue'
import SendOffer from '../components/SendOffer.vue'
import InitiateContract from '../components/InitiateContract.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EPPeopleDB',
      component: EPPeopleDB
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/invitation',
      name: 'Invitation',
      component: Invitation
    },
    {
      path: '/interviewResult',
      name: 'InterviewResult',
      component: InterviewResult
    },
    {
      path: '/sendOffer',
      name: 'SendOffer',
      component: SendOffer
    },
    {
      path: '/initiateContract',
      name: 'InitiateContract',
      component: InitiateContract
    },
  ]
})
