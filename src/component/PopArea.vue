<template>
  <div>
    <!--地区弹窗-->
    <van-popup class="van-popup60" position="bottom" v-model="show" @click-overlay="clickOverlayCB">
      <van-area :area-list="areaList" :columns-num="2" title="" @confirm="clickConfirm" value="440000"
                @cancel="clickCancel"/>
    </van-popup>
  </div>
</template>

<script>
import areaData from '../common/area'

export default {
  data () {
    return {
      areaList: null,
      show: false
    }
  },

  components: {},

  computed: {},

  methods: {
    clickConfirm (value) {
      this.show = false
      //      this.theFieldArr[this.curFieldDIdx].value = myModule.formatTime(this.theShowDate)
      this.$emit('confirmArea', {value: value})
    },
    clickCancel () {
      this.show = false
      this.$emit('cancelArea', {value: null})
    },
    clickOverlayCB () {
      this.show = false
      this.$emit('cancelArea', {value: null})
    }
  },

  created () {
    this.areaList = areaData
  },

  mounted () {
    this.show = true
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .van-popup60 {
    /*width: 80%;*/
    border-radius: 5px;
  }
</style>
