<template>
  <div class="history">
    <div class="header">
      <span class="title">历史订单</span>
      <button class="homeBack" @click="$router.push('/')">返回Bridge</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "history",
  mounted () {
    this.$bridge.renderHistory(document.querySelector('.history'));
  }
}
</script>

<style scoped>
.history{
  background: #F7F8F9;
  overflow: hidden;
  min-height: 100vh;
}
.header{
  width: 1136px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}
.title{
  font-size: 23px;
  color: #333333;
  font-weight: 600;
}
.homeBack{
  width: 120px;
  height: 36px;
  opacity: 1;
  background: #0395bb;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  color: #ffffff;
}
</style>