<template>
  <div class="profile">
    <Header @sendHeight="handleHeight" :config="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <ProfileItem
          :enterprise="false"
          :theName="resData.RE23_NAME"
          :theMemo="resData.RE23_MEMO"
          :theUrl="resData.RE23_PIC_URL"
          :theId="resData.RE23_CANDIDATE_ID"
          :isVerified="resData.IS_VERIFIED"
        ></ProfileItem>
        <div class="tab">
          <van-row>
            <!--<van-col span="6">-->
            <!--<div class="tab-cell">-->
            <!--<div class="van-hairline&#45;&#45;right">-->
            <!--<div class="tab-cell-num">0</div>-->
            <!--<div class="tab-cell-name">沟通过</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</van-col>-->
            <van-col span="12">
              <div class="tab-cell">
                <div class="van-hairline--right" @click="clickInterview">
                  <div class="tab-cell-num" v-if="resData.INTERVIEW_COUNT">{{resData.INTERVIEW_COUNT}}</div>
                  <div class="tab-cell-name">面试</div>
                </div>
              </div>
            </van-col>
            <van-col span="12">
              <div class="tab-cell" @click="clickRecord">
                <div class="van-hairline--right">
                  <div class="tab-cell-num" v-if="resData.APPLY_COUNT">{{resData.APPLY_COUNT}}</div>
                  <div class="tab-cell-name">申请记录</div>
                </div>
              </div>
            </van-col>
            <!--<van-col span="8">-->
            <!--<div class="tab-cell">-->
            <!--<div class="van-hairline&#45;&#45;right">-->
            <!--&lt;!&ndash;<div class="tab-cell-num">0</div>&ndash;&gt;-->
            <!--<div class="tab-cell-name">感兴趣</div>-->
            <!--</div>-->
            <!--</div>-->
            <!--</van-col>-->
          </van-row>
        </div>
        <div class="item-list">
          <CellItem :items="items"></CellItem>
          <!--<van-cell-group class="out-warp">-->
            <!--<div>-->
              <!--<van-cell v-for="(item, index) in items" :key="index" class="cell-padding" @click="clickItem(item.link)"-->
                        <!--:title="item.name" icon="" is-link>-->
                <!--<img class="cell-icon" :src="item.img" alt="">-->
              <!--</van-cell>-->
            <!--</div>-->
          <!--</van-cell-group>-->
        </div>
      </div>

    </div>
    <Footer @sendHeight="handleHeight" :active="activeNum"></Footer>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'
import UserHead from '../../../component/UserHead.vue'
import ProfileItem from '../../../component/ProfileItem.vue'
import Logout from '../../../component/Logout.vue'
import CellItem from '../../../component/CellItem.vue'

export default {
  name: 'profile',
  data () {
    return {
      headerHeight: null,
      footerHeight: null,
      activeNum: 3,
      resData: null,
      id: null,
      items: [
        {name: '我的简历', icon: require('../assets/home_icon_jianli.png'), link: 'resume.html', param: {}},
        {name: '附件简历', icon: require('../assets/home_icon_fujianjianli.png'), link: '', param: {}},
        {name: '我的offer', icon: require('../assets/home_icon_wodeoffer.png'), link: 'offer.html', param: {}},
        {name: '我的合同', icon: require('../assets/home_icon_hetong.png'), link: 'contract.html', param: {}}
      ]
    }
  },
  components: {
    Footer,
    Header,
    UserHead,
    ProfileItem,
    Logout,
    CellItem
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    this.$toast.loading({
      mask: false,
      message: '加载中...',
      duration: 0,
      forbidClick: true // 禁用背景点击
    })
    postData('/ReService/Center', {}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',
          forbidClick: false // 禁用背景点击
        })
        return
      }
      this.$toast.clear()
      this.id = res.ReturnData.RE23_CANDIDATE_ID
      for (let obj of this.items) {
        if (obj.name === '我的简历') {
          obj.param = {id: this.id}
        }
      }
      this.resData = res.ReturnData
    })
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      console.log(height)
      if (height.headerHeight) {
        this.headerHeight = height.headerHeight
      } else {
        this.footerHeight = height.footerHeight
      }
      if (this.headerHeight && this.footerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight - this.footerHeight + 'px'
      }
    },
    clickItem (link) {
      let data = {}
      if (link) {
        if (link === 'resume.html') {
          data = {id: this.id}
          GoToPage('', link, data)
        } else {
          GoToPage('', link, {})
        }
      }
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
    },
    /**
     * 申请记录
     */
    clickRecord () {
      GoToPage('', 'record.html', {})
    },
    clickInterview () {
      GoToPage('', 'interview.html', {})
    },
    /**
     * 切换身份
     */
    changeRole () {
      GoToPage('', 'EPLogin.html', {})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .header {
    @include borderBox();
    @include font-size(30px);
    color: #ffffff;
    width: 100%;
    /*height: 150px;*/
    padding: 50px 30px 20px;
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

  .tab {
    @include font-size(16px);
    background-color: #fff;
  }

  .tab-cell {
    @include borderBox();
    height: 58px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    color: #666;
    @include borderBox();
    padding: 5px 0;
  }

  .tab-cell-num {
    @include font-size(18px);
    color: #333;
  }

  .tab-cell-name {
    @include font-size(15px)
  }

  .body {
    background-color: #F5F9FA;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }

  .item-list {
    margin-top: 10px;
  }

  .cell-icon {
    position: absolute;
    left: 18px;
    top: 19px;
    height: 0.4rem;
    min-width: 1em;
  }

  .cell-padding {
    padding: 17px 18px;
    /*margin: 0 18px;*/
    /*box-sizing: border-box;*/
  }
  .warp {
    margin: 0 18px;
  }
  .out-warp {
    background-color: #fff;
  }
</style>
