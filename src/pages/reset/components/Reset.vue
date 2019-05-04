<template>
  <div class="login">
    <div v-if="theFieldArr">
      <Field v-for="(item,index) in theFieldArr" :key="index" :index="index" :item="item"
             @clickRightIcon="clickRightIcon" @changeValue="changeValue" @clickSend="clickSend"></Field>
    </div>
    <div>
      <BigButton :theFieldArr="theFieldArr" :font="'完成'" @clickSubmit="clickOK"></BigButton>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Field from '../../../component/Field.vue'
import BigButton from '../../../component/BigButton.vue'

export default {
  data () {
    return {
      isEnt: null, // 是不是企业端
      codeType: null,
      theFieldArr: null,
      entArr: [
        {name: '手机号码', code: '', value: '', placeHolder: '请输入您的手机号码', type: 'number', popType: '', fieldName: 'Mobile', required: true, clearable: true},
        {name: '用户名', code: '', value: '', placeHolder: '请输入您的用户名', type: 'hidden', popType: '', fieldName: 'Name', required: true, clearable: true},
        {name: '密码1', code: '', value: '', placeHolder: '请输入您的密码', type: 'password', popType: '', fieldName: 'Password1', required: true, clearable: false, rightIcon: 'theEye'},
        {name: '密码2', code: '', value: '', placeHolder: '再次确认您的密码', type: 'password', popType: '', fieldName: 'Password2', required: true, clearable: false, rightIcon: 'theEye'},
        {name: '验证码', code: '', value: '', placeHolder: '请输入验证码', type: 'text', popType: '', fieldName: 'Code', isCode: true, required: true, clearable: true, isActiveBtn: false}
      ],
      normalArr: [
        {name: '手机号码', code: '', value: '', placeHolder: '请输入您的手机号码', type: 'number', popType: '', fieldName: 'Mobile', required: true, clearable: true},
        {name: '密码1', code: '', value: '', placeHolder: '请输入您的密码', type: 'password', popType: '', fieldName: 'Password1', required: true, clearable: false, rightIcon: 'theEye'},
        {name: '密码2', code: '', value: '', placeHolder: '再次确认您的密码', type: 'password', popType: '', fieldName: 'Password2', required: true, clearable: false, rightIcon: 'theEye'},
        {name: '验证码', code: '', value: '', placeHolder: '请输入验证码', type: 'text', popType: '', fieldName: 'Code', isCode: true, required: true, clearable: true, isActiveBtn: false}

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
  methods: {
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
     * 点击完成
     */
    clickOK () {
      if (!myModule.checkRequired(this.theFieldArr)) {
        this.$toast.fail('必填项不能为空')
        return
      }
      if (!myModule.checkPSW(this.theFieldArr)) {
        this.$toast.fail('两次输入的密码不相同')
        return
      }

      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let form = myModule.createFormData(this.theFieldArr)
      let url = this.isEnt ? '/EntService/ResetPassword' : '/ReService/ResetPassword'
      let link = this.isEnt ? 'EPLogin.html' : 'login.html'
      postData(url, form).then((res) => {
        console.log(res)
        this.$toast.success('设置成功')
//        myModule.clearHistory()
        GoToPage('', link, {})
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
        CodeType: ''
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
    clickRightIcon (item) {
      if (item.rightIcon === 'eye') {
        item.type = item.type === 'password' ? 'text' : 'password'
      }
    },
    changeField () {
      if (this.isEnt) {
        for (let obj of this.theFieldArr) {
          if (obj.name === '用户名') {
            obj.type = 'text'
          }
        }
      } else {
        for (let obj of this.theFieldArr) {
          if (obj.name === '用户名') {
            obj.type = 'hidden'
          }
        }
      }
    }
  },
  created () {
    const param = myModule.getUrlParams()
    let isEnt = param.isent
    this.isEnt = eval(isEnt)
    if (this.isEnt) {
      this.theFieldArr = this.entArr
    } else {
      this.theFieldArr = this.normalArr
    }
    this.changeField()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .van-hairline--top-bottom::after {
    border-width: 0.02rem 0;
    border-top-width: 0;
  }
  .van-cell:not(:last-child)::after {
    left: 0;
  }
  .fillter {
    width: 100%;
    height: 5px;
  }
  .mb30 {
    margin-bottom: 30px;
  }
  .login {
    padding: 130px 25px 0;
  }
  .col-span {
    text-align: center;
  }
  .tac {
    text-align: center;
  }
  .btnStyle {
    background-color: #AAAAAA;
    color: #ffffff;
    border-radius: 5px;
  }
  .btnStyle2 {
    @include theBtnColor
  }
  .btnStyle.active {
    background-color: $mainColor;
  }
</style>
