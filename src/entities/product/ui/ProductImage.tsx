import { Avatar, type SxProps, type Theme } from '@mui/material'
import type { Product } from '../model/types'

interface Props {
  product: Pick<Product, 'name' | 'imageUrl'>
  sx?: SxProps<Theme>
}

export const ProductImage = ({ product, sx }: Props) => (
  <Avatar src={product.imageUrl} alt={product.name} variant="rounded" sx={{ width: 40, height: 40, ...sx }}>
    {product.name[0].toUpperCase()}
  </Avatar>
)
