<template>
  <div class="homecontent">
    <banner></banner>
    <hotmen></hotmen>
    <homelist></homelist>
  </div>
</template>
<script>
import banner from '../components/Home/banner'
import hotmen from '../components/Home/hotmen'
import homelist from '../components/Home/homelist'
export default {
  data () {
    return {

    }
  },
  components: {
    banner,
    hotmen,
    homelist
  }
}
</script>
<style lang="scss" scope>
  .homecontent{
    width: 1200px;
    margin: 25px auto;
  }
</style>
