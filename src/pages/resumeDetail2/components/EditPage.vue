<template>
  <div>
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true" :save="true" @save="onSave"></Header>
    <div class="body" id="body" ref="body">
      <div v-if="theFieldArr">
        <div v-for="(item, index) in theFieldArr" :key="index">
          <Field :index="index" :item="item" @clickInput="clickInput"></Field>
        </div>
      </div>
      <div class="btn-box" v-if="headerName!=='个人信息'">
        <van-button @click="clickDel" class="btnClass" type="info" size="large" :disabled="isDisabled">
          删除
        </van-button>
      </div>
    </div>
    <!--日期选择-->
    <PopDate v-if="showPicker"
             :show-date="theShowDate"
             :date-type="datetimeType"
             :min-date="theMinDate"
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

export default {
  data () {
    return {
      id: null, // 编辑的id
      userid: null, // 用户的id
      headerName: '',
      isDisabled: false,
      theFieldArr: null,
      resData: null,
      theMinDate: new Date(1970, 0, 1),
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
              disabled: false
            },
            {
              label: '籍贯',
              code: '',
              value: '',
              placeHolder: '请选择籍贯',
              type: 'text',
              popType: 'radio',
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
              fieldName: 'RE23_IDENTIY_CARD_NO',
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
              disabled: false
            },
            {
              label: '期待薪资',
              value: '',
              code: '',
              placeHolder: '期待薪资',
              type: 'text',
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
        p1: { // 求职期望
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
              disabled: false
            },
            {
              label: '期待薪资',
              value: '',
              code: '',
              placeHolder: '期待薪资',
              type: 'text',
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
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '结束时间',
              value: '',
              fieldName: 'RE24_END_DATE',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false,
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
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '结束时间',
              value: '',
              fieldName: 'RE25_END_DATE',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false,
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
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '结束时间',
              value: '',
              fieldName: 'RE26_END_DATE',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false,
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
              disabled: false
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
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false,
              showDate: new Date(),
              //          minDate: new Date(),
              datetimeType: 'date'
            },
            {
              label: '结束时间',
              value: '',
              fieldName: 'RE27_END_DATE',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false,
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
    PopDate
  },

  computed: {},

  methods: {
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
//          this.$router.back()
          this.$router.replace({name: 'ResumeDetail', params: {}})
//          history.replaceState(null, null, '?id=' + this.userid)
        }, 1000)
      })
      //      this.$router.replace({name: '/', params: {dataArr: this.theFieldArr}})
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
              obj.value = this.resData[key]
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
        this.isDisabled = true
        setTimeout(() => {
//          this.$router.back()
          this.$router.replace({name: 'ResumeDetail', params: {}})
        }, 1000)
      })
    }
  },

  created () {
    const part = this.$route.params.part // 哪个部分
    const id = this.$route.params.id // id
//    this.userid = this.$route.params.userid // userid
    const curPart = this.dataMap[part]
    this.theFieldArr = curPart.arr
    this.theSaveLink = curPart.saveLink
    this.theDelLink = curPart.delLink
    this.headerName = curPart['headerName']
    let link = this.dataMap[part].getLink

//    debugger
    if (!id) {
      console.log(`没有id: ${id}`)
      this.isDisabled = true
      return
    }
    this.id = id
    this.getData(link, this.id)
  },

  mounted () {},

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
</style>
