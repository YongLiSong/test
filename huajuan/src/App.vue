<template>
  <div id="app">
    <el-backtop :bottom="100" :right="100">
      <div class="backtop iconfont icon-shouqi"></div>
    </el-backtop>
    <top></top>
    <search></search>
    <navbar v-if="this.$store.state.navBarstate"></navbar>
    <router-view />
    <homefoot></homefoot>
  </div>
</template>
<script>
import top from '@/components/top'
import search from '@/components/search'
import navbar from '@/components/navbar'
import homefoot from '@/components/footer'
export default {
  data () {
    return {}
  },
  components: {
    top,
    search,
    navbar,
    homefoot
  },
  mounted () {
    if (window.history && window.history.pushState) {
      // 向历史记录中插入了当前页
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', this.goBack, false)
    }
  },
  destroyed () {
    window.removeEventListener('popstate', this.goBack, false)
  },
  methods: {
    goBack () {
      this.$store.dispatch('changelist', this.$route.query.id)
    }
  }
}
</script>
<style lang="scss">
.el-backtop {
  opacity: 0.45;
  background-color: #000 !important;
}
.backtop {
  height: 100%;
  width: 100%;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 30px;
}
html,
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
dl,
dt,
dd,
dl,
ul,
ol,
li,
img,
input,
fieldset,
legend,
figure,
figcaption {
  margin: 0;
  padding: 0;
}
ul,
ol,
li {
  list-style: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 16px;
  font-weight: normal;
}
b,
strong {
  font-weight: normal;
}
em,
i {
  font-style: normal;
}
a {
  text-decoration: none;
}
img {
  display: block;
  border: none;
}
input {
  outline: none;
}
body {
  font-size: 16px;
}
.clearfix:after {
  content: ".";
  height: 0;
  overflow: hidden;
  visibility: hidden;
  display: block;
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
</style>
