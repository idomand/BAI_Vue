import { getFilteredDataByStoreAndProduct } from './getFilteredDataByStoreAndProduct'
type Props = {
  store_id: number
  product_id: number
}

export function getTotalDataByProduct({ store_id, product_id }: Props) {
  const { arrayOfAllProductDelivered, arrayOfAllProductRecommended, arrayOfAllProductSales } =
    getFilteredDataByStoreAndProduct({
      product_id: product_id,
      store_id: store_id
    })

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
