<template>
  <div>
    <div v-if="resData">
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">甲方</div>
          </div>
          <div v-for="(item,index) in theFieldArr" :key="index">
            <div v-if="item.groupName==='B'">
              <!--<van-cell :title="item.name" :value="resData[item.fieldName]" :class="{'hidden': item.hidden}" title-class="title-class" value-class="value-class" />-->
              <Field :index="index" :item="item" @clickInput="clickInput"></Field>
            </div>
          </div>
        </van-cell-group>
      </div>
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">乙方</div>
          </div>
          <div v-for="(item,index) in theFieldArr" :key="index">
            <div v-if="item.groupName==='A'">
              <!--<van-cell :title="item.name" :value="resData[item.fieldName]" :class="{'hidden': item.hidden}" title-class="title-class" value-class="value-class" />-->
              <Field :index="index" :item="item" @clickInput="clickInput"></Field>
            </div>
          </div>
        </van-cell-group>
      </div>
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">合同内容</div>
          </div>
          <div v-for="(item,index) in theFieldArr" :key="index">
            <div v-if="item.groupName==='C'">
              <!--<van-cell :title="item.name" :value="resData[item.fieldName]" :class="{'hidden': item.hidden}" title-class="title-class" value-class="value-class" />-->
              <Field :index="index" :item="item" @clickInput="clickInput"></Field>
            </div>
          </div>
        </van-cell-group>
      </div>
      <div class="hidden">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom"></div>
          </div>
          <div v-for="(item,index) in theFieldArr" :key="index">
            <div v-if="item.groupName==='D'">
              <!--<van-cell :title="item.name" :value="resData[item.fieldName]" :class="{'hidden': item.hidden}" title-class="title-class" value-class="value-class" />-->
              <Field :index="index" :item="item"></Field>

            </div>
          </div>
        </van-cell-group>
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
  </div>
</template>

<script>
import myModule from '../common'
import Field from './Field.vue'
import PopDate from './PopDate.vue'
import { postData } from '../common/server'

