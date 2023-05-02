import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { ChatEngine, getOrCreateChat, ChatList } from 'react-chat-engine';
import axios from 'axios'
// import css
import '../App.css';
import { auth, provider, users, db } from '../firebase'
import { doc, getDoc, collection, query, where, getDocs, deleteDoc } from 'firebase/firestore'
import ChatengineCreateUser from '../chatengineAPI/CreateUser'
import CreateRoom from '../chatengineAPI/GetORCreateChatRoom'


const Chat = () => {
  const location = useLocation();
  const [username, setUsername] = useState(null)
  const [Myid, setMyid] = useState(localStorage.getItem("user_id"))
  const [myEmail, setMyEmail] = useState(localStorage.getItem("user_data").email)
  const [sellerUsername, setSellerUsername] = useState(location.state)



  useEffect(() => {
    // console.log("hi")
    // async function userData() {
    //   const docRef = doc(users, Myid);
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());
    //     setUsername(docSnap.id)
    //     console.log(` username is ${username}`)
    //     ChatengineCreateUser(docSnap.id, docSnap.data().email)
    //   } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }

    // userData()

    ChatengineCreateUser(Myid, myEmail)
    setUsername("")
  }, [username])





  return (
    <>
      <div className='lg:mx-24 md:mx-12 border-4 border-black '>

        <ChatEngine
          height='75vh'
          userName={Myid}
          userSecret='123456789'
          projectID='416cc367-326f-4b07-a1c9-2905a6c79b7f'
          renderNewChatForm={(creds) => { <div></div> }}
          renderOptionsSettings={(creds, chat) => { <div></div> }}

          offset={7}

        />

      </div>
      

    </>
  )
}

export default Chat;