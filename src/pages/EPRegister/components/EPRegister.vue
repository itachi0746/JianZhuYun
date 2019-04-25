<template>
  <div class="register">
    <div>
      <div v-if="theFieldArr.length">
        <Field v-for="(item,index) in theFieldArr" :key="index" :index="index" :item="item"
               @clickRightIcon="clickRightIcon" @clickInput="clickInput" @clickSend="clickSend"
               @changeValue="changeValue"
        ></Field>
      </div>
      <!--日期选择-->
      <PopDate v-if="showPicker"
               :show-date="theShowDate"
               :date-type="datetimeType"
               :min-date="theMinDate"
               :max-date="theMaxDate"
               @confirm="clickConfirm"
               @cancel="clickCancel"></PopDate>
      <!--单选-->
      <PopRadio v-if="showRadio" :theRadioData="theRadioData" @closePop="closePop"></PopRadio>

      <div class="mt30">
        <!--<van-button @click="clickSubmit" :class="['btnStyle2']" type="info" size="large">-->
        <!--确定-->
        <!--</van-button>-->
        <BigButton :theFieldArr="theFieldArr" :font="'确定'" @clickSubmit="clickSubmit"></BigButton>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import PopDate from '../../../component/PopDate.vue'
import PopRadio from '../../../component/PopRadio.vue'
import Field from '../../../component/Field.vue'
import BigButton from '../../../component/BigButton.vue'

