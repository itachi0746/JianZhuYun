<template>
  <div :class="{'van-hairline--bottom': item.type !== 'hidden'}">
    <div v-if="item.isCode">
      <!--发送验证码-->
      <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField"
                 :data-index="index" @click="clickInput(item, index)" :label="item.label"
                 :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder">
        <van-button :class="['btnStyle', {'btnStyle2': item.isActiveBtn}]" @click="clickSend" slot="button" size="small" clearable type="primary">发送验证码
        </van-button>
      </van-field>
    </div>
    <div v-else>
      <div v-if="item.isIDCard">
        <!--上传文件-->
        <div style="position: relative;width: 100%;">
          <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField" :disabled="item.disabled" :label="item.label"
                     :data-index="index" @click="clickInput(item, index)" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item)"
                     :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder"/>
          <div class="img-box" @click="clickBox">
            <img src="./assets/recg.png" alt="">
          </div>
          <van-uploader class="theUploadClass" :after-read="onRead" v-show="false">
            <van-icon id="upIcon" ref="upload" name="scan" :size="'25px'"/>
          </van-uploader>
        </div>
      </div>
      <div v-else>
        <!--默认输入框-->
        <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField" :disabled="item.disabled"
                   :data-index="index" @click="clickInput(item, index)" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item)"
                   :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder" :label="item.label" @input="changeValue(item)"/>

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
    position: absolute;
    right: 20px;
    top: -19px;
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
</style>
