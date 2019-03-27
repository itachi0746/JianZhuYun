<template>
  <div class="profile">
    <Header @sendHeight="handleHeight" :headerName="headerName"></Header>
    <div class="body" ref="body">
      <div class="filter van-hairline--bottom">
        <van-row>
          <van-col :span="24/filterItems.length" v-for="(item, index) in filterItems" :key="index">
            <div class="filter-cell-box">
              <div class="van-hairline--right">
                <div class="filter-cell">{{item.name}}</div>
                <van-icon class="filter-icon normal-icon" name="play" />
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="company-list">
        <ul>
          <li class="company-list-li">
            <div class="li-line">
              <div class="c-head"></div>
              <div class="c-data">
                <div class="c-name">33333333333333</div>
                <ul class="c-remarks">
                  <li class="c-remarks-li">111</li>
                  <li class="c-remarks-li">222</li>
                </ul>
              </div>
            </div>
            <div class="van-hairline--bottom">
              <ul class="c-tag">
                <li>
                  <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
                </li>
                <li>
                  <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
                </li>
              </ul>
            </div>
            <div class="c-msg">
              <div>热招：设计师等2886个职位</div>
              <van-icon name="arrow" />
            </div>
          </li>
          <li class="company-list-li">
            <div class="li-line">
              <div class="c-head"></div>
              <div class="c-data">
                <div class="c-name">33333333333333</div>
                <ul class="c-remarks">
                  <li class="c-remarks-li">111</li>
                  <li class="c-remarks-li">222</li>
                </ul>
              </div>
            </div>
            <div class="van-hairline--bottom">
              <ul class="c-tag">
                <li>
                  <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
                </li>
                <li>
                  <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
                </li>
              </ul>
            </div>
            <div class="c-msg">
              <div>热招：设计师等2886个职位</div>
              <van-icon name="arrow" />
            </div>
          </li>
          <li class="company-list-li">
            <div class="li-line">
              <div class="c-head"></div>
              <div class="c-data">
                <div class="c-name">33333333333333</div>
                <ul class="c-remarks">
                  <li class="c-remarks-li">111</li>
                  <li class="c-remarks-li">222</li>
                </ul>
              </div>
            </div>
            <div class="van-hairline--bottom">
              <ul class="c-tag">
                <li>
                  <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
                </li>
                <li>
                  <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
                </li>
              </ul>
            </div>
            <div class="c-msg">
              <div>热招：设计师等2886个职位</div>
              <van-icon name="arrow" />
            </div>
          </li>
          <li class="company-list-li">
            <div class="li-line">
              <div class="c-head"></div>
              <div class="c-data">
                <div class="c-name">33333333333333</div>
                <ul class="c-remarks">
                  <li class="c-remarks-li">111</li>
                  <li class="c-remarks-li">222</li>
                </ul>
              </div>
            </div>
            <div class="van-hairline--bottom">
              <ul class="c-tag">
                <li>
                  <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
                </li>
                <li>
                  <van-tag color="#F1F1F1" text-color="#999999" size="medium">标签</van-tag>
                </li>
              </ul>
            </div>
            <div class="c-msg">
              <div>热招：设计师等2886个职位</div>
              <van-icon name="arrow" />
            </div>
          </li>
        </ul>
      </div>
    </div>
    <Footer @sendHeight="handleHeight" :active="activeNum"></Footer>
  </div>
</template>

<script>
import myModule from '../../../common'
import Footer from '../../../component/Footer.vue'
import Header from '../../../component/Header.vue'

export default {
  name: 'profile',
  data () {
    return {
      headerName: '公司',
      activeNum: 1,
      headerHeight: null,
      footerHeight: null,
      filterItems: [
        {name: '融资'},
        {name: '规模'},
        {name: '行业'}
      ]
    }
  },
  components: {
    Footer,
    Header
  },
  mounted () {
    console.log(myModule)
  },
  methods: {
    /**
     * 处理header,footer的高度
     */
    handleHeight (height) {
      console.log(height)
      if (height.headerHeight) {
        this.headerHeight = height.headerHeight
      } else {
        this.footerHeight = height.footerHeight
      }
      if (this.headerHeight && this.footerHeight) {
        const WH = myModule.getClientHeight()
        this.$refs.body.style.height = WH - this.headerHeight - this.footerHeight + 'px'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .body {
    background-color: #F5F9FA;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;/* 解决ios滑动不流畅问题 */
  }
  .filter {
    width: 100%;
    background-color: #fff;
  }
  .filter-cell-box {
    @include font-size(14px);
    padding: 10px 0;
    position: relative;
  }
  .filter-cell {
    text-align: center;
    color: #666;
  }
  .filter-icon {
    position: absolute;
    right: 10px;
    top: 2px;
    color: #666;
  }
  .normal-icon {
    transform: rotate(90deg);
  }
  .active-icon {
    transform: rotate(-90deg);
  }
  .company-list {
    .company-list-li {
      padding: 15px 18px;
      /*display: flex;*/
      background-color: #fff;
      margin-bottom: 10px;
      @include font-size(16px);
    }
    .li-line {
      display: flex;
    }
    .c-head {
      min-width: 46px;
      height: 46px;
      border-radius: 5px;
      background-color: #999999;
      margin-right: 10px;
    }
    .c-data {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .c-name {
      @include font-size(18px);
      font-weight: bold;
      color: #000;
      max-width: 100%;
      word-break: break-all; /* 允许单词在任何地方被打破（这里所说的打破是强行折断换行） */
    }
    .c-remarks {
      color: #666;
      @include font-size(16px);
      overflow: hidden;
    }
    .c-remarks-li {
      float: left;
      margin-right: 5px;
    }
    .c-tag {
      overflow: hidden;
      padding: 15px 0;
      li {
        float: left;
        margin-right: 10px;
      }
    }
    .c-msg {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 15px;
      @include font-size(14px);
      color: #999;
    }
  }
</style>
