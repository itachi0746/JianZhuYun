<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .van-cell:not(:last-child)::after {
    width: 90%;
  }
  .van-cell__value {
    position: static;
  }
</style>
