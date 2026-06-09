import { Provider } from 'react-redux'
import { store } from '@app/store'
import type { ReactNode } from 'react'
import {NotificationProvider} from '@shared/lib/notification'
import { ThemeProvider, createTheme, CssBaseline} from '@mui/material'

const theme = createTheme()

interface Props {
  children: ReactNode
}

export const Providers = ({children}: Props) =>{
  return (
  <Provider store ={store}>
    <ThemeProvider theme = {theme}>
      <CssBaseline />
        <NotificationProvider>
          {children}
        </NotificationProvider>
    </ThemeProvider>
  </Provider>
  )
}
