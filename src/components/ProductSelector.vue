<template>
  <div class="d-flex align-center flex-column bg-grey-lighten-4 pa-6">
    <v-btn-toggle v-model="toggle" divided>
      <v-btn
        @click="dataStore.changeProduct(product.id_product)"
        v-for="product in dataStore.products"
        :key="product.id_product"
        variant="outlined"
        :active="product.id_product == dataStore.productIdToShow"
      >
        {{ product.name_product }}
      </v-btn>
    </v-btn-toggle>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const toggle = ref(null)
import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()
</script>

<style scoped></style>
