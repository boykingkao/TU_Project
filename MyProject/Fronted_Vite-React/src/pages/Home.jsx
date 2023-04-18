import React from 'react'
// import styles from "./Home.module.css"
import styles from "./Home.module.css"
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate, Link, useNavigate, redirect } from "react-router-dom"

// let navigate = useNavigate();





function Home() {

    const [product_data, setProduct_data] = useState([])
    const navigate = useNavigate();

    const url = "http://localhost:3000"
    const ngrok_url = "https://48ff-2001-fb1-61-7ead-4b78-ead1-6062-4dd5.ap.ngrok.io"
    const headers = {
        'Bypass-Tunnel-Reminder': 'Gohza',
        "ngrok-skip-browser-warning": "true"
      }; 

    useEffect(() => {
        axios.get(`${url}/products`,{ headers })
            .then((res) => {
                console.log('fetch data from server')

                setProduct_data(res.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    function handleProductPage(product) {
        axios.post(`${url}/detail`, {
            name: product
        })
            .then((res) => {
                console.log('fetch data from server')
            })
        alert(`คุณได้คลิกสินค้า: ${product.name}`)
        navigate(`/product/${product.name}`, { state: product })

    }

    function handleProductUserPage(product) {
        alert(`ผู้ขายสินค้านี้: ${product}`)
        navigate(`/profile/${product.owner}`, { state: product })
    }


    const listItem = product_data.map((product, i) =>
        <div className={styles.product_container} key={i}>
            <div className={styles.product_item}>
                <div className={styles.product_img}>
                    <img src={product.image} onClick={() => handleProductPage(product)} />
                </div>
                <div className={styles.product_detail}>
                    ชื่อสินค้า: {product.name}
                </div>
                <div className={styles.products_price_owner}>
                    <div className={styles.product_price}>{product.price}฿</div>
                    <div className={styles.product_owner} onClick={() => handleProductUserPage(product)}>ผู้ขาย : {product.owner}</div>

                </div>
            </div>
        </div>
    );




    return (
        <>
            <div className={styles.container} >
            
                {listItem}
            </div>
        </>



    )
}

export default Home

