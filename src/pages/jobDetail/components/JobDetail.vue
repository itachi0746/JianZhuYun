<template>
  <div class="">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <JobDetailItem :jobData="resData"></JobDetailItem>

      </div>
    </div>
    <footer ref="footer" class="van-hairline--top">
      <van-button class="btn" type="info" size="large" @click="clickSend">投简历</van-button>
    </footer>
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-field v-model="recommendation" type="textarea" placeholder="请输入自荐信(选填)"/>
    </van-dialog>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import JobDetailItem from '../../../component/JobDetailItem.vue'

export default {
  name: '',
  data () {
    return {
      headerName: '职位详情',
      headerHeight: null,
      footerHeight: null,
      resData: null,
      id: null,
      showDialog: false,
      recommendation: '',
      dataMap: {
        RE13_EDU_DEGREE: '学历要求',
        RE13_POSITION_TYPE: '职位类别',
        RE13_SALARY_REQUIRED: '薪资要求',
//        RE13_STATUS: '状态',
        RE13_WORK_PLACE: '工作地点',
        RE13_WORK_PROP: '工作性质',
        RE13_WORK_YEAR: '工作年限',
        RE13_ENT_ID: '公司名称'
      },
      detailData: []
    }
  },
  components: {
    Header,
    JobDetailItem
  },
  mounted () {
    console.log(myModule)
    setTimeout(() => {
      this.footerHeight = this.$refs.footer.offsetHeight
      console.log(this.footerHeight)
      this.handleHeight({footerHeight: this.footerHeight})
    }, 300)
  },
  created () {
    const params = myModule.getUrlParams()
    console.log(params)
    this.id = params.id
    postData('/ReService/PositionDetail', {id: this.id}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',
          forbidClick: false // 禁用背景点击
        })
        return
      }
      this.resData = res.ReturnData
//      this.handleDetail(this.dataMap)
      this.detailData = myModule.handleMapData(this.dataMap, this.resData)
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
      } else {
        this.footerHeight = height.footerHeight
      }
      if (this.headerHeight && this.footerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight - this.footerHeight + 'px'
      }
    },
    /**
     * 把描述发在detailData
     * @param dataObj
     */
    handleDetail (dataObj) {
      let me = this
      for (let key in dataObj) {
        if (!me.resData.ReferenceValues[key]) { // 空则跳过
          console.log(`${key} 没有值: ${me.resData.ReferenceValues[key]}`)
          continue
        }
        const obj = {
          key: dataObj[key],
          value: me.resData.ReferenceValues[key]
        }
        this.detailData.push(obj)
      }
    },
    /**
     * 投点击简历
     */
    clickSend () {
      this.showDialog = true
//      this.$toast.loading({
//        forbidClick: true, // 禁用背景点击
//        message: '加载中...',
//        duration: 0
//      })
//      const data = {
//        id: this.id,
//        note: this.recommendation
//      }
//      postData('/ReService/SendResume', data).then((res) => {
//        console.log(res)
//        this.$toast.success('投递成功')
//        setTimeout(() => {
//          GoToPage('', 'index.html', {})
//        }, 3000)
//      }).catch((err) => {
//        console.log(err)
//        this.$toast.fail('操作失败')
//      })
    },
    beforeClose (action, done) {
      if (action === 'confirm') {
        this.$toast.loading({
          forbidClick: true, // 禁用背景点击
          message: '加载中...',
          duration: 0
        })
        const data = {
          id: this.id,
          note: this.recommendation
        }
        postData('/ReService/SendResume', data).then((res) => {
          console.log(res)
          this.$toast.success('投递成功')
          setTimeout(() => {
            GoToPage('', 'index.html', {})
          }, 1000)
        }).then(() => {
          done()
          this.showDialog = false
        }).catch((err) => {
          console.log(err)
          done()
          this.showDialog = false
        })
      } else {
        done()
        this.showDialog = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    background-color: #ffffff;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
    padding: 0 18px;
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
  }

  .job-desc-title {
    @include font-size(16px);
    color: #333;
    font-weight: bold;
    padding: 10px 0;
  }

  .job-desc-main {
    color: #666;
    @include font-size(16px);
    padding: 10px;
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
    color: $mainColor;
    text-align: right;
  }

  .job-name {
    @include font-size(30px);
    color: #333;
    font-weight: bold;
  }

  .desc-item {
    margin-top: 10px;
  }
</style>
