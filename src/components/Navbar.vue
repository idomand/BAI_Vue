<template>
  <v-navigation-drawer>
    <v-btn
      @click="myFunc(store.id_store)"
      v-for="store in dataStore.stores"
      :key="store.id_store"
      variant="tonal"
    >
      {{ store.store_label }}
    </v-btn>

    <!-- <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="Sandra Adams"
        subtitle="sandra_a88@gmailcom"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder" title="My Files" value="myfiles"></v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple"
        title="Shared with me"
        value="shared"
      ></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list> -->
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDataStore } from '../stores/Data'

const dataStore = useDataStore()

const foo = dataStore.storeToShow

const myFunc = (someNumber: number) => {
  console.log('someNumber', someNumber)
  dataStore.changeStore(someNumber)
}

console.log('foo', foo[0].store_label)
</script>

<style scoped></style>
