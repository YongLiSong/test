<template>
  <div class="container">
    <div class="top">
      <p class="fl iconfont icon-shouye indexpage" @click="gohomepage()">首页</p>
      <p class="fr topright">
        <span class="hi">Hi!花卷商城欢迎你~</span>
        <router-link to="/login" tag="span" >登录</router-link>
        <router-link to="/download" tag="span" >花卷app下载</router-link>
        <router-link to="/download" tag="span" ><img src="images/toplogo.png" alt="">重赏福利小程序</router-link>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    gohomepage () {
      localStorage.setItem('num', 0)
      this.$store.commit('gohome')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scope>
  .container{
    height: 32px;
    width: 100%;
    background: #eee;
    .indexpage{
      cursor: pointer;
    }
    .top{
      .topright{
         .hi{
          color: #fc5e85;
        }
        span{
          margin-right: 20px;
          cursor: pointer;
          &:nth-of-type(2){
            position: relative;
            margin-right: 30px;
            &:after{
              content: "";
              position: absolute;
              top: 5px;
              right: -8px;
              width: 1px;
              height: 10px;
              background: #e4e4e4;
            }
          }
          &:last-of-type{
            position: relative;
            margin-left:20px;
            img{
              position: absolute;
              top:1px;
              left: -25px;
              height: 18px;
              width: 18px;
            }
          }
        }
      }
      margin: 0 auto;
      width: 1200px;
      line-height: 32px;
      p{
        font-size: 14px;
        color: #999;
      }
    }
  }
</style>
