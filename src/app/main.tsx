//main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './styles/index.css'
import { BrowserRouter} from 'react-router-dom'
import { StoreProvider } from './providers/StoreProvider'
import { ThemeProvider } from './providers/ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  </React.StrictMode>
)