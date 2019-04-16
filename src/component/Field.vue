<template>
  <div>
    <div v-if="item.isCode">
      <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField"
                 :data-index="index" @click="clickInput(item, index)"
                 :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder">
        <van-button class="active" @click="clickSend" slot="button" size="small" clearable type="primary">发送验证码
        </van-button>
      </van-field>
    </div>
    <div v-else>
      <div v-if="item.isIDCard">
        <div style="position: relative;width: 100%;">
          <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField" :disabled="item.disabled"
                     :data-index="index" @click="clickInput(item, index)" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item)"
                     :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder"/>
          <van-uploader class="theUploadClass" :after-read="onRead" v-show="true">
            <van-icon ref="upload" name="scan" :size="'25px'"/>
          </van-uploader>
        </div>
      </div>
      <div v-else>
        <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField" :disabled="item.disabled"
                   :data-index="index" @click="clickInput(item, index)" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item)"
                   :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder" :label="item.label"/>

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
    clickSend () {
      this.$emit('clickSend', {})
    },
    onRead (file) {
      this.$emit('onRead', file)
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
</style>
