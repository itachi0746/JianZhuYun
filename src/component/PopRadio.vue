<template>
  <div>
    <!--单选弹窗-->
    <van-popup class="van-popup60" v-model="showRadio" @click-overlay="clickOverlayCB">
      <div v-if="title" class="title">{{title}}</div>
      <div class="radio-box">
        <van-radio-group v-model="radio">
          <van-cell-group v-if="theRadioData">
            <van-cell v-for="(item,index) in theRadioData" :key="index" :title="item.Value" clickable
                      @click="clickRadio(item)">
              <van-radio class="no-event" :name="item.Value"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
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
    title: {
      type: String,
      default: null
    }
  },
  watch: {
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
    width: 80%;
    border-radius: 5px;
  }
  .radio-box {
    max-height: 300px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
    /*font-size: 0.32rem;*/
    overflow-x: hidden;
  }
  .title {
    @include font-size(18px);
    color: #000000;
    text-align: center;
    padding: 10px 0;
  }
  .no-event {
    pointer-events: none;
  }
</style>
