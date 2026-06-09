import { createTheme } from '@mui/material'

export const theme = createTheme({
  palette: {
    primary: { main: '#2563eb' },
    background: { default: '#f1f5f9' },
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  components: {
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: { border: '1px solid #e2e8f0' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: '#f8fafc',
            fontWeight: 600,
            color: '#475569',
            fontSize: 13,
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': { borderBottom: 0 },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: 500 },
      },
    },
  },
})
