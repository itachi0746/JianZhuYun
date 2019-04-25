<template>
  <div>
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      :before-close="beforeClose"
    >
      <Field :item="PopFieldData" :cellMB="false"></Field>
    </van-dialog>
  </div>
</template>

<script>
import Field from './Field.vue'
export default {
  data () {
    return {
      showDialog: false,
      fieldValue: null
    }
  },

  components: {
    Field
  },
  props: {
    PopFieldData: {
      type: Object,
      default: null
    }
  },

  computed: {},

  methods: {
    beforeClose (action, done) {
      if (action === 'confirm') {
        this.$emit('closePopField', this.PopFieldData)
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
