<template>
  <div>
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true" :save="true" @save="onSave"></Header>
    <div class="body" id="body" ref="body">
      <!--头像-->
      <div @click="clickBox" class="head-logo-box van-hairline--bottom" v-if="this.headerName==='个人信息'">
        <div>头像</div>
        <div class="head-logo">
          <UserHead v-if="resData" :theId="resData.RE23_CANDIDATE_ID" :theUrl="resData.RE23_PIC_URL"></UserHead>
          <UserHead v-else></UserHead>
        </div>
        <van-uploader :after-read="onRead" v-show="false">
          <van-icon name="photograph"/>
        </van-uploader>
      </div>
      <div v-if="theFieldArr">
        <div v-for="(item, index) in theFieldArr" :key="index">
          <Field :index="index" :item="item" @clickInput="clickInput"></Field>
        </div>
      </div>
      <div class="btn-box" v-if="showBtn && this.headerName!=='个人信息'">
        <van-button @click="clickDel" class="btnClass" type="info" size="large">
          删除
        </van-button>
      </div>
    </div>
    <!--日期选择-->
    <PopDate v-if="showPicker"
             :show-date="theShowDate"
             :date-type="datetimeType"
             :min-date="theMinDate"
             :max-date="theMaxDate"
             @confirm="clickConfirm"
             @cancel="clickCancel"></PopDate>
    <!--单选-->
    <PopRadio v-if="showRadio" :theRadioData="theRadioData" @closePop="closePop"></PopRadio>
  </div>
</template>

<script>
import Header from '../../../component/Header.vue'
import Field from '../../../component/Field.vue'
import { postData } from '../../../common/server'
import myModule from '../../../common'
import PopRadio from '../../../component/PopRadio.vue'
import PopDate from '../../../component/PopDate.vue'
import UserHead from '../../../component/UserHead.vue'

