import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { users } from '../firebase'
import { query, doc, where, getDocs, getDoc } from 'firebase/firestore'
// import styles from "./Product.module.css"

function Profile() {

    const { userId } = useParams()
    const [user, setUser] = useState([])
    console.log(userId)

    useEffect(() => {
        console.log("hi")
        async function getUser() {

            const docRef = doc(users, userId);
            const docSnap = await getDoc(docRef);
            setUser(docSnap.data())



        }
        getUser()
    }, [userId])

    function test() {
        alert("test")
    }

    function gohza() {
    }

    // for loop user

    for (let prop in user) {
        if (user.hasOwnProperty(prop)) { // Check if the property is own property of the object
            console.log(prop + ": " + user[prop]);
        }
    }



    return (
        <div className='bg-white max-w-auto mx-auto max-w-2xl rounded-md py-4 shadow-2xl pb-20'>
           

            {Object.keys(user).map((prop, index) => (
                <div className="mb-2 flex   ">
                    <label
                        htmlFor="name"
                        className="w-4/12 text-center mt-3 mb-3 block text-base font-medium text-[#07074D]"
                    >
                        {prop}
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="ชื่อสินค้า"
                        defaultValue={user[prop]}
                        className="h-auto w-8/12 rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        readOnly
                    />
                </div>


            ))}


            



        </div>
    )
}

export default Profile