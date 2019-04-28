<template>
  <div>
    <div class="main-item-box">
      <div class="title">
        <div class="title-name">
          <i class="title-icon"></i>
          <span>{{theData.titleName}}</span>
        </div>
        <div class="content-edit" @click="clickEdit(theData.part)" v-if="theData.part==='p1'">
          <img src="./assets/edit.png" alt="">
        </div>
        <div class="add" v-else>添加</div>
      </div>
      <div class="main-content">
        <!--<div class="empty-content">-->
        <!--您还未编辑此项信息哦~快来编辑吧-->
        <!--</div>-->
        <div class="the-content" :class="{'the-mb': theData.part==='p6'}">
          <div v-for="(item,index) in theData.data" :key="index"
               :class="[{'the-tag': theData.part==='p6'}]">
            <div v-if="theData.part==='p6'">
              {{item}}
            </div>
            <div v-else>
              <!--名字-->
              <div class="content-line content-title" v-if="item.lineName==='name'">
                <span>{{item.value}}</span>
                <div class="content-edit" @click="clickEdit(theData.part)" v-if="theData.part!=='p1'">
                  <img src="./assets/edit.png" alt="">
                </div>
              </div>
              <!--时间-->
              <div class="content-line content-time" v-if="item.lineName==='time'">
                <span>{{item.beginValue}} - {{item.endValue}}</span>
              </div>
              <!--工资-->
              <div class="content-line salary" v-if="item.lineName==='salary'">
                <span>{{item.value}}</span>
              </div>
              <!--职位 部门-->
              <div class="content-line job-name" v-if="item.lineName==='job'">
                <span>{{item.value}}</span>
              </div>
              <!--内容-->
              <div class="content-line" v-if="item.lineName==='content'">
                <span>{{item.value}}</span>
              </div>
              <!--标签部分-->
              <div class="content-line" v-if="item.lineName==='tag'">
                <span>{{item.value}}</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },
  props: {
    theData: {
      type: Object,
      default: null
    }
  },

  components: {},

  computed: {},

  methods: {
    isTime (lineName) {
      return lineName.indexOf('Time') !== -1
    },
    isAfterTime (lineName) { // 时间的下一行
      return lineName === 'job' || lineName === 'content'
    },
    /**
     * 点解编辑
     * @param part
     */
    clickEdit (part) {
      this.$router.push({name: 'EditPage', params: {part: part}})
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .main-item-box {
    padding: 15px 0;
    @include font-size(15px);
    color: #999999;
  }

  .title {
    position: relative;
    display: flex;
    justify-content: space-between;
    color: $mainColor;
    align-items: center;
  }

  .title-icon {
    width: 8px;
    height: 8px;
    background-color: $mainColor;
    border-radius: 50%;
    /*position: absolute;*/
    /*left: 0px;*/
    /*top: 5px;*/
  }

  .label {
    white-space: nowrap;
  }

  .title-name {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #333333;
    @include font-size(16px);
    span {
      padding-left: 6px;
    }
  }

  .empty-content {
    padding-top: 29px;
  }

  .main-content {
    padding-left: 14px;
    @include font-size(13px);
  }

  .content-edit {
    width: 17px;
    height: 17px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    @include font-size(16px);
  }

  .content-line {
    margin-top: 15px;
  }

  .the-content {
    @include font-size(15px);
    color: #666666;
  }

  .content-time {
    align-items: center;
    display: flex;
    color: #999999;
    @include font-size(13px);
  }

  .job-name {
    @include font-size(16px);
    color: #333333;
  }

  .salary {
    @include font-size(14px);
    color: #333333;
  }

  .the-tag {
    float: left;
    margin-right: 24px;
    margin-bottom: 10px;
    @include font-size(15px)
  }

  .clear-fix {
    @include clearfix()
  }
  .the-mb {
    margin-bottom: 25px;
    overflow: hidden;
    margin-top: 15px;
  }
</style>
