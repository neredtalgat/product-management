import { Box, Button, Typography } from '@mui/material'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import type { Table } from '@tanstack/react-table'
import type { Product } from '@entities/product'
import { useDeleteProductMutation } from '@entities/product'

interface Props {
  table: Table<Product>
}

export const BulkActionsToolbar = ({ table }: Props) => {
  const [deleteProduct] = useDeleteProductMutation()

  const selectedRows = table.getSelectedRowModel().rows
  const count = selectedRows.length

  if (count === 0) return null

  const handleDelete = async () => {
    await Promise.all(selectedRows.map((row) => deleteProduct(row.original.id)))
    table.resetRowSelection()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, px: 2, py: 1, bgcolor: 'primary.50', borderRadius: 1 }}>
      <Typography variant="body2" fontWeight={500}>
        Выбрано: {count}
      </Typography>
      <Button
        size="small"
        color="error"
        startIcon={<DeleteOutlineIcon />}
        onClick={handleDelete}
      >
        Удалить
      </Button>
    </Box>
  )
}
