import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EachImage from "./eachImage";
import "./home.css";
const Home = () => {
    const [search, setSearch] = useState("");
    const [addPhoto, setAddPhoto] = useState(false);
    const [addLabel, setAddLabel] = useState("")
    const [addURL, setAddURL] = useState("");
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {

        fetch(`/getPosts/${JSON.parse(localStorage.getItem("user")).userName}`, {
            headers: {
                "content-type": "application/json",
            }
        }).then(res => res.json()).then((response) => {
            console.log(response.data);
            setData(response.data)

        })

    }, [])

    const search_content_find = (e) => {
        setSearch(e.target.value);
        let temp = e.target.value;
        if (search && data.length > 0) {
            let solArr = [];
            for (let each of data) {
                if (each.label.includes(search)) {
                    solArr.push(each)
                }
            }
            setData(solArr)

        }
     
    }

    const addPhotoHandling = (e) => {
        e.preventDefault();
        setAddPhoto(true);

    }

    const logoutHandling = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate("/");
    };

    const submitHandling = (e) => {
        e.preventDefault();
        if (!addLabel || !addURL) {
            return alert("please fill all fields")
        }
        fetch("/upload", {
            method: "post",
            headers: {
                "content-type": "application/json",
                "Authorization": localStorage.getItem("token")
            },
            body: JSON.stringify({
                label: addLabel, url: addURL,
                userName: JSON.parse(localStorage.getItem("user")).userName
            }
            )
        }).then(res => res.json()).then((data) => {
            console.log(data);
            if (data.error) {
                return alert(data.error)
            }
            alert(data.message);
            setAddPhoto(false);
            window.location.reload(false);

        }).catch(err =>
            console.log(err))

    }

    return (
        <div>
            <div className="header_left_content">
                <div>

                    <i class="fa-solid fa-user fa-2x font_image"></i>
                </div>
                <div className="app_name">

                    <h3>My Unspalsh</h3>
                    <p>devchallenges.io</p>
                </div>
                <input className="search_content" type="text" placeholder="search by name" onChange={(e) => { search_content_find(e) }} value={search} />
                <button className="addPhoto_button" onClick={(e) => { addPhotoHandling(e) }}>Add Photo</button>
                <button className="logout_button" onClick={logoutHandling}
                >
                    logout
                </button>
            </div>
            <div className="images_content">
                {(data==[]) ? <p>No data available to display. click on add photo to upload</p>:
                    (data?.map((ele, index) => {
                        return (
                            <div className="each_image_content">
                                <EachImage ele={ele} key={index} />
                            </div>
                        )
                    }))
                }
            </div>
            {addPhoto && <div className="add_new_photo">
                <h3>Add a new photo</h3>
                <label >Label</label>
                <input className="label_text" type="text" placeholder="add text" onChange={(e) => { setAddLabel(e.target.value) }} value={addLabel} />
                <label>Photo URL</label>
                <input className="url_text" type="text" placeholder="add photo url" onChange={(e) => { setAddURL(e.target.value) }} value={addURL} />
                <div className="buttons">
                    <button onClick={() => { setAddPhoto(false) }}>Cancel</button>
                    <button onClick={(e) => submitHandling(e)}>Submit</button>
                </div>
            </div>}
        </div>

    )
}
export default Home;