<template>
  <div >
    <kinds></kinds>
    <div class="listcontent clearfix"   v-if="(this.$store.state.goodslist.length ? this.$store.state.goodslist.length:goodslist.length)">
      <ul>
        <li v-for="(data,index) in (this.$store.state.goodslist.length? this.$store.state.goodslist: goodslist)"
        :key="index" @click="goodsdetail(data.goods_id)">
        <div class="picconent">
          <img :src="data.goods_image" :alt="data.goods_name">
        </div>
          <div>
            <h3>{{data.goods_desc}}</h3>
            <p>{{data.goods_name}}</p>
            <p><span>{{data.goods_price}}</span><s>{{data.goods_marketprice}}</s></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import kinds from '../components/kinds'
export default {
  data () {
    return {
      goodslist: [],
      listid: this.$route.params.listid,
      page: 0,
      sumpage: 0
    }
  },
  components: {
    kinds
  },
  mounted () {
    window.addEventListener('scroll', this.scrollBottom)
    if (this.$store.state.goodslist.length === 0) {
      this.$store.dispatch('changelist', this.$route.query.id)
    } else {
      console.log('使用缓存')
    }
  },
  destroyed () {
    window.removeEventListener('scroll', this.scrollBottom)
  },
  methods: {
    scrollBottom () {
      if (document.documentElement.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight < 200) {
        console.log('scroll')
        this.$store.commit('setpage')
        if (this.$store.state.page <= this.$store.state.countnum) {
          // 当显示list数据小于后台总数据,执行这个dispatch,将数据请求交给vuex来做

          this.$store.dispatch('loadMore', { id: this.$route.query.id, page: this.$store.state.page })
        } else {
          console.log('daodile')
        }
      }
    },

    // 跳转商品详情页
    goodsdetail (id) {
      this.$router.push(`/goods/detail?id=${id}`)
    }
  }
}
</script>
<style lang="scss" scope>
  .listcontent{
    width: 1200px;
    margin: 20px auto;

    ul{
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
      li{
        float: left;
        border: 1px solid #eee;
        flex:1;
        width: 224px;
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        margin: 0 20px 20px 0;
        &:nth-of-type(5n){
          margin-right: 0;
        }
        h3{
           font-size: 14px;
            color: #333;
            margin: 10px 0 0;
            font-weight: 600;
        }
        p{
          width: 202px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &:nth-of-type(1){
           font-size: 14px;
           color: #333;
           margin-top: 5px;
          }
          &:nth-of-type(2){
            span{
              font-size: 20px;
              color: #ff527d;
              font-weight: 600;
              margin-right: 8px;
              line-height: 28px;
              display: inline-block;
            }
            s{
              display: inline-block;
              font-size: 14px;
              color: #ccc;
              line-height: 28px;
              font-weight: 100;
            }
           font-size: 14px;
           color: #333;
           margin-top: 5px;
          }
        }
        .picconent{
          position: relative;
            width: 202px;
          height: 202px;
          overflow: hidden;
          img{
            width: 100%;
            position:absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            transition: all 0.3s;
            &:hover{
            transition: all 0.3s;
              width:120%;
            }
          }

        }
      }
    }
  }
</style>
