import axios from 'axios';

function ChatengineCreateUser(
    username = "default_usernmae",
    email = "default_email@test.come",
    first_name = "default_firstname",
    last_name = "default_lastname",
    secret = "123456789"
) {

    let data =
    {
        "username": `${username}`,
        "first_name": `${first_name}`,
        "last_name": `${last_name}`,
        "secret": `${secret}`,
        "email": `${email}`
    }



    let config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: 'https://api.chatengine.io/users/',
        headers: {
            'PRIVATE-KEY': '9479f440-5094-4c94-9005-c93a43888e81',
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
            console.log("error จ้า");
            console.log(error);
        });


}

export default ChatengineCreateUser;