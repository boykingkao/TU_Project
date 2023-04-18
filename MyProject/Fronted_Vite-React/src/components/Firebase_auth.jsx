import React, { useState, useEffect } from 'react'
import { auth, provider, users, } from '../firebase'
import { addDoc, getDocs, query, where } from 'firebase/firestore'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
// import EmailLogin from './EmailLogin'
import TU_Login from './TU_Login'
import EmailAuth from './EmailAuth'
import user_Default from "../images/user_Default.png"
import ChatengineCreateUser from '../chatengineAPI/CreateUser'
import ToastEmitter from '../functions/Toast'

function Firebase_auth() {
    const [user, setUser] = useState(null)
    const [userImg, setUserImg] = useState(user_Default)
    const navigate = useNavigate();


    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user)
                localStorage.setItem("user_data", JSON.stringify(user))
                setUserImg(user.photoURL)

            }
        })


    }, [userImg])
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // console.log(result)
                const user = result.user
                setUser(user)
                const data = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    provider: user.providerData[0].providerId,
                    lastSignInTime: user.metadata.lastSignInTime,
                    creationTime: user.metadata.creationTime,
                    userType: "google",

                }


                const q = query(users,
                    where("email", "==", data.email),
                    where("userType", "==", "google"));

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
                            localStorage.setItem("user_id", doc.id)
                        });
                    }



                });
                ToastEmitter("Login Success")
                localStorage.setItem("user_data", JSON.stringify(user))


                // navigate("/")
            })

    }

    function signOutWithGoogle() {
        auth.signOut()
            .then(() => {
                console.log("Signed out")
                localStorage.removeItem("user_data")
                localStorage.removeItem("user_id")
                window.location.reload();

            })
    }


    return (
        <>
            <div className='bg-white w-fit mx-auto rounded-xl p-8'>
                {(user != null) || (localStorage.getItem("user_data") != null) ? (

                    <div >
                        <img className="mx-auto" src={userImg ? userImg : user_Default} alt="" />

                        <button className='bg-red-500 hover:bg-red-700 text-white font-bold my-8 py-2 px-4 rounded mx-auto block' onClick={signOutWithGoogle}>Sign Out</button>


                    </div>
                )
                    :
                    (
                        <div className='' >
                            <TU_Login />
                            <div className=''>
                                <button className='bg-green-500 hover:bg-green-700 text-white font-bold my-8 py-2 px-4 rounded mx-auto block hover:scale-125' onClick={signInWithGoogle}>Google Sign in</button>
                            </div>
                        </div>
                    )}
            </div>





        </>





    )
}





export default Firebase_auth