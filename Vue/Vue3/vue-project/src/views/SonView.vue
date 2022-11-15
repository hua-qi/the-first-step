<template>
  <div class="about">
    <component :is="instance" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["instance"]);

console.log(props.instance);
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
