import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navbarlist: [],
    goodslist: [],
    urlid: 0,
    num: 0,
    page: 0,
    countnum: 0,
    navBarstate: true
  },
  mutations: {
    listinfo (state, list) {
      state.goodslist = []
      state.goodslist = list
    },
    geturlid (state, id) {
      state.urlid = id
    },
    navlist (state, payload) {
      state.navbarlist = payload
      console.log(state.navbarlist)
    },
    gohome (state) {
      state.num = localStorage.getItem('num') * 1
    },
    listnum (state, index) {
      state.num = index
    },
    loadmore (state, newlist) {
      state.goodslist = [...state.goodslist, ...newlist]
    },
    getallnum (state, count) {
      state.countnum = count
    },
    setpage (state) {
      state.page += 15
    },
    resizepage (state) {
      state.page = 0
    },
    // 控制详情页内的navbar的显示和隐藏
    hideNavbar (state) {
      state.navBarstate = false
    },
    showNavbar (state) {
      state.navBarstate = true
    }
    // ---------------------------------
  },
  actions: {
    getlist (store) {
      Axios({
        url: 'https://www.huajuanmall.com/pc/pcIndex/class'
      }).then(res => {
        store.commit('navlist', res.data.goodsClass)
        // this.navlist=res.data.goodsClass
      })
    },
    changelist (store, id) {
      console.log(id)
      Axios({
        url: `https://www.huajuanmall.com/pc/goods/gcGoods?gc_id=${id}&limit=15&offset=0`
      }).then(res => {
        store.commit('listinfo', res.data.goods_info)
        store.commit('getallnum', res.data.allCount)
        console.log(res.data.goods_info)
      })
    },
    // 滚动事件,懒加载触发该函数,发送请求
    loadMore (store, { id, page }) {
      console.log(page)
      Axios({
        url: `https://www.huajuanmall.com/pc/goods/gcGoods?gc_id=${id}&limit=15&offset=${page}`
      }).then(res => {
        store.commit('loadmore', res.data.goods_info)
      })
    }
  },
  modules: {
  }
})
