<template>
  <div>
    <div class="action-box">
      <van-button size="large" type="danger" plain @click="logout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import { postData } from '../common/server'

export default {
  data () {
    return {
    }
  },
  props: {
    enterprise: {
      type: Boolean,
      default: null
    }
  },

  components: {},

  computed: {},

  methods: {
    /**
     * 退出登录
     */
    logout () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确定要退出登录吗?'
      }).then(() => {
        // on confirm
        this.$toast.loading({
          mask: false,
          message: '正在退出...',
          duration: 0,
          forbidClick: true // 禁用背景点击
        })
        let link, apiUrl
        apiUrl = this.enterprise ? '/EntService/Logout' : '/ReService/Logout'
        link = this.enterprise ? 'EPLogin.html' : 'login.html'
        postData(apiUrl, {}).then((res) => {
          GoToPage('', link, {})
        })
      }).catch(() => {
        // on cancel
      })
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .action-box {
    margin-top: 10px;
    padding: 0 30px;
  }
  .action-box button {
    border: none!important;
  }
</style>
