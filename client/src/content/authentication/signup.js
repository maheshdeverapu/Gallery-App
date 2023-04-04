import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css"
const Signup = () => {
    const [userName, setUserName] = useState("");
    const [password, SetPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const signupHandling = (e) => {
        e.preventDefault();
        if (!userName || !password || !confirmPassword) {
            return alert('please enter all credentials')
        }
        if (password != confirmPassword) {
            return alert("password and confirm password should be same...")
        }
        fetch("/signup", {
            method: "post",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify({
                userName,
                password,
                confirmPassword
            })
        }).then(res => res.json()).then((data) => {
            if (data.error) {
                return alert(data.error)
            }
            alert('signup successfully');
            navigate("/")
        }).catch(err => {
            console.log(err.message)
        })
    }
    return (
        <div>
            <div className="signup_content">
                <h2>User Signup</h2>
                <input className="user_fields" type="text" placeholder="User Name" onChange={(e) => { setUserName(e.target.value) }} value={userName} />
                <input className="user_fields" type="password" placeholder="password" onChange={(e) => { SetPassword(e.target.value) }} value={password} />
                <input className="user_fields" type="password" placeholder="confirm password" onChange={(e) => { setConfirmPassword(e.target.value) }} value={confirmPassword} />
                <button className="signup_button" onClick={(e) => { signupHandling(e) }}>Register</button>

            </div>
            <p className="signup_link">Have an account?<Link to={"/"}>Signin</Link></p>

        </div>
    )
}
export default Signup;