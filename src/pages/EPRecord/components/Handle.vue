<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div class="header van-hairline--bottom">
        <van-row>
          <van-col span="19">
            <div class="data-box">
              <div class="data-name">陈明华</div>
              <div class="data-line">申请职位 建筑电工</div>
              <div class="data-line">2019-3-1 08：55</div>
            </div>
          </van-col>
          <van-col span="5">
            <div class="data-box-r">
              <div class="data-head"></div>
              <van-button class="btnStyle" plain type="primary" @click="clickBtn">查看简历</van-button>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="main">
        <div class="main-title">
          自荐信
        </div>
        <div class="main-field">
          {{value}}
        </div>
      </div>
      <div class="action-box">
        <van-row class="theRow">
          <van-col span="8">
            <div class="btn-box">
              <van-button class="btnClass" type="info">拒绝</van-button>
            </div>
          </van-col>
          <van-col span="8">
            <div class="btn-box">
              <van-button class="btnClass" type="info">同意</van-button>
            </div>
          </van-col>
          <van-col span="8">
            <div class="btn-box">
              <van-button class="btnClass" type="info">待定</van-button>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>

  </div>
</template>

<script>
import myModule from '../../../common'
import Header from '../../../component/Header.vue'

export default {
  data () {
    return {
      headerName: '申请处理',
      value: '申请职位 建筑电工申请职位 建筑电工申请职位 建筑电工申请职位 建筑电工申请职位 建筑电工申请职位 建筑电工申请职位 建筑电工'
    }
  },

  components: {
    Header
  },

  computed: {},

  methods: {
    handleHeight () {
    },
    clickBtn () {
      this.$router.push({name: 'ResumeDetail', params: {}})
    }
  },

  created () {},

  mounted () {
    console.log(myModule)
  },

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
  }
  .data-box {
    display: flex;
    flex-direction: column;
  }
  .data-name {
    @include font-size(18px);
    color: #323233;
    margin-top: 17px;
    margin-bottom: 5px;
    font-weight: bold;
  }
  .data-line {
    @include font-size(14px);
    margin: 5px 0;
  }
  .data-head {
    width: 53px;
    height: 53px;
    background-color: #999999;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .data-box-r {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .btnStyle {
    color: $mainColor;
    border-color: $mainColor;
    padding: 0;
    width: 73px;
    height: 25px;
    line-height: 0;
  }
  .header {
    padding-bottom: 20px;
  }
  .main {
    padding: 20px 0;
  }
  .main-title {
    color: #323233;
    margin-bottom: 10px;
  }
  .main-field {
    background-color: #F5F9FA;
    border-radius: 5px;
    height: 180px;
    padding: 10px;
  }
  .action-box {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
  }
  .btnClass {
    @include theBtnColor;
    padding: 0 20px;
  }
  .theRow {
    width: 100%;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>