export default {
  data () {
    return {
      //      theFieldArr: null,
      datetimeType: 'date',
      theMinDate: new Date(),
      theMaxDate: new Date(2030, 0, 1),
      curDate: new Date(),
      theShowDate: new Date(),
      showPicker: false, // 显示日期选择器弹窗
      theRadioData: null, // 单选数据
      curFieldDIdx: null, // 当前字段index
      curPopType: 'date', // 当前弹窗类型
      showRadio: false, // 显示单选弹窗
      strData: '记录ID|RE33_SIGN_ID|hidden|D||;\n' +
      '求职者ID|RE33_CANDIDATE_ID|hidden|D||;\n' +
      '求职者EntId|RE33_CANDIDATE_ENT_ID|hidden|D||;\n' +
      '姓名|RE33_NAME|text|A||请填写;\n' +
      '身份证号|RE33_ID_NO|text|A||请填写;\n' +
      '合同文件|RE33_CONTRACT_URL|hidden|A||;\n' +
      '工作地点|RE33_WORK_ADDR|text|C||请填写;\n' +
      '项目|RE33_PRJ_NAME|text|C||请填写;\n' +
      '签订时间|RE33_SIGN_DATE|hidden|C||;\n' +
      '合同开始时间|RE33_START_TIME|text|C|date|请选择;\n' +
      '合同结束时间|RE33_END_TIME|text|C|date|请选择;\n' +
      '签约年限|RE33_SIGN_YEARS|text|C||请填写;\n' +
      '年薪|RE33_SALARY_Y|number|C||请填写;\n' +
      '月薪|RE33_SALARY_M|number|C||请填写;\n' +
      '日薪|RE33_SALARY_D|number|C||请填写;\n' +
      '时薪|RE33_SALARY_H|number|C||请填写;\n' +
      '创建人|RE33_CRT_USR|hidden|C||;\n' +
      '创建时间|RE33_CRT_TIME|hidden|C||;\n' +
      '最后修改人|RE33_CHG_USR|hidden|C||;\n' +
      '最后修改时间|RE33_CHG_TIME|hidden|C||;\n' +
      '企业ID|RE33_ENT_ID|hidden|D||;\n' +
      '组织ID|RE33_ORG_ID|hidden|D||;\n' +
      '状态|RE33_STATUS|hidden|C||;\n' +
      '公司名称|RE33_CO_NAME|text|B||请填写;\n' +
      '公司地址|RE33_CO_ADDR|text|B||请填写;\n' +
      '公司法人|RE33_CO_PERSON|text|B||请填写;\n' +
      '公司签约代表|RE33_CO_SIGNER|hidden|B||;\n' +
      '联系方式|RE33_CO_LINK|text|B||请填写;\n' +
      '公司信用代码|RE33_CO_ID|hidden|B||;\n' +
      '联系方式|RE33_CANDIDATE_PHONE|text|A||请填写;\n' +
      '求职者通信地址|RE33_CANDIDATE_ADDR|hidden|A||;\n' +
      '签署通知时间|RE33_NOTIFY_TIME|hidden|C||;\n' +
      '合同模板ID|RE33_TEMPLATE_ID|hidden|D||;\n' +
      '交易号|RE33_TRANSACTION_ID|hidden|D||;\n' +
      '本地地址|RE33_LOCAL_URL|hidden|D||;\n' +
      '下载地址|RE33_DOWNLOAD_URL|hidden|D||;\n' +
      '查看地址|RE33_VIEWPDF_URL|hidden|D||;\n',
      theFieldArr: [
        {
          'label': '记录ID',
          'fieldName': 'RE33_SIGN_ID',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '求职者ID',
          'fieldName': 'RE33_CANDIDATE_ID',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '求职者EntId',
          'fieldName': 'RE33_CANDIDATE_ENT_ID',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '姓名',
          'fieldName': 'RE33_NAME',
          'type': 'text',
          'groupName': 'A',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '身份证号',
          'fieldName': 'RE33_ID_NO',
          'type': 'text',
          'groupName': 'A',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '', // 合同文件
          'fieldName': 'RE33_CONTRACT_URL',
          'type': 'hidden',
          'groupName': 'A',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'

        }, {
          'label': '工作地点',
          'fieldName': 'RE33_WORK_ADDR',
          'type': 'text',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '项目',
          'fieldName': 'RE33_PRJ_NAME',
          'type': 'text',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '', // 签订时间
          'fieldName': 'RE33_SIGN_DATE',
          'type': 'hidden',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '合同开始时间',
          'fieldName': 'RE33_START_TIME',
          'type': 'text',
          'groupName': 'C',
          'popType': 'date',
          'placeHolder': '请选择',
          'value': '',
          'disabled': false
        }, {
          'label': '合同结束时间',
          'fieldName': 'RE33_END_TIME',
          'type': 'text',
          'groupName': 'C',
          'popType': 'date',
          'placeHolder': '请选择',
          'value': '',
          'disabled': false
        }, {
          'label': '签约年限',
          'fieldName': 'RE33_SIGN_YEARS',
          'type': 'text',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '年薪',
          'fieldName': 'RE33_SALARY_Y',
          'type': 'number',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '月薪',
          'fieldName': 'RE33_SALARY_M',
          'type': 'number',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '日薪',
          'fieldName': 'RE33_SALARY_D',
          'type': 'number',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '时薪',
          'fieldName': 'RE33_SALARY_H',
          'type': 'number',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '', // 创建人
          'fieldName': 'RE33_CRT_USR',
          'type': 'hidden',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '', // 创建时间
          'fieldName': 'RE33_CRT_TIME',
          'type': 'hidden',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '', // 最后修改人
          'fieldName': 'RE33_CHG_USR',
          'type': 'hidden',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '', // 最后修改时间
          'fieldName': 'RE33_CHG_TIME',
          'type': 'hidden',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '', // 企业ID
          'fieldName': 'RE33_ENT_ID',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '', // 组织ID
          'fieldName': 'RE33_ORG_ID',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '', // 状态
          'fieldName': 'RE33_STATUS',
          'type': 'hidden',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '公司名称',
          'fieldName': 'RE33_CO_NAME',
          'type': 'text',
          'groupName': 'B',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '公司地址',
          'fieldName': 'RE33_CO_ADDR',
          'type': 'text',
          'groupName': 'B',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '公司法人',
          'fieldName': 'RE33_CO_PERSON',
          'type': 'text',
          'groupName': 'B',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '', // 公司签约代表
          'fieldName': 'RE33_CO_SIGNER',
          'type': 'hidden',
          'groupName': 'B',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '联系方式',
          'fieldName': 'RE33_CO_LINK',
          'type': 'text',
          'groupName': 'B',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '', // 公司信用代码
          'fieldName': 'RE33_CO_ID',
          'type': 'hidden',
          'groupName': 'B',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '联系方式',
          'fieldName': 'RE33_CANDIDATE_PHONE',
          'type': 'text',
          'groupName': 'A',
          'popType': '',
          'placeHolder': '请填写',
          'value': '',
          'disabled': false
        }, {
          'label': '', // 求职者通信地址
          'fieldName': 'RE33_CANDIDATE_ADDR',
          'type': 'hidden',
          'groupName': 'A',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '', // 签署通知时间
          'fieldName': 'RE33_NOTIFY_TIME',
          'type': 'hidden',
          'groupName': 'C',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false,
          'class': 'hidden-input'
        }, {
          'label': '合同模板ID',
          'fieldName': 'RE33_TEMPLATE_ID',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '交易号',
          'fieldName': 'RE33_TRANSACTION_ID',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '本地地址',
          'fieldName': 'RE33_LOCAL_URL',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '下载地址',
          'fieldName': 'RE33_DOWNLOAD_URL',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }, {
          'label': '查看地址',
          'fieldName': 'RE33_VIEWPDF_URL',
          'type': 'hidden',
          'groupName': 'D',
          'popType': '',
          'placeHolder': '',
          'value': '',
          'disabled': false
        }
      ]
    }
  },

  components: {
    Field,
    PopDate
  },
  props: {
    resData: {
      type: Object,
      default: null
    },
    popValue: {
      type: [String, Object],
      default: null
    },
    enterprise: { // 是否企业
      type: Boolean,
      default: null
    }
  },
  watch: {
    popValue () {
      if (this.popValue !== null) {
        this.$emit('sendFieldData', this.theFieldArr)
      }
    }
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
      //      this.datetimeType = item.datetimeType
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
        this.$toast.clear()
        this.theRadioData = res.ReturnData
        if (thePopType === 'date') {
          this.showPicker = true
        } else if (thePopType === 'radio') {
          this.showRadio = true
        }
      })
    },
    clickConfirm (data) {
      this.showPicker = false
      this.theFieldArr[this.curFieldDIdx].value = myModule.formatTime(data.value)
    },
    clickCancel () {
      this.showPicker = false
    },
    /**
     * 处理字符串数据
     */
    handleStr () {
      let arr = [], resultArr = []
      this.strData = this.strData.trim()
      arr = this.strData.split(';')
      //      console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        let str = arr[i]
        arr[i] = str.trim() // 去除空格 换行 符号
      }
      //      console.log(arr)
      for (let str of arr) {
        if (!str) continue
        let strArr = str.split('|')
        //        let itemObj = {
        //          name: strArr[0],
        //          fieldName: strArr[1],
        //          hidden: strArr[2] === 'hidden',
        //          groupName: strArr[3]
        //        }
        //        debugger
        let itemObj = {
          label: strArr[0],
          fieldName: strArr[1],
          type: strArr[2],
          groupName: strArr[3],
          popType: strArr[4],
          placeHolder: strArr[5],
          value: ''
        }
        resultArr.push(itemObj)
      }
      this.theFieldArr = resultArr
      //      console.log(resultArr)
    },
    /**
     * 格式化数据
     */
    formatData () {
      if (!this.resData) {
        console.log('没有数据', this.resData)
        return
      }
      this.resData = myModule.formatObj(this.resData)
    },
    /**
     * 字段赋值
     */
    setFieldValue () {
      for (let obj of this.theFieldArr) {
        for (let key in this.resData) {
          if (obj.fieldName === key) {
            obj.value = this.resData[key]
            break
          }
        }
      }
    },
    /**
     * 禁用输入
     */
    disableField () {
      for (let obj of this.theFieldArr) {
        obj['disabled'] = true
      }
    },
    /**
     * 为合同开始 结束时间字段设置showDate属性
     */
    setFieldTime () {
      for (let obj of this.theFieldArr) {
        if (obj.fieldName === 'RE33_START_TIME') {
          obj['showDate'] = this.resData[obj.fieldName]
        }
        if (obj.fieldName === 'RE33_END_TIME') {
          obj['showDate'] = this.resData[obj.fieldName]
        }
      }
    }
  },

  created () {
//    this.handleStr()
  },

  mounted () {
    this.formatData()
    this.setFieldValue()
    this.setFieldTime()
    //    if (!this.enterprise) {
    //      this.disableField()
    //    }
    if (this.resData.RE33_STATUS !== 'BD0901') {
      this.disableField()
    }
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .contractDetail {
    @include font-size(16px)
  }

  .body {
    background-color: #F5F9FA;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }

  .result {
    @include font-size(16px);
    color: #666;
  }

  .result-logo {
    width: 100%;
    @include defaultFlex;
    margin-bottom: 10px;
    img {
      width: 25px;
      height: 25px;
    }
  }

  .result-data {
    @include font-size(14px);
    text-align: center;
  }

  .result-msg {
    text-align: center;
  }

  .tac {
    text-align: center;
  }

  .title {
    text-align: center;
    @include font-size(16px);
    padding: 10px 15px 0;
    color: $mainColor;
  }

  .title-box {
    padding-bottom: 15px;
    font-weight: bold;
  }

  .value-class {
    flex: 3;
    text-align: left;
    color: #333;
  }

  .title-class {
    color: #666;
  }

  .title-class2 {
    color: #333;
    font-weight: bold;
    @include font-size(17px);
  }

  .mb-box {
    margin-bottom: 15px;
  }

  .action-box {
    @include defaultFlex;
    margin: 40px 0 50px;
    button {
      background-color: $mainColor;
      border-color: $mainColor;
      /*width: 98px;*/
      /*height: 43px;*/
    }
  }

  .btnClass {
    @include theBtnColor;
    padding: 0 20px;
  }

  .hidden {
    display: none;
  }

  .p10 {
    width: 90%;
  }
</style>
