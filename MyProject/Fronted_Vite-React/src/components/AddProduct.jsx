import React, { useEffect } from 'react'
import { useState, Useeffect } from 'react'
import axios from 'axios'
import Toast from './Toast'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import user_Default from "../images/user_Default.png"
import product_Default from "../images/product_Default.png"
import incorrect from "../assets/incorrect.png"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc } from "firebase/firestore";
import { products } from "../firebase"




function AddProduct() {

  const [productImage, setProductImage] = useState(product_Default)
  const [file, setFile] = useState(null);
  const [isLoggegIn, setIsLoggedIn] = useState(localStorage.getItem("user_data"))


  useEffect(() => {


  })




  function handleImagePreview(e) {
    console.log("wow")
    console.log(e.target.files[0])
    setFile(e.target.files[0])
    // console.log(product_Default)


    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])


    reader.onload = () => {
      // console.log(reader.result, "data")


      setProductImage(reader.result)
    }


    // setProductimage(URL.createObjectURL(e.target.files[0]))
  }

  function Button() {
    return (
      <div>
        <img src={incorrect} alt="" id="resetIcon" title='reset form' style={{ width: "50px", height: "50px", cursor: "pointer", display: "block" }}
          onClick={() => {
            handleResetForm()
          }} />
      </div>
    )
  }


  // reset form all fields
  function handleResetForm(e) {
    document.getElementById("name").value = ""
    document.getElementById("image").value = ""
    document.getElementById("detail").value = ""
    document.getElementById("price").value = ""


    setProductImage(product_Default)
  }

  async function handleForm(e) {
    e.preventDefault()

    const productData = {
      name: document.getElementById("name").value,
      imageName: file.name,
      detail: document.getElementById("detail").value,
      price: document.getElementById("price").value,
      owner: localStorage.getItem("user_id") ? localStorage.getItem("user_id") : "mock-up owner"
    }

    axios.post("http://localhost:3000/products/add", {
      productData: productData,
      imageFile: productImage
    }
    )
      .then((res) => {
        console.log(res.data)

      })
      .catch((err) => {
        console.log(err)
      })

    ToastEmitter("เพิ่มสินค้าสำเร็จ")

    // axios.post("http://localhost:3000/products/addTest", { name: "goh", Productimage: productImage }, {})
    //   .then((res) => {
    //     console.log(res.data)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })







  }


  function ToastEmitter(text) {
    toast(`🦄 ${text}! `, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  return (


    <div className='pb-20'>
      {isLoggegIn ? (
        <div className=' max-w-2xl p-2 mx-auto '>
          <div className=' bg-teal-400  rounded-2xl  p-4  '>
            <form action='' method="post" onSubmit={(e) => handleForm(e)}>
              <div className="mb-2 flex">
                <label
                  htmlFor="name"
                  className="w-1/4 mt-3 mb-3 block text-base font-medium text-[#07074D]"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="ชื่อสินค้า"
                  defaultValue=""
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={(e) => document.getElementById("productName").innerHTML = e.target.value}
                />
              </div>
              <div className="mb-2 flex">
                <label
                  htmlFor="detail"
                  className="w-1/4 mb-3 block text-base font-medium text-[#07074D]"
                >
                  Product Detail
                </label>
                <textarea
                  rows="4"
                  name="detail"
                  id="detail"
                  placeholder="รายละเอียดสินค้า"
                  defaultValue=""
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

                ></textarea>
              </div>
              <div className="mb-2 flex">
                <label
                  htmlFor="image"
                  className="w-1/4 mt-3 mb-3 block text-base font-medium text-[#07074D]"
                >
                  Image
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  placeholder="ชื่อสินค้า"
                  defaultValue=""
                  className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  onChange={(e) => {
                    document.getElementById("productImg").innerHTML = e.target.value
                    handleImagePreview(e)
                  }
                  }
                  accept='image/*'
                  required
                />
              </div>
              <div className="mb-2 flex">
                <label
                  htmlFor="price"
                  className="w-1/4 mb-3 block text-base font-medium text-[#07074D]"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="ราคาสินค้า"
                  defaultValue=""
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

                />

              </div>
              <img className='mx-auto' src={productImage} alt="" id="productImg" />
              <div className='bg-white rounded w-fit mx-auto px-6 py-4 my-2 hover:scale-110'>
                <input className='' type="submit" value="วางขาย" />
              </div>

            </form>







          </div>


        </div>
      )


        : (
        <div className='p-4 bg-red-200 w-fit mx-auto rounded-3xl text-4xl'>
          !!! โปรด Login ก่อนทำการวางขายสินค้า !!!
          </div>
        )}


    </div>
  )
}

export default AddProduct