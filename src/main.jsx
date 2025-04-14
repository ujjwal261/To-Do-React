import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'

axios.defaults.withCredentials = true;

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <App />
      <ToastContainer/>
  </StrictMode>,
)
