import React, { useState, UseEffect, useEffect } from 'react'
// get data from state
import { useLocation, useNavigate } from 'react-router-dom'
import styles from "./Product.module.css"
import axios from 'axios'
import { products } from "../firebase"
import { doc, documentId, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, deleteObject } from 'firebase/storage';

import CreateRoom from '../chatengineAPI/GetORCreateChatRoom'

import Cart from "../images/cart.png"

import product_Default from "../images/product_Default.png"


function Product() {
    const location = useLocation()
    const navigate = useNavigate()
    const [product_data, setProduct_data] = useState([])
    const [ObjectId, setObjectId] = useState(location.pathname.split("/")[2])
    const [SellerObjectId, setSellerObjectId] = useState("")






    useEffect(() => {
        console.log(`ObjectId : ${ObjectId}`);

        const docRef = doc(products, ObjectId);
        getDoc(docRef)
            .then((docSnap) => {
                if (docSnap.exists()) {
                    console.log("Document data:", docSnap.data());
                    // set doc.id too
                    setProduct_data({ ...docSnap.data(), productId: docSnap.id });
                    setSellerObjectId(docSnap.data().owner)
                    const getImageURL = async () => {
                        const storage = getStorage();
                        const storageRef = ref(storage, `products/${docSnap.data().imageName}`);
                        const url = await getDownloadURL(storageRef);
                        setProduct_data(prevData => ({ ...prevData, imageURL: url }));
                        console.log(`your url is : ${url}`);

                    };
                    
                    getImageURL();
                    
                } else {

                    console.log("No such document!");
                    alert("ไม่มีสินค้านี้ กรุณาเลือกสินค้าใหม่")
                    navigate("/")
                }
            })
            .catch((error) => {
                console.log(error);
            });

        function checkIfUserOwner() {
            if (SellerObjectId === localStorage.getItem("user_id") || (JSON.parse(localStorage.getItem("user_data")).userType === "admin")) {
                document.getElementById("buy").hidden = true
                document.getElementById("edit").hidden = false
            }else{
                document.getElementById("buy").hidden = false
                document.getElementById("edit").hidden = true
            }

            // if  (JSON.parse(localStorage.getItem("user_data")).userType === "admin"){
            //     document.getElementById("buy").hidden = true
            //     document.getElementById("edit").hidden = false

            // }
        }
     
        checkIfUserOwner()

    }, [SellerObjectId]);

    function buttonDisplay_OnOff() {
        // เป็นการสลับค่า hidden (show element หรือ hide element) จาก true เป็น false และ false เป็น true
        document.getElementById("delete").hidden = !document.getElementById("delete").hidden
        document.getElementById("update").hidden = !document.getElementById("update").hidden
        document.getElementById("edit").hidden = !document.getElementById("edit").hidden
        document.getElementById("back").hidden = !document.getElementById("back").hidden

        // ปรับให้ form พิมใน input เป็น on หรือ off
        document.getElementById("name").readOnly = !document.getElementById("name").readOnly
        document.getElementById("price").readOnly = !document.getElementById("price").readOnly
        document.getElementById("detail").readOnly = !document.getElementById("detail").readOnly


    }


    async function updateProduct(e) {
        e.preventDefault()

        alert("update")


        buttonDisplay_OnOff()

        let name = document.getElementById("name").value
        let price = document.getElementById("price").value
        let owner = document.getElementById("owner").value
        let detail = document.getElementById("detail").value
        let imageName = document.getElementById("imageName").value
        let ObjectId = document.getElementById("ObjectId").value

        const docRef = doc(products, ObjectId);
        await updateDoc(docRef, {
            name: name,
            price: price,
            detail: detail,

        }).then(() => {
            console.log("Document successfully updated!");
        }).catch((error) => {
            console.error("Error updating document: ", error);
        });





        // window.location.reload()


    }

    async function deleteProduct(e) {
        e.preventDefault()
        alert("delete")
        buttonDisplay_OnOff()

        const docRef = doc(products, ObjectId);
        await deleteDoc(docRef).then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

        const storage = getStorage();
        const storageRef = ref(storage, `products/${product_data.imageName}`);

        await deleteObject(storageRef).then(() => {
            console.log("delete image successfully");
        }).catch((error) => {
            console.log(error);
        });





        navigate("/")
        // window.location.reload()


    }


    function BuyProduct() {
        console.log("redirect to dm message")
        const user1 = localStorage.getItem("user_id")
        const user2 = product_data.owner

        // condition สร้าง direct chat ใน chatEngine.io
        if (user1 != null && user1 !== user2) {
            CreateRoom(user1, SellerObjectId)
        }

        navigate("/chat", { state: product_data.owner })
    }

    function RedirectProfilePage(){
        
        navigate(`/profile/${SellerObjectId}`)
    }

    return (
        <div className="">

            <div className="mx-auto w-full max-w-7xl  sm:grid sm:grid-cols-2 bg-slate-200 rounded-3xl pt-4 pb-16 ">
                <div className='ml-4 mr-4 '>
                    <img src={product_data.imageURL ? product_data.imageURL : product_Default}
                        alt=""
                        className='mx-auto w-full border-8 border-black bg-white' />

                    <div className='mx-auto  w-fit rounded-md bg-green-500  text-base font-semibold text-white outline-none active:bg-green-300'
                        onClick={BuyProduct}>
                        <img className='object-scale-down h-24' id="buy" name="buy" src={Cart} alt="" hidden/>
                    </div>
                </div>

                <div className='ml-4 mr-4'>
                    <form>
                        <div className="mb-2 ">
                            <label
                                htmlFor="name"
                                className="mt-3 mb-3 block text-base font-medium text-[#07074D]"
                            >
                                ชื่อสินค้า
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="ชื่อสินค้า"
                                defaultValue={product_data.name}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                readOnly
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="price"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                ราคา
                            </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                placeholder="ราคาสินค้า"
                                defaultValue={product_data.price}
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                readOnly
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="owner"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                ID ผู้ขาย
                            </label>
                            <input
                                type="text"
                                name="owner"
                                id="owner"
                                placeholder="ผู้ขายสินค้าชิ้นนี้"
                                defaultValue={product_data.owner}
                                className="w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md hover:cursor-pointer"
                                onClick={RedirectProfilePage}
                                readOnly
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="detail"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                รายละเอียด
                            </label>
                            <textarea
                                rows="4"
                                name="detail"
                                id="detail"
                                placeholder="รายละเอียดสินค้า"
                                defaultValue={product_data.detail}
                                className="w-full resize-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                readOnly
                            ></textarea>
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="imageName"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                                
                               
                                
                            >
                                {/* imageName */}
                            </label>
                            <input
                                type="text"
                                name="imageName"
                                id="imageName"
                                placeholder="ชื่อรูปภาพ"
                                defaultValue={product_data.imageName}
                                className="w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                readOnly
                                hidden
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="ObjectId"
                                className="mb-3 block text-base font-medium text-[#07074D]"
                            >
                                {/* Product ID */}
                            </label>
                            <input
                                type="text"
                                name="ObjectId"
                                id="ObjectId"
                                placeholder="รหัสสินค้า"
                                defaultValue={product_data.productId}
                                className="w-full rounded-md border border-[#e0e0e0] bg-gray-300 py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                readOnly
                                hidden
                            />
                        </div>
                        <div>

                            <button className="mr-4 my-2 hover:shadow-form rounded-md bg-green-500 py-3 px-8 text-base font-semibold text-white outline-none"

                                id="back"
                                hidden
                                onClick={() => window.location.reload()}
                            >
                                BACK
                            </button>
                            <button
                                // type='submit'
                                className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
                                id="update"
                                hidden
                                onClick={updateProduct}
                            >
                                UPDATE
                            </button>

                            <button
                                // type='submit'
                                className="mx-4 hover:shadow-form rounded-md bg-red-500 py-3 px-8 text-base font-semibold text-white outline-none"
                                id="delete"
                                hidden
                                onClick={deleteProduct}
                            >
                                DELETE
                            </button>
                        </div>
                    </form>
                    <button className=" hover:shadow-form rounded-md bg-yellow-600 py-3 px-8 text-base font-semibold text-white outline-none"

                        id="edit"
                        onClick={buttonDisplay_OnOff}
                        hidden
                    >
                        EDIT
                    </button>

                </div>


            </div>
        </div>
    )
}

export default Product