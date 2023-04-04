import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signin from "./authentication/signin";
import Signup from "./authentication/signup";
import Home from "./home/home";
const Router=()=>{
    return(
        <BrowserRouter>
            <Routes>
                <route path="/" element={<Signin/>}/>
                <route path="/signup" element={<Signup/>}/>
                <route path="/home" element={<Home/>}/>

            </Routes>
        </BrowserRouter>
    )
}
export default Router;