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

<style>@import "../../styles/font.css";
  .van-field__body {
    height: 100%;
  }
  .van-field__control {
    height: 100%;
  }
  .cell-mb {
    margin-bottom: 0;
  }
</style>
