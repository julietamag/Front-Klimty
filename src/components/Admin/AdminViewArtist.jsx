import React, { useEffect, useState } from "react";
import ListAdminArtist from "../../commons/ListAdminArtist";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalAddArtist from "../../commons/ModalAddArtist";
import { Button } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { useNavigate } from "react-router";

export default function AdminViewArtist() {
  const [data, setData] = useState([]);
  const booleano = useSelector((state) => state.adminProduct);
  const navigate = useNavigate()


  // Renderizado inicial de pagina.
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/artist`).then((res) => {
      const sortedData = res.data.sort((a, b) => a.id - b.id);
      setData(sortedData);
    });
  }, []);

  // Renderizado inicial de pagina.
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/api/artist`).then((res) => {
      const sortedData = res.data.sort((a, b) => a.id - b.id);
      setData(sortedData);
    });
  }, [booleano]);

  return (
    <>
      <div className="container">
      <Button variant="text" onClick={() => navigate('/admin')} sx={{ mb: 10 }}>
        <ArrowBackIosNewOutlinedIcon color="black" /> GO BACK
      </Button>
        <div className="newProductContainer">
          <ModalAddArtist />
        </div>
        <div className="productsContainer">
          {data &&
            data.map((item, i) => {
              return (
                <div className="singularProduct" key={i}>
                  <ListAdminArtist item={item} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
