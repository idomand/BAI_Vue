<template>
  <v-app>
    <Header />
    <h1>test</h1>
    <TestComponent />
  </v-app>
</template>

<script setup lang="ts">
import TestComponent from './components/TestComponent.vue'
import Header from './components/Header.vue'
</script>

<style scoped>
h1 {
  color: red;
}
</style>
