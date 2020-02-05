<template>
  <div class="kinds clearfix">
    <div class="clearfix content" v-if="$store.state.navbarlist.length">
      <h3>品类</h3>
      <li @click="showall($store.state.navbarlist[$store.state.num].gc_id)">全部</li>
      <li v-for="data in $store.state.navbarlist[$store.state.num].children" :key="data.gc_id" @click="handerclick(data.gc_id)">
        {{data.gc_name}}
      </li>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      childrenlist: []
    }
  },
  props: {
    kindslist: Array
  },
  methods: {
    handerclick (id) {
      console.log('123123')
      this.$router.push(`/list?id=${id}`)
      this.$store.dispatch('changelist', id)
      this.$store.commit('resizepage')

      console.log('使用缓存')
    },
    showall (id) {
      this.$router.push(`/list?id=${id}`)
      this.$store.dispatch('changelist', id)
      console.log(id)
    }
  },
  mounted () {
    // childrenlist=this.$store.state.navbarlist[$store.state.num].children
    //  console.log(this.$store.state.navbarlist)
  }
}
</script>
<style lang="scss" scope>
.kinds{
  width: 100%;
  .content{
  height: 50px;
    border:1px solid #ededed;
    width: 1200px;
    margin: 0 auto;
  }
  h3{
    float: left;
    margin-right: 10px;
        line-height: 50px;
         font-size: 12px;
         font-weight: 900;
         margin-left: 20px;
  }
  li{
    line-height: 50px;
    font-size: 12px;
    cursor: pointer;
    float: left;
    position: relative;
    padding: 0 17px;
    text-align: center;
    &:hover{
      color: #fe7295;
    }
    &:last-of-type{
      &:after{
      content: "";
      display: inline-block;
      height: 0;
      width: 0;
      overflow: hidden;
      }
    }
    &:after{
      content: "";
      display: inline-block;
      height: 17px;
      width: 1px;
      background: #ededed;
      position: absolute;
      top:50%;
      transform: translate(0,-50%);
      right: 0;
    }
  }
}
</style>
