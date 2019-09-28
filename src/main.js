import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//清除默认样式
import './styles/common.css'
//ui
import ElementUI from 'element-ui';
import global from './components/apicom/apicom'

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 定义全局过滤器
import moment from 'moment';
Vue.filter('dateFormat', function(dateStr, pattern = 'YYYY.MM.DD HH:mm:ss') {
  let unixTimestamp = new Date(dateStr * 1000);
  let commonTime = unixTimestamp.toLocaleString('chinese', { hour12: false }); //转换为24小时制的时间格式
  return moment(commonTime).format(pattern);
})


//Vue.prototype.$axios = axios;
import axios from 'axios'
axios.defaults.baseURL = 'http://ck.hongbao19.net';
 Vue.prototype.$http = axios;
import VueAMap from 'vue-amap';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式

Vue.use(VueQuillEditor)

// Vue.use(VueAMap);
// VueAMap.initAMapApiLoader({
//    key:'e54507b3ad0aae8a21c93156ed98b206'
//    // key:"6640db853b142488ddd23208d1343c56"
// })

Vue.use(VueAMap);//地图
// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 申请的高德key
  key: '5afeccbaa19c61d781423e1e8443d908',
  // 插件集合
  plugin: ['Autocomplete', 'PlaceSearch', 'Scale', 'OverView', 'ToolBar', 'MapType', 'PolyEditor', 'AMap.CircleEditor','Geocoder'],
  v: '1.4.4'
})


// VueAMap.initAMapApiLoader({
//     key: '6640db853b142488ddd23208d1343c56',
//     plugin: [
//       'AMap.Autocomplete',   //
//         'AMap.PlaceSearch',    //搜索
//         'AMap.Scale',          //比例尺
//         'AMap.OverView',       //鹰眼
//         'AMap.ToolBar',        //地图工具条
//         'AMap.MapType',        //地图类型
//         'AMap.PolyEditor',     //折线、多边形编辑插件
//         'AMap.CircleEditor',   //圆编辑插件
//         // 'AMap.Geolocation',    //自动定位
//         'AMap.Geocoder'        //获取位置信息
//     ],
//     // 默认高德 sdk 版本为 1.4.4
//     v: '1.4.5'
// });
Vue.config.productionTip = false
Vue.prototype.api = global.apicom
Vue.config.productionTip = false
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;

//地图

// sessionStorage.setItem('openindex','')

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.interceptors.request.use(config =>{
//   // 将token给到一个前后台约定好的key中，作为请求发送
//   let token = sessionStorage.getItem('ms_token')
//   if (token) {
//     config.headers.common['position'] = 'adminapp'
//     config.headers.common['token'] = token
//   }
//   console.log(config)
//   return config
// }, function (error) {
//   return Promise.reject(error)
// })
// axios.interceptors.request.use(function (config) {
//   // 将token给到一个前后台约定好的key中，作为请求发送
//   let token = sessionStorage.getItem('ms_token')
//   // console.log(config)
//   console.log(token);
//   // let token = 'fbd70a5619dbbf43620993edb2c93975'
//
//   // 放参数里  只能用post请求
//   if (token) {
//     config.data['apitype'] = 1
//     config.data['token'] = token
//   }
//   // 放请求头
//   // config.headers.common['Token'] = token
//   // config.headers.common['Apitype'] = 1
//   return config
// }, function (error) {
//
//   return Promise.reject(error)
// })
//
// axios.interceptors.response.use(data => {
//   if(data.data.status=='4444'){
//     // this.$message.error('登录失效，请重新登录')
//     Message.error(data.data.message);
//     sessionStorage.setItem('ms_token','')
//     this.$router.push('/home/projectSet/testjiekou')
//   }else if(data.data.status==1){
//     return data
//   }else if(data.data.status==0){
//     // console.log('111',data)
//     Message.error(data.data.message);
//     return data
//   }
//
// }, error => {
//   // Message.error({
//   //   message: '加载失败'
//   // })
//   return Promise.reject(error)
// })
//
//
//
//
//
// /* eslint-disable no-new */
// // 使用 Event Bus
//
// // import echarts from 'echarts'
// // Vue.prototype.$echarts = echarts
//
// sessionStorage.setItem('ms_open', false)
// // sessionStorage.setItem('ms_menu','')
//
//
router.beforeEach((to, from, next) => {
  const ms_token =localStorage.getItem('token');
  // console.log('role',role)
  if (!ms_token && to.path == '/register') {
    next()
  } else if (!ms_token) {
    next('/register');
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    // role === 'admin' ? next() : next('/403');
  } else if (ms_token && to.path == '/') {
    next('/register')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }

 })

















new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
