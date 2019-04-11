<template>
  <div>
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field v-model="fieldValue" placeholder="请输入" />
    </van-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDialog: false,
      fieldValue: null
    }
  },

  components: {},

  computed: {},

  methods: {
    beforeClose (action, done) {
      if (action === 'confirm') {
//        this.popValue = this.fieldValue
        this.$emit('closePopField', {value: this.fieldValue})
        done()
      } else {
        this.$emit('closePopField', {value: ''})
        done()
      }
//      this.closeCB()
    }
  },

  created () {},

  mounted () {
    this.showDialog = true
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>

</style>
