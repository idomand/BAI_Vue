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

  //todo -- (remove this helper function and find a way do just use the StoreToShow computed function )
  const changeStore = (newStoreId: number) => {
    store_id.value = newStoreId
  }

  const storeToShow = computed(() => {
    const bar = stores.value.filter((store) => store_id.value === store.id_store)
    return bar[0]
  })

  // !====================================================================
  function getFilteredDataByStoreAndProduct(store_id: number, product_id: number) {
    const arrayOfAllProductRecommended = recommendations.value.filter((recommendation) => {
      return recommendation.id_store == store_id && recommendation.id_product == product_id
    })
    const arrayOfAllProductDelivered = deliveries.value.filter((recommendation) => {
      recommendation.delivery_qty
      return recommendation.id_store == store_id && recommendation.id_product == product_id
    })
    const arrayOfAllProductSales = sales.value.filter((recommendation) => {
      return recommendation.id_store == store_id && recommendation.id_product == product_id
    })
    return {
      arrayOfAllProductRecommended,
      arrayOfAllProductDelivered,
      arrayOfAllProductSales
    }
  }
  // !====================================================================
  // ?====================================================================
  function getTotalDataByProduct(store_id: number, product_id: number) {
    const { arrayOfAllProductDelivered, arrayOfAllProductRecommended, arrayOfAllProductSales } =
      getFilteredDataByStoreAndProduct(product_id, store_id)

    const totalProductSales = arrayOfAllProductSales.reduce(
      (accumulator, salesObject) => accumulator + salesObject.sales_qty,
      0
    )
    const totalProductDemand = arrayOfAllProductSales.reduce(
      (accumulator, salesObject) => accumulator + salesObject.demand_qty,
      0
    )

    const totalProductDelivered = arrayOfAllProductDelivered.reduce(
      (accumulator, deliveredObject) => accumulator + deliveredObject.delivery_qty,
      0
    )

    const totalProductRecommended = arrayOfAllProductRecommended.reduce(
      (accumulator, RecommendedObject) => accumulator + RecommendedObject.recommendation,
      0
    )

    return {
      totalProductDelivered,
      totalProductRecommended,
      totalProductSales,
      totalProductDemand
    }
  }

  // ?====================================================================
  // *====================================================================
  function getDataByStore(store_id: number) {
    const {
      totalProductRecommended: totalCroissantRecommended,
      totalProductDelivered: totalCroissantDelivered,
      totalProductDemand: totalCroissantDemand,
      totalProductSales: totalCroissantSales
    } = getTotalDataByProduct(100700034, store_id)

    const {
      totalProductRecommended: totalBreadRecommended,
      totalProductDelivered: totalBreadDelivered,
      totalProductDemand: totalBreadDemand,
      totalProductSales: totalBreadSales
    } = getTotalDataByProduct(100700070, store_id)

    const {
      totalProductRecommended: totalPastryRecommended,
      totalProductDelivered: totalPastryDelivered,
      totalProductDemand: totalPastryDemand,
      totalProductSales: totalPastrySales
    } = getTotalDataByProduct(100700080, store_id)

    const {
      totalProductRecommended: totalRollRecommended,
      totalProductDelivered: totalRollDelivered,
      totalProductDemand: totalRollDemand,
      totalProductSales: totalRollSales
    } = getTotalDataByProduct(100700091, store_id)

    const croissantData = {
      totalCroissantDelivered,
      totalCroissantRecommended,
      totalCroissantDemand,
      totalCroissantSales
    }

    const breadData = {
      totalBreadDelivered,
      totalBreadRecommended,
      totalBreadDemand,
      totalBreadSales
    }
    const pastryData = {
      totalPastryDelivered,
      totalPastryRecommended,
      totalPastryDemand,
      totalPastrySales
    }
    const rollData = {
      totalRollDelivered,
      totalRollRecommended,
      totalRollDemand,
      totalRollSales
    }

    return { croissantData, breadData, pastryData, rollData }
  }

  // *====================================================================
  // !====================================================================
  // !====================================================================

  return {
    deliveries,
    products,
    recommendations,
    sales,
    stores,
    storeToShow,
    productToShow,
    changeStore,
    getTotalDataByProduct,
    getFilteredDataByStoreAndProduct,
    getDataByStore
  }
})
