<template>
  <div class="login">
    <div>
      <van-field type="number" v-model="Mobile" placeholder="请输入您的手机号码" right-icon="clear" @click-right-icon="clickDel" />
      <div class="fillter"></div>
      <van-field :type="pswInputType" v-model="Password" placeholder="请输入您的密码" right-icon="eye" @click-right-icon="clickEye" />
      <div class="fillter"></div>
      <van-cell>
        <van-row type="flex" justify="space-between" class="mb30">
          <van-col span="8" class="tac" @click="clickRegister">注册</van-col>
          <van-col span="8" class="tac" @click="clickForget">忘记密码</van-col>
        </van-row>
      </van-cell>
    </div>
    <div>
      <!--<van-button :class="['btnStyle', {'active': isActiveBtn}]" type="default" size="large" :disabled="isDisable">登录</van-button>-->
      <van-button :class="['btnStyle2']" @click="clickLogin" type="info" size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'

export default {
  name: 'login',
  data () {
    return {
      Mobile: '',
      Password: '',
      isDisable: true,
      isActiveBtn: false,
      pswInputType: 'password'
    }
  },
  mounted () {
    console.log(myModule)
  },
  methods: {
    /**
     * 清除输入
     */
    clickDel () {
      this.Mobile = ''
    },
    /**
     * 显示或者隐藏密码
     */
    clickEye () {
      if (this.pswInputType === 'password') {
        this.pswInputType = 'text'
      } else {
        this.pswInputType = 'password'
      }
    },
    clickRegister () {
      this.$router.push({name: 'Register', params: {}})
    },
    clickForget () {
    },
    clickLogin () {
      let form = new FormData()
      form.append('Mobile', this.Mobile)
      form.append('Password', this.Password)

      postData('/ReService/Login', form).then((res) => {
        console.log(res)
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
</style>
