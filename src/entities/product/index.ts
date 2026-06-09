export type { Product, ProductStatus, ProductFilters } from './model/types'
export {
  productApi,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation
} from './model/productApi'
export { ProductStatusBadge } from './ui/ProductStatusBadge'
export { ProductImage } from './ui/ProductImage'