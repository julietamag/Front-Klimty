import React, { useEffect, useState } from "react";
import ShoppingHistory from "./UserShoppingHistory";
import { uploadAvatar } from "../utils/functions";
import { updateProfile } from "firebase/auth";
import { auth } from "../utils/firebaseConfig";
import { setPhoto } from "../state/photo";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

const Profile = () => {
  const [file, setFile] = useState(null);
  const photo = useSelector((state) => state.photo);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
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
      dispatch(setPhoto(user.photoURL));
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
              <Button
                variant="contained"
                sx={{ mb: "2rem" }}
                onClick={handleChange}
              >
                CHANGE
              </Button>
            </div>
          </div>
        </div>

        {change ? (
          <div className="userProfileInfo">
            <h4>User info</h4>
            <label className="">{name.split(" ")[0]}</label>

            <label className="">{name.split(" ")[1]}</label>

            <label className="">{email}</label>
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
                  accept="image/*"
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                />
              )}

              <label htmlFor="raised-button-file">
                <Button variant="outlined" component="span">
                  Upload Photo
                </Button>
              </label>
            </form>

            <div className="userProfileInfo">
              <h4>User info</h4>
              <label className="">Change firstname</label>
              <input type="text" className="inputForm"></input>
              <label className="">Change lastname</label>
              <input type="text" className="inputForm"></input>
              <label className="">Change email</label>
              <input type="text" className="inputForm"></input>
            </div>
            <div className="userProfileSecurity">
              <h4>Security</h4>
              <label className="">Current password</label>
              <input type="password" className="inputForm"></input>
              <label className="">New password</label>
              <input type="password" className="inputForm"></input>
              <button type="submit" className="btn">
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
