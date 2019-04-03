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
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>

</style>
