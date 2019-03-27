<template>
  <div class="register">
    <div>
      <van-field class="cell-mb" v-model="IDNum" placeholder="请输入您的身份证号码" right-icon="scan" @click-right-icon="uploadImg" />
      <input ref="upload" type="file" v-show="false">
      <van-field type="text" class="cell-mb" v-model="username" placeholder="请输入您的姓名" />
      <van-field type="number" class="cell-mb" v-model="phoneNum" placeholder="请输入您的手机号码" />
      <van-field class="cell-mb" v-model="Vcode" placeholder="请输入验证码">
        <van-button class="active" slot="button" size="small" clearable type="primary">发送验证码</van-button>
      </van-field>
      <van-field class="cell-mb" v-model="psw" placeholder="请设置密码(6-20位数字与字母组合)" />
      <van-field class="cell-mb" v-model="pswConfirm" placeholder="请确认您的密码" />
      <div class="mt30">
        <van-button :class="['btnStyle', {'active': isActiveBtn}]" type="default" size="large" :disabled="isDisable">确定</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'

export default {
  name: 'register',
  data () {
    return {
      IDNum: '',
      username: '',
      phoneNum: '',
      Vcode: '',
      psw: '',
      pswConfirm: '',
      isActiveBtn: false,
      isDisable: false
    }
  },
  mounted () {
    console.log(myModule)
  },
  methods: {
    uploadImg () {
      this.$refs.upload.click()
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
  .active {
    background-color: $mainColor;
    border: 0.02rem solid $mainColor;
  }
</style>
