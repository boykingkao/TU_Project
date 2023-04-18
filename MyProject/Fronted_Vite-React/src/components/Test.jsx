
import axios from 'axios'
import React, { useState } from 'react'



function Test() {

    const [product_data, setProduct_data] = useState([])
    const gohza = import.meta.env.VITE_SOME_KEY
    const gohza1 = JSON.stringify(import.meta.env.VITE_DB_PASSWORD)

    function handleInput(e) {
        console.log(e.target.value)

        document.getElementById("test").innerHTML = e.target.value
    }

    function handleAddData() {
        axios.get(`http://localhost:3000/products/addTest`).then(async (res) => {
            alert("added data to mongodb")

        })

    }

    function handleGetData() {
        axios.get(`http://localhost:3000/products/get`).then(async (res) => {
            console.log(res.data)
            document.getElementById("test").innerHTML = `${JSON.stringify(res.data)})}`
            setProduct_data(res.data)
        })
        // print environment variable
    

    }

//    css fix content

    
    const listItem = product_data.map((product, i) => {
        return <div key={i} style={{
        outline:"5px solid green"}}>
            <p>name : {product.name}</p>
            <p>price : {product.price}</p>
            <p>img : {product.img}</p>
            <p>owner : {product.owner}</p>
            
        </div>

    })

   
    const goh = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => 
        <li key={value}>{value}</li>
    )

    const a = null


    return (
        
        <div className="">
            <input type="text" name="title" placeholder='type something...' onChange={(e) => handleInput(e)} />
            Your input is : <p id="test"></p>

            <button onClick={() => handleAddData()}>Add</button><br />
            <button onClick={() => handleGetData()}>Get</button><br />
            test
            <div>{gohza}</div>
            <div>{gohza1}</div>
        
            {listItem} 
            {goh}

            
            
        </div>


    )
}

export default Test