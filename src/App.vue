<template>
  <v-layout class="rounded rounded-md">
    <Navbar />

    <v-main class="d-flex flex-column align-center justify-center" style="min-height: 300px">
      <Dashboard />
      <InsightsGraph />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import Dashboard from './components/Dashboard.vue'
import Navbar from './components/Navbar.vue'
import InsightsGraph from './components/InsightsGraph.vue'
</script>

<style scoped></style>
