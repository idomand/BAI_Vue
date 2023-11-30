<template>
  <Card header="Croissant" :allData="allData.totalCroissantData" />
  <Card header="Black Bread" :allData="allData.totalBlackBreadData" />
  <Card header="Danish Pastry" :allData="allData.totalDanishPastryData" />
  <Card header="Grain Roll" :allData="allData.totalGrainRollData" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()

const allData = computed(() => dataStore.getAllDataPerStore())

import Card from './common/Card.vue'
</script>

<style scoped></style>
