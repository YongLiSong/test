<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
       <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev hide"></div>
    <div class="swiper-button-next hide"></div>
    <!-- 如果需要滚动条 -->
</div>
</template>
<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
  data () {
    return {
      default: {
        pagination: {
          clickable: true
        }
      }
    }
  },
  mounted () {
    var mySwiper = new Swiper('.' + this.swipername, { ...this.default, ...this.opction })
    mySwiper.el.onmouseover = function () {
      mySwiper.navigation.$nextEl.removeClass('hide')
      mySwiper.navigation.$prevEl.removeClass('hide')
    }
    console.log(mySwiper.el)
    mySwiper.el.onmouseout = function () {
      mySwiper.navigation.$nextEl.addClass('hide')
      mySwiper.navigation.$prevEl.addClass('hide')
    }
  },
  props: ['opction', 'swipername']
}
</script>
<style lang="scss" scope>
   .swiper-container .hide{
  opacity:0;
}
.swiper-button-next,.swiper-button-prev{
  transition:opacity 0.5s;
}
</style>
