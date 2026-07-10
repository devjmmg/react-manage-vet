import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app.css'
import { RouterProvider } from 'react-router-dom'
import router from '../router.jsx'
import { AuthProvider } from './context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
//   <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
//   </StrictMode>,
)
