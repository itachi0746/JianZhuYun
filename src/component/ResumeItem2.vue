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
        <div class="the-content"></div>
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

</style>
