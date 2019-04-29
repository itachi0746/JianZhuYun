<template>
  <div>
    <!--头部-->
    <div class="header van-hairline--bottom">
      <div class="logo-box">
        <div class="logo-box-inner">
          <UserHead theId="" :theUrl="resData.RE23.RE23_PIC_URL" v-if="!isEnt"></UserHead>
          <UserHead theId="" :theUrl="resData.RE01.RE01_PIC_URL" v-else></UserHead>
        </div>
      </div>
      <div class="header-data-box">
        <div class="icon-box" @click="clickEdit('p0', p0Data[p0Data.length-1]['value'])" v-if="isEdit">
          <img src="./assets/edit.png" alt="">
        </div>
        <div class="line line1" v-for="(item,index) in p0Data" :key="index" v-if="index===0">
          <div class="name">{{item.value}}</div>
          <div class="call">/先生</div>
        </div>
        <div class="line line2">
          <div class="line2-item">
            <div class="line2-item-box" v-for="(item,index) in p0Data" :key="index"
                 v-if="index!==0 && index!==p0Data.length-1">
              <div class="label">{{item.label}}</div>
              <div :class="['line2-value']">{{item.value}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <!--组件-->
      <!--<div v-for="(item,index) in theItemData" :key="index" :class="{'van-hairline&#45;&#45;bottom': item.border}">-->
      <!--<ResumeItem2 :theData="item" :index="index"></ResumeItem2>-->
      <!--</div>-->

      <!--求职期望-->
      <div class="main-item-box">
        <div class="title">
          <div class="title-name">
            <i class="title-icon"></i>
            <span>求职期望</span>
          </div>
          <!--<div class="content-edit" @click="clickEdit('p1', p1Data.RE23_CANDIDATE_ID)">-->
          <!--<img src="./assets/edit.png" alt="">-->
          <!--</div>-->
        </div>
        <div class="main-content">
          <div class="the-content" v-if="!isNoValueObj(p1Data)">
            <!--名字-->
            <div v-if="isEnt">
              <div class="content-line content-title">
                <span>{{p1Data.RE01_JOB_INTENSION}}</span>
              </div>
              <!--工资-->
              <div class="content-line salary">
                <span>{{p1Data.RE01_ANNUAL_SALARY_E}}</span>
              </div>
              <!--工作地点-->
              <div class="content-line">
                <span>{{p1Data.RE01_WORK_PLACE}}</span>
              </div>
            </div>
            <div v-else>
              <div class="content-line content-title">
                <span>{{p1Data.RE23_JOB_INTENSION}}</span>
              </div>
              <!--工资-->
              <div class="content-line salary">
                <span>{{p1Data.RE23_ANNUAL_SALARY_E}}</span>
              </div>
              <!--工作地点-->
              <div class="content-line">
                <span>{{p1Data.RE23_WORK_PLACE}}</span>
              </div>
            </div>

          </div>
          <div v-else>
            <div class="empty-content" v-if="isEdit">
              您还未编辑此项信息哦~快来编辑吧
            </div>
          </div>
        </div>
      </div>
      <!--工作经历-->
      <div class="main-item-box">
        <div class="title">
          <div class="title-name">
            <i class="title-icon"></i>
            <span>工作经历</span>
          </div>
          <div class="add" @click="clickAdd('p2')" v-if="isEdit">添加</div>
        </div>
        <div class="main-content">
          <div class="the-content" v-if="p2Data.length">
            <div class="the-content-item" v-for="(item,index) in p2Data" :key="index">
              <div v-if="isEnt">
                <!--名字-->
                <div class="content-line content-title">
                  <span>{{item.RE02_COMPANY_NAME}}</span>
                  <div class="content-edit" @click="clickEdit('p2', item.RE02_ID)" v-if="isEdit">
                    <img src="./assets/edit.png" alt="">
                  </div>
                </div>
                <!--时间-->
                <div class="content-line content-time">
                  <span>{{item.RE02_BEGIN_DATE}} - {{item.RE02_END_DATE}}</span>
                </div>
                <!--职位 部门-->
                <div class="content-line job-name">
                  <span>{{item.RE02_POSITION}} · {{item.RE02_DEPT_NAME}}</span>
                </div>
                <!--内容-->
                <div class="content-line">
                  <span>{{item.RE02_WORK_DESC}}</span>
                </div>
              </div>
              <div v-else>
                <!--名字-->
                <div class="content-line content-title">
                  <span>{{item.RE24_COMPANY_NAME}}</span>
                  <div class="content-edit" @click="clickEdit('p2', item.RE24_WORK_ID)" v-if="isEdit">
                    <img src="./assets/edit.png" alt="">
                  </div>
                </div>
                <!--时间-->
                <div class="content-line content-time">
                  <span>{{item.RE24_BEGIN_DATE}} - {{item.RE24_END_DATE}}</span>
                </div>
                <!--职位 部门-->
                <div class="content-line job-name">
                  <span>{{item.RE24_POSITION}} · {{item.RE24_DEPT_NAME}}</span>
                </div>
                <!--内容-->
                <div class="content-line">
                  <span>{{item.RE24_WORK_DESC}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="empty-content" v-if="isEdit">
              您还未编辑此项信息哦~快来编辑吧
            </div>
          </div>
        </div>
      </div>
      <!--项目经历-->
      <div class="main-item-box">
        <div class="title">
          <div class="title-name">
            <i class="title-icon"></i>
            <span>项目经历</span>
          </div>
          <div class="add" @click="clickAdd('p3')" v-if="isEdit">添加</div>
        </div>
        <div class="main-content">
          <div class="the-content" v-if="p3Data.length">
            <div class="the-content-item" v-for="(item,index) in p3Data" :key="index">
              <div v-if="isEnt">
                <!--名字-->
                <div class="content-line content-title">
                  <span>{{item.RE03_PRJ_NAME}}</span>
                  <div class="content-edit" @click="clickEdit('p3', item.RE03_ID)" v-if="isEdit">
                    <img src="./assets/edit.png" alt="">
                  </div>
                </div>
                <!--时间-->
                <div class="content-line content-time">
                  <span>{{item.RE03_BEGIN_DATE}} - {{item.RE03_END_DATE}}</span>
                </div>
                <!--内容-->
                <div class="content-line">
                  <span>{{item.RE03_PRJ_DESC}}</span>
                </div>
              </div>
              <div v-else>
                <!--名字-->
                <div class="content-line content-title">
                  <span>{{item.RE25_PRJ_NAME}}</span>
                  <div class="content-edit" @click="clickEdit('p3', item.RE25_PRJ_ID)" v-if="isEdit">
                    <img src="./assets/edit.png" alt="">
                  </div>
                </div>
                <!--时间-->
                <div class="content-line content-time">
                  <span>{{item.RE25_BEGIN_DATE}} - {{item.RE25_END_DATE}}</span>
                </div>
                <!--内容-->
                <div class="content-line">
                  <span>{{item.RE25_PRJ_DESC}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="empty-content" v-if="isEdit">
              您还未编辑此项信息哦~快来编辑吧
            </div>
          </div>
        </div>
      </div>
      <!--教育经历-->
      <div class="main-item-box">
        <div class="title">
          <div class="title-name">
            <i class="title-icon"></i>
            <span>教育经历</span>
          </div>
          <div class="add" @click="clickAdd('p4')" v-if="isEdit">添加</div>
        </div>
        <div class="main-content">
          <div class="the-content" v-if="p4Data.length">
            <div class="the-content-item" v-for="(item,index) in p4Data" :key="index">
              <div v-if="isEnt">
                <!--名字-->
                <div class="content-line content-title">
                  <span>{{item.RE04_GRADUATE_FROM}}</span>
                  <div class="content-edit" @click="clickEdit('p4', item.RE04_ID)" v-if="isEdit">
                    <img src="./assets/edit.png" alt="">
                  </div>
                </div>
                <!--时间-->
                <div class="content-line content-time">
                  <span>{{item.RE04_BEGIN_DATE}} - {{item.RE04_END_DATE}}</span>
                </div>
                <!--内容-->
                <div class="content-line">
                  <span>{{item.RE04_MAJOR}} · {{item.RE04_EDU_BACKGROUND}}</span>
                </div>
              </div>
              <div v-else>
                <!--名字-->
                <div class="content-line content-title">
                  <span>{{item.RE26_GRADUATE_FROM}}</span>
                  <div class="content-edit" @click="clickEdit('p4', item.RE26_ID)" v-if="isEdit">
                    <img src="./assets/edit.png" alt="">
                  </div>
                </div>
                <!--时间-->
                <div class="content-line content-time">
                  <span>{{item.RE26_BEGIN_DATE}} - {{item.RE26_END_DATE}}</span>
                </div>
                <!--内容-->
                <div class="content-line">
                  <span>{{item.RE26_MAJOR}} · {{item.RE26_EDU_BACKGROUND}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="empty-content" v-if="isEdit">
              您还未编辑此项信息哦~快来编辑吧
            </div>
          </div>
        </div>
      </div>
      <!--培训经历-->
      <div class="main-item-box">
        <div class="title">
          <div class="title-name">
            <i class="title-icon"></i>
            <span>培训经历</span>
          </div>
          <div class="add" @click="clickAdd('p5')" v-if="isEdit">添加</div>
        </div>
        <div class="main-content">
          <div class="the-content" v-if="p5Data.length">
            <div class="the-content-item" v-for="(item,index) in p5Data" :key="index">
              <div v-if="isEnt">
                <!--名字-->
                <div class="content-line content-title">
                  <span>{{item.RE05_COMPANY}}</span>
                  <div class="content-edit" @click="clickEdit('p5', item.RE05_ID)" v-if="isEdit">
                    <img src="./assets/edit.png" alt="">
                  </div>
                </div>
                <!--时间-->
                <div class="content-line content-time">
                  <span>{{item.RE05_BEGIN_DATE}} - {{item.RE05_END_DATE}}</span>
                </div>
                <!--内容-->
                <div class="content-line">
                  <span>{{item.RE05_TRAINING_DETAILS}}</span>
                </div>
              </div>
              <div v-else>
                <!--名字-->
                <div class="content-line content-title">
                  <span>{{item.RE27_COMPANY}}</span>
                  <div class="content-edit" @click="clickEdit('p5', item.RE27_ID)" v-if="isEdit">
                    <img src="./assets/edit.png" alt="">
                  </div>
                </div>
                <!--时间-->
                <div class="content-line content-time">
                  <span>{{item.RE27_BEGIN_DATE}} - {{item.RE27_END_DATE}}</span>
                </div>
                <!--内容-->
                <div class="content-line">
                  <span>{{item.RE27_TRAINING_DETAILS}}</span>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="empty-content" v-if="isEdit">
              您还未编辑此项信息哦~快来编辑吧
            </div>
          </div>
        </div>
      </div>
      <!--技能标签-->
      <!--<div class="main-item-box" v-if="isEdit || p6Data.length!==0">-->
      <div class="main-item-box">
        <div class="title">
          <div class="title-name">
            <i class="title-icon"></i>
            <span>技能标签</span>
          </div>
          <div class="add" @click="clickAdd('p6')" v-if="isEdit">添加</div>
        </div>
        <div class="main-content">
          <div class="the-content the-mb" v-if="p6Data.length">
            <div class="the-tag" v-for="(item,index) in p6Data" :key="index">
              <div v-if="isEnt">
                <div @click="clickEdit('p6', item.RE07_ID)" v-if="isEdit">{{item.RE07_SKILL_NAME}}</div>
                <div v-else>{{item.RE07_SKILL_NAME}}</div>
              </div>
              <div v-else>
                <div @click="clickEdit('p6', item.RE29_ID)" v-if="isEdit">{{item.RE29_SKILL_NAME}}</div>
                <div v-else>{{item.RE29_SKILL_NAME}}</div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="empty-content" v-if="isEdit">
              您还未编辑此项信息哦~快来编辑吧
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHead from './UserHead.vue'
import myModule from '../common'
import { postData } from '../common/server'
export default {
  data () {
    return {
      id: null,
      dataMap2: { // 数据映射 2代表企业端的字段
        p0: [ // 个人信息
          'RE01_NAME',
          'RE01_AGE',
          'RE01_EDUCATION',
          'RE01_BORN_IN',
          'RE01_MOBILE_PHONE',
          'RE01_IDENTIY_CARD_NO',
          'RE01_ID'
        ],
        p1: [ // 求职期望
          'RE01_JOB_INTENSION', // 期待职位
          'RE01_ANNUAL_SALARY_E', // 期望工资
          'RE01_WORK_PLACE',
          'RE01_ID'
        ],
        p2: [
          'RE02_COMPANY_NAME',
          'RE02_BEGIN_DATE',
          'RE02_END_DATE',
          'RE02_DEPT_NAME', // 部门
          'RE02_POSITION', // 职位名称
          'RE02_WORK_DESC',
          'RE02_ID'
        ],
        p3: [
          'RE03_PRJ_NAME',
          'RE03_BEGIN_DATE',
          'RE03_END_DATE',
          'RE03_PRJ_DESC', // 描述
          'RE03_ID'
        ],
        p4: [
          'RE04_GRADUATE_FROM', // 毕业院校
          'RE04_BEGIN_DATE',
          'RE04_END_DATE',
          'RE04_EDU_BACKGROUND', // 学历
          'RE04_MAJOR', // 专业
          'RE04_ID'
        ],
        p5: [
          'RE05_COMPANY', // 培训单位
          'RE05_BEGIN_DATE',
          'RE05_END_DATE',
          'RE05_TRAINING_DETAILS', // 培训内容
          'RE05_ID'
        ],
        p6: [
          'RE07_SKILL_NAME', // 技能名称
          'RE07_ID'
        ]
      },
      dataMap1: { // 数据映射 1代表个人端的字段
        p0: [ // 个人信息
          'RE23_NAME',
          'RE23_AGE',
          'RE23_EDUCATION',
          'RE23_BORN_IN',
          'RE23_MOBILE_PHONE',
          'RE23_IDENTIY_CARD_NO',
          'RE23_CANDIDATE_ID'
        ],
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
      dataMap: [],
      p0Data2: [ // 个人信息
        {label: '姓名', value: '', fieldName: 'RE01_NAME'},
        {label: '年龄', value: '', fieldName: 'RE01_AGE'},
        {label: '学历', value: '', fieldName: 'RE01_EDUCATION'},
        {label: '籍贯', value: '', fieldName: 'RE01_BORN_IN'},
        {label: '手机', value: '', fieldName: 'RE01_MOBILE_PHONE'},
        {label: '身份证', value: '', fieldName: 'RE01_IDENTIY_CARD_NO'},
        {label: '求职者ID', value: '', fieldName: 'RE01_ID'}
      ],
      p0Data1: [ // 个人信息
        {label: '姓名', value: '', fieldName: 'RE23_NAME'},
        {label: '年龄', value: '', fieldName: 'RE23_AGE'},
        {label: '学历', value: '', fieldName: 'RE23_EDUCATION'},
        {label: '籍贯', value: '', fieldName: 'RE23_BORN_IN'},
        {label: '手机', value: '', fieldName: 'RE23_MOBILE_PHONE'},
        {label: '身份证', value: '', fieldName: 'RE23_IDENTIY_CARD_NO'},
        {label: '求职者ID', value: '', fieldName: 'RE23_CANDIDATE_ID'}
      ],
      p0Data: [], // 个人信息
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
  props: {
    resData: {
      type: Object,
      default: null
    },
    isEdit: { // 是不是可编辑
      type: Boolean,
      default: null
    },
    isEnt: { // 是不是企业端的
      type: Boolean,
      default: null
    }
  },

  components: {
    UserHead
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
      let RE23, RE24, RE25, RE26, RE27, RE29
      if (this.isEnt) {
        RE23 = myModule.formatObj(this.resData.RE01) // 个人信息 对象
        RE24 = {data: this.resData.RE02, reKey: 'p2', theArr: this.p2Data}
        RE25 = {data: this.resData.RE03, reKey: 'p3', theArr: this.p3Data}
        RE26 = {data: this.resData.RE04, reKey: 'p4', theArr: this.p4Data}
        RE27 = {data: this.resData.RE05, reKey: 'p5', theArr: this.p5Data}
        RE29 = {data: this.resData.RE07, reKey: 'p6', theArr: this.p6Data}
      } else {
        RE23 = myModule.formatObj(this.resData.RE23) // 个人信息 对象
        RE24 = {data: this.resData.RE24, reKey: 'p2', theArr: this.p2Data}
        RE25 = {data: this.resData.RE25, reKey: 'p3', theArr: this.p3Data}
        RE26 = {data: this.resData.RE26, reKey: 'p4', theArr: this.p4Data}
        RE27 = {data: this.resData.RE27, reKey: 'p5', theArr: this.p5Data}
        RE29 = {data: this.resData.RE29, reKey: 'p6', theArr: this.p6Data}
      }
//      let RE23 = myModule.formatObj(this.resData.RE23), // 个人信息 对象
//        RE24 = {data: this.resData.RE24, reKey: 'p2', theArr: this.p2Data},
//        RE25 = {data: this.resData.RE25, reKey: 'p3', theArr: this.p3Data},
//        RE26 = {data: this.resData.RE26, reKey: 'p4', theArr: this.p4Data},
//        RE27 = {data: this.resData.RE27, reKey: 'p5', theArr: this.p5Data},
//        RE29 = {data: this.resData.RE29, reKey: 'p6', theArr: this.p6Data};
      //        RE29 = this.resData.RE29; // 技能标签 数组
      [RE24, RE25, RE26, RE27, RE29].map((reObj) => {
        //        debugger
        //          obj = myModule.formatObj(obj, false)
        if (reObj.data.length) { // 工作经历
          for (let obj of reObj.data) {
            //            debugger
            obj = myModule.formatObj(obj)
            let newArr = this.dataMap[reObj.reKey]
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
      let p1Arr = this.dataMap['p1']
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
    if (this.isEnt) { // 区分企业个人
      this.p0Data = this.p0Data2
      this.dataMap = this.dataMap2
    } else {
      this.p0Data = this.p0Data1
      this.dataMap = this.dataMap1
    }
    this.handleData()
  },

  mounted () {

  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
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
