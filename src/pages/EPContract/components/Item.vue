<template>
  <div>
    <div class="manItem">
      <div class="man-box">
        <div class="man-head">
        </div>
        <div class="man-data">
          <div class="man-name">
            {{item.RE33_NAME}}
          </div>
          <div class="man-tag1-box">
            <!--<div class="man-tag1">申请建筑电工</div>-->
            <!--<div class="man-tag1">{{item.RE33_NAME}}</div>-->

          </div>
          <div class="man-tag1-box">
            <div class="man-tag1">{{item.RE33_CRT_TIME}}</div>
          </div>
        </div>
        <div class="action-box">
          <div class="action-btn">
            <div>{{item.ReferenceValues.RE33_STATUS}}</div>
            <!--<van-button class="btnSize2" plain type="info" @click="clickBtn1">查看简历</van-button>-->
          </div>
          <div class="action-btn">
            <van-button class="btnSize" type="info" @click="clickBtn2(item.RE33_SIGN_ID)">详情</van-button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: null
    }
  },
  components: {},

  computed: {},

  methods: {
    clickBtn2 (id) {
//      this.$router.push({name: 'Handle', params: {id: id}})
      GoToPage('', 'EPContractDetail.html', {id: id})
    },
    clickBtn1 () {
    }
  },

  created () {},

  mounted () {},

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
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background-color: #969799;
    margin-right: 10px;
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
      /*margin-bottom: 10px;*/
      display: flex;
      justify-content: flex-end;
      /*width: 50px;*/
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
    height: 33px;
    line-height: 33px;
    /*padding: 4px 10px;*/
    @include theBtnColor
  }
  .btnSize2 {
    height: 25px;
    line-height: 0;
    padding: 7px 10px;
  }

</style>
