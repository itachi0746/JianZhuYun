<template>
  <div>
    <div>
      <van-dialog
        v-model="showDialog"
        show-cancel-button
        :before-close="beforeClose"
      >
        <van-field v-model="fieldValue" placeholder="请输入" />
      </van-dialog>
      <div class="radio-box">
        <van-radio-group class="radioGroup" v-model="radioValue" v-show="!showDialog">
          <van-cell-group v-if="popData">
            <van-cell v-for="(item,index) in popData" :key="index" :title="item.Value" clickable
                      @click="clickRadio(item)">
              <van-radio :name="item.Value"/>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
      <div class="van-overlay2" v-show="!showDialog"></div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDialog: false, // 是否显示dialog
      fieldValue: '', // 输入框的值
      showPop: false, // 整个窗口的显示隐藏控制
      radioValue: null, // radio的值
      curItem: null, // 当前对象
      popValue: null, // 传回去父组件的值
      thePopType: null // 弹窗类型
    }
  },

  props: {
    popType: { // 弹窗类型
      type: String,
      default: null
    },
    showPopup: { // 显示隐藏
      type: Boolean,
      default: false
    },
    popData: {
      type: Array,
      default: function () { // 对象或数组默认值必须从一个工厂函数获取
        return []
      }
    }
  },
  computed: {
  },
  watch: {
    popType () {
      //      this.showDialog = this.popType === 'field'
      this.thePopType = this.popType
    },
    showPopup () {
      this.showPop = this.showPopup
    },
    showPop () {
      if (!this.showPop) {
        this.$emit('popupHidden', {value: this.popValue})
        this.popValue = null
      }
    },
    thePopType () {
      this.showDialog = this.thePopType === 'field'
    }
  },
  components: {},

  methods: {
    beforeClose (action, done) {
      if (action === 'confirm') {
        this.popValue = this.fieldValue
        done()
      } else {
        done()
      }
      this.closeCB()
    },
    /**
     * 点击radio
     */
    clickRadio (item) {
      this.radioValue = item.Value
      this.popValue = item.Value
      this.curItem = item
      this.closeCB()
    },
    /**
     * 关闭弹窗的回调
     */
    closeCB () {
      this.showPop = false
      this.thePopType = null
    }
  },

  created () {},

  mounted () {
    console.log('mounted')
    this.thePopType = this.popType
    this.showPop = this.showPopup
  },

  beforeDestroy () {
    console.log(122)
  }
}
</script>

<style lang='scss' scoped>
.radio-box {
  max-height: 300px;
  overflow-y: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  width: 60%;
  font-size: 0.32rem;
  overflow-x: hidden;
  -webkit-transition: .3s;
  transition: .3s;
  border-radius: 0.08rem;
  background-color: #fff;
  -webkit-transform: translate3d(-50%,-50%,0);
  transform: translate3d(-50%,-50%,0);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 2001;
}
  .van-overlay2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    z-index: 2000;
  }
</style>
