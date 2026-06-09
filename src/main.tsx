import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Providers } from '@app/providers'
import { ProductsPage } from '@pages/products'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <ProductsPage />
    </Providers>
  </StrictMode>,
)