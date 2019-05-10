<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <van-cell-group v-if="fieldData.length">
        <div v-for="(item,index) in fieldData" :key="index" class="van-hairline--bottom">
          <div v-if="item.fieldName==='RE13_SALARY_REQUIRED'">
            <div class="van-hairline--bottom">
              <div class="p-class van-cell">
                <div class="van-cell__title t-class"><span class="custom-text">{{item.name}}</span>
                  <div class="theStar">*</div>
                </div>
                <div class="van-cell__value v-class input-class2">
                  <!--<input type="text" placeholder="请输入">-->
                  <van-field class="xinzi" v-model="item.value" placeholder="请输入薪资范围" />
                </div>
              </div>
            </div>
          </div>
          <van-cell v-show="item.show" class="p-class" :value="item.value" is-link
                    title-class="t-class" value-class="v-class" @click="clickCell(item, index)" v-else>
            <template slot="title">
              <span class="custom-text">{{item.name}}</span>
              <div class="theStar" v-if="item.required">*</div>
            </template>
          </van-cell>
        </div>

      </van-cell-group>
      <div class="btn-box">
        <van-button class="btnStyle" @click="clickFabu" type="info" size="large">发布</van-button>
      </div>
    </div>
    <!--单选-->
    <PopRadio v-if="showRadio" :theRadioData="theRadioData" @closePop="closePop"></PopRadio>
    <!--填写-->
    <PopField v-if="showField" @closePopField="closePopField" :PopFieldData="PopFieldData"></PopField>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import PopRadio from '../../../component/PopRadio.vue'
import PopField from '../../../component/PopField.vue'

export default {
  data () {
    return {
      headerName: '发布职位',
      id: null,
      headerHeight: null,
      showPopup: false,
      showRadio: false, // 单选显示隐藏
      showField: false, // 填空显示隐藏
      popType: null,
      curFieldItem: null,
      curFieldDIdx: null,
      theRadioData: null, // 单选弹窗的数据
      resData: null,
      fieldData: [
        {name: '记录ID', popType: '', value: '', code: '', fieldName: 'RE13_ID', show: false, required: false},
        {
          name: '职位名称',
          popType: 'field',
          value: '',
          code: '',
          type: 'text',
          placeHolder: '请输入职位名称',
          clearable: false,
          fieldName: 'RE13_NAME',
          show: true,
          required: true,
          class: 'input-class'
        },
        {
          name: '职位类型',
          popType: 'radio',
          value: '',
          code: 'UDHR011',
          fieldName: 'RE13_POSITION_TYPE',
          show: true,
          required: false
        },
        {
          name: '工作地点',
          popType: 'radio',
          value: '',
          code: 'UDRE019',
          fieldName: 'RE13_WORK_PLACE',
          show: true,
          required: true
        },
        {
          name: '工作性质',
          popType: 'radio',
          value: '',
          code: 'UDRE003',
          fieldName: 'RE13_WORK_PROP',
          show: true,
          required: false
        },
        {
          name: '职位描述',
          popType: 'field',
          value: '',
          code: '',
          type: 'textarea',
          fieldName: 'RE13_DESC',
          placeHolder: '请输入职位描述',
          show: true,
          required: true,
          class: 'textarea-class',
          clearable: false
        },
        {
          name: '经验要求',
          popType: 'radio',
          value: '',
          code: 'UDRE011',
          fieldName: 'RE13_WORK_YEAR',
          show: true,
          required: true
        },
        {
          name: '最低学历',
          popType: 'radio',
          value: '',
          code: 'UDHR021',
          fieldName: 'RE13_EDU_DEGREE',
          show: true,
          required: true
        },
//        {
//          name: '薪资范围',
//          popType: 'radio',
//          value: '',
//          code: 'UDRE005',
//          fieldName: 'RE13_SALARY_REQUIRED',
//          show: true,
//          required: true
//        },
        {
          name: '薪资范围',
          popType: '',
          value: '',
          code: '',
          fieldName: 'RE13_SALARY_REQUIRED',
          show: true,
          required: true
        }
      ],
      PopFieldData: null // 传去弹窗的数据
      //      PopFieldData: {name: '职位描述', code: '', value: '', placeHolder: '请输入职位描述', type: 'textarea', popType: '', fieldName: 'Mobile', required: false, clearable: true, class: 'textarea-class'}

    }
  },

  components: {
    Header,
    PopRadio,
    PopField
  },

  computed: {},

  methods: {
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight + 'px'
      }
    },
    clickCell (item, index) {
      this.popType = item.popType
      this.curFieldItem = item
      this.curFieldDIdx = index
      const theCode = item.code
      if (!theCode) {
        console.log('没有code')
        if (this.popType === 'field') {
          this.PopFieldData = this.curFieldItem
          this.showField = true
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
            duration: 1000,
            forbidClick: true // 禁用背景点击
          })
          return
        }
        this.showRadio = true
        this.theRadioData = res.ReturnData
        this.$toast.clear()
      })
    },
    /**
     * 发布职位
     */
    clickFabu () {
      if (!myModule.checkRequired(this.fieldData)) {
        this.$toast.fail('必填项不能为空')
        return
      }
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let data = myModule.createFormData(this.fieldData)
      postData('/EntService/Publish', data).then((res) => {
        console.log(res)
        this.$toast.success('发布成功')
        setTimeout(() => {
          GoToPage('', 'EPProfile.html', {})
        }, 2000)
      })
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
      this.curFieldItem.value = obj.value.Value
      this.showRadio = false
      this.theRadioData = null
    },
    closePopField (obj) {
      if (!obj.value) {
        console.log('没有返回值', obj)
        this.showField = false
        return
      }
      this.curFieldItem.value = obj.value
      this.showField = false
    }
  },

  created () {
    const param = myModule.getUrlParams()
    try {
      this.id = param.id // 如果是从编辑职位过来,就有id
    } catch (err) {
      this.id = '' // 如果是发布新的职位就不用id
    }
    postData('/EntService/PositionDetail', {id: this.id}).then((res) => { // 请求已有数据
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        //        this.$toast.fail({
        //          mask: false,
        //          message: '暂无数据',
        //          forbidClick: true // 禁用背景点击
        //        })
        return
      }
      this.resData = res.ReturnData
      for (let obj of this.fieldData) {
        if (this.resData.hasOwnProperty(obj.fieldName)) {
          obj.value = this.resData[obj.fieldName]
        }
      }
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
    /*padding: 15px 18px;*/
    @include borderBox();
    background-color: #F5F9FA;
  }

  .t-class {
    @include font-size(16px);
    color: #333333;
    position: relative;
  }

  .v-class {
    color: #666666;
    @include font-size(16px);
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .p-class {
    padding: 15px;
    position: relative;
  }

  .theStar {
    position: absolute;
    left: -8px;
    top: 3px;
    color: red;
  }

  .van-cell__right-icon {
    color: $mainColor;
  }

  .van-popup60 {
    width: 60%;
  }

  .btn-box {
    @include borderBox();
    width: 100%;
    padding: 30px 15px 0;
  }

  .btnStyle {
    @include theBtnColor
  }
  .xinzi {
    @include font-size(16px);
  }
  .xinzi.van-cell {
    padding: 0;
  }
</style>
