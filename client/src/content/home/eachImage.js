import { useState } from "react"
import "./eachImage.css";
const EachImage = ({ ele, index }) => {
    const [deletePhoto, setDeletePhoto] = useState(false);
    const [validateDelete, setValidateDelete] = useState(false);
    const [checkPassword, setCheckPassword] = useState("")
    const [label, setLabel] = useState(false);
    const hoverHandle = () => {
        setDeletePhoto(true);
        setLabel(true)
    }
    const deleteHandling = (e) => {
        e.preventDefault();
        setValidateDelete(true)

    }
    const deletePhotoHandling = (e) => {
        e.preventDefault();
        if (!checkPassword) {
            return alert("please enter password")
        }
        let urlPhoto = ele.url;
        fetch(`deleteImage/${ele._id}`, {
            method: "delete",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(
                { url: urlPhoto, password: checkPassword, userName: JSON.parse(localStorage.getItem("user")).userName }
            )
        }).then(res => res.json()).then((data) => {
            if (data.error) {
                return alert(data.error)
            }
            alert(data.message);
            window.location.reload(false);
            console.log(data)
        }).catch(err =>
            console.log(err))
    }

    return (
        <div key={index} onMouseEnter={() => { hoverHandle() }} onMouseLeave={() => { setDeletePhoto(false); setLabel(false) }}>
            <img className="each_image" src={ele.url} alt="image"></img>
            {deletePhoto && <h3 className="delete_icon" onClick={(e) => { deleteHandling(e) }}>delete</h3>}
            {label && <h3 className="label">{ele.label}</h3>}

            {validateDelete && <div className="delete_photo">
                <h3>Are you sure?</h3>
                <label>password</label>
                <input type="password" placeholder="enter user password" onChange={(e) => { setCheckPassword(e.target.value) }} value={checkPassword} />
                <div className="buttons_handle">
                    <button onClick={() => { setValidateDelete(false) }}>Cancel</button>
                    <button className="delete_photo_content" onClick={(e) => { deletePhotoHandling(e) }}>Delete</button>
                </div>
            </div>
            }


        </div>
    )
}
export default EachImage;