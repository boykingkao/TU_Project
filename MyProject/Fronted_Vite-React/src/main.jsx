import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
// import store from './store'
import App from './App'
import { ToastContainer } from 'react-toastify';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  // React.StrictMode ใช้สำหรับตรวจสอบปัญหาที่อาจเกิดขึ้นในโปรแกรม ทำให้เกิดการ fetch 2 ครั้ง
  // ไม่ต้องกังวล เพราะไม่มีปัญหาอะไรกับการทำโปรแกรม

  // <Provider store={store}>

  <div className='h-screen bg-gradient-to-b from-indigo-700 from-10% via-sky-500 via-20% to-blue-300 to-90% min-h-full overflow-y-auto touch-auto'>
    <React.StrictMode>
      <App className="" />
      <ToastContainer />

    </React.StrictMode>,
  </div>
  // </Provider>


)
