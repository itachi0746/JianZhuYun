<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <ResumeItem2 :resData="resData" :isEdit="true" :isEnt="false"></ResumeItem2>
      </div>
    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import UserHead from '../../../component/UserHead.vue'
import ResumeItem2 from '../../../component/ResumeItem2.vue'

export default {
  data () {
    return {
      headerName: '我的简历',
      id: null,
      resData: null,
      dataMap2: { // 数据映射
        p1: [ // 求职期望
          'RE23_JOB_INTENSION', // 期待职位
          'RE23_ANNUAL_SALARY_E', // 期望工资
          'RE23_WORK_PLACE',
          'RE23_CANDIDATE_ID'
        ],
        p2: [
          'RE24_COMPANY_NAME',
          'RE24_BEGIN_DATE',
          'RE24_END_DATE',
          'RE24_DEPT_NAME', // 部门
          'RE24_POSITION', // 职位名称
          'RE24_WORK_DESC',
          'RE24_WORK_ID'
        ],
        p3: [
          'RE25_PRJ_NAME',
          'RE25_BEGIN_DATE',
          'RE25_END_DATE',
          'RE25_PRJ_DESC', // 描述
          'RE25_PRJ_ID'
        ],
        p4: [
          'RE26_GRADUATE_FROM', // 毕业院校
          'RE26_BEGIN_DATE',
          'RE26_END_DATE',
          'RE26_EDU_BACKGROUND', // 学历
          'RE26_MAJOR', // 专业
          'RE26_ID'
        ],
        p5: [
          'RE27_COMPANY', // 培训单位
          'RE27_BEGIN_DATE',
          'RE27_END_DATE',
          'RE27_TRAINING_DETAILS', // 培训内容
          'RE27_ID'
        ],
        p6: [
          'RE29_SKILL_NAME', // 技能名称
          'RE29_ID'
        ]
      },
      p0Data: [ // 个人信息
        {label: '姓名', value: '', fieldName: 'RE23_NAME'},
        {label: '年龄', value: '', fieldName: 'RE23_AGE'},
        {label: '学历', value: '', fieldName: 'RE23_EDUCATION'},
        {label: '籍贯', value: '', fieldName: 'RE23_BORN_IN'},
        {label: '手机', value: '', fieldName: 'RE23_MOBILE_PHONE'},
        {label: '身份证', value: '', fieldName: 'RE23_IDENTIY_CARD_NO'},
        {label: '求职者ID', value: '', fieldName: 'RE23_CANDIDATE_ID'},
        //        {label: '期望职位', value: '', fieldName: 'RE23_JOB_INTENSION'},
        //        {label: '期望薪资', value: '', fieldName: 'RE23_ANNUAL_SALARY_E'},
        //        {label: '期望工作地点', value: '', fieldName: 'RE23_WORK_PLACE'}
      ],
      p1Data: { // 求职期望
      },
      p2Data: [ // 工作经历
      ],
      p3Data: [ // 项目经历
      ],
      p4Data: [ // 教育经历
      ],
      p5Data: [ // 培训经历
      ],
      p6Data: [] // 技能标签
    }
  },

  components: {
    Header,
    UserHead,
    ResumeItem2
  },

  computed: {},

  methods: {
    // 点击添加
    clickAdd (part) {
      this.$router.push({name: 'EditPage', params: {part: part}})
    },
    /**
     * 点解编辑
     * @param part 部分名称
     * @param id 记录id
     */
    clickEdit (part, id) {
      this.$router.push({name: 'EditPage', params: {part: part, id: id}})
    },
    /**
     * 判断对象的值是否 全部为空
     * @param obj 对象
     * @returns {boolean}
     */
    isNoValueObj: function (obj) {
      for (let key in obj) {
        let theValue = obj[key]
        if (theValue && theValue !== 'null' && theValue !== 'undefined') { // 有一个是有值 就返回false
          return false
        }
      }
      return true
    },
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    },
    /**
     * 处理初始化请求后的数据
     */
    handleData () {
      //      let RE23 = myModule.formatObj(this.resData.RE23), // 个人信息 对象
      //        RE24 = this.resData.RE24, // 工作经历 数组
      //        RE25 = this.resData.RE25, // 项目经历 数组
      //        RE26 = this.resData.RE26, // 教育经历 数组
      //        RE27 = this.resData.RE27, // 培训经历 数组
      //        RE29 = this.resData.RE29; // 技能标签 数组
      let RE23 = myModule.formatObj(this.resData.RE23), // 个人信息 对象
        RE24 = {data: this.resData.RE24, reKey: 'p2', theArr: this.p2Data},
        RE25 = {data: this.resData.RE25, reKey: 'p3', theArr: this.p3Data},
        RE26 = {data: this.resData.RE26, reKey: 'p4', theArr: this.p4Data},
        RE27 = {data: this.resData.RE27, reKey: 'p5', theArr: this.p5Data},
        RE29 = {data: this.resData.RE29, reKey: 'p6', theArr: this.p6Data};
//        RE29 = this.resData.RE29; // 技能标签 数组
      [RE24, RE25, RE26, RE27, RE29].map((reObj) => {
//        debugger
        //          obj = myModule.formatObj(obj, false)
        if (reObj.data.length) { // 工作经历
          for (let obj of reObj.data) {
//            debugger
            obj = myModule.formatObj(obj)
            let newArr = this.dataMap2[reObj.reKey]
            let newObj = {}
            for (let theKey of newArr) {
              for (let key in obj) {
                if (theKey === key) {
//                  theArr[theKey] = obj[key]
                  newObj[theKey] = obj[key]
                  break
                }
              }
            }
            reObj.theArr.push(newObj)
          }
        }
      })

      for (let obj of this.p0Data) { // 个人信息
        for (let key in RE23) {
          if (obj.fieldName === key) {
            obj.value = RE23[key]
            break
          }
        }
      }
      let p1Arr = this.dataMap2['p1']
      for (let item of p1Arr) { // 求职期望
        for (let key in RE23) {
          if (item === key) {
            this.p1Data[item] = RE23[key]
            break
          }
        }
      }
    }
  },

  created () {
    this.$toast.loading({
      mask: false,
      message: '加载中...',
      duration: 0,
      forbidClick: true // 禁用背景点击
    })
    const param = myModule.getUrlParams()
    this.id = param.id
    postData('/ReService/ResumeDetails', {id: this.id, RequireDetail: true}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',
          forbidClick: false // 禁用背景点击
        })
        return
      }
      this.$toast.clear()
      this.resData = res.ReturnData
