import { z } from 'zod'

export const skuSchema = z
  .string()
  .min(1, 'SKU обязателен')
  .regex(/^[A-Z0-9-]+$/, 'Только заглавные буквы, цифры и дефис')

export const priceSchema = z.coerce
  .number()
  .positive('Цена должна быть больше 0')

export const stockSchema = z.coerce
  .number()
  .int('Только целое число')
  .min(0, 'Не может быть отрицательным')

export const productStatusSchema = z.enum(['active', 'draft', 'archived'])
