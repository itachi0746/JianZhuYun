<template>
  <div class="register">
    <div>
      <div v-if="theFieldArr.length">
        <!--<div v-for="(item, index) in theFieldArr" :key="index">-->
          <!--<div class="field-box" v-if="item.isCode">-->
            <!--<van-field :data-code="item.code" :required="item.required" :clearable="item.clearable"-->
                       <!--v-if="pagingCondition(index)" :data-index="index" @click="clickInput(item, index)"-->
                       <!--:type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder">-->
              <!--<van-button class="active" @click="clickSend" slot="button" size="small" clearable type="primary">发送验证码-->
              <!--</van-button>-->
            <!--</van-field>-->
          <!--</div>-->
          <!--<div v-else>-->
            <!--<van-field :data-code="item.code" :required="item.required" :clearable="item.clearable"-->
                       <!--v-if="pagingCondition(index)" :data-index="index" @click="clickInput(item, index)"-->
                       <!--:type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder"/>-->
          <!--</div>-->
        <!--</div>-->
        <Field v-for="(item,index) in theFieldArr" :key="index" :index="index" :item="item"
               @clickRightIcon="clickRightIcon" @clickInput="clickInput" @clickSend="clickSend"></Field>
      </div>
      <!--日期选择-->
      <PopDate
        v-if="theShowDate"
        :date-type="datetimeType"
        :min-date="theMinDate"
        :max-date="theMaxDate"
        @confirm="clickConfirm"
        @cancel="clickCancel"
      ></PopDate>
      <!--单选-->
      <PopRadio v-if="showRadio" :theRadioData="theRadioData" @closePop="closePop"></PopRadio>

      <div class="mt30">
        <!--<van-button @click="clickSubmit" :class="['btnStyle', {'active': isActiveBtn}]" type="default" size="large"-->
                    <!--:disabled="isDisable">确定-->
        <!--</van-button>-->
        <van-button @click="clickSubmit" :class="['btnStyle2']" type="info" size="large">
          确定
        </van-button>
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

export default {
  name: 'register',
  data () {
    return {
      isActiveBtn: false,
      isDisable: false,
      theFieldArr: [
        {name: '公司名称', code: '', value: '', placeHolder: '请输入公司名称', type: 'text', popType: '', fieldName: 'SSA7_COMPANY', required: true, clearable: true},
        {name: '手机号码', code: '', value: '', placeHolder: '请输入您的手机号码', type: 'number', popType: '', fieldName: 'SSA7_BINGDING_PHONE', required: true, clearable: true},
        {name: '验证码', code: '', value: '', placeHolder: '请输入验证码', type: 'text', popType: '', fieldName: 'Code', isCode: true, required: true, clearable: true},
        {name: '所属行业', code: 'SS07_ENT_INDUSTRY', value: '', placeHolder: '请选择所属行业', type: 'text', popType: 'radio', fieldName: 'SSA7_INDUSTRY', required: false, clearable: true},
        {name: '企业性质', code: 'SS06_ENT_PROPERTY', value: '', placeHolder: '请选择企业性质', type: 'text', popType: 'radio', fieldName: 'SSA7_PROPERTY', required: false, clearable: true},
        {name: '注册类型', code: 'SS05_REG_TYPE', value: '', placeHolder: '请选择注册类型', type: 'text', popType: 'radio', fieldName: 'SSA7_REG_TYPE', required: false, clearable: true},
        {name: '密码1', code: '', value: '', placeHolder: '请设置密码(6-20位数字与字母组合)', type: 'password', popType: '', fieldName: 'SSA7_REG_PWD', required: true, clearable: true, rightIcon: 'eye'},
        {name: '密码2', code: '', value: '', placeHolder: '请确认您的密码', type: 'password', popType: '', fieldName: 'SSA7_REG_PWD2', required: true, clearable: true, rightIcon: 'eye'}
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
    Field
  },
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
    /**
     * 检查密码是否相同
     */
//    checkPSW () {
//      let psw1, psw2
//      for (let obj of this.theFieldArr) {
//        if (obj.fieldName === '密码1') {
//          psw1 = obj.value
//        } else if (obj.fieldName === '密码2') {
//          psw2 = obj.value
//        }
//      }
//      return psw1 === psw2
//    },
//    checkRequired () {
//      for (let obj of this.theFieldArr) {
//        if (!obj.required) {
//          continue
//        }
//        if (!obj.value) {
//          console.log('必填值不能为空', obj.fieldName)
//          return false
//        }
//      }
//      return true
//    },
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
      let mobile = null
      for (let obj of this.theFieldArr) {
        if (obj.name === '手机号码') {
          if (!obj.value) {
            this.$toast.fail({
              mask: false,
              message: '输入不能为空',
              forbidClick: true // 禁用背景点击
            })
            return
          }
          mobile = obj.value
          break
        }
      }
      if (!mobile) {
        console.log(`手机号码错误 ${mobile}`)
        return
      }
      let reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/
      if (!reg.test(mobile)) { // 正则验证
        console.log(`手机号码不正确: ${mobile}`)
        this.$toast.fail({
          mask: false,
          message: '手机号码不正确',
          duration: 2000,
          forbidClick: true // 禁用背景点击
        })
        return
      }
      const data = {
        Phone: mobile,
        CodeType: 'Register'
      }
      postData('/MesssageService/SendCode', data).then((res) => {
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
