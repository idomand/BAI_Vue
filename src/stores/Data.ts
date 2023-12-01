import { defineStore } from 'pinia'
import deliveriesArray from '../db/deliveries.json'
import productsArray from '../db/products.json'
import recommendationsArray from '../db/recommendations.json'
import salesArray from '../db/sales.json'
import storesArray from '../db/stores.json'

import type {
  StoresObjectType,
  RecommendationsObjectType,
  DeliveriesObjectType,
  SalesObjectType,
  ProductsObjectType
} from 'global'

export const useDataStore = defineStore('data', {
  state() {
    return {
      deliveries: deliveriesArray,
      products: productsArray,
      recommendations: recommendationsArray,
      sales: salesArray,
      stores: storesArray,
      storeIdToShow: 100790000,
      productIdToShow: 100700034
    }
  },
  getters: {
    storeToShow() {
      const arrayOfStores: StoresObjectType[] = this.stores.filter((store) => {
        return store.id_store === this.storeIdToShow
      })
      return arrayOfStores[0]
    },
    productToShow() {
      const arrayOfProducts: ProductsObjectType[] = this.products.filter((product) => {
        return product.id_product == this.productIdToShow
      })
      return arrayOfProducts[0]
    },

    FilteredDataByStoreAndProduct() {
      const arrayOfAllProductRecommended: RecommendationsObjectType[] = this.recommendations.filter(
        (recommendation) =>
          recommendation.id_store == this.storeIdToShow &&
          recommendation.id_product == this.productIdToShow
      )

      const arrayOfAllProductDelivered: DeliveriesObjectType[] = this.deliveries.filter(
        (delivery) => {
          delivery.delivery_qty
          return (
            delivery.id_store == this.storeIdToShow && delivery.id_product == this.productIdToShow
          )
        }
      )

      const arrayOfAllProductSales: SalesObjectType[] = this.sales.filter(
        (recommendation) =>
          recommendation.id_store == this.storeIdToShow &&
          recommendation.id_product == this.productIdToShow
      )

      return { arrayOfAllProductDelivered, arrayOfAllProductRecommended, arrayOfAllProductSales }
    },

    getTotalDataByProduct() {
      const { arrayOfAllProductDelivered, arrayOfAllProductRecommended, arrayOfAllProductSales } =
        this.FilteredDataByStoreAndProduct

      const totalProductSales: number = arrayOfAllProductSales.reduce(
        (accumulator, salesObject) => accumulator + salesObject.sales_qty,
        0
      )
      const totalProductDemand: number = arrayOfAllProductSales.reduce(
        (accumulator, salesObject) => accumulator + salesObject.demand_qty,
        0
      )

      const totalProductDelivered: number = arrayOfAllProductDelivered.reduce(
        (accumulator, deliveredObject) => accumulator + deliveredObject.delivery_qty,
        0
      )

      const totalProductRecommended: number = arrayOfAllProductRecommended.reduce(
        (accumulator, RecommendedObject) => accumulator + RecommendedObject.recommendation,
        0
      )

      return {
        totalProductDelivered,
        totalProductRecommended,
        totalProductSales,
        totalProductDemand
      }
    },

    getInsightsByProduct() {
      const { arrayOfAllProductDelivered, arrayOfAllProductRecommended, arrayOfAllProductSales } =
        this.FilteredDataByStoreAndProduct

      // console.log(this.productToShow.name_product)
      // console.log(this.storeToShow.store_label)

      type MergedData = {
        target_date: string
        id_store: number
        id_product: number
        recommendation: number
        delivery_qty: number
        sales_qty: number
        demand_qty: number
      }

      function combineArrays(
        array1: DeliveriesObjectType[],
        array2: RecommendationsObjectType[],
        array3: SalesObjectType[]
      ): MergedData[] {
        const map = new Map<string, MergedData>()

        for (const item of array1) {
          const key = `${item.target_date}_${item.id_store}_${item.id_product}`
          if (!map.has(key)) {
            map.set(key, {
              target_date: item.target_date,
              id_store: item.id_store,
              id_product: item.id_product,
              recommendation: 0,
              sales_qty: 0,
              demand_qty: 0,
              delivery_qty: item.delivery_qty
            })
          } else {
            const existingItem = map.get(key)!
            existingItem.delivery_qty += item.delivery_qty
          }
        }

        for (const item of array2) {
          const key = `${item.target_date}_${item.id_store}_${item.id_product}`
          if (map.has(key)) {
            const existingItem = map.get(key)!
            existingItem.recommendation = item.recommendation
          }
        }
        for (const item of array3) {
          const key = `${item.target_date}_${item.id_store}_${item.id_product}`
          if (map.has(key)) {
            const existingItem = map.get(key)!
            existingItem.demand_qty = item.demand_qty
            existingItem.sales_qty = item.sales_qty
          }
        }
        const resultArray = [...map.values()]

        return resultArray
      }

      const mergeData = combineArrays(
        arrayOfAllProductDelivered,
        arrayOfAllProductRecommended,
        arrayOfAllProductSales
      )

      const formattedMergedData = mergeData.map((element) => {
        const [, month, day] = element.target_date.split('-')
        const newDate = `${day}-${month}`
        element.target_date = newDate
        return element
      })

      type InsightArray = MergedData & {
        variance: number
        IsBadRecommendation: boolean
      }

      function checkIfRecommendationIsBad(
        recommendation: number,
        demand_qty: number,
        delivery_qty: number
      ) {
        let IsBadRecommendation
        const diffToRecommendation = Math.abs(demand_qty - recommendation)
        const diffToDeliveryQty = Math.abs(demand_qty - delivery_qty)
        if (diffToRecommendation <= diffToDeliveryQty) {
          IsBadRecommendation = false
        } else {
          IsBadRecommendation = true
        }
        return IsBadRecommendation
      }

      const newArray: InsightArray[] = formattedMergedData.map((element: any) => {
        element.variance = Math.abs(element.recommendation - element.delivery_qty)

        element.IsBadRecommendation = checkIfRecommendationIsBad(
          element.recommendation,
          element.demand_qty,
          element.delivery_qty
        )
        return element
      })

      return newArray
    },
    getRawDateByStoreAndTime() {
      const { arrayOfAllProductDelivered, arrayOfAllProductRecommended, arrayOfAllProductSales } =
        this.FilteredDataByStoreAndProduct

      type MergedData = {
        target_date: string
        id_store: number
        id_product: number
        recommendation: number
        delivery_qty: number
        sales_qty: number
        demand_qty: number
      }
      function combineArrays(
        array1: DeliveriesObjectType[],
        array2: RecommendationsObjectType[],
        array3: SalesObjectType[]
      ): MergedData[] {
        const map = new Map<string, MergedData>()

        for (const item of array1) {
          const key = `${item.target_date}_${item.id_store}_${item.id_product}`
          if (!map.has(key)) {
            map.set(key, {
              target_date: item.target_date,
              id_store: item.id_store,
              id_product: item.id_product,
              recommendation: 0,
              sales_qty: 0,
              demand_qty: 0,
              delivery_qty: item.delivery_qty
            })
          } else {
            const existingItem = map.get(key)!
            existingItem.delivery_qty += item.delivery_qty
          }
        }

        for (const item of array2) {
          const key = `${item.target_date}_${item.id_store}_${item.id_product}`
          if (map.has(key)) {
            const existingItem = map.get(key)!
            existingItem.recommendation = item.recommendation
          }
        }
        for (const item of array3) {
          const key = `${item.target_date}_${item.id_store}_${item.id_product}`
          if (map.has(key)) {
            const existingItem = map.get(key)!
            existingItem.demand_qty = item.demand_qty
            existingItem.sales_qty = item.sales_qty
          }
        }
        const resultArray = [...map.values()]

        return resultArray
      }
      const mergeData = combineArrays(
        arrayOfAllProductDelivered,
        arrayOfAllProductRecommended,
        arrayOfAllProductSales
      )

      const formattedMergedData = mergeData.map((element) => {
        const [, month, day] = element.target_date.split('-')
        const newDate = `${day}-${month}`
        element.target_date = newDate
        return element
      })
      return formattedMergedData
    }
  },
  actions: {
    changeStore(newStoreId: number) {
      this.storeIdToShow = newStoreId
    },
    changeProduct(newProductId: number) {
      this.productIdToShow = newProductId
    },
    getAllDataPerStore() {
      const currentProduct = this.productIdToShow
      this.changeProduct(this.products[0].id_product)
      const totalCroissantData = this.getTotalDataByProduct
      this.changeProduct(this.products[1].id_product)
      const totalBlackBreadData = this.getTotalDataByProduct
      this.changeProduct(this.products[2].id_product)
      const totalDanishPastryData = this.getTotalDataByProduct
      this.changeProduct(this.products[3].id_product)
      const totalGrainRollData = this.getTotalDataByProduct
      this.changeProduct(currentProduct)

      return { totalCroissantData, totalBlackBreadData, totalDanishPastryData, totalGrainRollData }
    }
  }
})
