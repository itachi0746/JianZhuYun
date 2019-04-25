<template>
  <div>
    <div class="main-item-box">
      <div class="title">
        <div class="title-name">
          <i class="title-icon"></i>
          <span>{{theData.titleName}}</span>
        </div>
        <div class="add">添加</div>
      </div>
      <div class="main-content">
        <div class="empty-content">
          您还未编辑此项信息哦~快来编辑吧
        </div>
        <div class="the-content">
          <div class="content-line content-title" v-if="theData.data[0].value">
            <span>{{theData.data[0].value}}</span>
            <div class="content-edit">
              <img src="./assets/edit.png" alt="">
            </div>
          </div>
          <div class="content-line content-time" v-if="theData.data.time">
            <span>{{theData.data.time}}</span>
          </div>
          <div class="content-line job-name" v-if="theData.data.jobData">
            <span>{{theData.data.jobData}}</span>
          </div>
          <div class="content-line" v-if="theData.data.content">
            <span>{{theData.data.content}}</span>
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
    theData: {
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
  .main-item-box {
    padding: 15px 0 30px;
    @include font-size(15px);
    color: #999999;
  }
  .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    color: $mainColor;
    align-items: center;
  }
  .title-icon {
    width: 8px;
    height: 8px;
    background-color: $mainColor;
    border-radius: 50%;
    /*position: absolute;*/
    /*left: 0px;*/
    /*top: 5px;*/
  }
  .label {
    white-space:nowrap;
  }
  .title-name {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    @include font-size(16px);
    span {
      padding-left: 6px;
    }
  }
  .empty-content {
    padding-top: 29px;
  }
  .main-content {
    padding-left: 14px;
    @include font-size(13px);
  }
  .content-edit {
    width: 17px;
    height: 17px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    @include font-size(17px);
  }
  .content-line {
    margin-top: 15px;
  }
  .the-content {
    @include font-size(15px);
    color: #666666;
  }
  .content-time {
    color: #999999;
    @include font-size(13px);
  }
  .job-name {
    @include font-size(16px);
    color: #333333;
  }
</style>
