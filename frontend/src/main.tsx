import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from 'react-toastify'
import RenderProvider from './Context/RenderContext.tsx'

createRoot(document.getElementById('root')!).render(
    <RenderProvider>
        <BrowserRouter>
            <StrictMode>
                <App />
            </StrictMode>
            <ToastContainer 
            position='top-right'
            newestOnTop
            />
        </BrowserRouter>
    </RenderProvider>
    
)
