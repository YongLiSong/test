<template>
  <div class="goodsdetail">
    <!-- ============================面包屑部分========================= -->
    <div class="breancrumb">
      <el-breadcrumb separator=">" v-if="breadcurent.length">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          v-for="data in breadcurent"
          :key="data.gc_id"
          :to="{ path: `/list?id=${data.gc_id}` }"
          >{{ data.tag_name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ goodsinfo.goods_name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ==========================面包屑部分=========================== -->

    <!-- ==================商品信息---图片/视频,价格数量================== -->
    <div class="infocontent clearfix">
      <!-- =======图片/视频======= -->
      <div class="pic_video" v-if="breadcurent.length">
        <img
          :src="goodsinfo.goods_image"
          :alt="goodsinfo.goods_name"
          v-if="!nowplaying.length"
        />
        <!-- =========正在播放的视频=======-->
        <video-player
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
          v-if="nowplaying.length"
        >
        </video-player>

        <!-- =========正在播放的视频=======-->
      </div>
      <!-- =======图片/视频======= -->

      <!-- =======红人信息======== -->
      <div class="hongren fr" v-if="hongren">
        <div class="topinfo">
          <img :src="hongren.user_avatar" :alt="hongren.user_name">
          <p>{{hongren.user_name}}</p>
        </div>
        <ul class="minfo">
          <li><span>小铺号</span><span>{{hongren.hongren_number}}</span></li>
          <li><span>宝贝</span><span>{{hongren.goods_num}}</span></li>
          <li><span>粉丝</span><span>{{hongren.fcount}}</span></li>
        </ul>
        <div class="botinfo">
          <button>+关注</button>
          <p>进店逛逛</p>
        </div>
      </div>
      <!-- =======红人信息======== -->

      <div class="goodsinfo fr clearfix" v-if="goodsinfo">
        <div class="info">
          <h2 class="goodsname">
            {{ goodsinfo.goods_desc }}
            <p>{{ goodsinfo.goods_name }}</p>
          </h2>
          <div class="goodsprice">
            <p>
              花卷价<span>¥{{ goodsinfo.goods_price }}</span
              ><s>市场价</s><s>¥{{ goodsinfo.goods_marketprice }}</s>
            </p>
          </div>
          <p class="goodsgg">
            {{ goodsgg }}<span>{{ goodsinfo.goods_spec }}</span>
          </p>
        </div>
        <div class="goodsnum">
          <div class="switchcontent">
            <span @click="dpp">-</span>
            <span class="num">{{ goodsnum }}</span>
            <span @click="add">+</span>
          </div>
        </div>
      </div>

    </div>
    <!-- ==================商品信息---图片/视频,价格数量================== -->
    <div class="changevideo clearfix" v-if="nowplaying.length">
      <ul>
        <li
          v-for="(data, index) in nowplaying"
          :key="data.video_id"
          @click="videoactive(data, index)"
          :class="index === current ? 'active' : ''"
        >
          <div>
            <img :src="data.image_url" :alt="data.video_title" />
          </div>
          <h3>{{ data.video_type_cn }}视频</h3>
        </li>
      </ul>
    </div>
    <div class="goodsdetail" v-if="code === 200">
      <h3>{{ goodsinfo.goods_other_detail.other_title }}</h3>
      <div v-html="goodsinfo.goods_other_detail.other_content"></div>
    </div>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  data () {
    return {
      code: 0,
      hongren: null,
      // 面包屑数据
      breadcurent: [],
      // 商品信息和详细数据
      goodsinfo: null,
      // 商品介绍视频列表
      nowplaying: [],
      // 商品描述
      goodsdetail: null,
      goodsgg: '',
      goodsnum: 1,
      current: 0,
      playerOptions: {
        // 播放速度
        playbackRates: [0.5, 1.0, 1.5, 2.0],
        // 如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '4:3',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        fluid: true,
        sources: [
          {
            // 类型
            type: 'video/mp4',
            // url地址
            src: ''
          }
        ],
        // 你的封面地址
        poster: '',
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          // 全屏按钮
          fullscreenToggle: true
        }
      }
    }
  },
  created () {
    // 控制navbar的隐藏和显示
    this.$store.commit('hideNavbar')
  },
  destroyed () {
    this.$store.commit('showNavbar')
  },
  mounted () {
    Axios({
      url: `https://www.huajuanmall.com/pc/goods/getGoodsDetail?goods_id=${this.$route.query.id}`
    }).then(res => {
      // 获取面包屑
      this.breadcurent = res.data.tags
      // 获取商品信息
      this.goodsinfo = res.data.goodsInfo
      // 获取视频列表
      this.nowplaying = res.data.videos
      // 获取商品说明
      this.goodsdetail = res.data.goodsInfo.goods_other_detail
      // 默认视频播放路径
      if (res.data.videos.length) {
        this.playerOptions.sources[0].src = res.data.videos[0].video_url
      }
      // 视频封面地址
      if (res.data.videos.length) {
        this.playerOptions.poster = res.data.videos[0].image_url
      }
      // 商品规格
      this.goodsgg = res.data.specText

      this.code = res.data.code
      // 商品相关红人信息
      this.hongren = res.data.hongren
      console.log('code', this.code)
    })
  },
  methods: {
    // 设置购买物品数量
    add () {
      this.goodsnum += 1
    },
    dpp () {
      // 当数量小于时,提示警告信息
      if (this.goodsnum <= 1) {
        this.goodsnum = 1
        this.$message({
          message: '最小购买数量不能小于1件',
          type: 'warning'
        })
      } else {
        this.goodsnum -= 1
      }
    },

    // 视频选择
    videoactive (data, index) {
      this.playerOptions.sources[0].src = data.video_url
      this.playerOptions.poster = data.image_url
      this.current = index
    }
  }
}
</script>
<style lang="scss" scope>
.goodsdetail {
  width: 1200px;
  margin: 0 auto;
  .breancrumb {
    height: 50px;
    .el-breadcrumb__item {
      font-size: 14px;
      span {
        color: #999;
        line-height: 50px;
        font-weight: normal;
      }
    }
  }
  .infocontent {
    .pic_video {
      float: left;
      width: 620px;
      height: 465px;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 0 10px 0 hsla(0, 0%, 80%, 0.65);
      position: relative;
      img {
        height: 140%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .vjs-poster {
        background-color: #fff;
      }
      .video-js {
        background-color: #fff;
        box-shadow: 0 0 10px 0 hsla(0, 0%, 80%, 0.65);
      }
    }
    .goodsinfo {
      width: 360px;
      .goodsname {
        font-size: 22px;
        color: #333;
        p {
          font-size: 18px;
          color: #666;
          margin-top: 10px;
        }
      }
      .goodsprice {
        margin-top: 30px;
        font-size: 14px;
        color: #333;
        span {
          color: #ff527d;
          font-size: 24px;
          font-weight: 900;
          margin-right: 10px;
          margin-left: 10px;
        }
        s {
          margin-right: 5px;
          color: #999;
        }
      }
      .goodsgg {
        margin-top: 60px;
        font-size: 12px;
        color: #999;
        letter-spacing: 20px;
        border-bottom: 1px solid #eee;
        padding-bottom: 40px;
        span {
          color: #333;
          letter-spacing: 0;
        }
      }
    }
    .goodsnum {
      margin-top: 30px;
      .num {
        height: 36px;
        width: 50px;
        border: 0;
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-size: 16px;
        line-height: 36px;
        position: relative;
        top: -1px;
      }
      span {
        line-height: 36px;
        text-align: center;
        display: inline-block;
        height: 36px;
        width: 36px;
        border: 1px solid #ccc;
        color: #333;
        user-select: none;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          border-color: #ff527d;
        }
        &:active {
          color: red;
        }
      }
    }
    .hongren{
      padding: 20px 24px 22px;
       border: 1px solid #eee;
       margin-left: 30px;
      .topinfo{
        border-bottom: 1px solid #eee;
        img{
          height: 40px;
          width: 40px;
          border-radius: 50%;
          margin:0 auto;
        }
        p{
          font-size: 14px;
          color: #666;
          text-align: center;
          margin: 15px auto ;
        }
      }
      .minfo{
        margin-bottom: 15px;
        li{
          span{
            display: inline-block;
            font-size: 12px;
            color: #666;
            margin-right: 5px;
          }
        }
      }
      .botinfo{
        button{
          background-color: #fff;
          border:1px solid #ff527d;
          height: 22px;
          width: 100px;
          border-radius: 11px;
          text-align: center;
          color: #ff527d;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }
        p{
          font-size: 14px;
          color: #999;
          text-align: center;
        }
      }
    }
  }
  .changevideo {
    margin-top: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid #eee;
    ul {
      .active {
        position: relative;
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          content: "\6B63\5728\64AD\653E";
          padding: 0 10px;
          line-height: 26px;
          color: #fff;
          background: #ff527d;
          font-size: 12px;
          text-align: center;
          border-radius: 10px 0 10px 0;
        }
        h3 {
          color: #ff527d;
        }
      }
      li {
        float: left;
        width: 160px;
        margin-right: 20px;

        div {
          width: 160px;
          height: 120px;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          box-shadow: 0 0 10px 0 hsla(0, 0%, 80%, 0.65);
          img {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
        h3 {
          margin-top: 20px;
          font-size: 14px;
          color: #333;
        }
      }
    }
  }
  .goodsdetail{
    margin-bottom: 60px;
    h3{
      font-size: 24px;
      font-weight: 900;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    div{
      color: #333;
      line-height: 20px;
      font-size: 14px;
    }
  }
}
</style>
