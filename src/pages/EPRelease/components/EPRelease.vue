<template>
  <div class="handle">
    <Header @sendHeight="handleHeight" :headerName="headerName" :canBack="true"></Header>
    <div class="body" ref="body">
      <van-cell-group v-if="fieldData.length">
        <van-cell v-for="(item,index) in fieldData" :key="index" class="p-class" :value="item.value" is-link
                  title-class="t-class" value-class="v-class" @click="clickCell(item)">
          <template slot="title">
            <span class="custom-text">{{item.name}}</span>
          </template>
        </van-cell>
      </van-cell-group>

    </div>
    <Popup :showPopup="showPopup" :type="popType" @popupHidden="popupHidden"></Popup>
    <!--<van-popup v-model="showPopup">-->
      <!---->
    <!--</van-popup>-->
  </div>
</template>

<script>
import myModule from '../../../common'
import Header from '../../../component/Header.vue'
import Popup from './Popup.vue'

export default {
  data () {
    return {
      headerName: '发布职位',
      headerHeight: null,
      showPopup: false,
      popType: null,
      curFieldItem: null,
      fieldData: [
        {name: '职位名称', type: 'field', value: '请填写'},
        {name: '职位类型', type: 'radio', value: '请选择'},
        {name: '工作地点', type: 'field', value: '请填写'},
        {name: '职位描述', type: 'field', value: '请填写'},
        {name: '经验要求', type: 'radio', value: '请选择'},
        {name: '薪资范围', type: 'radio', value: '请选择'},
        {name: '最低学历', type: 'radio', value: '请选择'}
      ]
    }
  },

  components: {
    Header,
    Popup
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
    clickCell (item) {
      this.showPopup = true
      this.popType = item.type
      this.curFieldItem = item
    },
    popupHidden (params) {
      this.showPopup = false
    }
  },

  created () {},

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
  }

  .p-class {
    padding: 15px;
  }
  .van-cell__right-icon {
    color: $mainColor;
  }
</style>
