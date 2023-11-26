<template>
  <h1>the header</h1>
  <v-btn prepend-icon="$vuetify" variant="outlined"> Button </v-btn>
</template>

<script setup lang="ts">
import { useDataStore } from '../stores/Data'

const dataStore = useDataStore()

console.log('dataStore :>> ', dataStore)
</script>

<style scoped></style>
