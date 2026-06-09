import { Container, Typography } from '@mui/material'
import { ProductTable } from '@widgets/product-table'

export const ProductsPage = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Управление товарами
      </Typography>
      <ProductTable />
    </Container>
  )
}
