<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div>
        <!--头部-->
        <div class="header van-hairline--bottom">
          <div class="logo-box">
            <div class="logo-box-inner">
              <UserHead theId="" theUrl=""></UserHead>
            </div>
          </div>
          <div class="header-data-box">
            <div class="icon-box">
              <img src="../assets/edit.png" alt="">
            </div>
            <div class="line line1">
              <div class="name">陈明华</div>
              <div class="call">/先生</div>
            </div>
            <div class="line line2">
              <van-row>
                <van-col span="10">
                  <div class="line2-item">
                    <div class="label">年龄</div>
                    <div class="line2-value">无</div>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="line2-item">
                    <div class="label">学历</div>
                    <div class="line2-value">无</div>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class="line line2">
              <van-row>
                <van-col span="10">
                  <div class="line2-item">
                    <div class="label">籍贯</div>
                    <div class="line2-value">无</div>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="line2-item">
                    <div class="label">手机</div>
                    <div class="line2-value">12345678911</div>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class="line line2 line3">
              <div class="line2-item">
                <div class="label">身份证</div>
                <div class="line2-value">4331011995212014045</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main">
          <!--组件-->
          <div v-for="(item,index) in theItemData" :key="index" :class="{'van-hairline--bottom': item.border}">
            <ResumeItem2 :theData="item"></ResumeItem2>
          </div>
          <!--<div class="main-item-box van-hairline&#45;&#45;bottom">-->
            <!--<div class="title">-->
              <!--<div class="title-name">-->
                <!--<i class="title-icon"></i>-->
                <!--<span>求职期望</span>-->
              <!--</div>-->
              <!--<div class="add">添加</div>-->
            <!--</div>-->
            <!--<div class="main-content">-->
              <!--<div class="empty-content">-->
                <!--您还未编辑此项信息哦~快来编辑吧-->
              <!--</div>-->
              <!--<div class="the-content"></div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import ResumeItem from '../../../component/ResumeItem.vue'
import UserHead from '../../../component/UserHead.vue'
import ResumeItem2 from '../../../component/ResumeItem2.vue'

export default {
  data () {
    return {
      headerName: '简历详情',
      id: null,
      resData: null,
      workExperienceData: null, // 工作经历
      theItemData: [
        {titleName: '求职期望', border: true},
        {titleName: '工作经历', border: true},
        {titleName: '项目经历', border: true},
        {titleName: '教育经历', border: true},
        {titleName: '培训经历', border: true},
        {titleName: '技能标签', border: false}
      ]
    }
  },

  components: {
    Header,
    ResumeItem,
    UserHead,
    ResumeItem2
  },

  computed: {},

  methods: {
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    }
  },

  created () {
//    this.$toast.loading({
//      mask: false,
//      message: '加载中...',
//      duration: 0,
//      forbidClick: true // 禁用背景点击
//    })
//    const param = myModule.getUrlParams()
//    this.id = param.id
//    postData('/EntService/peopleDetail', {id: this.id}).then((res) => {
//      console.log(res)
//      if (myModule.isEmpty(res.ReturnData)) {
//        console.log('暂无数据')
//        this.$toast.fail({
//          mask: false,
//          message: '暂无数据',
//          forbidClick: false // 禁用背景点击
//        })
//        return
//      }
//      this.$toast.clear()
//      this.resData = res.ReturnData
//    })

  },

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .handle {
    @include font-size(16px);
    color: #666;
  }
  .body {
    padding: 15px 18px;
    @include borderBox()
  }
  .header {
    padding-bottom: 20px;
    display: flex;
  }
  .line {
    margin-bottom: 20px;
  }
  .header-data-box {
    position: relative;
    flex: 1;
    @include font-size(14px);
    color: #666666;
    .line1 {
      color: #333333;
      font-weight: bold;
      display: flex;
      align-items: flex-end;
      .call {
        @include font-size(13px);
        color: #999;
      }
      .name {
        @include font-size(20px);
        color: #333;
      }
    }
  }
  .icon-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 17px;
    height: 17px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .logo-box {
    min-width: 55px;
    margin-right: 11px;
  }
  .logo-box-inner {
    width: 53px;
    height: 53px;
  }
  .line2 {
    width: 100%;
    /*height: 27px;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
  }
  .line2-value {
    height: 27px;
    min-width: 67px;
    border: 1px solid #E5E5E5;
    padding: 0 16px;
    margin-left: 2px;
    box-sizing: border-box;
    @include defaultFlex
  }
  .line2-item {
    display: flex;
    align-items: center;
  }
  .line3 {
    margin-bottom: 0;
    .line2-value {
      padding: 0 25px;
      white-space:nowrap;
    }
  }
</style>
