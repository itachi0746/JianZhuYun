<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div v-if="resData">
        <!--头部-->
        <div class="header van-hairline--bottom">
          <div class="logo-box">
            <div class="logo-box-inner">
              <UserHead theId="" :theUrl="resData.RE23.RE23_PIC_URL"></UserHead>
            </div>
          </div>
          <div class="header-data-box">
            <div class="icon-box">
              <img src="../assets/edit.png" alt="">
            </div>
            <div class="line line1" v-for="(item,index) in p0Data" :key="index" v-if="index===0">
              <div class="name">{{item.value}}</div>
              <div class="call">/先生</div>
            </div>
            <div class="line line2">
              <div class="line2-item">
                <div class="line2-item-box" v-for="(item,index) in p0Data" :key="index" v-if="index!==0">
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
              <div class="content-edit" @click="clickEdit('p1')">
                <img src="../assets/edit.png" alt="">
              </div>
            </div>
            <div class="main-content">
              <div class="the-content" v-if="!isEmptyObj(p1Data)">
                <!--名字-->
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
              <div class="empty-content" v-else>
                您还未编辑此项信息哦~快来编辑吧
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
              <div class="add" @click="clickAdd('p2')">添加</div>
            </div>
            <div class="main-content">
              <div class="the-content" v-if="p2Data.length">
                <div v-for="(item,index) in p2Data" :key="index">
                  <div>
                    <!--名字-->
                    <div class="content-line content-title">
                      <span>{{item.RE24_COMPANY_NAME}}</span>
                      <div class="content-edit" @click="clickEdit('p2')">
                        <img src="../assets/edit.png" alt="">
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
                <div class="empty-content">
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
              <div class="add" @click="clickAdd('p3')">添加</div>
            </div>
            <div class="main-content">
              <div class="the-content" v-if="p3Data.length">
                <div v-for="(item,index) in p3Data" :key="index">
                  <div>
                    <!--名字-->
                    <div class="content-line content-title">
                      <span>{{item.RE25_PRJ_NAME}}</span>
                      <div class="content-edit" @click="clickEdit('p3')">
                        <img src="../assets/edit.png" alt="">
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
                <div class="empty-content">
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
              <div class="add" @click="clickAdd('p4')">添加</div>
            </div>
            <div class="main-content">
              <div class="the-content" v-if="p4Data.length">
                <div v-for="(item,index) in p4Data" :key="index">
                  <div>
                    <!--名字-->
                    <div class="content-line content-title">
                      <span>{{item.RE26_GRADUATE_FROM}}</span>
                      <div class="content-edit" @click="clickEdit('p4')">
                        <img src="../assets/edit.png" alt="">
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
                <div class="empty-content">
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
              <div class="add" @click="clickAdd('p5')">添加</div>
            </div>
            <div class="main-content">
              <div class="the-content" v-if="p5Data.length">
                <div v-for="(item,index) in p5Data" :key="index">
                  <div>
                    <!--名字-->
                    <div class="content-line content-title">
                      <span>{{item.RE27_COMPANY}}</span>
                      <div class="content-edit" @click="clickEdit('p5')">
                        <img src="../assets/edit.png" alt="">
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
                <div class="empty-content">
                  您还未编辑此项信息哦~快来编辑吧
                </div>
              </div>
            </div>
          </div>
          <!--技能标签-->
          <div class="main-item-box">
            <div class="title">
              <div class="title-name">
                <i class="title-icon"></i>
                <span>技能标签</span>
              </div>
              <div class="add" @click="clickAdd('p6')">添加</div>
            </div>
            <div class="main-content">
              <div class="the-content the-mb" v-if="p6Data.length">
                <div class="the-tag" v-for="(item,index) in p6Data" :key="index">
                  <div>{{item}}</div>
                </div>
              </div>
              <div v-else>
                <div class="empty-content">
                  您还未编辑此项信息哦~快来编辑吧
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import ResumeItem from '../../../component/ResumeItem.vue'
import UserHead from '../../../component/UserHead.vue'
import ResumeItem2 from '../../../component/ResumeItem2.vue'

