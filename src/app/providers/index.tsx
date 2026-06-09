import { Provider } from 'react-redux'
import { store } from '@app/store'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export const Providers = ({children}: Props) =>{
  return <Provider store ={store}>{children}</Provider>
}