//      this.handleData()
    })
  },
  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .handle {
    @include font-size(16px);
    color: #666;
  }

  .body {
    padding: 15px 18px;
    @include borderBox();
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }

  .header {
    padding-bottom: 20px;
    display: flex;
  }

  .line {
    margin-bottom: 20px;
  }

  .header-data-box {
    position: relative;
    flex: 1;
    @include font-size(14px);
    color: #666666;
    .line1 {
      color: #333333;
      font-weight: bold;
      display: flex;
      align-items: flex-end;
      .call {
        @include font-size(13px);
        color: #999;
      }
      .name {
        @include font-size(20px);
        color: #333;
      }
    }
  }

  .icon-box {
    position: absolute;
    top: 0;
    right: 0;
    width: 17px;
    height: 17px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .logo-box {
    min-width: 55px;
    margin-right: 11px;
  }

  .logo-box-inner {
    width: 53px;
    height: 53px;
  }

  .line2 {
    width: 100%;
    margin-bottom: 0;
    /*height: 27px;*/
    /*display: flex;*/
    /*justify-content: space-between;*/
  }

  .line2-value {
    height: 27px;
    min-width: 67px;
    border: 1px solid #E5E5E5;
    padding: 0 16px;
    margin-left: 2px;
    box-sizing: border-box;
    @include defaultFlex;
    flex: 1;
  }

  .line2-item {
    display: flex;
    /*align-items: center;*/
    flex-wrap: wrap;
    .line2-item-box {
      margin-bottom: 10px;
    }
    .line2-item-box:nth-child(2n+1) {
      margin-right: 18px;
    }
    .line2-item-box:nth-last-child(1) {
      margin-right: 0;
      width: 100%;
    }
  }

  .line3 {
    margin-bottom: 0;
    .line2-value {
      padding: 0 25px;
      white-space: nowrap;
    }
  }

  .the-padding {
    padding: 0 25px;
  }

  .line2-item-box {
    display: flex;
  }

  .label {
    @include defaultFlex
  }

  .main-item-box {
    padding: 15px 0;
    @include font-size(15px);
    color: #999999;
  }

  .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    color: $mainColor;
    align-items: center;
  }

  .title-icon {
    width: 8px;
    height: 8px;
    background-color: $mainColor;
    border-radius: 50%;
    /*position: absolute;*/
    /*left: 0px;*/
    /*top: 5px;*/
  }

  .label {
    white-space: nowrap;
  }

  .title-name {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    @include font-size(16px);
    span {
      padding-left: 6px;
    }
  }

  .empty-content {
    padding-top: 29px;
  }

  .main-content {
    padding-left: 14px;
    @include font-size(13px);
  }

  .content-edit {
    width: 17px;
    height: 17px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    @include font-size(16px);
  }

  .content-line {
    margin-top: 15px;
  }

  .the-content {
    @include font-size(15px);
    color: #666666;
  }

  .content-time {
    align-items: center;
    display: flex;
    color: #999999;
    @include font-size(13px);
  }

  .job-name {
    @include font-size(16px);
    color: #333333;
  }

  .salary {
    @include font-size(14px);
    color: #333333;
  }

  .the-tag {
    float: left;
    margin-right: 24px;
    margin-bottom: 10px;
    @include font-size(15px)
  }

  .clear-fix {
    @include clearfix()
  }

  .the-mb {
    margin-bottom: 25px;
    overflow: hidden;
    margin-top: 15px;
  }

  .the-content-item {
    margin-bottom: 30px;
  }
</style>
