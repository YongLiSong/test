<template>
  <div class="banner_box">
    <div class="banner_content" v-if="datalist.length">
      <div class="swipercontent">
        <Swiper :opction="{
           cssMode: true,
          loop: true,
          autoplay: {
            delay: 2000
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          pagination: {
            el: '.swiper-pagination',
            bulletClass: 'my-bullet',
            bulletActiveClass: 'my-bullet-active',
            modifierClass: 'my-pagination-'
          },
          mousewheel: true,
          keyboard: true
          }" class="banner" swipername="banner">
          <div
            class="swiper-slide"
            v-for="(data, index) in datalist"
            :key="index"
            @click="tovideo(data.notify.content.video_id)"
          >
            <img :src="data.ad_image" :alt="data.title" />
            <p>
              <span
                >{{ Math.floor(data.video_length / 60) }}:{{
                  data.video_length % 60
                }}
                |
              </span>
              <span>{{ data.hongren_info.user_name }}</span>
            </p>
            <h3>{{ data.title }}</h3>
          </div>
        </Swiper>
      </div>
      <div class="video_right" v-if="datasidebarlist.length">
        <div v-for="(data, index) in datasidebarlist" :key="index" @click="tovideo(data.notify.content.video_id)">
          <img :src="data.ad_image" alt="" />
          <p>
            <span>
              {{ Math.floor(data.video_length / 60) }}:{{
                data.video_length % 60
              }}
              |
            </span>
            <span>{{ data.hongren_info.user_name }}</span>
          </p>
          <h3>{{ data.title }}</h3>
        </div>
      </div>
    </div>
    <!-- 首页登录栏 -->
    <div class="login_content">
      <div class="loginLogo">
        <img src="images/loginlog.png" alt="" />
        <button>登录</button>
        <p>登录可查看会员权益</p>
      </div>
      <div class="relevantList">
        <ul>
          <li>
            <i class="iconfont icon-qian"></i>
            <p>待付款</p>
          </li>
          <li>
            <i class="iconfont icon-duogouwu"></i>
            <p>待收货</p>
          </li>
          <li>
            <i class="iconfont icon-gaoxiaofei"></i>
            <p>优惠券</p>
          </li>
          <li>
            <i class="iconfont icon-shoucang"></i>
            <p>我的关注</p>
          </li>
        </ul>
      </div>
      <div class="newslist">
        <h3>花卷头条</h3>
        <vue-seamless-scroll
          class="seamless-warp"
          :data="hotlist"
          :class-option="classOption"
        >
          <ul v-if="hotlist.length" class="item">
            <li v-for="data in hotlist" :key="data.hongren_uid">
              <span class="title" v-text="data.content"></span>
            </li>
          </ul>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from '../Swiper'
import Axios from 'axios'
export default {
  data () {
    return {
      datalist: [],
      datasidebarlist: [],
      hotlist: [],
      animate: false
    }
  },
  methods: {
    tovideo (videoid) {
      console.log('videoid')
      this.$router.push(`/video/detail?id=${videoid}`)
    }
  },
  created () {},

  mounted () {
    Axios({
      url: `https://www.huajuanmall.com/pc/pcIndex/recHot`
    }).then(res => {
      this.datalist = res.data.ad.pc_index_carousel
      this.datasidebarlist = res.data.ad.PCHotTopic
      console.log(this.datalist)
    })
    Axios({
      url: `https://www.huajuanmall.com/pc/pcIndex/toutiao`
    }).then(res => {
      this.hotlist = res.data.toutiao
    })
  },
  components: {
    Swiper
  },
  computed: {
    classOption () {
      return {
        step: 0.3
      }
    }
  }
}
</script>
<style lang="scss" scope>
.banner_box {
  width: 1200px;
  margin: 25px auto;
  overflow: hidden;
  .login_content {
    box-sizing: border-box;
    padding: 20px;
    .marquee_top {
      position: relative;
      transition: all 1s;
      transform: translate(0, -50px);
    }
    .newslist {
      .seamless-warp {
        height: 40px;
        overflow: hidden;
        line-height: 30px;
      }
      h3 {
        color: #ff527d;
        font-size: 16px;
        margin-top: 200px;
      }
      ul {
        li {
          color: rgba(0, 0, 0, 0);
          line-height: 15px;
          font-size: 12px;
          color: #666;
          padding-left: 10px;
          position: relative;
          margin-bottom: 5px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          &:before {
            content: "";
            display: block;
            height: 4px;
            width: 4px;
            border-radius: 50%;
            background-color: #ff527d;
            position: absolute;
            top: 7px;
            left: 0;
          }
        }
      }
    }
    .relevantList {
      ul {
        li {
          box-sizing: border-box;
          padding-top: 23px;
          float: left;
          width: 115px;
          height: 96px;
          text-align: center;
          font-size: 14px;
          border-bottom: 1px solid #eee;
          border-left: 1px solid #eee;
          &:nth-of-type(1) {
            border-left: 0;
          }
          &:nth-of-type(3) {
            border-left: 0;
          }
          i {
            font-size: 24px;
            color: #ccc;
          }
          p {
            font-size: 12px;
            color: #ccc;
          }
        }
      }
    }
    .loginLogo {
      width: 100%;
      position: relative;
      border-bottom: 1px solid #eee;
      padding-bottom: 10px;
      img {
        height: 64px;
        width: 64px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
        border-radius: 100%;
        margin: 16px auto;
      }
      button {
        width: 75px;
        height: 25px;
        border: 1px solid #ff527d;
        font-size: 12px;
        color: #ff527d;
        border-radius: 13px;
        outline: none;
        position: absolute;
        top: 64px+8px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      p {
        text-align: center;
        color: #666;
        font-size: 12px;
        margin-top: 45px;
      }
    }
    float: right;
    height: 448px;
    width: 274px;
    border: 1px solid #eee;
    border-radius: 10px;
  }
  .banner_content {
    .video_right {
      div {
        position: relative;
        height: 215px;
        width: 286px;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 20px;
        img {
          width: 100%;
        }
        p {
          padding: 3px 10px;
          background-color: rgba(0, 0, 0, 0.6);
          color: #fff;
          margin-left: 20px;
          border-radius: 50px;
          font-size: 14px;
          position: absolute;
          bottom: 40px;
          left: 0;
        }
        h3 {
          position: absolute;
          bottom: 0px;
          left: 0;
          font-size: 14px;
          color: #fff;
          margin-left: 20px;
        }
      }
      float: left;
    }
    .swipercontent {
      float: left;
      width: 600px;
      height: 450px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 20px;
      p {
        padding: 3px 10px;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        margin-left: 20px;
        border-radius: 50px;
        font-size: 14px;
        position: absolute;
        bottom: 40px;
        left: 0;
      }
      h3 {
        position: absolute;
        bottom: 10px;
        left: 0;
        font-size: 20px;
        color: #fff;
        margin-left: 20px;
      }
      img {
        width: 100%;
        height: 100%;
      }
      .my-bullet {
        width: 8px;
        height: 8px;
        display: inline-block;
        border-radius: 100%;
        background: #000;
        opacity: 0.2;
        margin-right: 10px;
      }
      .my-pagination-bullets {
        position: absolute;
        text-align: center;
        transition: 0.3s opacity;
        transform: translate3d(0, 0, 0);
        z-index: 10;
        bottom: 10px;
        right: 0;
      }
      .my-bullet-active {
        background: red;
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 100%;
        opacity: 1;
      }
    }
  }
}
</style>
