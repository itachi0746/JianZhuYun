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
  .van-cell:not(:last-child)::after {
    width: 90%;
  }
.van-cell__value {
  position: static;
}

</style>
