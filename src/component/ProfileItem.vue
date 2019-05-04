<template>
  <div>
    <div class="header">
      <van-row>
        <van-col span="12">
          <div class="user-data" v-if="enterprise">
            <div class="user-name">{{theName}}</div>
            <div class="user-remarks">{{font}}</div>
          </div>
          <div class="user-data" v-else>
            <div class="user-name">{{theName}}</div>
            <!--备注-->
            <div class="user-remarks">{{font}}</div>
          </div>
        </van-col>
        <van-col span="12">
          <div class="user-head-box">
            <div class="user-head">
              <div v-if="enterprise" style="width: 100%;height: 100%;">
                <EPHead :theUrl="theUrl" :theId="theId"></EPHead>
              </div>
              <div style="width: 100%;height: 100%;" v-else>
                <UserHead :theUrl="theUrl" :theId="theId"></UserHead>
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
import { postData } from '../common/server'

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
    enterprise: { // 是否是企业
      type: Boolean,
      default: null
    },
    theName: { // 名字
      type: String,
      default: null
    },
    theMemo: { // 备注
      type: String,
      default: null
    },
    theUrl: { // 头像url
      type: String,
      default: null
    },
    theId: { // 用户id
      type: [Number, String],
      default: null
    },
    isVerified: { // 是否已实名验证
      type: Boolean,
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
    this.font = this.isVerified ? '已实名验证' : '尚未实名验证'
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
    padding: 30px 18px 20px;
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
    /*background-color: #999999;*/
    img {
      width: 100%;
      height: 100%;
    }
  }

</style>
