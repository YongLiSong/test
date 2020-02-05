<template>
  <div class="searchcontent">
    <div class="search">
      <div class="logo">
        <h1>
          <img src="images/logo.png" alt="logo" />
          <span>花卷</span>
        </h1>
        <p>红人视频购物商城</p>
      </div>
      <div class="seatchcontent">
        <input type="search" placeholder="请输入想找的红人或商品" />
        <i class="iconfont icon-sousuo"></i>
        <router-link to="shoppingcar" tag="p"
          ><i class="iconfont icon-gouwuche"></i>我的购物车</router-link
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
<style lang="scss" scope>
.searchcontent{
  width: 100%;
  height: 120px;
  border-bottom:2px solid #fe7295;
}
.search {
  height: 120px;
  width: 1200px;
  margin: 0 auto;
  position: relative;
  .logo {
    padding-left:20px;
    float: left;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    h1 {
      font-weight: 700;
      height: 46px;
      img {
        margin-right: 5px;
        height: 100%;
        float: left;
      }
      span {
        line-height: 46px;
        font-size: 24px;
        color: #fd567f;
        float: left;
      }
    }
    p {
      margin-top: 5px;
      width: 100%;
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  }
  .seatchcontent {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    float: right;
    position: relative;
    i {
      position: absolute;
      left: 350px;
      top: 50%;
      transform: translate(0, -50%);
    }
    input {
      height: 40px;
      width: 388px;
      background: #eee;
      font-size: 14px;
      line-height: 40px;
      color: #333;
      border: 0;
      border-radius: 20px;
      padding: 0 20px;
    }
    p {
      width: 158px;
      height: 40px;
      border: 1px solid #f2f2f2;
      display: inline-block;
      margin-left: 30px;
      position: relative;
      text-align: center;
      text-indent: 1rem;
      line-height: 40px;
      font-size: 14px;
      color: #333;
      i {
        position: absolute;
        top: 20px;
        left: 10px;
        color: #fd567f;
      }
    }
  }
}
</style>
