<template>
  <div :class="{'van-hairline--bottom': item.type !== 'hidden'}" v-show="item.type !== 'hidden'" @click="clickInput(item, index)">
    <div v-if="item.isCode">
      <!--发送验证码-->
      <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField"
                 :data-index="index" :label="item.label" :disabled="item.disabled"
                 :type="item.type" :class="['cell-mb', item.class]" v-model="item.value" :placeholder="item.placeHolder">
        <van-button :class="['btnStyle', {'btnStyle2': item.isActiveBtn}]" @click="clickSend" slot="button" size="small" clearable type="primary">
          发送验证码
        </van-button>
      </van-field>
    </div>
    <div v-else>
      <div v-if="item.isIDCard">
        <!--上传文件-->
        <div style="position: relative;width: 100%;">
          <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField" :disabled="item.disabled" :label="item.label"
                     :data-index="index" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item)"
                     :type="item.type" :class="['cell-mb', item.class]" v-model="item.value" :placeholder="item.placeHolder"/>
          <div class="img-box2" @click="clickBox">
            <img src="./assets/recg.png" alt="">
          </div>
          <van-uploader class="theUploadClass" :after-read="onRead" v-show="false">
            <van-icon id="upIcon" ref="upload" name="scan" :size="'25px'"/>
          </van-uploader>
        </div>
      </div>
      <div v-else>
        <!--默认输入框-->
        <div style="position: relative;width: 100%;">
          <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField" :disabled="item.disabled"
                     :data-index="index" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item)" :readonly="item.readonly"
                     :type="item.type" :class="[{'cell-mb': cellMB}, 'wb', item.class]" v-model="item.value" :placeholder="item.placeHolder" :label="item.label" @input="changeValue(item)">
            <div slot="right-icon" v-if="item.name==='密码' || item.name==='密码1' || item.name==='密码2'">
              <div class="img-box" @click="clickEye(item)">
                <img src="./assets/eye.png" alt="" v-if="item.rightIcon==='noEye'">
                <img src="./assets/no-eye.png" alt="" v-if="item.rightIcon==='theEye'">
              </div>
            </div>
          </van-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: null
    },
    cellMB: { // 下margin
      type: Boolean,
      default: true
    }
  },
  watch: {
  },

  components: {},

  computed: {},

  methods: {
    clickRightIcon (item) {
      this.$emit('clickRightIcon', item)
    },
    clickInput (item, index) {
      this.$emit('clickInput', {item: item, index: index})
    },
    changeValue (item) {
      if (item.name === '手机号码') {
        if (item.value && item.value.length > 11) {
          item.value = item.value.substr(0, 11)
        }
      }
      this.$emit('changeValue', item)
    },
    clickSend () {
      this.$emit('clickSend', {})
    },
    onRead (file) {
      this.$emit('onRead', file)
    },
    clickBox () {
      let upIcon = document.getElementsByClassName('van-uploader__input')[0]
      upIcon.click()
    },
    clickEye (item) {
      if (item.rightIcon === 'theEye') {
        item.rightIcon = 'noEye'
        item.type = 'text'
      } else {
        item.rightIcon = 'theEye'
        item.type = 'password'
      }
    }
  },

  created () {},

  mounted () {
    if (this.index === 0) {
      this.$refs['theField'].focus()
    }
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .cell-mb {
    margin-bottom: 10px;
  }
  .active {
    background-color: $mainColor;
    border: 0.02rem solid $mainColor;
  }
  .theUploadClass {
    position: absolute;
    right: 0;
    top: -15px;
  }
  .img-box {
    width: 18px;
    height: 18px;
    /*position: absolute;*/
    /*right: 12px;*/
    /*top: -21px;-*/
    img {
      width: 100%;
      height: 100%;
    }
  }
  .img-box2 {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 12px;
    top: -21px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .btnStyle {
    background-color: #AAAAAA;
    color: #ffffff;
    border-radius: 5px;
    border-color: #AAAAAA;
  }
  .btnStyle2 {
    @include theBtnColor;
  }
  .textarea-class {
    height: 400px;
  }
  .wb {
    word-break: break-all;
  }

</style>
