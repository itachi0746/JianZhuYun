<template>
  <div>
    <header class="van-hairline--bottom">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
      <van-icon class="right-icon" @click.native="clickBack" name="arrow-left" />
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },

  components: {},

  computed: {},

  methods: {
    onSearch () {
      console.log('ss')
    },
    clickBack () {
      this.$router.push({name: 'EPIndex', params: { }})
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
.right-icon {
  position: absolute;
  left: 13px;
  top: 17px;
  @include font-size(20px)
}
.van-search {
  padding-left: 40px;
}
</style>
