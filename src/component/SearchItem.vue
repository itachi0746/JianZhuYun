<template>
  <div>
    <header class="van-hairline--bottom" ref="search-header">
      <van-row>
        <van-col span="5">
          <!--<div class="back" @click="clickBack">后退</div>-->
          <div class="back" @click="clickBack">
            <van-icon name="arrow-left" :size="'28px'" />
          </div>
        </van-col>
        <van-col span="19">
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
      if (!this.value) {
        console.log(`输入为空: ${this.value}`)
        this.$toast.fail('搜索值不能为空')
        return
      }
      this.value = this.value.trim()
      this.$emit('search', this.value)
    },
    clickBack () {
      window.history.back()
//      this.$router.back()
    },
    handleHeight () {
      setTimeout(() => {
        const headerHeight = this.$refs['search-header'].offsetHeight
        this.$emit('sendHeight', {'headerHeight': headerHeight})
      }, 300)
    }
  },

  created () {},

  mounted () {
    this.handleHeight()
  },

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
  justify-content: flex-start;
  padding-left: 10px;
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
