import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
import scroll from 'vue-seamless-scroll'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)
// ————————————————
// 版权声明：本文为CSDN博主「AbelEthan」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/abelethan/article/details/89016678

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(scroll)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// ————————————————
// 版权声明：本文为CSDN博主「Oliver尹」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/zy21131437/article/details/99548983

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
