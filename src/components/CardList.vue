<template>
  <Card
    v-for="product in dataStore.products"
    :header="product.name_product"
    :key="product.id_product"
    :allData="allData"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()

const allData = computed(() => dataStore.getDataByStore)

import Card from './common/Card.vue'
</script>

<style scoped></style>
