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
  const [change, setChange] = useState(true);
  const [email, setEmail] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    const result = await uploadAvatar(file);
    updateProfile(auth.currentUser, {
      photoURL: result,
    }).then(() => {
      setUpdate(result);
    });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setName(user.displayName);
      setEmail(user.email);
      dispath(setPhoto(user.photoURL));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  function handleChange() {
    if (change) {
      setChange(false);
    } else {
      setChange(true);
    }
  }

  return (
    <>
      <div className="userProfileView">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="userProfileImage">
            <img className="userProfileImg" alt={`${name}`} src={`${photo}`} />
            <div>
              <button onClick={handleChange}>CHANGE</button>
            </div>
          </div>
        </div>

        {change ? (
          <div className="userProfileInfo">
            <h4>User info</h4>
            <label class="">{name.split(" ")[0]}</label>

            <label class="">{name.split(" ")[1]}</label>

            <label class="">{email}</label>
          </div>
        ) : (
          <>
            <form
              onSubmit={handleUpload}
              style={{
                padding: "2rem",
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
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
          </>
        )}
      </div>

      <ShoppingHistory />
    </>
  );
};

export default Profile;
