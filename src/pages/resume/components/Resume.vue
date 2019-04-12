<template>
  <div>
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="register" ref="body">
      <div>
        <div v-if="theFieldArr.length">
          <div v-for="(item, index) in theFieldArr" :key="index" v-if="pagingCondition(index)">
            <van-field :data-code="item.code"
                       :data-index="index" @click="clickInput(item, index)"
                       :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder"/>
          </div>
        </div>
      </div>
      <!--日期选择-->
      <PopDate v-if="showPicker"
               :show-date="theShowDate"
               :date-type="datetimeType"
               :min-date="theMinDate"
               @confirm="clickConfirm"
               @cancel="clickCancel"></PopDate>
      <!--单选-->
      <PopRadio v-if="showRadio" :theRadioData="theRadioData" @closePop="closePop"></PopRadio>

      <div class="btn-box">
        <van-button type="info" v-if="activePage>1" class="btnClass mb15" size="large" @click="clickPrev"
                    :disabled="isDisable">
          上一页
        </van-button>
        <van-button v-if="activePage===1" type="info" class="btnClass" size="large" @click="clickNext"
                    :disabled="isDisable">
          下一页
        </van-button>
        <van-button v-if="activePage===2" @click="clickSubmit" class="btnClass" type="info" size="large"
                    :disabled="isDisable">
          确定
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import PopRadio from '../../../component/PopRadio.vue'
import PopDate from '../../../component/PopDate.vue'

