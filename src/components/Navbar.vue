<template>
  <v-navigation-drawer>
    <v-btn
      @click="dataStore.changeStore(store.id_store)"
      v-for="store in dataStore.stores"
      :key="store.id_store"
      variant="tonal"
      :active="store.id_store == dataStore.storeIdToShow"
      class="d-flex flex-column align-center justify-center mx-auto my-3 w-75"
    >
      {{ store.store_label }}
    </v-btn>
    <hr />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/Data'
const dataStore = useDataStore()
</script>

<style scoped></style>
