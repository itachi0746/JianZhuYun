<template>
  <div>
    <van-field :data-code="item.code" :required="item.required" :clearable="item.clearable" ref="theField" :disabled="item.disabled"
               :data-index="index" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item)" :readonly="item.readonly"
               :type="item.type" :class="[{'cell-mb': cellMB}, 'wb', item.class]" v-model="item.value" :placeholder="item.placeHolder" :label="item.label" @input="changeValue(item)">
    </van-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},

  methods: {},

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .wb {
    word-break: break-all;
  }
  .cell-mb {
    margin-bottom: 10px;
  }
</style>
