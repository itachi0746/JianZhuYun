<template>
  <div>
    <div v-if="item">
    <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable"
               :data-index="index" @click="clickInput(item, index)" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item.clickRightIcon)"
               :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder"/>
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

  components: {},

  computed: {},

  methods: {
    clickRightIcon (method) {
      this.$emit('clickRightIcon', {method: method})
    },
    clickInput (item, index) {
      this.$emit('clickInput', {item: item, index: index})
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .cell-mb {
    margin-bottom: 10px;
  }
</style>
