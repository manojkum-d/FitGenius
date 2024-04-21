import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import 'tailwindcss/tailwind.css';
import './index.css'
import 'tailwindcss/tailwind.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer/>
  </React.StrictMode>,
)