export default {
  data () {
    return {
      headerName: '我的简历',
      id: null,
      resData: null,
      dataMap: { // 数据映射
        p1: 'RE23',
        p2: 'RE24',
        p3: 'RE25',
        p4: 'RE26',
        p5: 'RE27'
      },
      dataMap2: { // 数据映射
        p1: { // 求职期望
          RE23_JOB_INTENSION: '', // 期待职位
          RE23_ANNUAL_SALARY_E: '', // 期望工资
          RE23_WORK_PLACE: ''
        },
        p2: {
          RE24_COMPANY_NAME: '',
          RE24_BEGIN_DATE: '',
          RE24_END_DATE: '',
          RE24_DEPT_NAME: '', // 部门
          RE24_POSITION: '', // 职位名称
          RE24_WORK_DESC: ''
        },
        p3: {
          RE25_PRJ_NAME: '',
          RE25_BEGIN_DATE: '',
          RE25_END_DATE: '',
          RE25_PRJ_DESC: '' // 描述
        },
        p4: {
          RE26_GRADUATE_FROM: '', // 毕业院校
          RE26_BEGIN_DATE: '',
          RE26_END_DATE: '',
          RE26_EDU_BACKGROUND: '', // 学历
          RE26_MAJOR: '' // 专业
        },
        p5: {
          RE27_COMPANY: '', // 培训单位
          RE27_BEGIN_DATE: '',
          RE27_END_DATE: '',
          RE27_TRAINING_DETAILS: '' // 培训内容
        }
      },
      p0Data: [ // 个人信息
        {label: '姓名', value: '', fieldName: 'RE23_NAME'},
        {label: '年龄', value: '', fieldName: 'RE23_AGE'},
        {label: '学历', value: '', fieldName: 'RE23_EDUCATION'},
        {label: '籍贯', value: '', fieldName: 'RE23_BORN_IN'},
        {label: '手机', value: '', fieldName: 'RE23_MOBILE_PHONE'},
        {label: '身份证', value: '', fieldName: 'RE23_IDENTIY_CARD_NO'}
      ],
      p1Data: { // 求职期望
//        RE23_JOB_INTENSION: '', // 期待职位
//        RE23_ANNUAL_SALARY_E: '', // 期望工资
//        RE23_WORK_PLACE: ''
      },
      p2Data: [ // 工作经历
//        {
//          RE24_COMPANY_NAME: '',
//          RE24_BEGIN_DATE: '',
//          RE24_END_DATE: '',
//          RE24_DEPT_NAME: '', // 部门
//          RE24_POSITION: '', // 职位名称
//          RE24_WORK_DESC: ''
//        }
      ],
      p3Data: [ // 项目经历
//        {
//          RE25_PRJ_NAME: '',
//          RE25_BEGIN_DATE: '',
//          RE25_END_DATE: '',
//          RE25_PRJ_DESC: '' // 描述
//        }
      ],
      p4Data: [ // 教育经历
//        {
        //          RE26_GRADUATE_FROM: '', // 毕业院校
        //          RE26_BEGIN_DATE: '',
        //          RE26_END_DATE: '',
        //          RE26_EDU_BACKGROUND: '', // 学历
        //          RE26_MAJOR: '' // 专业
        //        }
      ],
      p5Data: [ // 培训经历
//        {
//          RE27_COMPANY: '', // 培训单位
//          RE27_BEGIN_DATE: '',
//          RE27_END_DATE: '',
//          RE27_TRAINING_DETAILS: '' // 培训内容
//        }
      ],
      p6Data: [], // 技能标签
      theItemData: [
        {
          titleName: '求职期望',
          part: 'p1',
          border: true,
          data: [
            {
              lineName: 'name',
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
              lineName: 'salary',
              label: '期待年薪',
              value: '',
              code: '',
              placeHolder: '期待年薪',
              type: 'text',
              popType: '',
              fieldName: 'RE23_ANNUAL_SALARY_E',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'content',
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
            }
          ]
        },
        {
          titleName: '工作经历',
          part: 'p2',
          border: true,
          data: [
            {
              lineName: 'name',
              label: '公司名称',
              value: '',
              fieldName: 'RE24_COMPANY_NAME',
              code: '',
              placeHolder: '公司名称',
              type: 'text',
              popType: '',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'time',
              label: '时间',
              beginValue: '', // 开始时间
              endValue: '', // 结束时间
              fieldName: '',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'job',
              label: '职位和部门',
              value: '',
              fieldName: '',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'content',
              label: '内容',
              code: '',
              value: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              fieldName: 'RE24_WORK_DESC',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        {
          titleName: '项目经历',
          part: 'p3',
          border: true,
          data: [
            {
              lineName: 'name',
              label: '项目名称',
              value: '',
              fieldName: 'RE25_PRJ_NAME',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'time',
              label: '时间',
              beginValue: '', // 开始时间
              endValue: '', // 结束时间
              fieldName: '',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'content',
              label: '项目内容',
              code: '',
              value: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              fieldName: 'RE25_PRJ_DESC',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        {
          titleName: '教育经历',
          part: 'p4',
          border: true,
          data: [
            {
              lineName: 'name',
              label: '',
              value: '',
              fieldName: 'RE26_GRADUATE_FROM',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'time',
              label: '时间',
              beginValue: '', // 开始时间
              endValue: '', // 结束时间
              fieldName: '',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'content',
              label: '内容',
              code: '',
              value: '',
              placeHolder: '专业和学历',
              type: 'text',
              popType: '',
              fieldName: '',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        {
          titleName: '培训经历',
          part: 'p5',
          border: true,
          data: [
            {
              lineName: 'name',
              label: '培训单位',
              value: '',
              fieldName: 'RE27_COMPANY',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'time',
              label: '时间',
              beginValue: '', // 开始时间
              endValue: '', // 结束时间
              fieldName: '',
              code: '',
              placeHolder: '',
              type: 'text',
              popType: 'date',
              required: false,
              clearable: true,
              disabled: false
            },
            {
              lineName: 'content',
              label: '培训内容',
              code: '',
              value: '',
              placeHolder: '',
              type: 'text',
              popType: '',
              fieldName: 'RE27_TRAINING_DETAILS',
              required: false,
              clearable: true,
              disabled: false
            }
          ]
        },
        {
          titleName: '技能标签',
          part: 'p6',
          border: false,
          data: []
        }
      ]
    }
  },

  components: {
    Header,
    ResumeItem,
    UserHead,
    ResumeItem2
  },

  computed: {},

  methods: {
    // 判断是不是空对象
    isEmptyObj (obj) {
      return myModule.isEmptyObject(obj)
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
      let RE23 = this.resData.RE23, // 个人信息
        RE24 = this.resData.RE24, // 求职期望
        RE25 = this.resData.RE25, // 工作经历
        RE26 = this.resData.RE26,
        RE27 = this.resData.RE27
      for (let obj of this.p0Data) { // 个人信息
        for (let key in RE23) {
          if (obj.fieldName === key) {
            obj.value = RE23[key]
            break
          }
        }
      }
      for (let p1Key in this.p1Data) { // 求职期望
        for (let key in RE23) {
          if (p1Key === key) {
            this.p1Data[p1Key] = RE23[key]
            break
          }
        }
      }
      if (RE24.length) { // 工作经历
        for (let obj of RE24) {
          let theObj = this.dataMap2.p2
          for (let theKey in theObj) {
            for (let key in obj) {
              if (theKey === key) {
                theObj[theKey] = obj[key]
                break
              }
            }
          }
          this.p2Data.push(theObj)
        }
      }
      if (RE25.length) { // 项目经历
        for (let obj of RE25) {
          let theObj = this.dataMap2.p3
          for (let theKey in theObj) {
            for (let key in obj) {
              if (theKey === key) {
                theObj[theKey] = obj[key]
                break
              }
            }
          }
          this.p3Data.push(theObj)
        }
      }
      if (RE26.length) { // 教育经历
        for (let obj of RE26) {
          let theObj = this.dataMap2.p4
          for (let theKey in theObj) {
            for (let key in obj) {
              if (theKey === key) {
                theObj[theKey] = obj[key]
                break
              }
            }
          }
          this.p4Data.push(theObj)
        }
      }
      if (RE27.length) { // 培训标签
        for (let obj of RE27) {
          this.p5Data.push(obj)
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
      this.handleData()
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

</style>
