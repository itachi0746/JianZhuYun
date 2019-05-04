<template>
  <div class="">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div v-if="jobData">
        <JobDetailItem :jobData="jobData"></JobDetailItem>
      </div>
    </div>

  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import JobDetailItem from '../../../component/JobDetailItem.vue'

export default {
  data () {
    return {
      headerName: '记录详情',
      headerHeight: null,
      resData: null,
      jobData: null, // 职位信息
      id: null
    }
  },
  components: {
    Header,
    JobDetailItem
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    const params = myModule.getUrlParams()
    this.id = params.id
//    postData('/ReService/SendDetials', {id: this.id}).then((res) => {
//      console.log(res)
//      if (myModule.isEmpty(res.ReturnData)) {
//        console.log('暂无数据')
//        this.$toast.fail({
//          mask: false,
//          message: '暂无数据',
//          forbidClick: false // 禁用背景点击
//        })
//        return
//      }
//      this.resData = res.ReturnData
//      this.resData.RE34_SEND_DATE = myModule.handleTime(this.resData.RE34_SEND_DATE)
//    })
    postData('/ReService/SendPositionDetials', {id: this.id}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无职位数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',
          forbidClick: false // 禁用背景点击
        })
        return
      }
      this.jobData = res.ReturnData
    })
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      console.log(height)
      if (height.headerHeight) {
        this.headerHeight = height.headerHeight
      }
      const WH = myModule.getClientHeight()
      this.$refs.body.style.height = WH - this.headerHeight + 'px'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    background-color: #fff;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
    padding: 0 18px;
    color: #666666;
  }

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
    @include font-size(14px);
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
