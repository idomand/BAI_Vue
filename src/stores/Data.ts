import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import deliveriesArray from '../db/deliveries.json'
import productsArray from '../db/products.json'
import recommendationsArray from '../db/recommendations.json'
import salesArray from '../db/sales.json'
import storesArray from '../db/stores.json'

import type { StoresObjectType } from 'global'

export const useDataStore = defineStore('data', () => {
  const deliveries = ref(deliveriesArray)
  const products = ref(productsArray)
  const recommendations = ref(recommendationsArray)
  const sales = ref(salesArray)
  const stores = ref<StoresObjectType[]>(storesArray)
  const store_id = ref(100790000)

  const productToShow = ref({
    id_product: 100700034,
    name_product: 'Croissant',
    number_product: 22,
    price: 1.8
  })

  const changeStore = (newStoreId: number) => {
    store_id.value = newStoreId
  }

  const storeToShow = computed(() => {
    const bar = stores.value.filter((store) => store_id.value === store.id_store)
    console.log('bar', bar[0])
    return bar
  })

  return {
    deliveries,
    products,
    recommendations,
    sales,
    stores,
    storeToShow,
    productToShow,
    changeStore
  }
})
