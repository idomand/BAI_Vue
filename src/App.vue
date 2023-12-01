<template>
  <v-layout class="rounded rounded-md">
    <Navbar />

    <v-main class="d-flex flex-column align-center justify-center" style="min-height: 300px">
      <Dashboard />
      <ProductSelector />
      <InsightsGraph />
      <RawDataGraph />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import Dashboard from './components/Dashboard.vue'
import Navbar from './components/Navbar.vue'
import InsightsGraph from './components/InsightsGraph.vue'
import RawDataGraph from './components/RawDataGraph.vue'
import ProductSelector from './components/ProductSelector.vue'
</script>

<style scoped></style>
