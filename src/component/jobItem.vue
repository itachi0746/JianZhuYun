<template>
  <div>
    <van-row>
      <van-col span="12">
        <div class="job-name">美工设计</div>
      </van-col>
      <van-col span="12">
        <div class="job-pay">5k-8k</div>
      </van-col>
    </van-row>
    <div class="job-remarks">
      <ul>
        <li class="job-remarks-li">备注</li>
        <li class="job-remarks-li">备注</li>
      </ul>
    </div>
    <div class="job-tag">
      <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
      <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
    </div>
    <div class="job-HR">
      <div class="HR-head"></div>
      <div class="HR-name">方文文·招聘者</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
  .job-name {
    color: #000;
    font-weight: bold;
  }
  .job-pay {
    color: #067FCC;
    text-align: right;
    @include font-size(14px)
  }
  .job-remarks {
    @include font-size(14px);
    padding: 5px 0;
    ul {
      overflow: hidden;
    }
  }
  .job-remarks-li {
    float: left;
    margin-right: 5px;
  }
  .job-tag {
    padding: 5px 0;
    color: #999;
  }
  .job-HR {
    padding-top: 5px;
    color: #666;
    display: flex;
    align-items: center;
    @include font-size(14px)
  }
  .HR-head {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #969799;
    margin-right: 6px;
  }

</style>
