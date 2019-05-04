// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/rem.js'
import { Cell, Row, Col, Button, Tabbar, TabbarItem, Icon, Tag, CellGroup, Popup, Field, Dialog, Radio, RadioGroup } from 'vant'

Vue.use(Cell).use(Row).use(Col).use(Tabbar).use(TabbarItem).use(Radio).use(RadioGroup)
  .use(Icon).use(Tag).use(CellGroup).use(Popup).use(Field).use(Dialog).use(Button)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
