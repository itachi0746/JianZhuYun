<template>
  <div>
    <!--职位详情组件-->
    <div class="job-header van-hairline--bottom">
      <van-row type="flex" align="center">
        <van-col span="16">
          <div class="job-name">{{jobData.RE13_NAME}}</div>
        </van-col>
        <van-col span="8">
          <div class="job-pay">{{jobData.RE13_SALARY_REQUIRED}}</div>
        </van-col>
      </van-row>
      <div class="job-tag">
        <div class="job-tag-item van-hairline--right">{{jobData.RE13_WORK_YEAR}}</div>
        <div class="job-tag-item van-hairline--right">{{jobData.RE13_EDU_DEGREE}}</div>
        <div class="job-tag-item">{{jobData.RE13_WORK_PROP}}</div>
      </div>
      <div class="job-position">
        <div class="position-item">
          <img src="./assets/pos.png" alt="">
          {{jobData.RE13_WORK_PLACE}}
        </div>
      </div>
    </div>
    <div class="mid">
      <div class="job-prop-title">职位类型</div>
      <div class="job-prop">{{jobData.RE13_POSITION_TYPE}}</div>
    </div>
    <div class="job-desc van-hairline--top">
      <div class="job-prop-title">职位描述</div>
      <div class="job-desc-main">
        {{jobData.RE13_DESC}}
      </div>
    </div>
    <div class="job-desc van-hairline--top">
      <div class="job-prop-title">公司名称</div>
      <div class="job-desc-main">
        {{jobData.ReferenceValues.RE13_ENT_ID}}
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
    jobData: {
      type: Object,
      default: null
    }
  },
  components: {},

  computed: {},

  methods: {},

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .btn {
    @include theBtnColor;
  }

  footer {
    @include font-size(16px);
    position: fixed;
    bottom: 0;
    left: 0;
    padding: 10px;
    width: 100%;
    @include borderBox()
  }

  .job-desc {
    padding: 15px 0;
  }

  .job-desc-title {
    @include font-size(16px);
    color: #333;
    font-weight: bold;
    padding: 10px 0;
  }

  .job-desc-main {
    color: #666;
    @include font-size(14px);
    /*padding: 10px;*/
  }

  .desc-name {
    @include font-size(18px);
    color: $mainColor;
    margin-bottom: 5px;
  }

  .desc-value {
    text-indent: 2em;
    @include font-size(16px);
  }

  .job-header {
    @include font-size(16px);
    padding: 15px 0;
  }

  .job-pay {
    color: #067FCC;
    text-align: right;
    @include font-size(15px);
  }

  .job-name {
    @include font-size(18px);
    color: #333;
    font-weight: bold;
  }

  .desc-item {
    margin-top: 10px;
  }
  .job-tag {
    display: flex;
    .job-tag-item:nth-child(2), .job-tag-item:nth-child(3) {
      padding-left: 12px;
    }
  }
  .job-tag-item {
    margin-top: 9px;
    padding-right: 12px;
    color: #333;
    @include font-size(14px);
  }
  .job-position {
    color: #333;
    margin-top: 14px;
  }
  .position-item {
    display: flex;
    align-items: center;
    @include font-size(14px);

    img {
      width: 16px;
    }
  }
  .mid {
    @include font-size(14px);
    display: flex;
    margin: 14px 0;
    align-items: center;
    .job-prop-title {
      margin-bottom: 0;
    }
  }
  .job-prop-title {
    color: #333;
    @include font-size(15px);
    font-weight: bold;
    margin-right: 15px;
    margin-bottom: 10px;
  }

</style>
