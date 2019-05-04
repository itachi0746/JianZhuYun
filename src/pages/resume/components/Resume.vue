<template>
  <div>
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="register" ref="body">
      <div>
        <!--头像-->
        <div @click="clickBox" class="head-logo-box van-hairline--bottom" v-if="resData && activePage===1">
          <div>头像</div>
          <div class="head-logo">
            <UserHead :theId="resData.RE23_CANDIDATE_ID" :theUrl="resData.RE23_PIC_URL"></UserHead>
          </div>
          <van-uploader :after-read="onRead" v-show="false">
            <van-icon name="photograph"/>
          </van-uploader>
        </div>
        <div v-if="theFieldArr.length">
          <div v-for="(item, index) in theFieldArr" :key="index" v-if="pagingCondition(index)">
            <Field :index="index" :item="item" @clickInput="clickInput"></Field>
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
          保存
        </van-button>
      </div>
    </div>
    <!--<div class="bottom-fillter" ref="fillter" v-show="showFillter"></div>-->
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import PopRadio from '../../../component/PopRadio.vue'
import PopDate from '../../../component/PopDate.vue'
import Field from '../../../component/Field.vue'
import UserHead from '../../../component/UserHead.vue'

export default {
  data () {
    return {
      headerName: '我的简历',
      radio: '',
      id: null,
      activePage: 1,
      resData: null,
      theMinDate: new Date(1970, 0, 1),
      curDate: new Date(),
      theShowDate: null,
      datetimeType: 'date',
      isDisable: false,
      theRadioData: null, // 单选数据
      curFieldDIdx: null, // 当前字段index
      curPopType: null, // 当前弹窗类型
      showRadio: false, // 显示单选弹窗
      showPicker: false, // 显示日期选择器弹窗
      theFieldArr: [
        {
          name: '姓名',
          label: '姓名',
          code: '',
          value: '',
          placeHolder: '请输入您的姓名',
          type: 'text',
          popType: '',
          fieldName: 'RE23_NAME',
          required: true,
          clearable: true,
          disabled: false
        },
        {
          name: '出生日期',
          label: '出生日期',
          code: '',
          value: '',
          placeHolder: '出生日期',
          type: 'text',
          popType: 'date',
          showDate: new Date(1970, 0, 1),
          minDate: new Date(1970, 0, 1),
          datetimeType: 'date',
          fieldName: 'RE23_BIRTHDAY',
          required: false,
          clearable: true,
          disabled: true
        },
        {
          name: '性别',
          label: '性别',
          code: 'UDHR027',
          value: '',
          placeHolder: '性别',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_SEX',
          required: false,
          clearable: true,
          disabled: true
        },
        {
          name: '年龄',
          label: '年龄',
          code: '',
          value: '',
          placeHolder: '年龄',
          type: 'number',
          popType: '',
          fieldName: 'RE23_AGE',
          required: true,
          clearable: true,
          disabled: false
        },
        {
          name: '婚姻状况',
          label: '婚姻状况',
          code: 'UDHR007',
          value: '',
          placeHolder: '婚姻状况',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_MARITAL_STATUS',
          required: false,
          clearable: true,
          disabled: true
        },
        {
          name: '学历',
          label: '学历',
          code: 'UDHR021',
          value: '',
          placeHolder: '学历',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_EDUCATION',
          required: true,
          clearable: true,
          disabled: true
        },
        {
          name: '现居住地',
          label: '现居住地',
          code: '',
          value: '',
          placeHolder: '现居住地',
          type: 'text',
          popType: '',
          fieldName: 'RE23_ADDRESS',
          required: false,
          clearable: true,
          disabled: false
        },
        {
          name: '求职意向',
          label: '求职意向',
          code: 'UDRE015',
          value: '',
          placeHolder: '求职意向',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_JOB_INTENSION',
          required: true,
          clearable: true,
          disabled: true
        },
        {
          name: '期待工作性质',
          label: '期待工作性质',
          code: 'UDRE003',
          value: '',
          placeHolder: '期待工作性质',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_WORK_PROP',
          required: false,
          clearable: true,
          disabled: true
        },
        {
          name: '期待工作地点',
          label: '期待工作地点',
          code: '',
          value: '',
          placeHolder: '期待工作地点',
          type: 'text',
          popType: '',
          fieldName: 'RE23_WORK_PLACE',
          required: true,
          clearable: true,
          disabled: false
        },
        {
          name: '期待职能',
          label: '期待职能',
          code: 'UDRE004',
          value: '',
          placeHolder: '期待职能',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_EXPECTED_FX',
          required: false,
          clearable: true,
          disabled: true
        },
        {
          name: '期待年薪',
          label: '期待年薪',
          code: '',
          value: '',
          placeHolder: '期待年薪',
          type: 'number',
          popType: '',
          fieldName: 'RE23_ANNUAL_SALARY_E',
          required: true,
          clearable: true,
          disabled: false
        },
        {
          name: '目前薪酬',
          label: '目前薪酬',
          code: '',
          value: '',
          placeHolder: '目前薪酬',
          type: 'text',
          popType: '',
          fieldName: 'RE23_ANNUAL_SALARY_C',
          required: false,
          clearable: true,
          disabled: false
        },
        {
          name: '驾驶证书',
          label: '驾驶证书',
          code: '',
          value: '',
          placeHolder: '驾驶证书',
          type: 'text',
          popType: '',
          fieldName: 'RE23_DRIVING_LICENSE',
          required: false,
          clearable: true,
          disabled: false
        },
        {
          name: '工作经验',
          label: '工作经验',
          code: 'UDRE014',
          value: '',
          placeHolder: '工作经验',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_WORK_YEARS',
          required: true,
          clearable: true,
          disabled: true

        },
        {
          name: '工作经历',
          label: '工作经历',
          code: '',
          value: '',
          placeHolder: '工作经历',
          type: 'textarea',
          popType: '',
          fieldName: 'RE24_WORK_EXPERIENCE',
          required: false,
          clearable: true,
          disabled: false
        },
        {
          name: '到岗时间',
          label: '到岗时间',
          code: '',
          value: '',
          placeHolder: '到岗时间',
          type: 'text',
          popType: 'date',
          showDate: new Date(),
          minDate: new Date(),
          datetimeType: 'date',
          fieldName: 'RE23_CAN_WORK_TIME',
          required: false,
          clearable: true,
          disabled: true

          //          datetimeType: 'year-month'
        },
        {
          name: '',
          label: '',
          code: '',
          value: '',
          placeHolder: '',
          type: 'hidden',
          popType: '',
          fieldName: 'RE23_CANDIDATE_ID',
          required: false,
          clearable: false,
          disabled: true

        },
        {
          name: '图片地址',
          label: '',
          code: '',
          value: '',
          placeHolder: '',
          type: 'hidden',
          popType: '',
          fieldName: 'RE23_PIC_URL',
          required: false,
          clearable: false,
          disabled: true
        }
      ]
    }
  },
  components: {
    Header,
    PopRadio,
    PopDate,
    Field,
    UserHead
  },
  computed: {
    showFillter () { // 显示底部填充元素 把页面往上推 因为页面放在app中 输入框 被输入法挡住 不会像web那样页面会向上滚
      if (this.curFieldDIdx !== null) {
        return !this.theFieldArr[this.curFieldDIdx].disabled
      }
    }
  },
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
      this.resData = res.ReturnData
      if (!this.resData.RE23_CANDIDATE_ID) {
        return
      }
      for (let obj of this.theFieldArr) {
        for (let key in this.resData) {
          if (obj.fieldName === key) {
            let theValue = this.resData[key]
            if (typeof theValue === 'string' && theValue.indexOf('/Date') !== -1) { // 如果是时间字符串
              theValue = myModule.handleTime(theValue)
            } else if (theValue === 'null' || theValue === null) {
              theValue = ''
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
    onRead (file) {
      this.$toast.loading({
        //        mask: true,
        message: '加载中...',
        duration: 0
      })
      console.log(file)
      const data = {
        Name: file.file.name,
        Data: file.content
      }
      let form = myModule.createFormData2(data)
      postData('/ReService/Upload', form).then((res) => {
        console.log(res)
        this.$toast.success({
          //          mask: true,
          message: '上传成功',
          duration: 1000
        })
        this.resData.RE23_PIC_URL = res.ReturnData.PicUrl
        for (let obj of this.theFieldArr) {
          if (obj.name === '图片地址') {
            obj.value = res.ReturnData.PicUrl
            break
          }
        }
      })
    },
    // 触发上传
    clickBox () {
      let upIcon = document.getElementsByClassName('van-uploader__input')[0]
      upIcon.click()
    },
    /**
     * 点击input
     */
    clickInput (obj) {
      let index = obj.index, item = obj.item
      this.curFieldDIdx = index
      this.theMinDate = item.minDate
      this.theShowDate = this.theShowDate ? this.theShowDate : item.showDate
      //      this.theShowDate = item.showDate
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
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      postData('/Share/GetDictVals', {code: theCode}).then((res) => {
        console.log(res)
        if (myModule.isEmpty(res.ReturnData)) {
          console.log('暂无数据')
          this.$toast.fail({
            mask: false,
            message: '暂无数据',
            duration: 1000,
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
      for (let obj of this.theFieldArr) {
        if (obj.name === '年龄') {
          if (myModule.checkAge(obj.value)) {
            this.$toast.fail('请输入正确年龄')
            return
          }
        }
      }
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let form = myModule.createFormData(this.theFieldArr)
      postData('/ReService/SaveResume', form).then((res) => {
        console.log(res)
        this.$toast.success('提交成功')
        setTimeout(() => {
          GoToPage('', 'profile.html', {})
        }, 2000)
      })
    },
    handleHeight (height) {
      //      console.log(height)
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
//        this.$refs.body.style.height = WH - this.headerHeight + 'px'
        this.$refs['fillter'].style.height = WH / 2 + 'px'
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

  .head-logo-box {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font-size(14px)
  }

  .head-logo {
    width: 50px;
    height: 50px;
  }

  .bottom-fillter {
    width: 100%;
  }
</style>
