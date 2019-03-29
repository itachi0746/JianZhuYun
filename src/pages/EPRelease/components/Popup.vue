<template>
  <div>
    <!--<van-popup v-model="show">-->
    <!--<van-field v-show="type==='field'" v-model="value" placeholder="请输入用户名" />-->
    <!--</van-popup>-->
    <van-dialog
      v-model="show"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field v-show="type==='field'" v-model="value" placeholder="请输入用户名" />
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      show: false
    }
  },
  computed: {},

  props: {
    type: { // 当前激活的
      type: String,
      default: 'field'
    },
    showPopup: { // 当前激活的
      type: Boolean,
      default: false
    }
  },
  watch: {
    showPopup () {
      this.show = this.showPopup
    },
    show () {
      if (!this.show) {
        this.$emit('popupHidden', {})
      }
    }
  },

  components: {},

  methods: {
    beforeClose (action, done) {
      if (action === 'confirm') {
        setTimeout(done, 1000)
      } else {
        done()
      }
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>

</style>
