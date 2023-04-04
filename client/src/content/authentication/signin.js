import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./signin.css";
const Signin = () => {
    const [userName, setUserName] = useState("");
    const [password, SetPassword] = useState("");
    const navigate = useNavigate();
    const signinHandling = (e) => {
        e.preventDefault();
        if (!userName || !password) {
            return alert('please enter all credentials')
        }
        fetch("/signin", {
            method: "post",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
                userName,
                password
            })
        }).then(res => res.json()).then((data) => {
            if (data.error) {
                return alert(data.error)
            }
            localStorage.setItem("user", JSON.stringify(data.user))
            localStorage.setItem("token", data.token)
            console.log("data:", data, JSON.stringify(data))
            alert('signin successfully');
            navigate("/home")
        }).catch(err => {
            console.log(err.message)
        })
    }
    return (
        <div>
            <div className="signin_content">
                <h2>User Login</h2>

                <input className="user_fields" type="text" placeholder="User Name" onChange={(e) => { setUserName(e.target.value) }} value={userName} />
                <input className="user_fields" type="password" placeholder="password" onChange={(e) => { SetPassword(e.target.value) }} value={password} />
                <button className="signin_button" onClick={(e) => { signinHandling(e) }}>Signin</button>
            </div>
            <p className="signup_link">don't have an account?<Link to={"/signup"}>Signup</Link></p>
        </div>
    )
}
export default Signin;