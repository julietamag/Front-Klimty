import * as React from "react";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import axios from "axios";
import ReactTags from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import AddButton from "./AddButton";
import { toast } from "react-hot-toast";
import { uploadProduct } from "../utils/functions";
import { setBooleano } from "../state/adminProduct";
import { useDispatch } from "react-redux";

export default function ModalAddProduct() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState([]);
  const [artists, setArtists] = useState([]);
  const [artistId, setArtistId] = useState("");
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [photo_url, setPhoto_url] = useState("");
  const dispatch = useDispatch();

  const openModal = () => {
    setOpen(!open);
  };

  async function handleUploadPhoto(e) {
    const result = await uploadProduct(e.target.files[0]);
    setPhoto_url(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("id");

    if ((price, name, artistId)) {
      if (userId) {
        axios
          .post(`http://localhost:3001/api/product/${userId}/add/`, {
            name,
            price,
            description,
            category,
            photo_url,
            artistId,
          })
          .catch((error) => {
            console.error(error);
          });
        toast.success("Successfully added your product");
      }
    } else {
      toast.error("You need to set a name, a price and an artist");
    }

    setName("");
    setPrice("");
    setDescription("");
    setPhoto_url("");
    setCategory([]);
    dispatch(setBooleano());
    setOpen(!open);
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/api/artist`).then((data) => {
      const artistsBack = data.data;
      const artists = artistsBack?.map((artist) => artist.title);
      setArtists(artists);
    });
  }, [open]);

  //manejo del menu artistas
  const [anchorEl, setAnchorEl] = useState(null);
  const openArtist = Boolean(anchorEl);
  const handleClose = (data) => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <div>
        <AddButton openModal={openModal} />
      </div>

      {open ? (
        <Modal open={open} openmodal={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FFF",
              borderRadius: "8px",
              padding: "45px",
              width: 350,
              height: 450,
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: "50px", fontWeight: "bold" }}
            >
              Add Item
            </Typography>
            <div>
              <form onSubmit={(e) => handleSubmit(e)}>
                {photo_url ? (
                  "selected picture"
                ) : (
                  <Button variant="outlined" sx={{marginBottom:'1rem', width: '100%'}} component="label">
                    <input
                      type="file"
                      name="Upload"
                      onChange={handleUploadPhoto}
                    />
                  </Button>
                )}
                <TextField
                  label="Name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ marginBottom: "10px", width: "100%"}}
                />
                <TextField
                  label="Price"
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  sx={{ marginBottom: "8px", width: "100%"}}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  sx={{ marginBottom: "10px", width: "100%"}}
                />
                <ReactTags
                  inputAttributes={{ style: { width: "100%" } }}
                  value={category}
                  onChange={setCategory}
                  inputProps={{ placeholder: "Add category" }}
                  sx={{ marginBottom: "8px", width: "100%", display: "block" }}
                />
                <Button
                  id="basic-button"
                  variant="contained"
                  sx={{margin: '1rem auto', width:'100%'}}
                  aria-controls={openArtist ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openArtist ? "true" : undefined}
                  onClick={handleClick}
                >
                  {selectedArtist ? selectedArtist : "Artists"}
                </Button>

                
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openArtist}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >

                  {artists?.map((artist, i) => {
                    return (
                      <MenuItem
                        key={i}
                        onClick={() => {
                          setArtistId(i + 1);
                          setSelectedArtist(artist);
                        }}
                      >
                        {artist}
                      </MenuItem>
                    );
                  })}
                </Menu>

  

                <Box
                  sx={{ display: "flex", justifyContent: "center", alignItems:'center', mt: "auto" }}
                >
                  <Button
                    variant="contained"
                    onClick={openModal}
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: "auto",
                      width: "100%",
                      length: "30px",
                      marginRight: "8px",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                      mt: "auto",
                      width: "100%",
                      length: "30px",
                      marginLeft: "8px",
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </form>
            </div>
          </Box>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
