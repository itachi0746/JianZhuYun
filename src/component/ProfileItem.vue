<template>
  <div>
    <div class="header">
      <van-row>
        <van-col span="12">
          <div class="user-data" v-if="enterprise">
            <div class="user-name">{{theName}}</div>
            <div class="user-remarks" @click="changeRole">{{font}}</div>
          </div>
          <div class="user-data" v-else>
            <div class="user-name">{{theName}}</div>
            <!--备注-->
            <div class="user-remarks">{{theMemo}}</div>
            <div class="user-remarks" @click="changeRole">{{font}}</div>
            <div class="user-remarks" style="color:greenyellow" @click="clickVerify">实名验证链接</div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="user-head-box">
            <div class="user-head">
              <div v-if="enterprise">
                <EPHead :theUrl="theUrl"></EPHead>
              </div>
              <div v-else>
                <UserHead :theUrl="theUrl"></UserHead>
              </div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import UserHead from './UserHead.vue'
import EPHead from './EPHead.vue'

export default {
  data () {
    return {
      font: ''
    }
  },

  components: {
    UserHead,
    EPHead
  },
  props: {
    enterprise: {
      type: Boolean,
      default: null
    },
    theName: {
      type: String,
      default: null
    },
    theMemo: {
      type: String,
      default: null
    },
    theUrl: {
      type: String,
      default: null
    }
  },
  computed: {},

  methods: {
    // 角色切换
    changeRole () {
      let link
      link = this.enterprise ? 'login.html' : 'EPLogin.html'
      GoToPage('', link, {})
    },
    /**
     * 点击实名验证
     */
    clickVerify () {
      postData('/ReService/GoVerify', {}).then((res) => {
        console.log(res)
        if (res.Result) {
          window.location.href = res.Result
        } else {
          console.log('没有链接地址')
        }
      })
    }
  },

  created () {},

  mounted () {
    this.font = this.enterprise ? '切换到个人身份' : '切换到企业身份'
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .header {
    @include borderBox();
    @include font-size(30px);
    color: #ffffff;
    width: 100%;
    /*height: 150px;*/
    padding: 30px 30px 20px;
    background-color: $mainColor;
  }
  .user-data {
    display: flex;
    flex-direction: column;
  }
  .user-remarks {
    @include font-size(16px);
    margin-top: 10px;
  }
  .user-head-box {
    display: flex;
    flex-direction: row-reverse;
  }
  .user-head {
    width: 57px;
    height: 57px;
    border-radius: 50%;
    background-color: #999999;
    img {
      width: 100%;
      height: 100%;
    }
  }

</style>
