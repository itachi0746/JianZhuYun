<template>
  <div ref="common-footer">
    <van-tabbar v-model="active" v-if="theFooterItems">
      <van-tabbar-item v-for="(item, index) in theFooterItems" :key="index" @click="clickFooter(item.link)">
        <span>{{ item.name }}</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? theFooterItems[index].active : theFooterItems[index].normal"
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
      theFooterItems: null,
      icons: [
        {
          normal: require('./assets/f1.png'),
          active: require('./assets/f1_active.png'),
          name: '职位',
          link: 'index.html'
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
      ],
      icons2: [ // 企业端footer
        {
          normal: require('./assets/home_shouye_nor.png'),
          active: require('./assets/home_shouye_sel.png'),
          name: '首页',
          link: 'EPIndex.html'
        },
        {
          normal: require('./assets/home_shengqingjilu_nor.png'),
          active: require('./assets/home_shengqingjulu_sel.png'),
          name: '申请记录',
          link: 'EPRecord.html'
        },
        {
          normal: require('./assets/home_wode_nor.png'),
          active: require('./assets/home_wode_sel.png'),
          name: '我的',
          link: 'EPProfile.html'
        }
      ]
    }
  },

  props: {
    active: { // 当前激活的
      type: Number,
      default: 0
    },
    enterprise: { // 是不是企业端
      type: Boolean,
      default: false
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
      GoToPage('', link)
    }
  },

  created () {
    this.enterprise ? this.theFooterItems = this.icons2 : this.theFooterItems = this.icons
  },

  mounted () {
    this.handleHeight()
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>

</style>
