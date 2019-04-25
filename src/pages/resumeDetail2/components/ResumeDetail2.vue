<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <div>
        <!--头部-->
        <div class="header van-hairline--bottom">
          <div class="logo-box">
            <div class="logo-box-inner">
              <UserHead theId="" theUrl=""></UserHead>
            </div>
          </div>
          <div class="header-data-box">
            <div class="icon-box">
              <img src="../assets/edit.png" alt="">
            </div>
            <div class="line line1">
              <div class="name">{{theItemData[0].data[0].name}}</div>
              <div class="call">/先生</div>
            </div>
            <div class="line line2">
              <van-row>
                <van-col span="10">
                  <div class="line2-item">
                    <div class="label">{{theItemData[0].data[1].name}}</div>
                    <div class="line2-value">{theItemData[0].data[2].value}}</div>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="line2-item">
                    <div class="label">{{theItemData[0].data[2].name}}</div>
                    <div class="line2-value">{theItemData[0].data[2].value}}</div>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class="line line2">
              <van-row>
                <van-col span="10">
                  <div class="line2-item">
                    <div class="label">{{theItemData[0].data[3].name}}</div>
                    <div class="line2-value">{{theItemData[0].data[3].value}}</div>
                  </div>
                </van-col>
                <van-col span="14">
                  <div class="line2-item">
                    <div class="label">{{theItemData[0].data[4].name}}</div>
                    <div class="line2-value">{{theItemData[0].data[4].value}}</div>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class="line line2 line3">
              <div class="line2-item">
                <div class="label">{{theItemData[0].data[5].name}}</div>
                <div class="line2-value">{{theItemData[0].data[5].value}}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="main">
          <!--组件-->
          <div v-for="(item,index) in theItemData" :key="index" :class="{'van-hairline--bottom': item.border}">
            <ResumeItem2 v-if="item.part!=='p1'" :theData="item"></ResumeItem2>
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
      workExperienceData: null, // 工作经历
      theItemData: [
        {
          titleName: '个人信息',
          part: 'p1',
          border: true,
          data: [
            {
              name: '姓名',
              label: '姓名',
              code: '',
              value: '',
              placeHolder: '请输入您的姓名',
              type: 'text',
              popType: '',
              fieldName: 'RE23_NAME',
              required: false,
              clearable: true
            },
            {
              name: '年龄',
              label: '年龄',
              code: '',
              value: '',
              placeHolder: '年龄',
              type: 'number',
              popType: '',
              fieldName: 'RE23_AGE',
              required: false,
              clearable: true
            },
            {
              name: '学历',
              label: '学历',
              code: 'UDHR021',
              value: '',
              placeHolder: '学历',
              type: 'text',
              popType: 'radio',
              fieldName: 'RE23_EDUCATION',
              required: false,
              clearable: true
            },
            {
              name: '籍贯',
              label: '籍贯',
              code: '',
              value: '',
              placeHolder: '籍贯',
              type: 'text',
              popType: '',
              fieldName: 'RE23_BORN_IN',
              required: false,
              clearable: true
            },
            {
              name: '手机',
              label: '手机',
              code: '',
              value: '',
              placeHolder: '手机',
              type: 'number',
              popType: '',
              fieldName: 'RE23_MOBILE_PHONE',
              required: false,
              clearable: true
            },
            {
              name: '身份证',
              label: '身份证',
              code: '',
              value: '',
              placeHolder: '身份证',
              type: 'text',
              popType: '',
              fieldName: 'RE23_IDENTIY_CARD_NO',
              required: false,
              clearable: true
            }
          ]
          //        {titleName: '工作经历', border: true, data: {}},
          //        {titleName: '项目经历', border: true, data: {}},
          //        {titleName: '教育经历', border: true, data: {}},
          //        {titleName: '培训经历', border: true, data: {}},
          //        {titleName: '技能标签', border: false, data: {}}
        },
        {
          titleName: '求职期望',
          part: 'p2',
          border: true,
          data: [
            {
              name: '求职意向', label: '求职意向', code: 'UDRE015', value: '', placeHolder: '求职意向', type: 'text', popType: 'radio', fieldName: 'RE23_JOB_INTENSION', required: true, clearable: true
            },
            {
              name: '期待工作地点',
              label: '期待工作地点',
              code: '',
              value: '',
              placeHolder: '期待工作地点',
              type: 'text',
              popType: '',
              fieldName: 'RE23_WORK_PLACE',
              required: true,
              clearable: true
            },
            {
              name: '期待年薪',
              label: '期待年薪',
              code: '',
              value: '',
              placeHolder: '期待年薪',
              type: 'text',
              popType: '',
              fieldName: 'RE23_ANNUAL_SALARY_E',
              required: true,
              clearable: true
            },
          ]
          //        {titleName: '工作经历', border: true, data: {}},
          //        {titleName: '项目经历', border: true, data: {}},
          //        {titleName: '教育经历', border: true, data: {}},
          //        {titleName: '培训经历', border: true, data: {}},
          //        {titleName: '技能标签', border: false, data: {}}
        }
      ],
      theFieldArr: [
        {
          name: '姓名',
          label: '姓名',
          code: '',
          value: '',
          placeHolder: '请输入您的姓名',
          type: 'text',
          popType: '',
          fieldName: 'RE23_NAME',
          required: true,
          clearable: true
        },
        {
          name: '出生日期',
          label: '出生日期',
          code: '',
          value: '',
          placeHolder: '出生日期',
          type: 'text',
          popType: 'date',
          showDate: new Date(1970, 0, 1),
          minDate: new Date(1970, 0, 1),
          datetimeType: 'date',
          fieldName: 'RE23_BIRTHDAY',
          required: false,
          clearable: true
        },
        {
          name: '性别',
          label: '性别',
          code: 'UDHR027',
          value: '',
          placeHolder: '性别',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_SEX',
          required: false,
          clearable: true
        },
        {
          name: '年龄',
          label: '年龄',
          code: '',
          value: '',
          placeHolder: '年龄',
          type: 'number',
          popType: '',
          fieldName: 'RE23_AGE',
          required: false,
          clearable: true
        },
        {
          name: '婚姻状况',
          label: '婚姻状况',
          code: 'UDHR007',
          value: '',
          placeHolder: '婚姻状况',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_MARITAL_STATUS',
          required: false,
          clearable: true
        },
        {
          name: '学历',
          label: '学历',
          code: 'UDHR021',
          value: '',
          placeHolder: '学历',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_EDUCATION',
          required: true,
          clearable: true
        },
        {
          name: '现居住地', label: '现居住地', code: '', value: '', placeHolder: '现居住地', type: 'text', popType: '', fieldName: 'RE23_ADDRESS', required: false, clearable: true
        },
        {
          name: '求职意向', label: '求职意向', code: 'UDRE015', value: '', placeHolder: '求职意向', type: 'text', popType: 'radio', fieldName: 'RE23_JOB_INTENSION', required: true, clearable: true
        },
        {
          name: '期待工作性质',
          label: '期待工作性质',
          code: 'UDRE003',
          value: '',
          placeHolder: '期待工作性质',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_WORK_PROP',
          required: false,
          clearable: true
        },
        {
          name: '期待工作地点',
          label: '期待工作地点',
          code: '',
          value: '',
          placeHolder: '期待工作地点',
          type: 'text',
          popType: '',
          fieldName: 'RE23_WORK_PLACE',
          required: true,
          clearable: true
        },
        {
          name: '期待职能',
          label: '期待职能',
          code: 'UDRE004',
          value: '',
          placeHolder: '期待职能',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_EXPECTED_FX',
          required: false,
          clearable: true
        },
        {
          name: '期待年薪',
          label: '期待年薪',
          code: '',
          value: '',
          placeHolder: '期待年薪',
          type: 'text',
          popType: '',
          fieldName: 'RE23_ANNUAL_SALARY_E',
          required: true,
          clearable: true
        },
        {
          name: '目前薪酬',
          label: '目前薪酬',
          code: '',
          value: '',
          placeHolder: '目前薪酬',
          type: 'text',
          popType: '',
          fieldName: 'RE23_ANNUAL_SALARY_C',
          required: false,
          clearable: true
        },
        {
          name: '驾驶证书',
          label: '驾驶证书',
          code: '',
          value: '',
          placeHolder: '驾驶证书',
          type: 'text',
          popType: '',
          fieldName: 'RE23_DRIVING_LICENSE',
          required: false,
          clearable: true
        },
        {
          name: '工作经验',
          label: '工作经验',
          code: 'UDRE014',
          value: '',
          placeHolder: '工作经验',
          type: 'text',
          popType: 'radio',
          fieldName: 'RE23_WORK_YEARS',
          required: true,
          clearable: true
        },
        {
          name: '工作经历',
          label: '工作经历',
          code: '',
          value: '',
          placeHolder: '工作经历',
          type: 'textarea',
          popType: '',
          fieldName: 'RE24_WORK_EXPERIENCE',
          required: false,
          clearable: true
        },
        {
          name: '到岗时间',
          label: '到岗时间',
          code: '',
          value: '',
          placeHolder: '到岗时间',
          type: 'text',
          popType: 'date',
          showDate: new Date(),
          minDate: new Date(),
          datetimeType: 'date',
          fieldName: 'RE23_CAN_WORK_TIME',
          required: false,
          clearable: true
          //          datetimeType: 'year-month'
        },
        {
          name: '',
          label: '',
          code: '',
          value: '',
          placeHolder: '',
          type: 'hidden',
          popType: '',
          fieldName: 'RE23_CANDIDATE_ID',
          required: false,
          clearable: false
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
          clearable: false
        }
      ],
    }
  },

  components: {
    Header,
    ResumeItem,
    UserHead,
    ResumeItem2
  },

  computed: {
  },

  methods: {
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    }
  },

  created () {
//    this.$toast.loading({
//      mask: false,
//      message: '加载中...',
//      duration: 0,
//      forbidClick: true // 禁用背景点击
//    })
//    const param = myModule.getUrlParams()
//    this.id = param.id
//    postData('/EntService/peopleDetail', {id: this.id}).then((res) => {
//      console.log(res)
//      if (myModule.isEmpty(res.ReturnData)) {
//        console.log('暂无数据')
//        this.$toast.fail({
//          mask: false,
//          message: '暂无数据',
//          forbidClick: false // 禁用背景点击
//        })
//        return
//      }
//      this.$toast.clear()
//      this.resData = res.ReturnData
//    })

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
    @include borderBox()
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
    @include defaultFlex
  }
  .line2-item {
    display: flex;
    align-items: center;
  }
  .line3 {
    margin-bottom: 0;
    .line2-value {
      padding: 0 25px;
      white-space:nowrap;
    }
  }
</style>
