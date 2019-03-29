<template>
  <div class="contractDetail">
    <Header @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">甲方</div>
          </div>
          <van-cell title="甲方" value="内容" title-class="title-class" value-class="value-class" />
          <van-cell title="公司地址" value="内容" title-class="title-class" value-class="value-class" />
          <van-cell title="法人" value="内容" title-class="title-class" value-class="value-class" />
          <van-cell title="联系方式" value="内容" title-class="title-class" value-class="value-class" />
        </van-cell-group>
      </div>
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">乙方</div>
          </div>
          <van-cell title="乙方" value="内容" title-class="title-class" value-class="value-class" />
          <van-cell title="身份证号" value="内容" title-class="title-class" value-class="value-class" />
          <van-cell title="联系方式" value="内容" title-class="title-class" value-class="value-class" />
        </van-cell-group>
      </div>
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">合同内容</div>
          </div>
          <van-cell title="项目" value="内容" title-class="title-class" value-class="value-class" />
          <van-cell title="工作地点" value="内容" title-class="title-class" value-class="value-class" />
          <van-cell title="合同开始时间" value="内容" title-class="title-class" value-class="value-class" />
          <van-cell title="合同结束时间" value="内容" title-class="title-class" value-class="value-class" />
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
        <div class="result-msg">入职邀请已接受</div>
        <div class="result-data">2019-3-25</div>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import Header from '../../../component/Header.vue'

export default {
  name: '',
  data () {
    return {
      headerName: '合同签约',
      headerHeight: null
    }
  },
  components: {
    Header
  },
  mounted () {
    console.log(myModule)
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
//      console.log(height)
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
    overflow-y: auto;
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
