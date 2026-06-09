import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Box, Button, Chip, CircularProgress, Container,
  Divider, Paper, Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import { useGetProductByIdQuery, ProductImage, ProductStatusBadge } from '@entities/product'
import { EditProductDrawer } from '@features/edit-product'

export const ProductDetailPage = () => {
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()
    const [isEditing, setIsEditing] = useState(false)

    const {data: product, isLoading} = useGetProductByIdQuery(id!)

    if(isLoading) return (
        <Box display = "flex" justifyContent = "center" mt = {8}>
            <CircularProgress />
        </Box>
    )

    if(!product) return(
        <Container maxWidth = "sm" sx = {{ py: 4 }}>
            <Typography>Товар не найден</Typography>
            <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>Назад</Button>
        </Container>
    )

    return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Назад
      </Button>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
          <ProductImage product={product} sx={{ width: 80, height: 80, fontSize: 32 }} />

          <Box flex={1}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
              >
                Редактировать
              </Button>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary">SKU</Typography>
                <Typography>{product.sku}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Статус</Typography>
                <Box mt={0.5}><ProductStatusBadge status={product.status} /></Box>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Цена</Typography>
                <Typography variant="h6">${product.price.toFixed(2)}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Остаток</Typography>
                <Typography variant="h6">{product.stock} шт.</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary">Категория</Typography>
                <Box mt={0.5}><Chip label={product.category} size="small" /></Box>
              </Box>
              {product.updatedAt && (
                <Box>
                  <Typography variant="caption" color="text.secondary">Обновлён</Typography>
                  <Typography>{new Date(product.updatedAt).toLocaleDateString('ru-RU')}</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>

      {isEditing && (
        <EditProductDrawer product={product} onClose={() => setIsEditing(false)} />
      )}
    </Container>
  )
}