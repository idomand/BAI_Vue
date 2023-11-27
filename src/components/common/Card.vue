<template>
  <v-container>
    <v-card class="mx-auto" max-width="344" color="indigo" :variant="tonal">
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">{{ props.header }}</div>
          <div class="text-caption">Greyhound divisely hello coldly fonwderfully</div>
        </div>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type Props = { header: string }

const props = defineProps<Props>()

const tonal = 'tonal'
</script>

<style scoped></style>
