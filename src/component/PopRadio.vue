<template>
  <div>
    <!--单选弹窗-->
    <van-popup class="van-popup60" v-model="showRadio" @click-overlay="clickOverlayCB">
      <van-radio-group v-model="radio">
        <van-cell-group v-if="theRadioData">
          <van-cell v-for="(item,index) in theRadioData" :key="index" :title="item.Value" clickable
                    @click="clickRadio(item)">
            <van-radio :name="item.Value"/>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showRadio: false,
      radio: '' // radio的值
    }
  },
  props: {
    theRadioData: {
      type: Array,
      default: function () {
        return []
      }
    },
    showPop: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    showPop () {

    }
  },

  components: {},

  computed: {},

  methods: {
    clickRadio (item) {
      this.$emit('closePop', {value: item})
    },
    clickOverlayCB () {
      this.$emit('closePop', {value: ''})
    }
  },

  created () {},

  mounted () {
    this.showRadio = true
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .van-popup60 {
    width: 60%;
  }
</style>
