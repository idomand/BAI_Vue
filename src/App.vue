<!-- <template>
  <v-app>
    <Navbar />
    <Dashboard />
  </v-app>
</template>

<template>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar title="Application bar"></v-app-bar>

    <v-main class="d-flex align-center justify-center" style="min-height: 300px;">
      Main Content
    </v-main>
  </v-layout>
</template> -->
<template>
  <v-layout class="rounded rounded-md">
    <Navbar />
    <!-- <v-navigation-drawer>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-main class="d-flex align-center justify-center" style="min-height: 300px">
      <Dashboard />
    </v-main>
  </v-layout>
</template>

<script setup lang="ts">
import Dashboard from './components/Dashboard.vue'
import Navbar from './components/Navbar.vue'
</script>

<style scoped>
h1 {
  color: red;
}
</style>
