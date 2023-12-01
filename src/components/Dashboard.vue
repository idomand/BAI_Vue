<template>
  <section class="header-section">
    <h3>
      Dashboard -{{ dataStore.storeToShow.store_label }} -
      {{ dataStore.productToShow.name_product }}
    </h3>
    <div class="d-flex">
      <CardList />
    </div>
  </section>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/Data'
import CardList from './CardList.vue'
const dataStore = useDataStore()
</script>

<style scoped></style>
