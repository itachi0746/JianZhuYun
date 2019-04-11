<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :back="true"></Header>
    <div class="body" ref="body">
      <van-cell-group v-if="fieldData.length">
        <van-cell v-for="(item,index) in fieldData" v-show="item.show" :key="index" class="p-class" :value="item.value" is-link
                  title-class="t-class" value-class="v-class" @click="clickCell(item, index)">
          <template slot="title">
            <span class="custom-text">{{item.name}}</span>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="btn-box">
        <van-button class="btnStyle" @click="clickFabu" type="info" size="large">发布</van-button>
      </div>
    </div>
    <!--<div v-if="showPopup">-->
      <!--<Popup class="van-popup60" :showPopup="showPopup" :popType="popType" @popupHidden="popupHidden" :theRadioData="theRadioData"></Popup>-->
    <!--</div>-->
    <!--单选-->
    <PopRadio v-if="showRadio" :theRadioData="theRadioData" @closePop="closePop"></PopRadio>
    <!--填写-->
    <PopField v-if="showField" @closePopField="closePopField"></PopField>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import PopRadio from '../../../component/PopRadio.vue'
import PopField from '../../../component/PopField.vue'
import Popup from './Popup.vue'

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
        {name: '记录ID', popType: '', value: this.id, code: '', fieldName: 'RE13_ID', show: false},
        {name: '职位名称', popType: 'field', value: '请填写', code: '', fieldName: 'RE13_NAME', show: true},
        {name: '职位类型', popType: 'radio', value: '请选择', code: 'UDHR011', fieldName: 'RE13_POSITION_TYPE', show: true},
        {name: '工作地点', popType: 'radio', value: '请选择', code: 'UDRE019', fieldName: 'RE13_WORK_PLACE', show: true},
        {name: '职位描述', popType: 'field', value: '请填写', code: '', fieldName: 'RE13_DESC', show: true},
        {name: '经验要求', popType: 'radio', value: '请选择', code: 'UDRE011', fieldName: 'RE13_WORK_YEAR', show: true},
        {name: '薪资范围', popType: 'radio', value: '请选择', code: 'UDRE005', fieldName: 'RE13_SALARY_REQUIRED', show: true},
        {name: '最低学历', popType: 'radio', value: '请选择', code: 'UDHR021', fieldName: 'RE13_EDU_DEGREE', show: true}
      ]
    }
  },

  components: {
    Header,
    Popup,
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
        this.showField = true
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
            duration: 2000,
            forbidClick: true // 禁用背景点击
          })
          return
        }
        this.showRadio = true
        this.theRadioData = res.ReturnData
        this.$toast.clear()
      })
    },
    popupHidden (params) { // 获得弹窗的值
      this.showPopup = false
      if (!params.value) {
        console.log('弹窗没有值')
        return
      }
      this.curFieldItem.value = params.value
    },
    /**
     * 发布职位
     */
    clickFabu () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      let data = new FormData()
      for (let obj of this.fieldData) {
        if (obj.name === '记录ID') continue
        if (!obj.value) {
          this.$toast.fail('输入不能为空')
          return
        }
        data.append(obj.fieldName, obj.value)
//        data[obj.fieldName] = obj.value
      }
      postData('/EntService/Publish', data).then((res) => {
        console.log(res)
        this.$toast.success('发布成功')
        setTimeout(() => {
          GoToPage('', 'EPProfile.html', {})
        }, 3000)
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
    this.id = param.id
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
  }

  .v-class {
    color: $mainColor;
    @include font-size(16px);
    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .p-class {
    padding: 15px;
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
</style>
