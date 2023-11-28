<template>
  <section class="header-section">
    <h1 class="header-title">Dashboard -</h1>
    <h2>{{ dataStore.storeToShow.store_label }} - {{ dataStore.productToShow.name_product }}</h2>
    <div class="d-flex">
      <CardList />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDataStore } from '../stores/Data'
import CardList from './CardList.vue'
const dataStore = useDataStore()
</script>

<style scoped>
.header-section {
  margin: 16px 0px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.header-title {
  margin: 0px 0px 8px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  line-height: 42px;
}
</style>
