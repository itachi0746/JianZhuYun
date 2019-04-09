<template>
  <div id="common-header" ref="common-header" class="common-header">
    <div class="header-box" style="position: relative;">
      <van-icon v-show="back" class="header-icon2" name="arrow-left" @click="clickBack" />
      <div class="header-name">
        <ul class="header-ul" v-if="theActive!==null">
          <li v-for="(item, index) in headData" :key="index" @click="clickLi(item)" :class="{'active': item.id===theActive}">
            <span>{{item.name}}</span>
          </li>
        </ul>
      </div>
      <van-icon v-show="search" class="header-icon" name="search" @click="clickSearch" />
    </div>
  </div>
</template>

<script>
import {_} from 'vue-underscore'
export default {
  name: 'DBHeader',
  data () {
    return {
      theActive: null, // 默认当前是人才库
      headData: [
        {id: 0, name: '人才库', foldId: 'RE0201'},
        {id: 1, name: '面试库', foldId: 'RE0202'},
        {id: 2, name: '录用库', foldId: 'RE0203'},
        {id: 3, name: '签约库', foldId: 'RE0204'},
        {id: 4, name: '备用人才库', foldId: 'RE0205'},
        {id: 5, name: '历史库', foldId: 'RE0206'}
      ],
      fun: _.debounce(this.clickLiCB, 500)
    }
  },

  components: {},

  props: {
    back: {
      type: Boolean,
      default: false
    },
    search: {
      type: Boolean,
      default: false
    },
    active: { // 标识
      type: Number,
      default: 0
    }
  },
  watch: {
    active (n, o) {
//      console.log(n, o)
      this.theActive = this.active
    }
  },

  computed: {},

  methods: {
    handleHeight () {
      setTimeout(() => {
        const headerHeight = this.$refs['common-header'].offsetHeight
        this.$emit('sendHeight', {'headerHeight': headerHeight})
      }, 300)
    },
    clickSearch () {
      this.$router.push({name: 'Search', params: { }})
    },
    clickBack () {
      console.log('back')
      this.$router.go(-1)
    },
    clickLi (item) {
      this.theActive = item.id // 立即执行
      this.fun(item) // 延迟执行
    },
    /**
     * 点击回调
     * @param item
     */
    clickLiCB (item) {
      this.$emit('changeTab', {'headItem': item})
    }
  },

  created () {
  },

  mounted () {
    this.handleHeight()
    this.theActive = this.active
    //    console.log(this.theActive, this.active)
  },

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .common-header {
    height: 50px;
    background-color: $mainColor;
    width: 100%;
    padding: 5px 18px;
    @include borderBox();
    @include font-size(16px);
    text-align: center;
    color: #ffffff;
    position: relative;
  }
  .header-icon {
    position: absolute;
    right: 0;
    top: 0;
    @include font-size(20px)
  }
  .header-icon2 {
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
    @include font-size(20px)
  }
  .header-box {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .header-name {
    /*display: flex;*/
    /*align-items: center;*/
    height: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  }
  .header-name::-webkit-scrollbar {display:none}
  .header-ul {
    /*display: flex;*/
    /*height: 100%;*/
    width: 1000px;
    li {
      height: 37px;
      float: left;
      margin: 0 10px;
      display: flex;
      align-items: center;
    }
    li.active {
      border-bottom: 2px solid #ffffff;
    }
  }
</style>
