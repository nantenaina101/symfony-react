import React, {useState} from "react";

export default function Login() {
    let user = "nante", password = "nanta':101"
    const [userNameState, setUserName] = useState("")
    const [passwordState, setPassWord] = useState("")
    const [loggedIn, setIsLoggedIn] = useState(false)
    function isLogin() {
        if (userNameState === user && passwordState === password) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" placeholder="Pseudo" onChange={(e) => { setUserName(e.target.value); console.log(e.target.value)}}/>
            <input type="password" onChange={(e)=>{setPassWord(e.target.value); console.log(e.target.value)}} />
            <button onClick={isLogin}>Submit</button>
            {loggedIn && <h6>Logged in</h6>}
        </div>
    );
}