export default {
  data () {
    return {
      headerName: '我的简历',
      radio: '',
      id: null,
      activePage: 1,
      theWorkTime: new Date(),
      theMinDate: new Date(1970, 0, 1),
      curDate: new Date(),
      theShowDate: null,
      datetimeType: 'date',
      isDisable: false,
      theRadioData: null, // 单选数据
      theFieldArr: [
        {name: '姓名', code: '', value: '', placeHolder: '请输入您的姓名', type: 'text', popType: '', fieldName: 'RE23_NAME'},
        {
          name: '出生日期',
          code: '',
          value: '',
          placeHolder: '出生日期',
          type: 'text',
          popType: 'date',
          showDate: new Date(1970, 0, 1),
          minDate: new Date(1970, 0, 1),
          datetimeType: 'date',
          fieldName: 'RE23_BIRTHDAY'
        },
        {
          name: '性别',
          code: 'UDHR027',
          value: '',
          placeHolder: '性别',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_SEX'
        },
        {
          name: '婚姻状况',
          code: 'UDHR007',
          value: '',
          placeHolder: '婚姻状况',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_MARITAL_STATUS'
        },
        {name: '现居住地', code: '', value: '', placeHolder: '现居住地', type: 'text', popType: '', fieldName: 'RE23_ADDRESS'},
        {
          name: '期待工作性质',
          code: 'UDRE003',
          value: '',
          placeHolder: '期待工作性质',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_WORK_PROP'
        },
        {
          name: '期待工作地点',
          code: '',
          value: '',
          placeHolder: '期待工作地点',
          type: 'text',
          popType: '',
          fieldName: 'RE23_WORK_PLACE'
        },
        {
          name: '期待职能',
          code: 'UDRE004',
          value: '',
          placeHolder: '期待职能',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_EXPECTED_FX'
        },
        {
          name: '期待年薪',
          code: '',
          value: '',
          placeHolder: '期待年薪',
          type: 'text',
          popType: '',
          fieldName: 'RE23_ANNUAL_SALARY_E'
        },
        {
          name: '目前薪酬',
          code: '',
          value: '',
          placeHolder: '目前薪酬',
          type: 'text',
          popType: '',
          fieldName: 'RE23_ANNUAL_SALARY_C'
        },
        {
          name: '驾驶证书',
          code: '',
          value: '',
          placeHolder: '驾驶证书',
          type: 'text',
          popType: '',
          fieldName: 'RE23_DRIVING_LICENSE'
        },
        {name: '工作经历', code: '', value: '', placeHolder: '工作经历', type: 'textarea', popType: '', fieldName: 'RE24_WORK_EXPERIENCE'},
        {
          name: '到岗时间',
          code: '',
          value: '',
          placeHolder: '到岗时间',
          type: 'text',
          popType: 'date',
          showDate: new Date(),
          minDate: new Date(),
          datetimeType: 'date',
          fieldName: 'RE23_CAN_WORK_TIME'
          //          datetimeType: 'year-month'
        },
        {
          name: '',
          code: '',
          value: '',
          placeHolder: '',
          type: 'hidden',
          popType: '',
          fieldName: 'RE23_CANDIDATE_ID'
        }
      ],
      curFieldDIdx: null, // 当前字段index
      curPopType: null, // 当前弹窗类型
      showRadio: false, // 显示单选弹窗
      showPicker: false // 显示日期选择器弹窗
    }
  },
  components: {
    Header,
    PopRadio,
    PopDate
  },
  watch: {},
  mounted () {
    console.log(myModule)
  },
  created () {
    this.$toast.loading({
      mask: false,
      message: '加载中...',
      duration: 0,
      forbidClick: true // 禁用背景点击
    })
    const param = myModule.getUrlParams()
    this.id = param.id
    postData('/ReService/ResumeDetails', {id: this.id}).then((res) => {
      console.log(res)
      this.$toast.clear()
      const returnData = res.ReturnData
      if (!returnData.RE23_CANDIDATE_ID) {
        return
      }
      for (let obj of this.theFieldArr) {
        for (let key in returnData) {
          if (obj.fieldName === key) {
            let theValue = returnData[key]
            if (typeof theValue === 'string' && theValue.indexOf('/Date') !== -1) { // 如果是时间字符串
//              let temp = myModule.formatDate(theValue)
              theValue = myModule.handleTime(theValue)
            }
            obj.value = theValue
          }
        }
      }
    })
  },
  methods: {
    clickConfirm (data) {
      this.showPicker = false
      this.theFieldArr[this.curFieldDIdx].value = myModule.formatTime(data.value)
    },
    clickCancel (data) {
      this.showPicker = false
    },
    clickNext () {
      this.activePage++
    },
    clickPrev () {
      this.activePage--
    },
    /**
     * 点击input
     * @param item
     * @param index
     */
    clickInput (item, index) {
      this.curFieldDIdx = index
      this.theMinDate = item.minDate
//      this.theShowDate = this.theShowDate ? this.theShowDate : item.showDate
      this.theShowDate = item.showDate
      this.datetimeType = item.datetimeType
      const thePopType = item.popType
      const theCode = item.code
      if (!theCode) {
        console.log('没有code')
        if (thePopType === 'date') {
          this.showPicker = true
        } else if (thePopType === 'radio') {
          this.showRadio = true
        }
        return
      }
      this.$toast.loading({
        mask: true,
        message: '加载中...',
        forbidClick: true // 禁用背景点击
      })
      postData('/Share/GetDictVals', {code: theCode}).then((res) => {
        console.log(res)
        if (myModule.isEmpty(res.ReturnData)) {
          console.log('暂无数据')
          this.$toast.fail({
            mask: false,
            message: '暂无数据',
            duration: 2000,
            forbidClick: true // 禁用背景点击
          })
          return
        }
        this.$toast.clear()
        this.theRadioData = res.ReturnData
        if (thePopType === 'date') {
          this.showPicker = true
        } else if (thePopType === 'radio') {
          this.showRadio = true
        }
      })
    },
    /**
     * 分页条件
     * @param index
     * @returns {boolean}
     */
    pagingCondition (index) {
      if (this.activePage === 1) {
        return index <= 7
      } else if (this.activePage === 2) {
        return index <= 16 && index >= 8
      }
    },
    /**
     * 点击单选
     * @param item
     */
//    clickRadio (item) {
//      this.radio = item.Value
//      this.theFieldArr[this.curFieldDIdx].value = this.radio
//      this.showRadio = false
//      this.theRadioData = null
//    },
    /**
     * 监听弹窗关闭
     */
    closePop (obj) {
      if (!obj.value) {
        console.log('没有返回值', obj)
        this.showRadio = false
        return
      }
      this.radio = obj.value.Value
      this.theFieldArr[this.curFieldDIdx].value = this.radio
      this.showRadio = false
      this.theRadioData = null
    },
    /**
     * 提交简历
     */
    clickSubmit () {
      // todo 检验输入
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let dataObj = {}
      for (let obj of this.theFieldArr) {
        dataObj[obj.fieldName] = obj.value
      }
//      console.log(dataObj)
      postData('/ReService/SaveResume', dataObj).then((res) => {
        console.log(res)
        this.$toast.success('提交成功')
        setTimeout(() => {
          GoToPage('', 'index.html', {})
        }, 2000)
      })
    },
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
  .register {
    padding: 30px 25px 0;
    color: #323233;
    @include borderBox()
  }

  .van-hairline--top-bottom::after {
    border-width: 0.02rem 0;
    border-top-width: 0;
  }

  .van-cell:not(:last-child)::after {
    left: 0;
  }

  .cell-mb {
    margin-bottom: 10px;
  }

  .mt30 {
    margin-top: 30px;
  }

  .mb15 {
    margin-bottom: 15px;
  }

  .btn-box {
    margin: 30px 0;
    @include font-size(16px)
  }

  .btnStyle {
    background-color: #AAAAAA;
    color: #ffffff;
    border-radius: 5px;
  }

  .active {
    background-color: $mainColor;
    border: 0.02rem solid $mainColor;
  }

  .selfEval {
    border: none;
    width: 100%;
    height: 100px;
    border-radius: 5px;
    padding: 0;
    color: #323233;
  }

  .btnClass {
    @include theBtnColor
  }

  .van-popup60 {
    width: 60%;
  }
</style>
