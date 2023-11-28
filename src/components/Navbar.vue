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
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/Data'

const dataStore = useDataStore()
</script>

<style scoped></style>
