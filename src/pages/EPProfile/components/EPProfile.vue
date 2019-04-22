<template>
  <div class="profile">
    <Header @sendHeight="handleHeight" :config="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <ProfileItem
          :enterprise="true"
          :theName="resData.HRA0_ENT_NAME"
          theMemo=""
          :theUrl="resData.HRA0_LOGO_URL"
          :theId="resData.HRA0_ENTERPRISE_ID"
        ></ProfileItem>
        <div class="item-list">
          <!--<van-cell v-for="(item, index) in items" :key="index" :title="item.name" @click="clickCell(item)" icon="" is-link>-->
          <!--</van-cell>-->
          <CellItem :items="items"></CellItem>

        </div>
      </div>
    </div>
    <Footer @sendHeight="handleHeight" :active="activeNum" :enterprise="true"></Footer>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'
import ProfileItem from '../../../component/ProfileItem.vue'
import Logout from '../../../component/Logout.vue'
import CellItem from '../../../component/CellItem.vue'

export default {
  name: 'profile',
  data () {
    return {
      activeNum: 2,
      headerHeight: null,
      footerHeight: null,
      items: [
        {name: '人才库', link: 'EPPeopleDB.html', param: {pageid: 0}},
        {name: '发布职位', link: 'EPRelease.html', param: {}},
        {name: '职位列表', link: 'EPJob.html', param: {}},
//        {name: '浏览记录', link: '', param: {}},
        {name: '录用通知', link: 'EPOfferLetter.html', param: {}},
        {name: '合同签约', link: 'EPContract.html', param: {}}
      ],
      resData: null
    }
  },
  components: {
    Footer,
    Header,
    ProfileItem,
    Logout,
    CellItem
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    postData('/EntService/Center', {}).then((res) => {
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
    /**
     * 点击跳转
     */
    clickCell (item) {
      GoToPage('', item.link, item.param)
    },
    /**
     * 切换身份
     */
    changeRole () {
      GoToPage('', 'login.html', {})
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
    position: relative;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  }
  .item-list {
    margin-top: 10px;
  }
  .cell-icon {
    position: absolute;
    left: 13px;
    top: 13px;
    height: 0.4rem;
    min-width: 1em;
  }
  .action-box {
    margin-top: 10px;
    padding: 0 30px;
  }
  .cell-padding {
    padding: 17px 0;
  }
  .warp {
    margin: 0 18px;
  }
  .out-warp {
    background-color: #fff;
  }
</style>
