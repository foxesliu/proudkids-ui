import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 全局filter
import '@/icons' // icon
import '@/permission' // 权限
import '@/views/sale/detail/filter/index.js' // 自定义filter
import ZkTable from 'vue-table-with-tree-grid'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'


import $ from 'jquery';
import 'bootstrap';

window.$ = $;
window.jQuery = $;

require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')

require('./styles/video.css');
const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)

Vue.config.silent = true

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    "inline": false,
    "button": true,
    "navbar": false,
    "title": false,
    "toolbar": false,
    "tooltip": false,
    "movable": false,
    "zoomable": false,
    "rotatable": false,
    "scalable": false,
    "transition": false,
    "fullscreen": false,
    "keyboard": false,
    "url": "data-source"
  }
})
Vue.use(ZkTable)
import i18n from './lang' // Internationalization
Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(ElementUI, {locale})

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
