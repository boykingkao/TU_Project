import React, { useState } from 'react';
import { auth } from '../firebase'
import { getAuth, linkWithCredential, EmailAuthProvider  } from "firebase/auth";


function EmailLogin() {
    const auth = getAuth();
    const credential = EmailAuthProvider.credential("boykingkao", "123");

    function login(e) {
        // e.preventDefault()
        alert("button")


        linkWithCredential(auth.currentUser, credential)
            .then((usercred) => {
                const user = usercred.user;
                console.log("Account linking success", user);
            }).catch((error) => {
                console.log("Account linking error", error);
            });
    }

    return (
        <div>
            <h1>email login component</h1><br />
            <button className='p-8 border-4 border-black rounded-2xl' onClick={(e) => login(e)}>Login</button>
        </div>

    )
}

export default EmailLogin;