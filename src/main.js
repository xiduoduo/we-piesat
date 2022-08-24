import Vue from 'vue'
import App from './App.vue'

import store from './store/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'leaflet/dist/leaflet.css'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import 'leaflet.pm'
import 'leaflet.pm/dist/leaflet.pm.css'
import 'proj4'
import "proj4leaflet"
import './assets/js/leaflet/Leaflet.ImageOverlay.Rotated.js'
import './assets/js/leaflet/proj4leaflet.js'
import './assets/js/leaflet/tileLayer.baidu.js'
import "./assets/js/cesium/measurement"
import 'default-passive-events'

// import "cesium/Build/Cesium/Widgets/widgets.css";
import api from "./api"
import {
  mapData
} from './assets/data/mapData'
import router from './router'

import cesiumDrawViewer from 'cesium-draw'
Vue.use(cesiumDrawViewer)
Vue.config.productionTip = false
// Vue.prototype.$axios = axios;
// Vue.prototype.$ = $; //全局使用jquery
Vue.use(ElementUI);


Vue.prototype.mapData = mapData;
Vue.prototype.$api = api;

Vue.prototype.timer = null;

Vue.config.productionTip = false;
Vue.L = Vue.prototype.$L = L;
Vue.use(L);




/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')