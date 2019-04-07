<template>
  <div class="contractDetail">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body" v-if="resData">
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">甲方</div>
          </div>
          <van-cell title="甲方" :value="resData.RE33_CO_NAME" title-class="title-class" value-class="value-class" />
          <van-cell title="公司地址" :value="resData.RE33_CO_ADDR" title-class="title-class" value-class="value-class" />
          <van-cell title="法人" :value="resData.RE33_CO_PERSON" title-class="title-class" value-class="value-class" />
          <van-cell title="联系方式" :value="resData.RE33_CO_LINK" title-class="title-class" value-class="value-class" />
        </van-cell-group>
      </div>
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">乙方</div>
          </div>
          <van-cell title="乙方" :value="resData.RE33_NAME" title-class="title-class" value-class="value-class" />
          <van-cell title="身份证号" :value="resData.RE33_ID_NO" title-class="title-class" value-class="value-class" />
          <van-cell title="联系方式" :value="resData.RE33_CANDIDATE_PHONE" title-class="title-class" value-class="value-class" />
        </van-cell-group>
      </div>
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">合同内容</div>
          </div>
          <van-cell title="项目" :value="resData.RE33_PRJ_NAME" title-class="title-class" value-class="value-class" />
          <van-cell title="工作地点" :value="resData.RE33_WORK_ADDR" title-class="title-class" value-class="value-class" />
          <van-cell title="合同开始时间" :value="resData.RE33_START_TIME" title-class="title-class" value-class="value-class" />
          <van-cell title="合同结束时间" :value="resData.RE33_END_TIME" title-class="title-class" value-class="value-class" />
          <van-cell title="签约年限" :value="resData.RE33_SIGN_YEARS" title-class="title-class" value-class="value-class" />
          <van-cell title="年薪" :value="resData.RE33_SALARY_Y" title-class="title-class" value-class="value-class" />
          <van-cell title="月薪" :value="resData.RE33_SALARY_M" title-class="title-class" value-class="value-class" />
          <van-cell title="日薪" :value="resData.RE33_SALARY_D" title-class="title-class" value-class="value-class" />
          <van-cell title="时薪" :value="resData.RE33_SALARY_H" title-class="title-class" value-class="value-class" />
          <van-cell title="查看合同详情" value="" title-class="title-class2" is-link value-class="" />
        </van-cell-group>
      </div>
      <div class="action-box">
        <van-button type="info">确定</van-button>
      </div>
      <div class="result" v-show="false">
        <div class="result-logo">
          <img src="../assets/accept.png" alt="">
        </div>
        <div class="result-msg">签约成功</div>
        <div class="result-data">2019-3-25</div>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import {postData} from '../../../common/server'
import Header from '../../../component/Header.vue'

export default {
  name: '',
  data () {
    return {
      headerName: '合同签约',
      headerHeight: null,
      id: null,
      resData: null
    }
  },
  components: {
    Header
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    const param = myModule.getUrlParams()
    this.id = param.id
    postData('/ReService/ContractDetails', {id: this.id}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',

          forbidClick: true // 禁用背景点击
        })
        return
      }
      this.resData = res.ReturnData
      let theTS = myModule.formatDate(this.resData.RE33_CRT_TIME)
      this.resData.RE33_CRT_TIME = myModule.formatTime(theTS)
    })
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .contractDetail {
    @include font-size(16px)
  }
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  }
  .result {
    @include font-size(16px);
    color: #666;
  }
  .result-logo {
    width: 100%;
    @include defaultFlex;
    margin-bottom: 10px;
    img {
      width: 25px;
      height: 25px;
    }
  }
  .result-data {
    @include font-size(14px);
    text-align: center;
  }
  .result-msg {
    text-align: center;
  }
  .tac {
    text-align: center;
  }
  .title {
    text-align: center;
    @include font-size(16px);
    padding: 10px 15px 0;
    color: $mainColor;
  }
  .title-box {
    padding-bottom: 15px;
    font-weight: bold;
  }
  .value-class {
    flex: 3;
    text-align: left;
    color: #333;
  }
  .title-class {
    color: #666;
  }
  .title-class2 {
    color: #333;
    font-weight: bold;
    @include font-size(17px);
  }
  .mb-box {
    margin-bottom: 15px;
  }
  .action-box {
    @include defaultFlex;
    margin: 40px 0 50px;
    button {
      background-color: $mainColor;
      border-color: $mainColor;
      width: 98px;
      height: 43px;
    }
  }

</style>
