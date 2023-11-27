<template>
  <section class="header-section">
    <h2 class="header-title">Dashboard</h2>
    <div class="d-flex">
      <CardList />
      <Card
        v-for="product in dataStore.products"
        :header="product.name_product"
        :key="product.id_product"
      />
    </div>
  </section>
  <v-btn prepend-icon="$vuetify" variant="outlined"> Button </v-btn>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/Data'
import Card from './common/Card.vue'
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
