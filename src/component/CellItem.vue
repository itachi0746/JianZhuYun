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
      GoToPage('', item.link, item.param)
      //      let data = {}
//      if (link === 'resume.html') {
//        data = {id: this.id}
//        GoToPage('', link, data)
//      } else {
//        GoToPage('', link, {})
//      }
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
