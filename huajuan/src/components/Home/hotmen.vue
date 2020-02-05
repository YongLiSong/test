<template>
  <div class="hotmen" v-if="hotlist.length">
    <h2>人气红人</h2>
    <Swiper
      :opction="{
        slidesPerView:5,
        spaceBetween: 20,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          hideOnClick: true,
        },
        pagination: {
          el: '.swiper-pagination',
          bulletClass: 'my-bullet',
          bulletActiveClass: 'my-bullet-active',
          modifierClass: 'my-pagination-',
          clickable: true
        },
      }"
      class="hotmenswiper"
      swipername="hotmenswiper"
    >
      <div
        class="swiper-slide"
        v-for="data in hotlist"
        :key="data.hongren_info.uid"
      >
        <img :src="data.ad_image" alt="" />
        <p>粉丝: <span>{{data.hongren_info.fcount}}</span></p>
      </div>
    </Swiper>
  </div>
</template>
<script>
import Axios from 'axios'
import Swiper from '../Swiper'
export default {
  data () {
    return {
      hotlist: [],
      opction: {
        slidesPerView: 4,
        centeredSlides: true,
        spaceBetween: 30
      }
    }
  },
  components: {
    Swiper
  },
  mounted () {
    Axios({
      url: 'https://www.huajuanmall.com/pc/pcIndex/recHot'
    }).then(res => {
      this.hotlist = res.data.ad.pc_hongren_rec
      console.log(this.hotlist)
    })
  }
}
</script>
<style lang="scss" scope>
.hotmen {
  margin-bottom: 30px;
  .hotmenswiper{
    position: relative;
    p{
      position: absolute;
      background: #fff;
      color: #666;
      right: 20px;
      bottom: 10px;
      padding: 1px 5px 2px;
      border-radius: 10px;
      font-size: 12px;
      span{
        color: #ff527d;
      }
    }
  }
  h2{
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }
  img{
    height: 256px;
    border-radius: 10px;
    overflow: hidden;
  }
}
</style>
