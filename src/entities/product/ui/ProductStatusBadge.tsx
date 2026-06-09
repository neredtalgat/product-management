import { Chip } from '@mui/material'
import type { ProductStatus } from '../model/types'

const config: Record<ProductStatus, { label: string; color: 'success' | 'warning' | 'default' }> = {
  active:   { label: 'Активен',  color: 'success' },
  draft:    { label: 'Черновик', color: 'warning' },
  archived: { label: 'Архив',    color: 'default' },
}

interface Props {
  status: ProductStatus
}

export const ProductStatusBadge = ({ status }: Props) => {
  const { label, color } = config[status]
  return <Chip label={label} color={color} size="small" />
}
