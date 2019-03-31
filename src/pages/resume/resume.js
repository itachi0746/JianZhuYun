// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/rem.js'
import { Row, Col, Button, Cell, CellGroup, Field, Icon, RadioGroup, Radio, DatetimePicker, Popup, Toast } from 'vant'

Vue.use(Row).use(Col).use(Button).use(Cell).use(Field).use(Icon).use(CellGroup).use(Toast)
  .use(RadioGroup).use(Radio).use(DatetimePicker).use(Popup)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
