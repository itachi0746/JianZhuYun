<template>
  <div class="index">

  </div>
</template>

<script>
import myModule from '../../../common'

export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Index2'
    }
  },
  mounted () {
    console.log(myModule)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
