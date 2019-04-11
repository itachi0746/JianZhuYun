<template>
  <div class="login">
    <div>
      <van-field type="number" ref="EntID" v-model="EntId" placeholder="请输入企业ID" right-icon="card"/>
      <div class="fillter"></div>
      <van-field type="text" v-model="Mobile" placeholder="请输入您的用户名" right-icon="clear" @click-right-icon="clickDel" />
      <div class="fillter"></div>
      <van-field :type="pswInputType" v-model="Password" placeholder="请输入您的密码" right-icon="eye" @click-right-icon="clickEye" />
      <div class="fillter"></div>
      <!--<div v-if="theFieldArr.length">-->
        <!--<van-field v-for="(item, index) in theFieldArr" :key="index" :data-code="item.code"-->
                   <!--:data-index="index" @click="clickInput(item, index)" :right-icon="item.rightIcon" @click-right-icon="clickRightIcon(item.clickRightIcon)"-->
                   <!--:type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder"/>-->
      <!--</div>-->
      <!--<Field v-for="(item,index) in theFieldArr" :key="index" :index="index" :item="item" @click-input="clickInput" @click-right-icon="clickRightIcon"></Field>-->
      <van-cell>
        <van-row type="flex" justify="space-between" class="mb30">
          <van-col span="8" class="tac" @click.native="clickRegister">注册</van-col>
          <van-col span="8" class="tac" @click.native="clickForget">忘记密码</van-col>
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
import Field from '../../../component/Field.vue'

export default {
  data () {
    return {
      EntId: '', // 企业ID
      Mobile: '', // 用户名
      Password: '',
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
          clearable: false,
          rightIcon: 'card'
        },
        {
          name: '用户名',
          code: '',
          value: '',
          placeHolder: '请输入您的用户名',
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
          rightIcon: 'eye',
          clickRightIcon: function () {
            console.log(1)
            this.type = this.type === 'password' ? 'text' : 'password'
          }
        }
      ],
      isDisable: true,
      isActiveBtn: false,
      pswInputType: 'password'
    }
  },
  components: {
    Field
  },
  mounted () {
    console.log(myModule)
    this.$nextTick(() => {
      this.$refs['EntID'].focus()
    })
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
      GoToPage('', 'EPRegister.html', {})
    },
    clickForget () {
    },
    clickRightIcon (method) {
      debugger
      method()
    },
    clickLogin () {
      if (!this.Mobile || !this.PassWord || !this.EntId) {
        this.$toast.fail('输入不能为空')
      }
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let form = new FormData()
      form.append('Mobile', this.Mobile)
      form.append('Password', this.Password)
      form.append('EntId', this.EntId)

      postData('/EntService/Login', form).then((res) => {
        console.log(res)
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
      }).then(() => {
        this.$toast.clear()
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
