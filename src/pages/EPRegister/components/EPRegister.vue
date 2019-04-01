<template>
  <div class="register">
    <div>
      <van-field type="text" class="cell-mb" v-model="Name" placeholder="请输入公司名称"/>
      <van-field type="number" class="cell-mb" v-model="Mobile" placeholder="请输入您的手机号码"/>
      <van-field class="cell-mb" v-model="Code" placeholder="请输入验证码">
        <van-button class="active" @click="clickFaSong" slot="button" size="small" clearable type="primary">发送验证码
        </van-button>
      </van-field>
      <van-field class="cell-mb" v-model="LP" placeholder="请输入企业法人"/>
      <van-field class="cell-mb" v-model="RT" placeholder="请输入注册时间"/>
      <van-field class="cell-mb" v-model="RC" placeholder="请输入注册资本"/>
      <van-field class="cell-mb" v-model="PassWord1" placeholder="请设置密码(6-20位数字与字母组合)"/>
      <van-field class="cell-mb" v-model="PassWord2" placeholder="请确认您的密码"/>
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

export default {
  name: 'register',
  data () {
    return {
      IdCard: '',
      Name: '',
      Mobile: '',
      Code: '',
      LP: '', // 企业法人
      RT: '', // 注册资本
      RC: '', // 注册时间
      PassWord1: '',
      PassWord2: '',
      FileUrl: '', // 图片地址
      isActiveBtn: false,
      isDisable: false
    }
  },
  mounted () {
    console.log(myModule)
  },
  methods: {
    clickIcon () {
      this.$refs.input.click()
    },
    clickSubmit () {
      let form = new FormData()
      form.append('IdCard', this.IdCard)
      form.append('Name', this.Name)
      form.append('Mobile', this.Mobile)
      form.append('Code', this.Code)
      form.append('PassWord1', this.PassWord1)
      form.append('Password2', this.Password2)
      form.append('FileUrl', this.FileUrl)
      form.append('LP', this.LP)
      form.append('RT', this.RT)
      form.append('RC', this.RC)

      postData('/EntService/Register', form).then((res) => {
        console.log(res)
        GoToPage('', 'login.html', {})
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
        const theData = res.ReturnData
//        this.$toast.success('上传成功')
        this.$toast.success({
//          mask: true,
          message: '上传成功',
          duration: 3
        })
        this.IdCard = theData.No
        this.Name = theData.Name
        this.FileUrl = theData.FileUrl
      })
    },
    clickFaSong () {
      this.$toast.loading({
        //        mask: true,
        message: '加载中...',
        duration: 0
      })
      if (!this.Mobile) {
        this.$toast.fail('请输入手机号码')
        return
      }
      const data = {
        Phone: this.Mobile,
        CodeType: 'Register'
      }
      postData('/MesssageService/SendCode', data).then((res) => {
        console.log(res)
        this.$toast.success({
          message: '发送成功',
          duration: 3
        })
      }).catch((err) => {
        console.log(err)
//        this.$toast.fail({
//          message: '操作失败',
//          duration: 3
//        })
        this.$toast.fail('操作失败')
      })
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
