// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/rem.js'
import { Cell, CellGroup, Popup, RadioGroup, Radio, Row, Col, Tabbar, TabbarItem, Icon, Tag, Search, Button, Field, List, PullRefresh, Toast } from 'vant'

Vue.use(Cell).use(Row).use(Col).use(Tabbar).use(TabbarItem).use(Icon).use(CellGroup).use(Popup).use(Radio).use(RadioGroup)
  .use(Tag).use(Search).use(Button).use(Field).use(List).use(PullRefresh).use(Toast)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
