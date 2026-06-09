import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { Providers } from '@app/providers'
import { ProductsPage } from '@pages/products'
import { ProductDetailPage } from '@pages/product-detail'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<ProductsPage/>} />
        <Route path = "/products/:id" element = {<ProductDetailPage/>} />
      </Routes>
      </BrowserRouter>
    </Providers>
  </StrictMode>,
)