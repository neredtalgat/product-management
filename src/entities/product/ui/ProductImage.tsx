import { Avatar } from '@mui/material'
import type { Product } from '../model/types'

interface Props {
  product: Pick<Product, 'name' | 'imageUrl'>
}

export const ProductImage = ({ product }: Props) => (
  <Avatar src={product.imageUrl} alt={product.name} variant="rounded" sx={{ width: 40, height: 40 }}>
    {product.name[0].toUpperCase()}
  </Avatar>
)
