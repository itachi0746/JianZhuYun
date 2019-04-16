<template>
  <div>
    <div v-if="resData">
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">甲方</div>
          </div>
          <div v-for="(item,index) in dataArr" :key="index">
            <div v-if="item.groupName==='B'">
              <van-cell :title="item.name" :value="resData[item.fieldName]" :class="{'hidden': item.hidden}" title-class="title-class" value-class="value-class" />
            </div>
          </div>
        </van-cell-group>
      </div>
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">乙方</div>
          </div>
          <div v-for="(item,index) in dataArr" :key="index">
            <div v-if="item.groupName==='A'">
              <van-cell :title="item.name" :value="resData[item.fieldName]" :class="{'hidden': item.hidden}" title-class="title-class" value-class="value-class" />
            </div>
          </div>
        </van-cell-group>
      </div>
      <div class="mb-box">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom">合同内容</div>
          </div>
          <div v-for="(item,index) in dataArr" :key="index">
            <div v-if="item.groupName==='C'">
              <van-cell :title="item.name" :value="resData[item.fieldName]" :class="{'hidden': item.hidden}" title-class="title-class" value-class="value-class" />
            </div>
          </div>
        </van-cell-group>
      </div>
      <div class="hidden">
        <van-cell-group>
          <div class="title">
            <div class="title-box van-hairline--bottom"></div>
          </div>
          <div v-for="(item,index) in dataArr" :key="index">
            <div v-if="item.groupName==='D'">
              <van-cell :title="item.name" :value="resData[item.fieldName]" :class="{'hidden': item.hidden}" title-class="title-class" value-class="value-class" />
            </div>
          </div>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../common'

export default {
  data () {
    return {
      dataArr: null,
      strData: '记录ID|RE33_SIGN_ID|hidden|D;\n' +
      '求职者ID|RE33_CANDIDATE_ID|hidden|D;\n' +
      '求职者EntId|RE33_CANDIDATE_ENT_ID|hidden|D;\n' +
      '姓名|RE33_NAME|show|A;\n' +
      '身份证号|RE33_ID_NO|show|A;\n' +
      '合同文件|RE33_CONTRACT_URL|hidden|A;\n' +
      '工作地点|RE33_WORK_ADDR|show|C;\n' +
      '项目|RE33_PRJ_NAME|show|C;\n' +
      '签订时间|RE33_SIGN_DATE|hidden|C;\n' +
      '合同开始时间|RE33_START_TIME|show|C;\n' +
      '合同结束时间|RE33_END_TIME|show|C;\n' +
      '签约年限|RE33_SIGN_YEARS|show|C;\n' +
      '年薪|RE33_SALARY_Y|show|C;\n' +
      '月薪|RE33_SALARY_M|show|C;\n' +
      '日薪|RE33_SALARY_D|show|C;\n' +
      '时薪|RE33_SALARY_H|show|C;\n' +
      '创建人|RE33_CRT_USR|hidden|C;\n' +
      '创建时间|RE33_CRT_TIME|hidden|C;\n' +
      '最后修改人|RE33_CHG_USR|hidden|C;\n' +
      '最后修改时间|RE33_CHG_TIME|hidden|C;\n' +
      '企业ID|RE33_ENT_ID|hidden|D;\n' +
      '组织ID|RE33_ORG_ID|hidden|D;\n' +
      '状态|RE33_STATUS|hidden|C;\n' +
      '公司名称|RE33_CO_NAME|show|B;\n' +
      '公司地址|RE33_CO_ADDR|show|B;\n' +
      '公司法人|RE33_CO_PERSON|show|B;\n' +
      '公司签约代表|RE33_CO_SIGNER|hidden|B;\n' +
      '公司联系方式|RE33_CO_LINK|show|B;\n' +
      '公司信用代码|RE33_CO_ID|hidden|B;\n' +
      '求职者联系方式|RE33_CANDIDATE_PHONE|show|A;\n' +
      '求职者通信地址|RE33_CANDIDATE_ADDR|hidden|A;\n' +
      '签署通知时间|RE33_NOTIFY_TIME|hidden|C;\n' +
      '合同模板ID|RE33_TEMPLATE_ID|hidden|D;\n' +
      '交易号|RE33_TRANSACTION_ID|hidden|D;\n' +
      '本地地址|RE33_LOCAL_URL|hidden|D;\n' +
      '下载地址|RE33_DOWNLOAD_URL|hidden|D;\n' +
      '查看地址|RE33_VIEWPDF_URL|hidden|D;\n'
    }
  },

  components: {},
  props: {
    resData: {
      type: Object,
      default: null
    }
  },
  computed: {},

  methods: {
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
        let itemObj = {
          name: strArr[0],
          fieldName: strArr[1],
          hidden: strArr[2] === 'hidden',
          groupName: strArr[3]
        }
        resultArr.push(itemObj)
      }
      this.dataArr = resultArr
      //      console.log(resultArr)
    },
    formatData () {
      if (!this.resData) {
        console.log('没有数据', this.resData)
        return
      }
      this.resData = myModule.formatObj(this.resData)
//      for (let key in this.resData) { // 格式化时间
//        if (typeof this.resData[key] !== 'string') {
//          continue
//        }
//        if (this.resData[key].indexOf('/Date') !== -1) {
//          this.resData[key] = myModule.handleTime(this.resData[key])
//        }
//        if (this.resData[key] === 'null' || this.resData[key] === null) {
//          this.resData[key] = ''
//        }
//      }
    }
  },

  created () {
    this.handleStr()
  },

  mounted () {
    this.formatData()
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
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
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
