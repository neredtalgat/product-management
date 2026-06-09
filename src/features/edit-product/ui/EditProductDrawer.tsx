import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {useNotification} from '@shared/lib/notification'
import {
  Box, Button, CircularProgress, Drawer, MenuItem,
  Select, TextField, Typography, FormControl, InputLabel, FormHelperText,
} from '@mui/material'
import { productSchema, type ProductFormValues } from '../model/schema'
import { useCreateProductMutation, useUpdateProductMutation } from '@entities/product'
import type { Product } from '@entities/product'

interface Props {
  product?: Product   // теперь необязательный
  onClose: () => void
}

export const EditProductDrawer = ({ product, onClose }: Props) => {
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation()
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation()
  const isLoading = isCreating || isUpdating
  const isEditMode = !!product

  const notify = useNotification()

  const { control, handleSubmit, formState: { errors, isDirty } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name:     product?.name     ?? '',
      sku:      product?.sku      ?? '',
      price:    product?.price    ?? 0,
      stock:    product?.stock    ?? 0,
      category: product?.category ?? '',
      status:   product?.status   ?? 'draft',
    },
  })

  const onSubmit = async (values: ProductFormValues) => {
     try {
      if (isEditMode) {
      await updateProduct({ id: product.id, ...values }).unwrap()
      notify('Товар обновлен')
      } else {
        await createProduct({ ...values, updatedAt: new Date().toISOString() }).unwrap()
        notify("Товар создан")
      }
      onClose()
      } catch{
        notify('Что то пошло не так', 'error')
     }
    
    }

  return (
    <Drawer anchor="right" open onClose={onClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: 480, p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h6">
          {isEditMode ? 'Редактировать товар' : 'Новый товар'}
        </Typography>

        <Controller name="name" control={control} render={({ field }) => (
          <TextField {...field} label="Название" error={!!errors.name} helperText={errors.name?.message} fullWidth />
        )} />

        <Controller name="sku" control={control} render={({ field }) => (
          <TextField {...field} label="SKU" error={!!errors.sku} helperText={errors.sku?.message} fullWidth />
        )} />

        <Controller name="price" control={control} render={({ field }) => (
          <TextField {...field} label="Цена" type="number" error={!!errors.price} helperText={errors.price?.message} fullWidth />
        )} />

        <Controller name="stock" control={control} render={({ field }) => (
          <TextField {...field} label="Остаток" type="number" error={!!errors.stock} helperText={errors.stock?.message} fullWidth />
        )} />

        <Controller name="category" control={control} render={({ field }) => (
          <TextField {...field} label="Категория" error={!!errors.category} helperText={errors.category?.message} fullWidth />
        )} />

        <Controller name="status" control={control} render={({ field }) => (
          <FormControl fullWidth error={!!errors.status}>
            <InputLabel>Статус</InputLabel>
            <Select {...field} label="Статус">
              <MenuItem value="active">Активен</MenuItem>
              <MenuItem value="draft">Черновик</MenuItem>
              <MenuItem value="archived">Архив</MenuItem>
            </Select>
            <FormHelperText>{errors.status?.message}</FormHelperText>
          </FormControl>
        )} />

        <Button
          type="submit"
          variant="contained"
          disabled={(isEditMode && !isDirty) || isLoading}
          startIcon={isLoading ? <CircularProgress size={16} /> : null}
        >
          {isEditMode ? 'Сохранить' : 'Создать'}
        </Button>
      </Box>
    </Drawer>
  )
}
