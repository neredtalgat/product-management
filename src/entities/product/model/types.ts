export type ProductStatus = 'active' | 'draft' | 'archived'

export interface Product {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  category: string
  status: ProductStatus
  imageUrl?: string
  updatedAt?: string
}

export interface ProductFilters {
  name?: string
  category?: string
  status?: ProductStatus
  minPrice?: number
  maxPrice?: number
}