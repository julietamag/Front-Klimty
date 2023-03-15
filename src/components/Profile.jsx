import React, { useEffect, useState } from "react";
import ShoppingHistory from "./UserShoppingHistory";
import { uploadAvatar } from "../utils/functions";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { setPhoto } from "../state/photo";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const [file, setFile] = useState(null);
  const photo = useSelector((state) => state.photo);
  const [name, setName] = useState("");
  const dispath = useDispatch();
  const [update, setUpdate] = useState("");
 

  const handleUpload = async (e) => {
    e.preventDefault();
     const result = await uploadAvatar(file);
    updateProfile(auth.currentUser, {
      photoURL: result,
    }).then(()=>{
      setUpdate(result)
    })
  };
   

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user.photoURL);
      setName(user.displayName);
      dispath(setPhoto(user.photoURL));
    });
  }, [update]);

  return (
    <>
      <div className="userProfileView">
        <div className="userProfileImage">
          <img className="userProfileImg" alt={`${name}`} src={`${photo}`} />
        </div>
        <form onSubmit={handleUpload}>
          {file ? null : (
            <input
              type="file"
              name="Upload"
              onChange={(e) => setFile(e.target.files[0])}
            />
          )}

          <button>Upload</button>
        </form>

        <div className="userProfileInfo">
          <h4>User info</h4>
          <label class="">Change firstname</label>
          <input type="text" class="inputForm"></input>
          <label class="">Change lastname</label>
          <input type="text" class="inputForm"></input>
          <label class="">Change email</label>
          <input type="text" class="inputForm"></input>
        </div>
        <div className="userProfileSecurity">
          <h4>Security</h4>
          <label class="">Current password</label>
          <input type="password" class="inputForm"></input>
          <label class="">New password</label>
          <input type="password" class="inputForm"></input>
          <button type="submit" class="btn">
            Submit
          </button>
        </div>
      </div>
      <ShoppingHistory />
    </>
  );
};

export default Profile;
