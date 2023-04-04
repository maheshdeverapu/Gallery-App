import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = ()=>{
    const [userName,setUserName] = useState("");
    const [password,SetPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const signupHandling =(e)=>{
        e.preventDefault();
        if(!userName || !password || !confirmPassword){
            return alert('please enter all credentials')
        }
        if(password != confirmPassword){
            return alert("password and confirm password should be same...")
        }
        fetch("/signup",{
            method:"post",
            headers : {"content-Type":"application/json"},
            body:JSON.stringify({
                userName,
                password,
                confirmPassword
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.error){
                return alert(data.error)
            }
            alert('signup successfully');
            navigate("/")
        }).catch(err=>{
            console.log(err.message)
        })
    }
    return(
        <div>
        <input type="text" placeholder="User Name" onChange={()=>{setUserName(e.target.value)}} value={userName}/>
        <input type="password" placeholder="password" onChange={()=>{SetPassword(e.target.value)}} value={password}/>
        <input type="password" placeholder="confirm password" onChange={()=>{setConfirmPassword(e.target.value)}} value={confirmPassword}/>
        <button onClick={(e)=>{signupHandling(e)}}>Register</button>
        </div>
    )
}
export default Signup;