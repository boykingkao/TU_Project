import React from 'react'
// import styles from "./Home.module.css"
import styles from "./HomeTest.module.css"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, Link, useNavigate, redirect } from "react-router-dom"

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc } from "firebase/firestore";
import { products } from "../firebase"
import product_Default from "../images/product_Default.png"




function Home() {

    const [product_data, setProduct_data] = useState([])
    const navigate = useNavigate();
    const [search, setSearch] = useState("")

    

    const ngrok_url = "https://48ff-2001-fb1-61-7ead-4b78-ead1-6062-4dd5.ap.ngrok.io"
    const render_url = "https://tu-shop-backend.onrender.com"
    const env_url = import.meta.env.URL
    const headers = {
        'Bypass-Tunnel-Reminder': 'Gohza',
        "ngrok-skip-browser-warning": "true"
    };

    useEffect(() => {
        axios.get(`${render_url}/products`, { headers })
            .then(async (res) => {
                console.log('fetch data from server');
                const storage = getStorage();
                const promises = res.data.map(async (element) => {
                    const storageRef = ref(storage, `products/${element.imageName}`);
                    const url = await getDownloadURL(storageRef);
                    element.imageURL = url;
                    return element;
                });
                const dataWithImageURLs = await Promise.all(promises);
                setProduct_data(dataWithImageURLs);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function handleProductPage(product) {

        alert(`คุณได้คลิกสินค้า: ${product.name}`)
        navigate(`/product/${product.ObjectId}`, { state: product })

    }

    function handleProductUserPage(product) {
        alert(`ผู้ขายสินค้านี้: ${product}`)
        navigate(`/profile/${product.owner}`, { state: product })
    }

    const getImageURL = (imageName) => {
        console.log(imageName)
        const storage = getStorage();
        const storageRef = ref(storage, `products/1681414101386.jpg`);
        getDownloadURL(storageRef)
            .then((url) => {
                return url
            })
            .catch((error) => {
                console.log(error)
            });

    }

    function handleSearch(e) {
        const search_data = e.target.value;
        setSearch(search_data)
        console.log(search)
    }



    const listItem = product_data.filter((product, i) => search.toLocaleLowerCase().trim() === "" ? product : product.name.includes(search)).map((product, i) =>
        <div className="bg-green-50 border-4 p-5 mx-4 shadow-2xl hover:border-red-500 cursor-pointer" key={i}
            onClick={() => handleProductPage(product)} >
            <div className="">
                <div className="bg-white w-48 h-48 mx-auto mb-8">
                    <img className=" w-full h-full outline outline-4 outline-black hover:outline-yellow-400"
                        src={product.imageURL ? product.imageURL : product_Default}
                        alt={product.name}
                    />
                </div>
                <div className="w-fit mx-auto ">
                    <p className='text-xl my-2'>{product.name}</p>
                </div>
                <div className="w-fit mx-auto ">
                    <p className=''>{product.price}฿</p>
                </div>


            </div>
        </div>
    );








    // tailwind 3 columns per row
    // https://tailwindcss.com/docs/grid-template-columns

    return (
        <div>
            <div className="mb-3 bg-white max-w-[500px] mx-auto">
                <input
                    type="search"
                    className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    id="exampleSearch"
                    placeholder="Search"
                    onChange={handleSearch}

                />

            </div>




            <div className='bg-white h-fit w-fit mx-auto rounded-lg py-4 max-w-[1100px]'>

                <div className=" w-fit
            xl:grid xl:grid-cols-4 
            md:grid md:grid-cols-2
            sm:grid sm:grid-cols-1 " >

                    {listItem}
                </div>
            </div>
        </div>



    )
}

export default Home

