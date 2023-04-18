// สร้าง chat room ระหว่าง 2 user
// ไม่สร้าง room เพิ่ม หากมี room อยู่แล้ว

import axios from 'axios';

function CreateRoom(user1 = "user1", user2 = "user2") {

    console.log("CreateRoom");
    console.log(`buyer: ${user1} type: ${typeof(user1)}`);
    console.log(`seller: ${user2} type: ${typeof(user2)}`);
    let data = JSON.stringify({
        "usernames": [
            user1,
            user2
        ],
        "title": "Direct_Message",
        "is_direct_chat": true
    });


    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://api.chatengine.io/chats/',
        headers: {
            'Project-ID': '82aabb46-60e7-416d-81de-705edb5e7724',
            'User-Name': user1,
            'User-Secret': '123456789',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log(error);
        });


}

export default CreateRoom;
