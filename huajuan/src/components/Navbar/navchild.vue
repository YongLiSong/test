<template>
  <div class="listchild">
    <ul>
      <li v-for="(data) in listinfo" :key="data.gc_id" class="listchild_li" @click.stop="golist(data.gc_id)">
        {{data.gc_name}}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  props: {
    listinfo: Array
  },
  methods: {
    golist (id) {
      this.$router.push(`/list?id=${id}`)
      this.$store.dispatch('changelist', id)
      this.$store.commit('resizepage')

      console.log(id)
    }
  },
  mounted () {
    console.log(this.$props.listinfo)
  }
}
</script>
<style lang="scss" scope>
  .listchild{
    user-select: none;
    transition: all 0.8s;
    position: absolute;
    z-index: 10;
    top: 62px;
    left: 0;
    background-color: #f9f9f9;
    box-shadow: 0 0 10px 0 hsla(0,0%,80%,.65);
    ul{
    width: 150px;
    height: 100%;
    text-align: center;
    .listchild_li{
    box-sizing: border-box;
    padding: 0 12px;
    line-height: 38px;
    border-bottom: 1px solid #eee;
    text-align: center;
    font-size: 12px;
    &:hover{
      color: red;
    }

    }
    }
  }
</style>
