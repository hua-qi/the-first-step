<template>
  <div class="about">
    <h1>This is an about page</h1>
    <son-view :instance="instance" />
  </div>
</template>

<script setup lang="ts">
import SonView from "./SonView.vue";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();
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
