<template>
  <div class="register">
    <div>
      <!--<van-field class="cell-mb" v-model="IdCard" placeholder="请输入您的身份证号码" right-icon="scan"-->
      <!--@click-right-icon="clickIcon"/>-->
      <!--<input ref="upload" type="file" v-show="false" @onchange="uploadImg(event)">-->
      <div style="position: relative;width: 100%;">
        <van-field class="cell-mb" v-model="IdCard" placeholder="请输入您的身份证号码"/>
        <van-uploader class="theUploadClass" :after-read="onRead" v-show="true">
          <van-icon ref="upload" name="scan" :size="'25px'"/>
        </van-uploader>
      </div>
      <van-field type="text" class="cell-mb" v-model="Name" placeholder="请输入您的姓名"/>
      <van-field type="number" class="cell-mb" v-model="Mobile" placeholder="请输入您的手机号码"/>
      <van-field class="cell-mb" v-model="Code" placeholder="请输入验证码">
        <van-button class="active" @click="clickFaSong" slot="button" size="small" clearable type="primary">发送验证码
        </van-button>
      </van-field>
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
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      // todo 检验输入
      let form = new FormData()
      form.append('IdCard', this.IdCard)
      form.append('Name', this.Name)
      form.append('Mobile', this.Mobile)
      form.append('Code', this.Code)
      form.append('PassWord1', this.PassWord1)
      form.append('PassWord2', this.PassWord2)
      form.append('FileUrl', this.FileUrl)

      postData('/ReService/Register', form).then((res) => {
        console.log(res)
        this.$toast.success('注册成功')
        setTimeout(() => {
          GoToPage('', 'login.html', {})
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

            forbidClick: true // 禁用背景点击
          })
          return
        }
        const theData = res.ReturnData
//        this.$toast.success('上传成功')
        this.$toast.success({
//          mask: true,
          message: '上传成功',
          duration: 2000
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
          duration: 2000
        })
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
