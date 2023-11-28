<template>
  <v-navigation-drawer>
    <v-btn
      @click="dataStore.changeStore(store.id_store)"
      v-for="store in dataStore.stores"
      :key="store.id_store"
      variant="tonal"
    >
      {{ store.store_label }}
    </v-btn>
    <hr />
    <v-btn
      @click="dataStore.changeProduct(product.id_product)"
      v-for="product in dataStore.products"
      :key="product.id_product"
      variant="outlined"
    >
      {{ product.name_product }}
    </v-btn>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/Data'

const dataStore = useDataStore()
</script>

<style scoped></style>
