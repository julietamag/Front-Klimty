import React, { useEffect, useState } from "react";
import ListAdminProduct from "../../commons/ListAdminProduct";
import AddButton from "../../commons/AddButton";
import axios from "axios";
import { useSelector } from "react-redux";
import ModalAddProduct from "../../commons/ModalAddProduct";
// import { useNavigate } from "react-router";

export default function AdminViewProduct() {
  const [data, setData] = useState([]);
  const booleano = useSelector((state) => state.adminProduct);

  // Renderizado inicial de pagina.
  useEffect(() => {
    axios.get("http://localhost:3001/api/product").then((res) => {
      const sortedData = res.data.sort((a, b) => a.id - b.id);
      setData(sortedData);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3001/api/product").then((res) => {
      const sortedData = res.data.sort((a, b) => a.id - b.id);
      setData(sortedData);
    });
  }, [booleano]);

  return (
    <>
      <div className="container">
        <div className="newProductContainer">
          <ModalAddProduct />
        </div>
        <div className="productsContainer">
          {data &&
            data.map((item, i) => {
              return (
                <div className="singularProduct" key={i}>
                  <ListAdminProduct item={item} />
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
