import { z } from 'zod'
import { skuSchema, priceSchema, stockSchema, productStatusSchema } from '@shared/lib/schemas'

export const productSchema = z.object({
  name:     z.string().min(2, 'Минимум 2 символа'),
  sku:      skuSchema,
  price:    priceSchema,
  stock:    stockSchema,
  category: z.string().min(1, 'Выберите категорию'),
  status:   productStatusSchema,
})

export type ProductFormValues = z.infer<typeof productSchema>
