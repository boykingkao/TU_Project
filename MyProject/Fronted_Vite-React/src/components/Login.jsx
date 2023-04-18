import { useState, useEffect } from 'react'
import { GoogleLogin, GoogleLogout } from 'react-google-login'
import { gapi } from 'gapi-script'
import { useNavigate } from 'react-router-dom';
import styles from "./Login.module.css"



//convert object to jwt
async function encode(obj) {
  var str = "";
  for (var key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  // console.log(str)
  return str;
}

async function decode(obj) {
  var str = "";
  for (var key in obj) {
    if (str != "") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  // console.log(str)
  return str;
}

function test(a) {
  return 10
}

function Gohza({}) {

  const clientId = "836789900029-arr328cqr5k7jjmrdit7cvhan2b837ne.apps.googleusercontent.com"
  
  const navigate = useNavigate();
  

  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const initClient = () => {
      gapi.auth2.init({
        clientId: clientId,
        scope: ""
      })
    }
    gapi.load("client:auth2", initClient)



    // gapi.auth.getToken().access_token ? console.log(gapi.auth.getToken().access_token) : null
  }, [])

  const onSuccess = async (res) => {
    
    setProfile(res.profileObj)
    // setProfileMain(res.profileObj)
    console.log("success", res)


    const data = await encode(res.profileObj)
    console.log(`data : ${data}`)
    
    console.log(`data : ${data}`)

    localStorage.setItem("user_data", data)
    localStorage.setItem("email", JSON.stringify(res.profileObj.email))
    localStorage.setItem("googleId", JSON.stringify(res.profileObj.googleId))
 
    // alert(data)

    // navigate("/")
  }

  const onFailure = (res) => {
    console.log("failed", res)
  }

  const logOut = () => {
    // setProfileMain(null)
    setProfile(null)

    localStorage.removeItem("user_data")
    localStorage.removeItem("email")
    localStorage.removeItem("googleId")
    window.location.reload(false);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();

  //   const form = e.target
  //   console.log(e)
  //   console.log(form[0].value)
  //   setName(e.target[0].value)

  // }

  const [name, setName] = useState("Sumet")

  //กด refresh แล้ว data user ที่ login หาย
  // ต้องทำเรื่อง local storage เพิ่มเติม
  return (
    <div className="text-center">
      {profile ? (
        <div className="">
          <img className="mx-auto " src={profile.imageUrl} alt="user image" />
          <p>Name : {profile.name}</p>
          <p>Email : {profile.email}</p>

          <br />
        

          <div className='text-left border-8 border-green-600 inline-block hover:border-red-600'>
            <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />
            </div>
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
        >
        </GoogleLogin>
      )}


    </div>


  )
}

export default Gohza
