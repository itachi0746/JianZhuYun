<template>
  <div>
    <div class="msg-li-box van-hairline--bottom">
      <div class="msg-head">
        <UserHead :theId="resData.RE41_ENT_ID" :isRead="resData.RE41_IS_READ"></UserHead>
      </div>
      <div class="msg-data">
        <div>{{resData.RE41_TITLE}}</div>
        <div>{{resData.RE41_CONTENT}}</div>
      </div>
      <div class="msg-time">
        {{resData.RE41_SEND_TIME}}
      </div>
    </div>
  </div>
</template>

<script>
import UserHead from './UserHead.vue'

export default {
  data () {
    return {
      isEnterprise: null
    }
  },
  props: {
    resData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    enterprise: { // 是否企业
      type: Boolean,
      default: null
    }
  },

  components: {
    UserHead
  },

  computed: {},

  methods: {},

  created () {},

  mounted () {
    this.isEnterprise = this.enterprise
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .msg-li-box {
    display: flex;
    padding-bottom: 13px;
  }
  .msg-head {
    margin-right: 16px;
    min-width: 47px;
    width: 47px;
    height: 47px;
    /*border-radius: 50%;*/
    /*background-color: #999;*/
  }
  .msg-data {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    min-width: 190px;
  }
  .msg-data div:nth-child(1) {
    color: #333;
    @include font-size(18px);
  }
  .msg-time {
    /*max-width: 60px;*/
    @include font-size(14px);
  }

</style>
