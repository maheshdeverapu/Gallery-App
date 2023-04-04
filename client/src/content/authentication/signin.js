import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Signin=()=>{
    const [userName,setUserName] = useState("");
    const [password,SetPassword] = useState("");
    const navigate = useNavigate();
    const signinHandling =(e)=>{
        e.preventDefault();
        if(!userName || !password){
            return alert('please enter all credentials')
        }
        fetch("/signin",{
            method:"post",
            headers : {"content-Type":"application/json"},
            body:JSON.stringify({
                userName,
                password
            })
        }).then(res=>res.json()).then((data)=>{
            if(data.error){
                return alert(data.error)
            }
            alert('signin successfully');
            navigate("/home")
        }).catch(err=>{
            console.log(err.message)
        })
    }
    return(
        <div>
        <input type="text" placeholder="User Name" onChange={()=>{setUserName(e.target.value)}} value={userName}/>
        <input type="password" placeholder="password" onChange={()=>{SetPassword(e.target.value)}} value={password}/>
        <button onClick={(e)=>{signinHandling(e)}}>Signin</button>
        </div>
    )
}
export default Signin;