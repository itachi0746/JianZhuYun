<template>
  <div class="login">
    <div>
      <Field v-for="(item,index) in theFieldArr" :key="index" :index="index" :item="item"
             @clickRightIcon="clickRightIcon"></Field>

      <van-cell>
        <van-row type="flex" justify="space-between" class="mb30">
          <van-col span="8" class="tac" @click.native="clickRegister">注册</van-col>
          <van-col span="8" class="tac" @click.native="clickSwitch">企业登录</van-col>
        </van-row>
      </van-cell>
    </div>
    <div>
      <!--<van-button :class="['btnStyle2']" @click="clickLogin" type="info" size="large">登录</van-button>-->
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
  name: 'login',
  data () {
    return {
      Mobile: '',
      Password: '',
      pswInputType: 'password',
      theFieldArr: [
        {name: '手机号码', code: '', value: '', placeHolder: '请输入您的手机号码', type: 'number', popType: '', fieldName: 'Mobile', required: true, clearable: true},
        {name: '密码', code: '', value: '', placeHolder: '请输入您的密码', type: 'password', popType: '', fieldName: 'Password', required: true, clearable: true, rightIcon: 'eye'}
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
    clickRegister () {
      GoToPage('', 'register.html', {})
    },
    clickSwitch () {
      GoToPage('', 'EPLogin.html', {})
    },
    /**
     * 点击登录
     */
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

      postData('/ReService/Login', form).then((res) => {
        console.log(res)
        this.$toast.success('登录成功')
        myModule.clearHistory()
        GoToPage('', 'index.html', {})
      })
    },
    clickRightIcon (item) {
      if (item.rightIcon === 'eye') {
        item.type = item.type === 'password' ? 'text' : 'password'
      }
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
</style>
