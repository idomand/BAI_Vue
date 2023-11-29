<template>
  <!-- <Card
    v-for="product in dataStore.products"
    :header="product.name_product"
    :key="product.id_product"
    :allData="allData"
  /> -->
  <Card header="Croissant" :allData="allData.totalCroissantData" />
  <Card header="Black Bread" :allData="allData.totalBlackBreadData" />
  <Card header="Danish Pastry" :allData="allData.totalDanishPastryData" />
  <Card header="Grain Roll" :allData="allData.totalGrainRollData" />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()

// const allData = computed(() => dataStore.getDataByStore)

const allData = computed(() => dataStore.getAllDataPerStore())
console.log('allData', allData.value)

import Card from './common/Card.vue'
</script>

<style scoped></style>
