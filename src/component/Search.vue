<template>
  <div>
    <header class="van-hairline--bottom">
      <van-row>
        <van-col span="3">
          <div class="back" @click="clickBack">后退</div>
        </van-col>
        <van-col span="21">
          <div>
            <van-search
              v-model="value"
              placeholder="请输入搜索关键词"
              show-action
              @search="onSearch"
              :background="'#00A7DD'"
              :shape="'round'"
            >
              <div slot="action" @click="onSearch">搜索</div>
            </van-search>
          </div>
        </van-col>
      </van-row>
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
      this.$emit('search', this.value)
    },
    clickBack () {
      this.$router.back()
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
.back {
  @include font-size(14px);
  color: #ffffff;
  width: 100%;
  height: 54px;
  @include borderBox();
  @include defaultFlex;
  /*padding: 0.3rem 0;*/
}
.van-search {
  padding-left: 0;
}
  header {
    background-color: $mainColor;
  }
.van-search__action {
  color: #ffffff;
}
</style>
