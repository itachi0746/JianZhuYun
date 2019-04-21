<template>
  <div class="register">
    <div>
      <Field v-for="(item,index) in theFieldArr" :key="index" :index="index" :item="item" @changeValue="changeValue"
             @clickRightIcon="clickRightIcon" @clickInput="clickInput" @clickSend="clickSend" @onRead="onRead"></Field>

      <div class="mt30">
        <BigButton :theFieldArr="theFieldArr" :font="'确定'" @clickSubmit="clickSubmit"></BigButton>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Field from '../../../component/Field.vue'
import BigButton from '../../../component/BigButton.vue'

export default {
  name: 'register',
  data () {
    return {
      IdCard: '',
      Name: '',
      Mobile: '',
      Code: '',
      PassWord1: '',
      PassWord2: '',
      FileUrl: '', // 图片地址
      theFieldArr: [
        {name: '身份证号码', code: '', value: '', placeHolder: '请输入您的身份证号码', type: 'text', popType: '', fieldName: 'IdCard', required: true, clearable: true, isIDCard: true, disabled: true},
        {name: '姓名', code: '', value: '', placeHolder: '请输入您的姓名', type: 'text', popType: '', fieldName: 'Name', required: true, clearable: true},
        {name: '密码1', code: '', value: '', placeHolder: '请设置密码', type: 'password', popType: '', fieldName: 'PassWord1', required: true, clearable: true, rightIcon: 'theEye'},
        {name: '密码2', code: '', value: '', placeHolder: '请确认您的密码', type: 'password', popType: '', fieldName: 'PassWord2', required: true, clearable: true, rightIcon: 'theEye'},
        {name: '手机号码', code: '', value: '', placeHolder: '请输入您的手机号码', type: 'number', popType: '', fieldName: 'Mobile', required: true, clearable: true},
        {name: '验证码', code: '', value: '', placeHolder: '请输入验证码', type: 'number', popType: '', fieldName: 'Code', required: true, clearable: true, isCode: true, isActiveBtn: false},
        {name: '文件地址', code: '', value: '', placeHolder: '', type: 'hidden', popType: '', fieldName: 'FileUrl', required: false, clearable: false}
      ]
    }
  },
  mounted () {
    console.log(myModule)
  },
  components: {
    Field,
    BigButton
  },
  computed: {
  },
  methods: {
    clickSubmit () {
      if (!myModule.checkPSW(this.theFieldArr)) {
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

      postData('/ReService/Register', form).then((res) => {
        console.log(res)
        this.$toast.success('注册成功')
        setTimeout(() => {
          GoToPage('', 'login.html', {})
        }, 2000)
      })
    },
    clickRightIcon (item) {
      if (item.rightIcon === 'eye') {
        item.type = item.type === 'password' ? 'text' : 'password'
      }
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

            forbidClick: true // 禁用背景点击
          })
          return
        }
        const theData = res.ReturnData
//        this.$toast.success('上传成功')
        this.$toast.success({
//          mask: true,
          message: '上传成功',
          duration: 1000
        })
        for (let obj of this.theFieldArr) {
          if (obj.fieldName === 'IdCard') {
            obj.value = theData.No
          } else if (obj.fieldName === 'Name') {
            obj.value = theData.Name
          } else if (obj.fieldName === 'FileUrl') {
            obj.value = theData.FileUrl
          }
        }
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
        CodeType: 'Register'
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
