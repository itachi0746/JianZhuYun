<template>
  <div>
    <Header @sendHeight="handleHeight" :back="true" :headerName="headerName" :isEnt="true"></Header>
    <div class="body" ref="body">
      <div v-if="theCellArr.length">
        <div class="out-warp">
          <div>
            <!--<van-cell class="p-class" :value="item.value"-->
                      <!--is-link-->
                      <!--title-class="t-class" value-class="v-class" @click="clickCell(item, index)">-->
              <!--<template slot="title">-->
                <!--<span class="custom-text">{{item.name}}</span>-->
              <!--</template>-->
            <!--</van-cell>-->
            <van-cell v-for="(item, index) in theCellArr" :key="index" class="cell-padding" @click="clickCell(item, index)"
                      :title="item.name" icon="" :is-link="item.isLink">
              <img class="cell-icon" :src="item.icon" alt="" v-if="item.icon">
            </van-cell>
          </div>
        </div>

      </div>
      <Logout :enterprise="true"></Logout>
    </div>
    <!--单选-->
    <!--<PopRadio v-if="showRadio" :theRadioData="theRadioData" @closePop="closePop"></PopRadio>-->

  </div>
</template>

<script>
import PopRadio from '../../../component/PopRadio.vue'
import myModule from '../../../common'
import { postData } from '../../../common/server'
import Header from '../../../component/Header.vue'
import Logout from '../../../component/Logout.vue'

export default {
  data () {
    return {
      headerName: '设置',
      showRadio: false, // 单选显示隐藏
      theRadioData: null,
      theCellArr: [
        {name: '实名验证', popType: '', value: '', code: '', fieldName: '', show: true, isLink: true},
        {name: '切换到个人', popType: '', value: '', code: '', fieldName: '', show: true, isLink: true},
        {name: '重置密码', popType: '', value: '', code: '', fieldName: '', show: true, isLink: true},
        {name: '清理缓存', popType: '', value: '', code: '', fieldName: '', show: true, isLink: false}
      ]
    }
  },

  components: {
    PopRadio,
    Header,
    Logout
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
    /**
     * 点击实名验证
     */
    clickVerify () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      postData('/EntService/GoVerify', {}).then((res) => {
        console.log(res)
        if (res.Result) {
          window.location.href = res.Result
        } else {
          this.$toast.clear()
          console.log('没有链接地址')
        }
      })
    },
    /**
     * 切换身份
     */
    changeRole () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      GoToPage('', 'login.html', {})
    },
    clickReset () {
      this.$toast.loading({
        mask: false,
        message: '加载中...',
        duration: 0,
        forbidClick: true // 禁用背景点击
      })
      GoToPage('', 'reset.html', {isEnt: true})
    },
    // 清除缓存
    clearCache () {
      myModule.clearCache()
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
    clickCell (item, index) {
      switch (index) {
      case 0:
        this.clickVerify()
        break
      case 1:
        this.changeRole()
        break
      case 2:
        this.clickReset()
        break
      case 3:
        this.clearCache()
        break
      }
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .p-class {
    padding: 17px 0;
  }
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;overflow-x: hidden;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  }
  .warp {
    margin: 0 18px;
  }
  .out-warp {
    background-color: #fff;
  }
  .t-class {
    padding-left: 0;
  }
  .cell-padding {
    padding: 17px 18px;
  }
</style>
