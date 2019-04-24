<template>
  <div ref="common-footer">
    <van-tabbar v-model="active" v-if="theFooterItems" active-color="#00A7DD" class="border-color">
      <van-tabbar-item v-for="(item, index) in theFooterItems" :key="index" @click="clickFooter(item.link, item.param)" :info="item.info">
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
import {postData} from '../common/server'

export default {
  data () {
    return {
      theFooterItems: null,
      link: null,
      icons: [
        {
          normal: require('./assets/f1.png'),
          active: require('./assets/f1_active.png'),
          name: '职位',
          link: 'index.html',
          param: null
        },
        {
          normal: require('./assets/f2.png'),
          active: require('./assets/f2_active.png'),
          name: '公司',
          link: 'company.html',
          param: null

        },
        {
          normal: require('./assets/f3.png'),
          active: require('./assets/f3_active.png'),
          name: '消息',
          link: 'message.html',
          info: null,
          param: {}

        },
        {
          normal: require('./assets/f4.png'),
          active: require('./assets/f4_active.png'),
          name: '我的',
          link: 'profile.html',
          param: null

        }
      ],
      icons2: [ // 企业端footer
        {
          normal: require('./assets/home_shouye_nor.png'),
          active: require('./assets/home_shouye_sel.png'),
          name: '首页',
          link: 'EPIndex.html',
          param: null

        },
        {
          normal: require('./assets/home_shengqingjilu_nor.png'),
          active: require('./assets/home_shengqingjulu_sel.png'),
          name: '申请记录',
          link: 'EPRecord.html',
          param: null

        },
        {
          normal: require('./assets/f3.png'),
          active: require('./assets/f3_active.png'),
          name: '消息',
          link: 'EPMessage.html',
          info: null,
          param: {}
        },
        {
          normal: require('./assets/home_wode_nor.png'),
          active: require('./assets/home_wode_sel.png'),
          name: '我的',
          link: 'EPProfile.html',
          param: null

        }
      ],
      theNum: null // 未读信息数量
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
    },
    infoNum: {
      type: Number,
      default: null
    }
  },
  watch: {
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
    clickFooter (link, param) {
      GoToPage('', link, param)
    },
    getData () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      postData(this.link, {}).then((res) => {
        console.log(res)
        if (res.UnReadCount) {
          this.setInfoNum(res.UnReadCount)
        } else {
          console.log(`未读消息为: ${res.UnReadCount}`)
        }
        this.$toast.clear()
      })
    },
    /**
     * 配置未读信息
     * @param num
     */
    setInfoNum (num) {
      if (!num) {
        console.log(`未读数为: ${num}`)
        return
      }
      for (let obj of this.theFooterItems) {
        if (obj.hasOwnProperty('info')) {
          obj['info'] = num
          break
        }
      }
    }
  },

  created () {
    this.theFooterItems = this.enterprise ? this.icons2 : this.icons
    this.link = this.enterprise ? '/EntService/MyMessages' : '/ReService/MyMessages'

  },

  mounted () {
    this.handleHeight()
//    debugger
    if (this.infoNum !== null) {
      this.theNum = this.infoNum
      this.setInfoNum(this.theNum)
    } else {
      this.getData()
    }
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
.shadow {
    box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
}
.van-tabbar-item {
  font-size: 11px;
}
.van-tabbar-item__icon img {
  height: 22px;
}
  .border-color {
    border-color: #e5e5e5;
  }
</style>
