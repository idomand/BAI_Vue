import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import deliveriesArray from '../db/deliveries.json'
import productsArray from '../db/products.json'
import recommendationsArray from '../db/recommendations.json'
import salesArray from '../db/sales.json'
import storesArray from '../db/stores.json'

export const useDataStore = defineStore('data', () => {
  const deliveries = ref(deliveriesArray)
  const products = ref(productsArray)
  const recommendations = ref(recommendationsArray)
  const sales = ref(salesArray)
  const stores = ref(storesArray)

  return { deliveries, products, recommendations, sales, stores }
})
