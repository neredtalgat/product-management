import { Button } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import type { Product } from '@entities/product'

interface Props {
  data: Product[]
}

const HEADERS: (keyof Product)[] = ['id', 'name', 'sku', 'price', 'stock', 'category', 'status']

export const ExportCsvButton = ({ data }: Props) => {
  const handleExport = () => {
    const rows = [
      HEADERS.join(','),
      ...data.map((p) => HEADERS.map((key) => p[key] ?? '').join(',')),
    ]

    const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'products.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Button size="small" startIcon={<DownloadIcon />} onClick={handleExport}>
      Экспорт CSV
    </Button>
  )
}
