<template>
  <div ref="common-footer">
    <van-tabbar v-model="active">
      <van-tabbar-item v-for="(item, index) in icons" :key="index" @click="clickFooter(item.link)">
        <span>{{ item.name }}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icons[index].active : icons[index].normal"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import myModule from '../common'

export default {
  data () {
    return {
//      active: 0, // 当前激活的
      icons: [
        {
          normal: require('./assets/f1.png'),
          active: require('./assets/f1_active.png'),
          name: '职位',
          link: 'job.html'
        },
        {
          normal: require('./assets/f2.png'),
          active: require('./assets/f2_active.png'),
          name: '公司',
          link: 'company.html'
        },
        {
          normal: require('./assets/f3.png'),
          active: require('./assets/f3_active.png'),
          name: '消息',
          link: 'message.html'
        },
        {
          normal: require('./assets/f4.png'),
          active: require('./assets/f4_active.png'),
          name: '我的',
          link: 'profile.html'
        }
      ]
    }
  },

  props: {
    active: { // 当前激活的
      type: Number,
      default: 0
    }
  },

  components: {},

  computed: {},

  methods: {
    /**
     * 获取高度, 传去父组件
     */
    handleHeight () {
      setTimeout(() => {
        const footerHeight = document.getElementsByClassName('van-tabbar')[0].offsetHeight
        this.$emit('sendHeight', {'footerHeight': footerHeight})
      }, 300)
    },
    /**
     * 点击footer
     */
    clickFooter (link) {
      myModule.goToPage('', link)
    }
  },

  created () {},

  mounted () {
    this.handleHeight()
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>

</style>
