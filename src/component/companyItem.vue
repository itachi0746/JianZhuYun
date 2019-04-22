<template>
  <div>
    <div class="li-line">
      <div class="c-head">
        <div class="c-head-box">
          <EPHead :theUrl="companyData.HRA0_LOGO_URL" :theId="companyData.HRA0_ENT_ID"></EPHead>
        </div>
      </div>
      <div class="c-data">
        <div class="c-name">{{companyData.HRA0_ENT_NAME}}</div>
        <ul class="c-remarks">
          <li class="c-remarks-li">{{companyData.HRA0_ENT_ADDR_L1}}</li>
        </ul>
      </div>
    </div>
    <div class="van-hairline--bottom" v-if="false">
      <ul class="c-tag" v-if="tagData.length">
        <li>
          <van-tag v-for="(item,index) in tagData" :key="index" color="#F1F1F1" text-color="#999999" size="medium">{{item}}</van-tag>
        </li>
      </ul>
    </div>
    <div class="c-msg" v-show="false">
      <div>热招：设计师等2886个职位</div>
      <van-icon name="arrow"/>
    </div>
  </div>
</template>

<script>
import EPHead from './EPHead.vue'

export default {
  data () {
    return {
      dataArr: [
        {name: '人数规模', fieldName: 'HRA0_COMPANY_SIZE'}
      ]
    }
  },
  props: {
    companyData: {
      type: Object,
      default: null
    }
  },
  components: {
    EPHead
  },

  computed: {
    tagData () {
      let arr = []
      if (this.companyData) {
        let ReferenceValues = this.companyData.ReferenceValues
        for (let obj of this.dataArr) {
          let theKey = obj.fieldName
          if (ReferenceValues[theKey] && ReferenceValues[theKey] !== 'null') {
            arr.push(ReferenceValues[theKey])
          }
        }
      }
      return arr
    }
  },

  methods: {},

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .li-line {
    display: flex;
  }

  .c-head {
    min-width: 46px;
    height: 46px;
    border-radius: 5px;
    /*background-color: #999999;*/
    margin-right: 10px;
  }

  .c-head-box {
    width: 46px;
    height: 46px;
  }

  .c-data {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .c-name {
    @include font-size(16px);
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

</style>
