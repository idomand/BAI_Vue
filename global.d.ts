export type StoresObjectType = {
  id_store: number
  store_label: string
  number_store: number
}
export type DeliveriesObjectType = {
  target_date: string
  id_store: number
  id_product: number
  delivery_qty: number
  delivery_value_by_price: number
}
export type ProductsObjectType = {
  id_product: number
  name_product: string
  number_product: number
  price: number
}

export type RecommendationsObjectType = {
  target_date: string
  id_store: number
  id_product: number
  recommendation: number
  recommendation_value_by_price: number
}
export type SalesObjectType = {
  target_date: string
  id_store: number
  id_product: number
  sales_qty: number
  sales_value: number
  demand_qty: number
  demand_value: number
}

export type ProductName = 'Croissant' | 'Black bread' | 'Danish pastry' | 'Grain roll'

export type GlobalStateType = {
  storesData: StoresObjectType[]
  deliveriesData: DeliveriesObjectType[]
  productsData: ProductsObjectType[]
  recommendationsData: RecommendationsObjectType[]
  salesData: SalesObjectType[]
  storeToShow: StoresObjectType
  productToShow: ProductsObjectType
}
