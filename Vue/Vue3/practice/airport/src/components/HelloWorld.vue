<template>
    <div class="airport-panel">
        <div class="header">
            机场信息
            <div class="close-btn"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .header {
        background: url(../assets/images/bg.png);
    }
</style>
