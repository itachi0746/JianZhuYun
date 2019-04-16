<template>
  <div>
    <Search :search="onSearch"></Search>
  </div>
</template>

<script>
import Search from '../../../component/Search.vue'

export default {
  data () {
    return {
      value: ''
    }
  },

  components: {
    Search
  },

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
