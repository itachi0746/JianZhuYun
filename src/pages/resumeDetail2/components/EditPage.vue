<template>
  <div>
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true" :save="true" @save="onSave"></Header>
    <div v-for="(item, index) in theFieldArr" :key="index">
      <Field :index="index" :item="item" @clickInput="clickInput"></Field>
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
      headerName: '',
      theFieldArr: null,
      resData: null,
      theMinDate: new Date(1970, 0, 1),
      curDate: new Date(),
      theShowDate: null,
      datetimeType: 'date',
      isDisable: false,
      theRadioData: null, // 单选数据
      curFieldDIdx: null, // 当前字段index
      curPopType: null, // 当前弹窗类型
      showRadio: false, // 显示单选弹窗
      showPicker: false, // 显示日期选择器弹窗
      p1Arr: [ // 求职期望
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
          label: '期待年薪',
          value: '10K',
          code: '',
          placeHolder: '期待年薪',
          type: 'text',
          popType: '',
          fieldName: '',
          required: false,
          clearable: true,
          disabled: false
        },
        {
          label: '期待工作地点',
          code: '',
          value: '广州',
          placeHolder: '期待工作地点',
          type: 'text',
          popType: '',
          fieldName: 'RE23_WORK_PLACE',
          required: false,
          clearable: true,
          disabled: false
        }
      ],
      p2Arr: [
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
    handleHeight () {},
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
      let form = new FormData()
      for (let obj of this.theFieldArr) {
        form.append(obj.fieldName, obj.value)
      }
//      debugger
      postData('/ReService/SaveWorkExperience', form).then((res) => {
        console.log(res)
        this.$toast.success({
          mask: false,
          message: '保存成功',
          forbidClick: true, // 禁用背景点击
          duration: 1000 // 持续展示 toast
        })
        this.$router.back()
      })
//      this.$router.replace({name: '/', params: {dataArr: this.theFieldArr}})
    }
  },

  created () {
    const part = this.$route.params.part // 哪个部分
    switch (part) {
      case 'p1':
        this.theFieldArr = this.p1Arr
        break
      case 'p2':
        this.theFieldArr = this.p2Arr
        break
    }
  },

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>

</style>
