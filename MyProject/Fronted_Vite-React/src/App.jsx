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
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  // เปลี่ยนแค่ user_data.type เป็น "admin"


  useEffect(() => {
    localStorage?.getItem("user_data") ? setLoggedIn(true) : setLoggedIn(false)
    
    const userData = JSON.parse(localStorage.getItem("user_data")? localStorage.getItem("user_data") : "{}")
    // console.log(json.type)
    setIsAdmin(userData.userType == "admin" ? true : false)
  }, [isAdmin])






  const navigations_path = [
    // { path: "/", name: "Shop" },
    { path: "/addProduct", name: "วางขายสินค้า" },
    { path: "/chat", name: "chat" },
    { path: "/about", name: "About" },

    { path: "/login_firebase", name: "Login" },
    { path: "/dashboard", name: "Dashboard" },
    { path: "/myproducts", name: "MyProducts" },




  ]

  function Navbar() {
    
    return (
      <nav className="fixed top-0 select-none bg-grey lg:flex lg:items-stretch w-full  bg-white   ">
        <div className="flex flex-no-shrink items-stretch h-12 bg-white  m-2 rounded-md ">
          <NavLink className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-Black no-underline flex items-center hover:bg-slate-500 rounded-md " to="/" >TU Shop</NavLink>
          <button className={`lg:hidden ml-auto p-2 ${isMenuOpen ? 'bg-red-500' : ''}`} onClick={() => setMenuOpen(!isMenuOpen)}>
            <svg viewBox="0 0 100 80" width="30" height="30">
              <rect width="100" height="10"></rect>
              <rect y="30" width="100" height="10"></rect>
              <rect y="60" width="100" height="10"></rect>
            </svg>
          </button>
        </div>
        <div className={`lg:flex lg:items-stretch lg:justify-end ml-auto ${isMenuOpen ? '' : 'hidden'}`}>
          {navigations_path.map((item, index) =>
            <div className={`bg-white rounded-md hover:bg-slate-500 m-2 ${(!isAdmin && item.path == "/dashboard") ? "hidden" : ""}`} key={index}>
              <NavLink className="flex-no-grow flex-no-shrink relative py-2 px-4 leading-normal text-black no-underline flex items-center " key={index} to={item.path}>{item.name}</NavLink>
            </div>
          )}
        </div>
      </nav>
    );
  }

  
  function OldNavbar(){
    return(
      <nav className="mt-4 mx-4  py-4 rounded-3xl bg-gray-200 space-x-4 drop-shadow-[0_35px_35px_rgba(0,0,0,0.30)] ">
      {navigations_path.map((item, index) =>

        <div className="" key={index} >
          <NavLink className="rounded-3xl flex items-center justify-center text-3xl bg-gray-800 text-white  hover:bg-slate-600 hover:text-white active:bg-orange-600 hover:scale-125" key={index} to={item.path}>{item.name}</NavLink>
        </div>


      )
      }
    </nav>
    )
    
  }

  

  // overflow-hidden
  return (
    <>



      <div className='my-20 	 '>

        <BrowserRouter>

        {<Navbar></Navbar>}

          
        {/* <OldNavbar></OldNavbar> */}
          
          



          < br />
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
            <Route path="/myproducts" element={loggedIn ? <MyProducts /> : <Navigate to="/login_firebase" />} />
            <Route path="*" element={<Error />} />



          </Routes>

        </BrowserRouter>

        
      </div>
    </>
  )
}

export default App
