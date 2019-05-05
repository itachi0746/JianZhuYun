<template>
  <div>
    <div class="manItem">
      <div class="man-box" v-if="item">
        <div class="man-head">
          <UserHead :theUrl="item.RE01_PIC_URL"></UserHead>
        </div>
        <div class="man-data">
          <div class="man-name">
            {{item.RE01_NAME}}
          </div>
          <div class="man-tag1-box">
            <div class="man-tag1">{{item.RE01_JOB_INTENSION}}</div>
            <!--<div class="man-tag1">申请建筑电工</div>-->
          </div>
          <div class="man-tag1-box">
            <div class="man-tag1">{{item.RE01_CHG_TIME}}</div>
          </div>
        </div>
        <div class="action-box" v-if="actionObj">
          <div class="action-btn">
            <van-button class="btnSize2" plain type="info" @click="clickBtn1(item.RE01_ID)">{{actionObj.act1}}</van-button>
          </div>
          <div class="action-btn">
            <van-button class="btnSize" :disabled="item.OtherFieldValues.SEND_STATUS==='BD0902'" type="info" @click="clickBtn2(item.RE01_ID,actionObj.act2.routerName)">{{actionObj.act2.name}}</van-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import UserHead from '../../../component/UserHead.vue'
export default {
  data () {
    return {
      actionMap: { // 按钮映射
        0: {act1: '查看简历', act2: {name: '邀请面试', routerName: 'EPInvitation'}},
        1: {act1: '查看简历', act2: {name: '面试结果', routerName: 'EPInterviewDetail'}},
        2: {act1: '查看简历', act2: {name: '发送offer', routerName: 'EPSendOffer'}},
        3: {act1: '查看简历', act2: {name: '发起签约', routerName: 'EPInitiateContract'}},
        4: {act1: '查看简历', act2: {name: '邀请面试', routerName: 'EPInvitation'}},
        5: {act1: '查看简历', act2: {name: '移到人才库', routerName: ''}}
      },
      actionObj: null // 按钮对应操作
    }
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    pageId: {
      type: Number,
      default: null
    }
  },
  watch: {
    pageId () {
      if (this.pageId !== null) {
        this.actionObj = this.actionMap[this.pageId]
      }
    }
  },
  components: {
    UserHead
  },

  computed: {},

  methods: {
    /**
     * 跳转
     * @param id
     * @param routerName 路由名字
     */
    clickBtn2 (id, routerName) {
      if (this.pageId === 5) {
        return
      }
//      this.$router.push({name: routerName, params: {id: id, pageId: this.pageId}})
      GoToPage('', routerName + '.html', {id: id, pageId: this.pageId})
    },
    clickBtn1 (id) {
      GoToPage('', 'EPResumeDetail.html', {id: id})
    }
  },

  created () {},

  mounted () {
    if (this.pageId !== null) {
      this.actionObj = this.actionMap[this.pageId]
    } else {
      console.warn('pageid为空')
    }
  },

  beforeDestroy () {}
}

</script>

<style lang='scss' scoped>
  .manItem {
    color: #666;
    @include font-size(16px)
  }
  .man-box {
    display: flex;
  }

  .man-head {
    min-width: 53px;
    width: 53px;
    height: 53px;
    /*border-radius: 50%;*/
    /*background-color: #969799;*/
    margin-right: 10px;
    @include defaultFlex
  }

  .man-data {
    flex: 5;
    display: flex;
    flex-direction: column;
  }
  .man-data>div {
    margin-bottom: 5px;
  }
  .action-box {
    flex: 3;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: flex-end;
    .status {
      @include font-size(14px);
      color: #F9514E;
      text-align: right;
    }
    .action-btn {
      /*margin-top: 10px;*/
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-end;
      /*width: 85px;*/
      @include font-size(14px);

    }
  }

  .man-name {
    @include font-size(18px);
    color: #333;
  }

  .man-tag1-box {
    display: flex;
    @include font-size(14px);
  }

  .man-tag1 {
    margin-right: 5px;
    padding-right: 5px;
  }
  .btnSize {
    @include btnSize;
    @include theBtnColor
  }
  .btnSize2 {
    @include btnSize;
  }

</style>