export default {
  data () {
    return {
      id: null, // 编辑的id
      headerName: '',
      docmHeight: null, // 默认屏幕高度
      showHeight: null, // 实时屏幕高度
      showBtn: true, // 显示按钮
      theFieldArr: null,
      resData: null,
      theMinDate: new Date(1970, 0, 1),
      theMaxDate: new Date(),
      curDate: new Date(),
      theShowDate: null,
      datetimeType: 'date',
      theRadioData: null, // 单选数据
      curFieldDIdx: null, // 当前字段index
      curPopType: null, // 当前弹窗类型
      showRadio: false, // 显示单选弹窗
      showPicker: false, // 显示日期选择器弹窗
      theSaveLink: '', // 保存 api
      theDelLink: '', // 删除 api
      dataMap: { // 数据映射
        p0: { // 个人信息
          getLink: '/ReService/ResumeDetails', // 请求数据 api
          saveLink: '/ReService/SaveResume', // 保存操作 api
          headerName: '个人信息',
          arr: [ // 求职期望
            {
              label: '姓名',
              value: '',
              fieldName: 'RE23_NAME',
              code: '',
              placeHolder: '请输入您的姓名',
              type: 'text',
              popType: '',
              required: true,
              clearable: true,
              disabled: false
            },
            {
              label: '年龄',
              value: '',
              code: '',
              placeHolder: '请输入年龄',
              type: 'number',
              popType: '',
              fieldName: 'RE23_AGE',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '学历',
              code: 'UDHR021',
              value: '',
              placeHolder: '请选择学历',
              type: 'text',
              popType: 'radio',
              fieldName: 'RE23_EDUCATION',
              required: false,
              clearable: true,
              disabled: true
            },
            {
              label: '籍贯',
              code: '',
              value: '',
              placeHolder: '请选填写籍贯',
              type: 'text',
              popType: 'place',
              fieldName: 'RE23_BORN_IN',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '手机',
              code: '',
              value: '',
              placeHolder: '请填写手机号码',
              type: 'number',
              popType: '',
              fieldName: 'RE23_MOBILE_PHONE',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '身份证',
              code: '',
              value: '',
              placeHolder: '请填写身份证',
              type: 'text',
              popType: '',
              fieldName: 'RE23_ID_NUMBER',
              required: false,
              clearable: true,
              disabled: true
            },
            {
              label: '期望职位',
              value: '',
              fieldName: 'RE23_JOB_INTENSION',
              code: 'UDRE015',
              placeHolder: '求职意向',
              type: 'text',
              popType: 'radio',
              required: false,
              clearable: true,
              disabled: true
            },
            {
              label: '期待薪资',
              value: '',
              code: '',
              placeHolder: '期待薪资(请输入纯数字)',
              type: 'number',
              popType: '',
              fieldName: 'RE23_ANNUAL_SALARY_E',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '期待工作地点',
              code: '',
              value: '',
              placeHolder: '期待工作地点',
              type: 'text',
              popType: '',
              fieldName: 'RE23_WORK_PLACE',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '',
              code: '',
              value: '',
              placeHolder: '',
              type: 'hidden',
              popType: '',
              fieldName: 'RE23_CANDIDATE_ID',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              name: '图片地址',
              label: '',
              code: '',
              value: '',
              placeHolder: '',
              type: 'hidden',
              popType: '',
              fieldName: 'RE23_PIC_URL',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        p1: { // 求职期望 放在个人信息一起编辑了
          getLink: '/ReService/ResumeDetails',
          saveLink: '/ReService/SaveResume',
          headerName: '求职期望',
          arr: [ // 求职期望
            {
              label: '期望职位',
              value: '',
              fieldName: 'RE23_JOB_INTENSION',
              code: 'UDRE015',
              placeHolder: '求职意向',
              type: 'text',
              popType: 'radio',
              required: false,
              clearable: true,
              disabled: true
            },
            {
              label: '期待薪资',
              value: '',
              code: '',
              placeHolder: '期待薪资(请输入纯数字)',
              type: 'number',
              popType: '',
              fieldName: 'RE23_ANNUAL_SALARY_E',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '期待工作地点',
              code: '',
              value: '',
              placeHolder: '期待工作地点',
              type: 'text',
              popType: '',
              fieldName: 'RE23_WORK_PLACE',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '',
              code: '',
              value: '',
              placeHolder: '',
              type: 'hidden',
              popType: '',
              fieldName: 'RE23_CANDIDATE_ID',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        p2: { // 工作经历
          getLink: '/ReService/GetWorkExperience',
          saveLink: '/ReService/SaveWorkExperience',
          delLink: '/ReService/DelWorkExperience',
          headerName: '工作经历',
          arr: [ // 工作经历
            {
              label: '公司名称',
              value: '',
              fieldName: 'RE24_COMPANY_NAME',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              required: true,
              clearable: true,
              disabled: false
            },
            {
              label: '开始时间',
              value: '', // 开始时间
              fieldName: 'RE24_BEGIN_DATE',
              code: '',
              placeHolder: '请选择时间',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: true,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '结束时间',
              value: '',
              fieldName: 'RE24_END_DATE',
              code: '',
              placeHolder: '请选择时间',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: true,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '部门',
              value: '',
              fieldName: 'RE24_DEPT_NAME',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '职位名称',
              value: '',
              fieldName: 'RE24_POSITION',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '工作内容',
              code: '',
              value: '',
              placeHolder: '',
              type: 'textarea',
              popType: '',
              fieldName: 'RE24_WORK_DESC',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '',
              code: '',
              value: '',
              placeHolder: '',
              type: 'hidden',
              popType: '',
              fieldName: 'RE24_WORK_ID',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        p3: { // 项目经历
          getLink: '/ReService/GetPrjExperience',
          saveLink: '/ReService/SavePrjExperience',
          delLink: '/ReService/DelPrjExperience',
          headerName: '项目经历',
          arr: [ // 项目经历
            {
              label: '项目名称',
              value: '',
              fieldName: 'RE25_PRJ_NAME',
              code: '',
              placeHolder: '请填写项目名称',
              type: 'text',
              popType: '',
              required: true,
              clearable: true,
              disabled: false
            },
            {
              label: '开始时间',
              value: '', // 开始时间
              fieldName: 'RE25_BEGIN_DATE',
              code: '',
              placeHolder: '请选择时间',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: true,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '结束时间',
              value: '',
              fieldName: 'RE25_END_DATE',
              code: '',
              placeHolder: '请选择时间',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: true,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '项目描述',
              code: '',
              value: '',
              placeHolder: '请输入项目描述',
              type: 'textarea',
              popType: '',
              fieldName: 'RE25_PRJ_DESC',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '',
              code: '',
              value: '',
              placeHolder: '',
              type: 'hidden',
              popType: '',
              fieldName: 'RE25_PRJ_ID',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        p4: { // 教育经历
          getLink: '/ReService/GetEdu',
          saveLink: '/ReService/SaveEdu',
          delLink: '/ReService/DelEdu',
          headerName: '教育经历',
          arr: [ // 教育经历
            {
              label: '毕业院校',
              value: '',
              fieldName: 'RE26_GRADUATE_FROM',
              code: '',
              placeHolder: '请填写毕业院校名称',
              type: 'text',
              popType: '',
              required: true,
              clearable: true,
              disabled: false
            },
            {
              label: '开始时间',
              value: '', // 开始时间
              fieldName: 'RE26_BEGIN_DATE',
              code: '',
              placeHolder: '请选择时间',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: true,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '结束时间',
              value: '',
              fieldName: 'RE26_END_DATE',
              code: '',
              placeHolder: '请选择时间',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: true,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '学历',
              code: 'UDHR021',
              value: '',
              placeHolder: '请填写学历',
              type: 'text',
              popType: 'radio',
              fieldName: 'RE26_EDU_BACKGROUND',
              required: false,
              clearable: true,
              disabled: true
            },
            {
              label: '专业',
              code: '',
              value: '',
              placeHolder: '请填写专业',
              type: 'text',
              popType: '',
              fieldName: 'RE26_MAJOR',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '',
              code: '',
              value: '',
              placeHolder: '',
              type: 'hidden',
              popType: '',
              fieldName: 'RE26_ID',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        p5: { // 培训经历
          getLink: '/ReService/GetTraning',
          saveLink: '/ReService/SaveTraning',
          delLink: '/ReService/DelTraning',
          headerName: '培训经历',
          arr: [ // 培训经历
            {
              label: '培训单位',
              value: '',
              fieldName: 'RE27_COMPANY',
              code: '',
              placeHolder: '请填写培训单位名称',
              type: 'text',
              popType: '',
              required: true,
              clearable: true,
              disabled: false
            },
            {
              label: '开始时间',
              value: '', // 开始时间
              fieldName: 'RE27_BEGIN_DATE',
              code: '',
              placeHolder: '请选择时间',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: true,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '结束时间',
              value: '',
              fieldName: 'RE27_END_DATE',
              code: '',
              placeHolder: '请选择时间',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: true,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '培训内容',
              code: '',
              value: '',
              placeHolder: '请填写培训内容',
              type: 'textarea',
              popType: '',
              fieldName: 'RE27_TRAINING_DETAILS',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              label: '',
              code: '',
              value: '',
              placeHolder: '',
              type: 'hidden',
              popType: '',
              fieldName: 'RE27_ID',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        p6: { // 技能标签
          getLink: '/ReService/GetSkill',
          saveLink: '/ReService/SaveSkill',
          delLink: '/ReService/DelSkill',
          headerName: '技能标签',
          arr: [
            {
              label: '技能名称',
              value: '',
              fieldName: 'RE29_SKILL_NAME',
              code: '',
              placeHolder: '请填写技能名称',
              type: 'text',
              popType: '',
              required: true,
              clearable: true,
              disabled: false
            },
            {
              label: '',
              code: '',
              value: '',
              placeHolder: '',
              type: 'hidden',
              popType: '',
              fieldName: 'RE29_ID',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        }
      }
    }
  },

  components: {
    Header,
    Field,
    PopRadio,
    PopDate,
    UserHead
  },

  computed: {},

  methods: {
    // 触发上传
    clickBox () {
      let upIcon = document.getElementsByClassName('van-uploader__input')[0]
      upIcon.click()
    },
    onRead (data) {
      this.$toast.loading({
        //        mask: true,
        message: '加载中...',
        duration: 0
      })
      console.log(data.file)
      const theData = {
        Name: data.file.file.name,
        Data: data.file.content
      }
      let form = myModule.createFormData2(theData)
      postData('/ReService/Upload', form).then((res) => {
        console.log(res)
        this.$toast.success({
          //          mask: true,
          message: '上传成功',
          duration: 1000
        })
        this.resData.RE23_PIC_URL = res.ReturnData.PicUrl
        for (let obj of this.theFieldArr) {
          if (obj.name === '图片地址') {
            obj.value = res.ReturnData.PicUrl
            break
          }
        }
      })
    },
    /**
     * 点击input
     */
    clickInput (obj) {
      let index = obj.index, item = obj.item
      this.curFieldDIdx = index
      //      this.theMinDate = item.minDate
      this.theShowDate = this.theShowDate ? this.theShowDate : item.showDate
      //      this.theShowDate = item.showDate
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
        forbidClick: true, // 禁用背景点击
        duration: 0
      })
      postData('/Share/GetDictVals', {code: theCode}).then((res) => {
        console.log(res)
        if (myModule.isEmpty(res.ReturnData)) {
          console.log('暂无数据')
          this.$toast.fail({
            mask: false,
            message: '暂无数据',
            duration: 1000,
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
    handleHeight (height) {
      //      console.log(height)
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.docmHeight = WH
        this.showHeight = WH
        this.$refs['body'].style.height = WH - this.headerHeight + 'px'
      }
    },
    clickConfirm (data) {
      this.showPicker = false
      this.theFieldArr[this.curFieldDIdx].value = myModule.formatTime(data.value)
    },
    clickCancel (data) {
      this.showPicker = false
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
      this.radio = obj.value.Value
      this.theFieldArr[this.curFieldDIdx].value = this.radio
      this.showRadio = false
      this.theRadioData = null
    },
    /**
     * 保存
     */
    onSave () {
      if (!myModule.checkRequired(this.theFieldArr)) {
        this.$toast.fail('必填项不能为空')
        return
      }
      for (let obj of this.theFieldArr) {
        if (obj.label === '年龄') {
          if (myModule.checkAge(obj.value)) {
            this.$toast.fail('请输入正确年龄')
            return
          }
        }
      }
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let form = myModule.createFormData(this.theFieldArr)
      //      debugger
      postData(this.theSaveLink, form).then((res) => {
        console.log(res)
        this.$toast.success({
          mask: false,
          message: '保存成功',
          forbidClick: true, // 禁用背景点击
          duration: 1000 // 持续展示 toast
        })
        setTimeout(() => {
          window.history.back()
//          this.$router.replace({name: 'ResumeDetail', params: {}})
        }, 1000)
      })
    },
    /**
     * 请求数据
     */
    getData (link, id) {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      postData(link, {id: id}).then((res) => {
        console.log(res)
        if (myModule.isEmpty(res.ReturnData)) {
          console.log('暂无数据')
          this.$toast.fail({
            mask: false,
            message: '暂无数据',
            forbidClick: true, // 禁用背景点击
            duration: 1000
          })
          return
        }
        this.$toast.clear()
        this.resData = myModule.formatObj(res.ReturnData)
        for (let obj of this.theFieldArr) {
          for (let key in this.resData) {
            if (obj.fieldName === key) {
              obj.value = myModule.formatZero(this.resData[key])
            }
          }
        }
      })
    },
    /**
     * 删除
     */
    clickDel () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      postData(this.theDelLink, {id: this.id}).then((res) => {
        console.log(res)
        this.$toast.success({
          mask: false,
          message: '操作成功',
          forbidClick: true, // 禁用背景点击
          duration: 1000 // 持续展示 toast
        })
        setTimeout(() => {
          window.history.back()
//          this.$router.replace({name: 'ResumeDetail', params: {}})
        }, 1000)
      })
    }
  },

  created () {
    const part = this.$route.params.part // 哪个部分
    this.id = this.$route.params.id // id
    const curPart = this.dataMap[part]
    this.theFieldArr = curPart.arr
    this.theSaveLink = curPart.saveLink
    this.theDelLink = curPart.delLink
    this.headerName = curPart['headerName']
    let link = this.dataMap[part].getLink
    //    debugger
    if (!this.id) {
      console.log(`没有id: ${this.id}`)
      this.showBtn = false
      return
    }
    if (this.headerName === '个人信息') {
      this.showBtn = false
    }
    this.getData(link, this.id)
  },

  mounted () {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight // 实际的显示高度
      })()
    }
  },
  watch: {
    showHeight () {
      console.log(`docmHeight: ${this.docmHeight}, showHeight: ${this.showHeight}`)
      if (this.docmHeight > this.showHeight) { // 如果实际显示高度小于原高度 隐藏按钮
        this.showBtn = false
      } else {
        if (this.id) {
          this.showBtn = true
        }
      }
    }
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .body {
    padding: 15px 18px;
    @include borderBox();
    position: relative;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }

  .btnClass {
    @include theBtnColor;

  }

  .btn-box {
    padding: 0 18px;
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
    @include borderBox()
  }
  .head-logo-box {
    padding: 10px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font-size(14px)
  }

  .head-logo {
    width: 50px;
    height: 50px;
  }
</style>
