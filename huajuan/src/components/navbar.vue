<template>
  <div class="navbar">
    <ul class="navcontent clearfix">
      <li v-for="(data,index) in $store.state.navbarlist" :key="data.gc_id" :class="$store.state.num===index?'active':''" @click="tolist(data.gc_id,index)" @mouseover="showchild(index)" @mouseleave="hidechild(index)">
        <img :src="data.pc_icon?data.pc_icon:null" alt="">
        <span>{{data.gc_name}}</span>
        <navchild :listinfo="data.children" v-if="currintIndex2===index?!isShow:isShow"></navchild>
      </li>
    </ul>
  </div>
</template>
<script>
import navchild from './Navbar/navchild'
export default {
  data () {
    return {
      navlist: [],
      currintIndex: localStorage.getItem('num') * 1,
      isShow: false,
      currintIndex2: -1
    }
  },
  components: {
    navchild
  },
  methods: {
    tolist (id, index) {
      console.log('我是navbar')
      this.$store.dispatch('changelist', id)
      this.$store.commit('resizepage')
      this.$router.push(`/list?id=${id}`)
      this.currintIndex = index
      localStorage.setItem('num', index)
      this.$store.commit('listnum', index)
    },
    showchild (index) {
      this.currintIndex2 = index
    },
    hidechild () {
      this.currintIndex2 = -1
    }
  },
  beforeMount () {
    this.$store.commit('listnum', localStorage.getItem('num') * 1)
    this.currintIndex = localStorage.getItem('num') * 1
    console.log(localStorage.getItem('num') * 1)
  },
  mounted () {
    console.log(this.$store.state.navbarlist)
    if (this.$store.state.navbarlist.length === 0) {
      this.$store.dispatch('getlist')
    } else {
      console.log('使用缓存')
    }
  }
}
</script>
<style lang="scss" scope>
  .navbar{
             user-select: none;

    height: 62px;
    width: 100%;
    border-bottom: 1px solid #fbfbfb;
    .navcontent{
      width: 1200px;
      margin:0 auto;
      &>li{
        float: left;
        width: 150px;
        position: relative;
        box-sizing: border-box;
        border-bottom:3px solid #fff;
       &:hover{
         span{
          color: #fe7295;

         }
        }
        cursor: pointer;
        img{margin-left: 40px;
          float: left;
          margin-top: 14px;
          background:#eeeeee;
          height: 30px;
          width: 30px;
          border-radius: 50%;
          border: 0;
        }
        span{
          float: left;
          font-size: 14px;
          margin-left: 10px;
          line-height: 59px;

        }
      }
      .active{
        border-bottom:3px solid #fe7295;
      }
    }
    .kinds{
      li{
        float: left;
      }
    }
  }
</style>
