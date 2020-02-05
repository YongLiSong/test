<template>
  <div class="detailcontent">
    <!-- 详情页面包屑部分======================== -->
    <div class="breadcrumb">
      <el-breadcrumb separator=">" v-if="breadlist.length">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="data in breadlist" :key="data.gc_id" :to="{path:`/list?id=${data.gc_id}`}">{{data.tag_name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{videoinfo.video_title}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- ============================================== -->
    <div class="detailcontent">

        <!-- 详情页的上半部分结构=================== -->
      <div class="videocontent">
        <div class="playvideo">
          <!-- 正在播放的视频 -->
          <video-player class="video-player vjs-custom-skin"
                            ref="videoPlayer"
                            :playsinline="true"
                            :options="playerOptions"
                            v-if="playerOptions.sources[0].src"
                            >
          </video-player>
          <!-- 视频相关商品 -->
          <div class="aboutgoods">

          </div>
        </div>
      </div>
      <!-- =============================================== -->

      <!-- 下半部分---更多视频====================================== -->
      <div class="moreviedo">

      </div>
      <!-- ==================================================== -->
    </div>
  </div>
</template>
<script>
import Axios from 'axios'

export default {
  data () {
    return {
      breadlist: [],
      videoinfo: null,
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
        sources: [{
          // 类型
          type: 'video/mp4',
          // url地址
          src: ''
        }],
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
    console.log('detail')
    Axios({
      url: `https://www.huajuanmall.com/pc/video/getVideoDetaiData?video_id=${this.$route.query.id}`
    }).then(res => {
      console.log(res.data.video)
      this.playerOptions.sources[0].src = res.data.video.video_url
      this.playerOptions.poster = res.data.video.image_url
      this.videoinfo = res.data.video
      this.breadlist = res.data.tags
    })
  }
}
</script>
<style lang="scss" scope>
  .detailcontent{
    width: 1200px;
    margin: 0 auto;
    .breadcrumb{
      .el-breadcrumb__item{
        span{
      color: #999;
      font-weight: normal;

        }
      font-size: 12px;

      }
      margin-top: 25px;
      margin-bottom: 25px;
    }
    .videocontent{
      width: 800px;
      height: 600px;
      overflow: hidden;
      border-radius: 10px;
    }
  }
</style>
