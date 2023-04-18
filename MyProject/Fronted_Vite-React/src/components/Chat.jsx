import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { ChatEngine, getOrCreateChat, ChatList } from 'react-chat-engine';
import axios from 'axios'
// import css
import '../App.css';

import ChatengineCreateUser from '../chatengineAPI/CreateUser'
import CreateRoom from '../chatengineAPI/GetORCreateChatRoom'


const Chat = () => {
  const location = useLocation();
  const [username, setUsername] = useState('')
  const [myuser_id, setMyuser_id] = useState(localStorage.getItem("user_id"))
  const [sellerUsername, setSellerUsername] = useState(location.state)



  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername('')
    )
  }

  function renderChatHeader(creds) {
    const people = []
    
    creds ? people.push(creds) : console.log("no data")
    console.log(people[0])

    return (
      <div className='bg-green-500'>
        {JSON.stringify(people)}
      </div>


    )
  }



  return (
    <>
      {/* {sellerUsername ? <h1>data is : {sellerUsername}</h1> : <h1>ยังไม่ได้ data</h1>} */}
      <div className='mx-24 border-4 border-black '>

        <ChatEngine
          height='75vh'
          userName={myuser_id}
          userSecret='123456789'
          projectID='82aabb46-60e7-416d-81de-705edb5e7724'
          renderNewChatForm={(creds) => { <div></div> }}
          // renderChatHeader={(creds) => renderChatHeader(creds)}
          renderOptionsSettings={(creds, chat) => {<div></div> }}
          
          offset={7}

        />

      </div>
    </>
  )
}

export default Chat;