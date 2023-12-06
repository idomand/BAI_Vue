<template>
  <v-container>
    <v-card class="mx-auto" width="200" color="indigo" :variant="tonal">
      <v-card-item>
        <div>
          <div class="text-h6 mb-1">{{ props.header }}</div>
          <div class="text-caption">Recommended: {{ allData.totalProductRecommended }}</div>
          <div class="text-caption">Delivered: {{ allData.totalProductDelivered }}</div>
          <div class="text-caption">Demand: {{ allData.totalProductDemand }}</div>
          <div class="text-caption">Sales: {{ allData.totalProductSales }}</div>
        </div>
      </v-card-item>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
type Props = {
  header: string
  allData: {
    totalProductDelivered: number
    totalProductRecommended: number
    totalProductSales: number
    totalProductDemand: number
  }
}

const props = defineProps<Props>()

const tonal = 'tonal'
</script>

<style scoped></style>
