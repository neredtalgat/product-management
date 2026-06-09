import { Box, MenuItem, Select, TextField, InputLabel, FormControl } from '@mui/material'
import type { ProductFilters as Filters } from '@entities/product'

interface Props {
  filters: Filters
  onChange: (filters: Filters) => void
}

export const ProductFilters = ({ filters, onChange }: Props) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
      <TextField
        label="Поиск по названию"
        size="small"
        value={filters.name ?? ''}
        onChange={(e) => onChange({ ...filters, name: e.target.value || undefined })}
        sx={{ minWidth: 200 }}
      />

      <TextField
        label="Категория"
        size="small"
        value={filters.category ?? ''}
        onChange={(e) => onChange({ ...filters, category: e.target.value || undefined })}
        sx={{ minWidth: 160 }}
      />

      <FormControl size="small" sx={{ minWidth: 140 }}>
        <InputLabel>Статус</InputLabel>
        <Select
          label="Статус"
          value={filters.status ?? ''}
          onChange={(e) => onChange({ ...filters, status: (e.target.value as Filters['status']) || undefined })}
        >
          <MenuItem value="">Все</MenuItem>
          <MenuItem value="active">Активен</MenuItem>
          <MenuItem value="draft">Черновик</MenuItem>
          <MenuItem value="archived">Архив</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Цена от"
        size="small"
        type="number"
        value={filters.minPrice ?? ''}
        onChange={(e) => onChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
        sx={{ width: 110 }}
      />

      <TextField
        label="Цена до"
        size="small"
        type="number"
        value={filters.maxPrice ?? ''}
        onChange={(e) => onChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
        sx={{ width: 110 }}
      />
    </Box>
  )
}
