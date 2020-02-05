<template>
  <div class="homelist clearfix">
    <h2>为你推荐</h2>
    <ul v-if="recList.length">
      <li v-for="data in recList" :key="data.video_id" @click="goodsdetail(data.goods[0].goods_id)">
        <img :src="data.goods[0].goods_image" :alt="data.goods[0].goods_name">
        <div>
          <h3>{{data.goods[0].goods_desc}}</h3>
          <p>{{data.goods[0].goods_name}}</p>
          <p><span>{{data.goods[0].goods_price}}</span><s>{{data.goods[0].goods_marketprice}}</s></p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      recList: []
    }
  },
  mounted () {
    Axios({
      url: 'https://www.huajuanmall.com/pc/rec/single?cls_id=0&offset=0'
    }).then(res => {
      console.log(res.data.recList)
      this.recList = res.data.recList
    })
  },
  methods: {
    goodsdetail (id) {
      this.$router.push(`/goods/detail?id=${id}`)
    }
  }
}
</script>
<style lang="scss" scope>
  .homelist{

    h2{
      font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    }
    ul{

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
        img{
          height: 202px;
        }
      }
    }
  }
</style>
