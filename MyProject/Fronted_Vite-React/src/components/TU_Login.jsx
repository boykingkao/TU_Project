import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios'

import { auth, provider, users, db } from '../firebase'
import { doc, addDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import ChatengineCreateUser from '../chatengineAPI/CreateUser';

import App from "../App"


function TU_Login() {

    const admin_data = {
        displayname_en: "admin",
        displayname_th: "แอดมิน",
        email: "admin@test.com",
        department: "admin_department",
        faculty: "admin_faculty",
        userType: "admin",
        username: "admin",
    }

    const navigate = useNavigate()
    useEffect(() => {
    }, [])

    function onSuccessLogin(user) {




        const data = {
            displayname_en: user.displayname_en,
            displayname_th: user.displayname_th,
            email: user.email,
            department: user.department,
            faculty: user.faculty,
            userType: user.type,
            username: user.username,


        }
        // addDoc(users, data)

        // query firebase
        const q = query(users,
            where("email", "==", data.email),
            where("userType", "==", "student"));

        getDocs(q).then(async (querySnapshot) => {


            if (querySnapshot.empty) {
                const newDocRef = await addDoc(users, data)
                console.log(newDocRef.id)
                localStorage.setItem("user_id", newDocRef.id)

                ChatengineCreateUser(newDocRef.id, data.email)
            } else {
                console.log("user data already existed")

                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    console.log(doc.id)
                    localStorage.setItem("user_id", doc.id)
                });
            }
            localStorage.setItem("user_data", JSON.stringify(user))
            ToastEmitter("login Success....")
            // window.location.reload()
            navigate("/")



        });


        console.log("lol")


    }


    function handleSubmit(e) {
        e.preventDefault()
        var UserName = e.target.username.value
        var PassWord = e.target.password.value
        if ((UserName == "admin") || (PassWord == "admin")) {
            alert("logged in as Admin")
            localStorage.setItem("user_data", JSON.stringify(admin_data))
            localStorage.setItem("user_id","lG4M85knetBnczOzOzn5")
            ToastEmitter("Admin login Success....")
        } else{

        alert(`${UserName} ${PassWord.slice(0, 4)}******`)

        console.log("submit")



        var data = JSON.stringify({
            "UserName": UserName,
            "PassWord": PassWord
        });


        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://restapi.tu.ac.th/api/v1/auth/Ad/verify',
            headers: {
                'Content-Type': 'application/json',
                'Application-Key': 'TUb8c89fdb3e1b9eaa7b3b1503f90dc8a84fb9f728f542fb06c4c687d0e15cd9771e956ceffbfa549ea243eb46d02cece6'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                onSuccessLogin(response.data)

            })
            .catch(function (error) {
                console.log(error);
                toast.error("Login Failed, try to login again.")
            });
        }

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

        <div className="w-fit mx-auto " onSubmit={(e) => { handleSubmit(e) }}>

            <h1 className="text-4xl  text-center font-bold text-black ">TU Login</h1><br />


            <form action='' className='text-center '>
                {/* username */}

                <input className=" px-4 border-2 text-lg border-black  text-center placeholder:text-center" type="text" name="username" placeholder="username" />
                <br />
                {/* password */}
                <input className=" px-4 border-2 text-lg border-black my-2 text-center placeholder:text-center" type="password" name="password" placeholder="password" />

                <br />
                {/* submit */}
                <input className="py-2.5 px-5 text-4xl border-4 border-black bg-slate-200 hover:scale-125 " type="submit" value="submit" />
            </form>
        </div>

    )
}

export default TU_Login