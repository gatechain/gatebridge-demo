<template>
    <div class="home">
      <div class="header">
         <span class="title">Bridge</span>
         <span class="history" @click="$router.push('/history')">交易历史</span>
      </div>
    </div>
</template>

<script>
export default {
  name: "home",
  mounted () {
    this.$bridge.renderExchange(document.querySelector('.home'));
  }
}
</script>

<style scoped >
.home{
  background: #F7F8F9;
  overflow: hidden;
  padding-bottom: 30px;
}

.header{
  width: 720px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
}

.title{
  font-size: 23px;
  color: #333333;
  font-weight: 600;
}

.history{
  font-weight: 500;
  color: #0395bb;
  cursor: pointer;
}
</style>