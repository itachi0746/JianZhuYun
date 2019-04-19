<template>
  <div>
    <div v-if="jobData">
      <van-row>
        <van-col span="12">
          <div class="job-name">{{jobData.RE13_NAME}}</div>
        </van-col>
        <van-col span="12">
          <div class="job-pay">{{jobData.ReferenceValues.RE13_SALARY_REQUIRED}}</div>
        </van-col>
      </van-row>
      <!--<div class="job-remarks" v-show="false">-->
        <!--<ul>-->
          <!--<li class="job-remarks-li">备注</li>-->
          <!--<li class="job-remarks-li">备注</li>-->
        <!--</ul>-->
      <!--</div>-->
      <div class="job-HR">
        <div class="HR-head" v-show="false"></div>
        <div class="HR-name">{{jobData.ReferenceValues.RE13_ENT_ID}}</div>
      </div>
      <div class="job-tag" v-if="tagData.length">
        <van-tag v-for="(item,index) in tagData" :key="index" color="#F1F1F1" text-color="#999999" size="medium">{{item}}</van-tag>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dataArr: [
        {name: '工作经验', fieldName: 'RE13_WORK_YEAR'},
        {name: '工作地点', fieldName: 'RE13_WORK_PLACE'}
      ]
    }
  },
  props: {
    jobData: {
      type: Object,
      default: null
    }
  },
  watch: {
  },
  computed: {
    tagData () {
      let arr = []
      if (this.jobData) {
        let ReferenceValues = this.jobData.ReferenceValues
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

  components: {},
  methods: {},

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .job-name {
    color: #000;
    font-weight: bold;
  }
  .job-pay {
    color: #067FCC;
    text-align: right;
    @include font-size(14px)
  }
  .job-remarks {
    @include font-size(14px);
    padding: 5px 0;
    ul {
      overflow: hidden;
    }
  }
  .job-remarks-li {
    float: left;
    margin-right: 5px;
  }
  .job-tag {
    padding: 10px 0 0;
    color: #999;
    span {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
  .job-HR {
    padding-top: 10px;
    color: #666;
    display: flex;
    align-items: center;
    @include font-size(14px)
  }
  .HR-head {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #969799;
    margin-right: 6px;
  }

</style>
