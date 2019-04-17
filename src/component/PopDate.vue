<template>
  <div>
    <!--日期选择-->
    <van-popup v-model="showPicker" position="bottom" @click-overlay="clickOverlayCB">
      <van-datetime-picker
        v-model="theShowDate"
        :type="dateType"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="clickConfirm"
        @cancel="clickCancel"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      theShowDate: new Date(1970, 0, 1),
      showPicker: false
    }
  },
  props: {
    showDate: {
      type: Date,
      default: null
    },
    minDate: {
      type: Date,
      default: null
    },
    dateType: {
      type: String,
      default: ''
    },
    maxDate: {
      type: Date,
      default: function () {
        return new Date(2030, 0, 1)
      }
    }
  },

  components: {},

  computed: {},

  methods: {
    clickConfirm () {
      this.showPicker = false
//      this.theFieldArr[this.curFieldDIdx].value = myModule.formatTime(this.theShowDate)
      this.$emit('confirm', {value: this.theShowDate})
    },
    clickCancel () {
      this.showPicker = false
      this.$emit('cancel', {value: null})
    },
    clickOverlayCB () {
      this.showPicker = false
      this.$emit('cancel', {value: null})
    }
  },

  created () {},

  mounted () {
    this.showPicker = true
    this.theShowDate = this.showDate
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>

</style>
