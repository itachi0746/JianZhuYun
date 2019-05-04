<template>
  <div v-if="items">
    <van-cell-group class="out-warp">
      <div>
        <van-cell v-for="(item, index) in items" :key="index" class="cell-padding" @click="clickItem(item)"
                  :title="item.name" icon="" is-link :title-class="[{'t-class': item.icon}]">
          <img class="cell-icon" :src="item.icon" alt="" v-if="item.icon">
        </van-cell>
        <!--<van-cell class="cell-padding" @click="clickItem(item.link)"-->
                  <!--:title="item.name" icon="" is-link v-else>-->
        <!--</van-cell>-->
      </div>
    </van-cell-group>
  </div>
</template>

<script>
import {postData} from '../common/server'
export default {
  data () {
    return {
    }
  },

  components: {},

  computed: {},
  props: {
    items: {
      type: Array,
      default: null
    }
  },

  methods: {
    clickItem (item) {
//      if (item.name === '实名验证') {
//        this.clickVerify()
//      }
      GoToPage('', item.link, item.param)
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
    }
  },

  created () {},

  mounted () {},

  beforeDestroy () {}
}
</script>

<style lang='scss' scoped>
  .cell-padding {
    padding: 17px 18px;
    /*margin: 0 18px;*/
    /*box-sizing: border-box;*/
  }
  .cell-icon {
    position: absolute;
    left: 18px;
    top: 19px;
    height: 0.4rem;
    min-width: 1em;
  }
  .t-class {
    padding-left: 30px;
  }
</style>
