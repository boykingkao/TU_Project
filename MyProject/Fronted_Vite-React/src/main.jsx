import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { ToastContainer } from 'react-toastify';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  // React.StrictMode ใช้สำหรับตรวจสอบปัญหาที่อาจเกิดขึ้นในโปรแกรม ทำให้เกิดการ fetch 2 ครั้ง
  // ไม่ต้องกังวล เพราะไม่มีปัญหาอะไรกับการทำโปรแกรม

  <div className='h-screen'>
  <React.StrictMode>

    
    <App />
    <ToastContainer />
  
  </React.StrictMode>,
  </div>


)
