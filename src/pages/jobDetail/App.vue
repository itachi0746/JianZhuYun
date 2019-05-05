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
  .van-field--min-height .van-field__control {
    min-height: 2.2rem;
  }
  .van-dialog__confirm, .van-dialog__confirm:active {
    color: #00A7DD;
  }
</style>
