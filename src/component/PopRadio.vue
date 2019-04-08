<template>
  <div>
    <!--单选弹窗-->
    <van-popup class="van-popup60" v-model="showRadio">
      <van-radio-group v-model="radio">
        <van-cell-group v-if="theRadioData">
          <van-cell v-for="(item,index) in theRadioData" :key="index" :title="item.name" clickable
                    @click="clickRadio(item)">
            <van-radio :name="item.name"/>
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
      showRadio: true,
      radio: '' // radio的值
    }
  },
  props: {
    theRadioData: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  components: {},

  computed: {},

  methods: {
    clickRadio (item) {
      this.$emit('closePop', {value: item.value})
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .van-popup60 {
    width: 60%;
  }
</style>