export default {
  name: 'register',
  data () {
    return {
      theFieldArr: [
        {
          name: '公司名称',
          label: '公司名称',
          code: '',
          value: '',
          placeHolder: '请输入公司名称',
          type: 'text',
          popType: '',
          fieldName: 'SSA7_COMPANY',
          required: true,
          clearable: true
        },
        {
          name: '所属行业',
          label: '所属行业',
          code: 'SS07_ENT_INDUSTRY',
          value: '',
          placeHolder: '请选择所属行业',
          type: 'text',
          popType: 'radio',
          fieldName: 'SSA7_INDUSTRY',
          required: false,
          clearable: true,
          disabled: true
        },
        {
          name: '企业性质',
          label: '企业性质',
          code: 'SS06_ENT_PROPERTY',
          value: '',
          placeHolder: '请选择企业性质',
          type: 'text',
          popType: 'radio',
          fieldName: 'SSA7_PROPERTY',
          required: false,
          clearable: true,
          disabled: true
        },
        {
          name: '注册类型',
          label: '注册类型',
          code: 'SS05_REG_TYPE',
          value: '',
          placeHolder: '请选择注册类型',
          type: 'text',
          popType: 'radio',
          fieldName: 'SSA7_REG_TYPE',
          required: false,
          clearable: true,
          disabled: true
        },
        {
          name: '企业法人',
          label: '企业法人',
          code: '',
          value: '',
          placeHolder: '请填写企业法人',
          type: 'text',
          popType: '',
          fieldName: 'HRA0_ENT_LP',
          required: true,
          clearable: true
        },
        {
          name: '注册时间',
          label: '注册时间',
          code: '',
          value: '',
          placeHolder: '请填写注册时间',
          type: 'text',
          popType: 'date',
          fieldName: 'HRA0_ENT_RT',
          required: true,
          clearable: true,
          datetimeType: 'date',
          showDate: new Date(1970, 0, 1),
          minDate: new Date(1970, 0, 1),
          maxDate: new Date(),
          disabled: true
        },
        {
          name: '注册资本',
          label: '注册资本',
          code: '',
          value: '',
          placeHolder: '请填写注册资本',
          type: 'text',
          popType: '',
          fieldName: 'HRA0_ENT_RC',
          required: true,
          clearable: true
        },
        {
          name: '人数规模',
          label: '人数规模',
          code: '',
          value: '',
          placeHolder: '请填写人数规模',
          type: 'text',
          popType: '',
          fieldName: 'HRA0_COMPANY_SIZE',
          required: false,
          clearable: true
        },
        {
          name: '公司地址',
          label: '公司地址',
          code: '',
          value: '',
          placeHolder: '请完善公司地址',
          type: 'text',
          popType: '',
          fieldName: 'HRA0_ENT_ADDR_L1',
          required: true,
          clearable: true
        },
        {
          name: '公司网站',
          label: '公司网站',
          code: '',
          value: '',
          placeHolder: '请完善公司网站',
          type: 'text',
          popType: '',
          fieldName: 'HRA0_WEB_URL',
          required: false,
          clearable: true
        },
        {
          name: '公司简介',
          label: '公司简介',
          code: '',
          value: '',
          placeHolder: '请完善公司简介',
          type: 'textarea',
          popType: '',
          fieldName: 'HRA0_DESC',
          required: true,
          clearable: true
        },
        {
          name: '密码1',
          label: '密码',
          code: '',
          value: '',
          placeHolder: '请设置密码(6-20位数字与字母组合)',
          type: 'password',
          popType: '',
          fieldName: 'SSA7_REG_PWD',
          required: true,
          clearable: false,
          rightIcon: 'theEye'
        },
        {
          name: '密码2',
          label: '确认密码',
          code: '',
          value: '',
          placeHolder: '请确认您的密码',
          type: 'password',
          popType: '',
          fieldName: 'SSA7_REG_PWD2',
          required: true,
          clearable: false,
          rightIcon: 'theEye'
        },
        {
          name: '手机号码',
          label: '手机号码',
          code: '',
          value: '',
          placeHolder: '请输入您的手机号码',
          type: 'number',
          popType: '',
          fieldName: 'SSA7_BINGDING_PHONE',
          required: true,
          clearable: true
        },
        {
          name: '验证码',
          label: '验证码',
          code: '',
          value: '',
          placeHolder: '请输入验证码',
          type: 'text',
          popType: '',
          fieldName: 'Code',
          isCode: true,
          required: true,
          clearable: true,
          isActiveBtn: false
        }
      ],
      activePage: 1,
      datetimeType: 'date',
      theMinDate: new Date(1970, 0, 1),
      theMaxDate: new Date(),
      curDate: new Date(),
      theShowDate: null,
      theRadioData: null, // 单选数据
      curFieldDIdx: null, // 当前字段index
      curPopType: null, // 当前弹窗类型
      showRadio: false, // 显示单选弹窗
      showPicker: false // 显示日期选择器弹窗
    }
  },
  mounted () {
    console.log(myModule)
  },
  components: {
    PopDate,
    PopRadio,
    Field,
    BigButton
  },
  watch: {},
  methods: {
    clickRightIcon (item) {
      if (item.rightIcon === 'eye') {
        item.type = item.type === 'password' ? 'text' : 'password'
      }
    },
    clickConfirm (data) {
      this.showPicker = false
      this.theFieldArr[this.curFieldDIdx].value = myModule.formatTime(data.value)
    },
    clickCancel () {
      this.showPicker = false
    },
    clickSubmit () {
      if (!myModule.checkPSW(this.theFieldArr)) {
        console.log('两次输入的密码不一致')
        this.$toast.fail('两次输入的密码不一致')
        return
      }
      if (!myModule.checkRequired(this.theFieldArr)) {
        this.$toast.fail('必填项不能为空')
        return
      }
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let form = myModule.createFormData(this.theFieldArr)
      postData('/EntService/Register', form).then((res) => {
        console.log(res)
        this.$toast.success('注册成功')
        setTimeout(() => {
          GoToPage('', 'EPLogin.html', {})
        }, 2000)
      })
    },
    onRead (file) {
      this.$toast.loading({
        //        mask: true,
        message: '加载中...',
        duration: 0
      })
      console.log(file)
      const data = {
        FileName: file.file.name,
        ImageData: file.content,
        Type: 'ID' // 身份证识别
      }
      postData('/Card/ScanResult', data).then((res) => {
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
        const theData = res.ReturnData
        //        this.$toast.success('上传成功')
        this.$toast.success({
          //          mask: true,
          message: '上传成功',
          duration: 3
        })
        this.IdCard = theData.No
        this.Name = theData.Name
        //        this.FileUrl = theData.FileUrl
      })
    },
    // 发验证码
    clickSend () {
      this.$toast.loading({
        //        mask: true,
        message: '加载中...',
        duration: 0
      })
      let theValue
      for (let obj of this.theFieldArr) {
        if (obj.name === '手机号码') {
          theValue = obj.value
        }
      }
      if (!myModule.checkPhoneNum(theValue)) { // 正则验证
        console.log('手机号码不正确')
        this.$toast.fail({
          mask: false,
          message: '手机号码不正确',
          duration: 2000,
          forbidClick: true // 禁用背景点击
        })
        return
      }
      const data = {
        Phone: theValue,
        CodeType: 'EntRegister'
      }
      let form = myModule.createFormData2(data)
      postData('/MesssageService/SendCode', form).then((res) => {
        console.log(res)
        this.$toast.success({
          message: '发送成功',
          duration: 2000
        })
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
     * 点击input
     */
    clickInput (obj) {
      let index = obj.index, item = obj.item
      this.curFieldDIdx = index
      this.theMinDate = item.minDate
      this.theShowDate = this.theShowDate ? this.theShowDate : item.showDate
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
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      postData('/Share/GetDictVals', {code: theCode}).then((res) => {
        console.log(res)
        if (myModule.isEmpty(res.ReturnData)) {
          console.log('暂无数据')
          this.$toast.fail({
            mask: false,
            message: '暂无数据',

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
    // 监听input输入, 如果手机号码输入格式正确, 就改变发送验证按钮的状态
    changeValue (item) {
      let codeObj
      for (let obj of this.theFieldArr) {
        if (obj.name === '验证码') {
          codeObj = obj
        }
      }
      if (item.name === '手机号码') {
        codeObj.isActiveBtn = myModule.checkPhoneNum(item.value)
      }
    },
    /**
     * 监听弹窗关闭
     */
    closePop (obj) {
      if (!obj.value) {
        console.log('没有返回值', obj)
        this.showRadio = false
        return
      }
      this.theFieldArr[this.curFieldDIdx].value = obj.value.Value
      this.showRadio = false
      this.theRadioData = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .register {
    padding: 60px 25px 0;
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
    margin-bottom: 20px;
  }

  .btnStyle {
    background-color: #AAAAAA;
    color: #ffffff;
    border-radius: 5px;
  }

  .btnStyle2 {
    @include theBtnColor;
  }

  .active {
    background-color: $mainColor;
    border: 0.02rem solid $mainColor;
  }

  .theUploadClass {
    position: absolute;
    right: 0;
    top: -15px;
  }
</style>
