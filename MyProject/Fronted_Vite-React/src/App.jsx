import { useState, useEffect } from 'react'

import './App.css'
import { BrowserRouter, NavLink, Routes, Route, Navigate, Link } from "react-router-dom"


// Pages

import TU_Login from "./components/TU_Login"
import About from "./components/About"
import HomeNew from "./pages/HomeNew"
import Home from "./pages/Home"
import Product from "./components/Product"
import Profile from "./components/Profile"
import Test from "./components/Test"
import Error from "./components/Error"
import AddProduct from './components/AddProduct'
import Chat from './components/Chat'

import Firebase_auth from "./components/Firebase_auth"
import MyProducts from './components/MyProducts'
import Dashboard from './components/Dashboard'


import Upload from './components/Upload'


function App() {
  const [count, setCount] = useState(0)

  const [loggedIn, setLoggedIn] = useState(localStorage?.getItem("user_data") ? true : false)


  useEffect(() => {
    localStorage?.getItem("user_data") ? setLoggedIn(true) : setLoggedIn(false)
  }, [])


  const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
      setIsOpen(!isOpen);
    };
  }




  const navigations_path = [
    { path: "/", name: "Shop" },
    { path: "/addProduct", name: "วางขายสินค้า" },
    { path: "/chat", name: "chat" },
    { path: "/about", name: "About" },

    { path: "/login_firebase", name: "Login" },
    { path: "/dashboard", name: "Dashboard" },
    { path: "/myproducts", name: "MyProducts" },




  ]


// overflow-hidden
  return (
    <div className=' bg-gradient-to-b from-indigo-700 from-10% via-sky-500 via-70% to-blue-300 to-90% min-h-full overflow-y-auto '>

      <BrowserRouter>


        <div className=''>
          <nav className="mt-4 mx-4  py-4 rounded-3xl bg-gray-200 space-x-4 drop-shadow-[0_35px_35px_rgba(0,0,0,0.30)] ">
            {navigations_path.map((item, index) =>

              <div className="" key={index} >
                <NavLink className=" w-48 h-24    rounded-3xl flex items-center justify-center text-3xl bg-gray-800 text-white  hover:bg-slate-600 hover:text-white active:bg-orange-600 hover:scale-125" key={index} to={item.path}>{item.name}</NavLink>
              </div>


            )
            }
          </nav>
        </div>



        <br />
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route path="/" element={<HomeNew />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/product/:productName" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/chat" element={loggedIn ? <Chat /> : <Navigate to="/login_firebase" />} />
          <Route path="/TU_login" element={<TU_Login />} />
          <Route path="/login_firebase" element={<Firebase_auth />} />
          <Route path="/myproducts" element={loggedIn ? <MyProducts /> :  <Navigate to="/login_firebase" />} />
          <Route path="*" element={<Error />} />



        </Routes>

      </BrowserRouter>

      <footer className="bg-gray-900 text-gray-300 py-4 fixed bottom-0 w-full">
      <div className="container mx-auto px-4">
        <p className="text-center">&copy;2023 TU Shop.</p>
      </div>
    </footer>
    </div>
  )
}

export default App
