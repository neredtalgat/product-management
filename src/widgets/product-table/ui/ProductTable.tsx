import { useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table'
import {
  Box, Checkbox, IconButton, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import { useGetProductsQuery, useDeleteProductMutation, ProductStatusBadge, ProductImage } from '@entities/product'
import type { Product } from '@entities/product'
import { BulkActionsToolbar } from '@features/bulk-actions'
import { ExportCsvButton } from '@features/export-csv'
import { EditProductDrawer } from '@features/edit-product'

const col = createColumnHelper<Product>()

export const ProductTable = () => {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [sorting, setSorting] = useState<SortingState>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const { data: products = [], isLoading } = useGetProductsQuery({})
  const [deleteProduct] = useDeleteProductMutation()

  const columns = useMemo(() => [
    col.display({
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),

    col.display({
      id: 'product',
      header: 'Товар',
      cell: ({ row }) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ProductImage product={row.original} />
          <Box>
            <Box fontWeight={500}>{row.original.name}</Box>
            <Box fontSize={12} color="text.secondary">{row.original.sku}</Box>
          </Box>
        </Box>
      ),
    }),

    col.accessor('price', {
      header: 'Цена',
      cell: (info) => `$${info.getValue().toFixed(2)}`,
    }),

    col.accessor('stock', {
      header: 'Остаток',
      cell: (info) => info.getValue(),
    }),

    col.accessor('status', {
      header: 'Статус',
      cell: (info) => <ProductStatusBadge status={info.getValue()} />,
      enableSorting: false,
    }),

    col.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Редактировать">
            <IconButton size="small" onClick={() => setEditingProduct(row.original)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Удалить">
            <IconButton size="small" color="error" onClick={() => deleteProduct(row.original.id)}>
              <DeleteOutlineIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    }),
  ], [deleteProduct])

  const table = useReactTable({
    data: products,
    columns,
    state: { rowSelection, sorting },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(products.length / rowsPerPage),
  })

  if (isLoading) return <Box p={3}>Загрузка...</Box>

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <BulkActionsToolbar table={table} />
        <ExportCsvButton data={products} />
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell key={header.id}>
                    {header.column.getCanSort() ? (
                      <TableSortLabel
                        active={!!header.column.getIsSorted()}
                        direction={header.column.getIsSorted() || 'asc'}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </TableSortLabel>
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} selected={row.getIsSelected()} hover>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={products.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, newPage) => {
          setPage(newPage)
          table.setPageIndex(newPage)
        }}
        onRowsPerPageChange={(e) => {
          const val = parseInt(e.target.value)
          setRowsPerPage(val)
          table.setPageSize(val)
          setPage(0)
        }}
      />

      {editingProduct && (
        <EditProductDrawer
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </Box>
  )
}
