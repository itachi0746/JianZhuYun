<template>
  <div class="register">
    <div>
      <div v-if="theFieldArr.length">
        <div v-for="(item, index) in theFieldArr" :key="index">
          <div class="field-box" v-if="item.isCode">
            <van-field :data-code="item.code"
                       v-if="pagingCondition(index)" :data-index="index" @click="clickInput(item, index)"
                       :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder">
              <van-button class="active" @click="clickFaSong" slot="button" size="small" clearable type="primary">发送验证码
              </van-button>
            </van-field>
          </div>
          <div v-else>
            <van-field :data-code="item.code"
                       v-if="pagingCondition(index)" :data-index="index" @click="clickInput(item, index)"
                       :type="item.type" class="cell-mb" v-model="item.value" :placeholder="item.placeHolder"/>
          </div>
        </div>
      </div>
      <!--日期选择-->
      <van-popup v-model="showPicker" position="bottom">
        <van-datetime-picker
          v-model="theShowDate"
          :type="datetimeType"
          :min-date="theMinDate"
          :max-date="theMaxDate"
          @confirm="clickConfirm"
          @cancel="clickCancel"
        />
      </van-popup>
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
      isActiveBtn: false,
      isDisable: false,
      theFieldArr: [
        {name: '公司名称', code: '', value: '', placeHolder: '请输入公司名称', type: 'text', popType: '', fieldName: 'Name'},
        {name: '手机号码', code: '', value: '', placeHolder: '请输入您的手机号码', type: 'number', popType: '', fieldName: 'Mobile'},
        {name: '验证码', code: '', value: '', placeHolder: '请输入验证码', type: 'text', popType: '', fieldName: 'Code', isCode: true},
        {name: '企业法人', code: '', value: '', placeHolder: '请输入企业法人', type: 'text', popType: '', fieldName: 'LP'},
        {name: '注册时间', code: '', value: '', placeHolder: '请输入注册时间', type: 'text', popType: 'date', fieldName: 'RC', showDate: new Date(), minDate: new Date(1970, 0, 1), datetimeType: 'date'},
        {name: '注册资本', code: '', value: '', placeHolder: '请输入注册资本', type: 'text', popType: '', fieldName: 'RT'},
        {name: '密码', code: '', value: '', placeHolder: '请设置密码(6-20位数字与字母组合)', type: 'text', popType: '', fieldName: 'PassWord1'},
        {name: '密码', code: '', value: '', placeHolder: '请确认您的密码', type: 'text', popType: '', fieldName: 'PassWord2'}
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
  methods: {
    clickIcon () {
      this.$refs.input.click()
    },
    clickConfirm () {
      this.showPicker = false
      //      console.log(this.theShowDate)
      //      debugger
      this.theFieldArr[this.curFieldDIdx].value = myModule.formatTime(this.theShowDate)
    },
    clickCancel () {
      this.showPicker = false
    },
    clickSubmit () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let form = myModule.createFormData(this.theFieldArr)
      if (!form) {
        this.$toast.fail('输入不能为空')
        return
      }
      postData('/EntService/Register', form).then((res) => {
        console.log(res)
        this.$toast.success('提交成功')
        GoToPage('', 'login.html', {})
      }).catch((err) => {
        console.log(err)
        this.$toast.clear()
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
          duration: 3
        })
        this.IdCard = theData.No
        this.Name = theData.Name
//        this.FileUrl = theData.FileUrl
      })
    },
    clickFaSong () {
      this.$toast.loading({
        //        mask: true,
        message: '加载中...',
        duration: 0
      })
      let mobile = null
      for (let obj of this.theFieldArr) {
        if (obj.fieldName === 'Mobile') {
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
      const data = {
        Phone: mobile,
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
        this.$toast.fail('操作失败')
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
     * @param item
     * @param index
     */
    clickInput (item, index) {
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
