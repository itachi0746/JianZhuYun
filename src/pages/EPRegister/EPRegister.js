// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/common/rem.js'
import { Row, Col, Button, Cell, Field, Icon, Uploader, Toast, Popup, DatetimePicker } from 'vant'

Vue.use(Row).use(Col).use(Button).use(Cell).use(Field).use(Icon).use(Uploader).use(Toast).use(Popup).use(DatetimePicker)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
