<template>
  <Card
    v-for="product in dataStore.products"
    :header="product.name_product"
    :key="product.id_product"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()

import Card from './common/Card.vue'

const allData = dataStore.getDataByStore(dataStore.storeToShow.id_store)

const allDataWithComputed = computed(() => {
  return dataStore.getDataByStore(dataStore.storeToShow.id_store)
})

// console.log('dataStore.storeToShow.id_store', dataStore.storeToShow.id_store)
console.log('allDataWithComputed', allDataWithComputed)
console.log('allData', allData)
</script>

<style scoped></style>
