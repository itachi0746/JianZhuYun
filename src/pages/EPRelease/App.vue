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
.input-class2 .van-field__control {
  text-align: right;
  color: #666666;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding-right: 20px;
}
</style>
