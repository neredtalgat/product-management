import { Provider } from 'react-redux'
import { store } from '@app/store'
import type { ReactNode } from 'react'
import {NotificationProvider} from '@shared/lib/notification'
import { ThemeProvider, CssBaseline} from '@mui/material'
import { theme } from '@app/styles/theme'

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
