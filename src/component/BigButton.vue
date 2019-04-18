<template>
  <div>
    <van-button @click="clickSubmit" :class="['btnStyle', {'btnStyle2': isActiveBtn}]" type="default" size="large"
                :disabled="isDisable">
      {{font}}
    </van-button>
  </div>
</template>

<script>
import myModule from '../common'

export default {
  data () {
    return {
    }
  },
  props: {
    theFieldArr: {
      type: Array,
      default: null
    },
    font: {
      type: String,
      default: null
    }
  },

  components: {},

  computed: {
    isDisable () {
      return myModule.computeRequired(this.theFieldArr)
    },
    isActiveBtn () {
      return !this.isDisable
    }
  },

  methods: {
    clickSubmit () {
      this.$emit('clickSubmit', {})
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .btnStyle {
    background-color: #AAAAAA;
    color: #ffffff;
    border-radius: 5px;
  }
  .btnStyle2 {
    @include theBtnColor;
  }
</style>
