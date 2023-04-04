import { useEffect, useState } from "react";
import EachImage from "./eachImage";

const Home=()=>{
    const [search,setSearch] = useState("");
    const [addPhoto,setAddPhoto] = useState(false);
    const [addLabel,setAddLabel] = useState("")
    const [addURL,setAddURL] = useState("");
    const [data,setData] = useState([]);
    useEffect(()=>{
       fetch('/home',{
        headers:{"content-type":"application/json",
                 "Authorization":localStorage.getItem("token")
                    },
        body:JSON.stringify()
       }).then(res=>res.json()).then((response)=>{
        console.log(response);
        setData(response)

       })
    },[])

    const searchHandling=(e)=>{
        e.preventDefault();
        setSearch(e.target.value);
        let temp = e.target.value;
        fetch('/search',{
        headers : {"content-Type":"application/json"},
            body:JSON.stringify(
                search
                )}).then(res=>res.json()).then((data)=>{
                    console.log(data)
                }).catch(err=>
                    console.log(err))
    }

    const addPhotoHandling=(e)=>{
        e.preventDefault();
        setAddPhoto(true);
       
        }
        // return(
        //     <div>
        //         <h3>Add a new photo</h3>
        //         <label >Label</label>
        //         <input type="text" placeholder="add text" onChange={(e)=>{setAddLabel(e.target.value)}} value={addLabel}/>
        //         <label>Photo URL</label>
        //         <input type="text" placeholder="add photo url" onChange={(e)=>{setAddURL(e.target.value)}} value={addURL}/>
        //         <button>Cancel</button>
        //         <button onClick={(e)=>submitHandling(e)}>Submit</button>
        //     </div>
        // )
        const submitHandling=(e)=>{
            e.preventDefault();
            fetch("/addPhotoURL",{
                headers:{"content-type":"application/json"},
                body:JSON.stringify(
                    addLabel,addURL
                    )}).then(res=>res.json()).then((data)=>{
                        console.log(data);
                        if(data.error){
                            return alert(data.error)
                        }
                        alert(data.message);
                        setAddPhoto(false);
                    }).catch(err=>
                        console.log(err))
            }
    
    return(
        <div>
            <div>
                <h3>App name</h3>
                <input type="text" placeholder="search by name" onChange={(e)=>{searchHandling(e)}} value={search}/>
                <button onClick={(e)=>{addPhotoHandling(e)}}>Add Photo</button>
            </div>
           { addPhoto&&<div>
                <h3>Add a new photo</h3>
                <label >Label</label>
                <input type="text" placeholder="add text" onChange={(e)=>{setAddLabel(e.target.value)}} value={addLabel}/>
                <label>Photo URL</label>
                <input type="text" placeholder="add photo url" onChange={(e)=>{setAddURL(e.target.value)}} value={addURL}/>
                <button>Cancel</button>
                <button onClick={(e)=>submitHandling(e)}>Submit</button>
            </div>}
            <div>
            {!data?"":
                data.map((ele,index)=>{
                    return(
                        <EachImage ele={ele} key={index}/>
                    )
                })
            }
            </div>
        </div>

    )
}
export default Home;