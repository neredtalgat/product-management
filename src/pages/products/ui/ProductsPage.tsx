import { Box, Button, Container, Typography } from '@mui/material'
import { ProductTable } from '@widgets/product-table'
import { useState } from 'react'
import { ProductFilters } from '@widgets/product-filters'
import { EditProductDrawer } from '@features/edit-product'
import type { ProductFilters as Filters } from '@entities/product'

export const ProductsPage = () => {
  const [filters, setFilters] = useState<Filters>({})
  const [isCreating, setIsCreating] = useState(false)

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" sx={{fontWeight: 600}}>
          Управление товарами
        </Typography>
        <Button variant="contained" onClick={() => setIsCreating(true)}>
          + Добавить товар
        </Button>
      </Box>

      <ProductFilters filters={filters} onChange={setFilters} />
      <ProductTable filters={filters} />

      {isCreating && (
        <EditProductDrawer onClose={() => setIsCreating(false)} />
      )}
    </Container>
  )
}
