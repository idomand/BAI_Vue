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
        (recommendation) => {
          return (
            recommendation.id_store == this.storeIdToShow &&
            recommendation.id_product == this.productIdToShow
          )
        }
      )

      const arrayOfAllProductDelivered: DeliveriesObjectType[] = this.deliveries.filter(
        (delivery) => {
          delivery.delivery_qty
          return (
            delivery.id_store == this.storeIdToShow && delivery.id_product == this.productIdToShow
          )
        }
      )

      const arrayOfAllProductSales: SalesObjectType[] = this.sales.filter((recommendation) => {
        return (
          recommendation.id_store == this.storeIdToShow &&
          recommendation.id_product == this.productIdToShow
        )
      })

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
    // todo -- THIS CODE IS NOT WORKING
    // getAllDataPerStore2() {
    //   this.changeProduct(this.products[0].id_product)
    //   const totalCroissantData = this.getTotalDataByProduct
    //   this.changeProduct(this.products[1].id_product)
    //   const totalBlackBreadData = this.getTotalDataByProduct
    //   this.changeProduct(this.products[2].id_product)
    //   const totalDanishPastryData = this.getTotalDataByProduct
    //   this.changeProduct(this.products[3].id_product)
    //   const totalGrainRollData = this.getTotalDataByProduct

    //   return { totalCroissantData, totalBlackBreadData, totalDanishPastryData, totalGrainRollData }
    // },

    //todo ===== find a way to run this function on every product at the same time
    getDataByStore() {
      const croissantData = this.getTotalDataByProduct
      return croissantData
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
      this.changeProduct(this.products[0].id_product)
      const totalCroissantData = this.getTotalDataByProduct
      this.changeProduct(this.products[1].id_product)
      const totalBlackBreadData = this.getTotalDataByProduct
      this.changeProduct(this.products[2].id_product)
      const totalDanishPastryData = this.getTotalDataByProduct
      this.changeProduct(this.products[3].id_product)
      const totalGrainRollData = this.getTotalDataByProduct

      return { totalCroissantData, totalBlackBreadData, totalDanishPastryData, totalGrainRollData }
    }
  }
})
