<template>
  <div class="contractDetail">
    <Header :back="true" @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" id="body" ref="body">
      <div v-if="resData">
        <div>
          <ContractItem :enterprise="true" :resData="resData" :popValue="popValue" @sendFieldData="handleFieldData"></ContractItem>
        </div>
        <div class="result" v-if="isSend">
          <div class="result-logo">
            <img src="../assets/accept.png" alt="">
          </div>
          <div class="result-msg">发送成功</div>
          <div class="result-data">{{resData.RE33_CHG_TIME}}</div>
        </div>
        <div class="action-box" v-else>
          <div class="p10">
            <van-button class="btnClass" type="info" size="large" @click.native="clickSend">签约并发送</van-button>
          </div>
        </div>
      </div>
    </div>
    <PopRadio v-if="showPop" :theRadioData="theRadioData" @closePop="closePop" :title="'请选择合同模板'"></PopRadio>
  </div>
</template>

<script>
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import PopRadio from '../../../component/PopRadio.vue'
import ContractItem from '../../../component/ContractItem.vue'

export default {
  name: '',
  data () {
    return {
      headerName: '合同签约',
      headerHeight: null,
      id: null,
      resData: null,
      isSend: false,
      dataArr: null,
      showPop: false,
      theRadioData: null,
      pageId: 3,
      popValue: null // 弹窗的值
    }
  },
  components: {
    Header,
    PopRadio,
    ContractItem
  },
  mounted () {
    console.log(myModule)
  },
  created () {
    this.id = this.$route.params.id
    postData('/EntService/ContractDetails', {id: this.id}).then((res) => {
      console.log(res)
      if (myModule.isEmpty(res.ReturnData)) {
        console.log('暂无数据')
        this.$toast.fail({
          mask: false,
          message: '暂无数据',
          forbidClick: false // 禁用背景点击
        })
        setTimeout(() => {
          GoToPage('', 'EPPeopleDB.html', {pageid: this.pageId})
        }, 2000)
        return
      }
      this.resData = res.ReturnData
      //      for (let key in this.resData) { // 格式化时间
      //        if (typeof this.resData[key] !== 'string') {
      //          continue
      //        }
      //        if (this.resData[key].indexOf('/Date') !== -1) {
      //          this.resData[key] = myModule.handleTime(this.resData[key])
      //        }
      //      }
    })
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      this.headerHeight = height.headerHeight
      if (this.headerHeight) {
        const WH = myModule.getClientHeight()
        let body = document.getElementById('body')
        body.style.height = WH - this.headerHeight + 'px'
      }
    },
    // 签约并发送
    clickSend () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      const data = {}
      postData('/EntService/GetTemplates', data).then((res) => {
        console.log(res)
        if (myModule.isEmpty(res.ReturnData)) {
          console.log('暂无数据')
          //          this.showPop = false
          this.$toast.fail({
            mask: false,
            message: '暂无数据',
            forbidClick: false // 禁用背景点击
          })
          return
        }
        this.showPop = true
        this.$toast.clear()
        this.theRadioData = res.ReturnData
      })
    },
    /**
     * 监听弹窗关闭
     */
    closePop (obj) {
      if (!obj.value) {
        console.log('没有返回值', obj)
        this.showPop = false
        this.popValue = null
        return
      }
      this.showPop = false
      this.popValue = obj.value
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      this.$nextTick(() => {
        let form = new FormData()
        for (let obj of this.dataArr) {
//          form.append(obj.fieldName, this.resData[obj.fieldName])
          form.append(obj.fieldName, obj.value)
        }
        const data = {
          id: this.id,
          folder: obj.value.Key
        }
        for (let key in data) {
          form.append(key, data[key])
        }
        postData('/EntService/SendSigning', form).then((res) => {
          console.log(res)
          this.$toast.success('提交成功')
          this.isSend = true
          setTimeout(() => {
            GoToPage('', 'EPPeopleDB.html', {pageid: this.pageId})
          }, 2000)
        })
      })
    },
    /**
     * 处理子组件数据
     * @param arr 字段data
     */
    handleFieldData (arr) {
      this.dataArr = arr
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
