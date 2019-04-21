<template>
  <div class="login">
    <div>
      <Field v-for="(item,index) in theFieldArr" :key="index" :index="index" :item="item"
             @clickRightIcon="clickRightIcon" @clickInput="clickInput"></Field>
      <van-cell>
        <van-row type="flex" justify="space-between" class="mb30">
          <van-col span="8" class="tac" @click.native="clickRegister">注册</van-col>
          <van-col span="8" class="tac" @click.native="clickReset">忘记密码</van-col>
          <van-col span="8" class="tac" @click.native="clickSwitch">个人登录</van-col>
        </van-row>
      </van-cell>
    </div>
    <div>
      <BigButton :theFieldArr="theFieldArr" :font="'登录'" @clickSubmit="clickLogin"></BigButton>
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
      theFieldArr: [
        {
          name: '企业ID',
          code: '',
          value: '',
          placeHolder: '请输入企业ID',
          type: 'number',
          popType: '',
          fieldName: 'EntId',
          required: true,
          clearable: true,
          rightIcon: 'card'
        },
        {
          name: '用户名',
          code: '',
          value: '',
          placeHolder: '请输入您的用户名(默认为手机号)',
          type: 'text',
          popType: '',
          fieldName: 'Mobile',
          required: true,
          clearable: true,
          rightIcon: null
        },
        {
          name: '密码',
          code: '',
          value: '',
          placeHolder: '请输入您的密码',
          type: 'password',
          popType: '',
          fieldName: 'Password',
          required: true,
          clearable: true,
          rightIcon: 'theEye'
        }
      ]
    }
  },
  components: {
    Field,
    BigButton
  },
  mounted () {
    console.log(myModule)
  },
  methods: {
    clickRegister () {
      GoToPage('', 'EPRegister.html', {})
    },
    clickSwitch () {
      GoToPage('', 'login.html', {})
    },
    clickReset () {
      GoToPage('', 'reset.html', {isEnt: true})
    },
    clickRightIcon (item) {
      if (item.rightIcon === 'eye') {
        item.type = item.type === 'password' ? 'text' : 'password'
      }
    },
    clickLogin () {
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

      postData('/EntService/Login', form).then((res) => {
        console.log(res)
        this.$toast.success('登录成功')
        myModule.clearHistory()
        GoToPage('', 'EPIndex.html', {})
      })
    },
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
            duration: 2000,
            forbidClick: true // 禁用背景点击
          })
          return
        }
        this.theRadioData = res.ReturnData
        if (thePopType === 'date') {
          this.showPicker = true
        } else if (thePopType === 'radio') {
          this.showRadio = true
        }
      })
    }
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
  .cell-mb {
    margin-bottom: 10px;
  }
</style>
