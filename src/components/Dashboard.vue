<template>
  <section class="header-section">
    <h2 class="header-title">Dashboard -{{ dataStore.storeToShow.store_label }}</h2>
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
