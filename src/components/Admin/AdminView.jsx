import React, { useEffect, useState, useCallback } from "react";
import ListAdmin from "../../commons/ListAdmin";
import AddButton from "../../commons/AddButton";
import axios from "axios";
import { Search } from "../../commons/Search";

export default function AdminView() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  // Renderizado inicial de pagina.
  useEffect(() => {
    axios.get("http://localhost:3001/api/product").then((res) => {
      setData(res.data);
    });
  }, []);

  // funcion para destruir el item en el back
  const handleClick = useCallback((item) => {
    console.log("item", item);
    localStorage.setItem("productId", item.id);
    const userId = localStorage.getItem("id");
    axios
      .delete(`http://localhost:3001/api/product/${userId}/${item.id}`)
      .then((res) => {
        console.log(res);
      });
  }, []);

  // funcion para editar el item en el back
  const editProducts = useCallback((updatedItem, productId) => {
    localStorage.setItem("productId", productId);
    const userId = localStorage.getItem("id");
    axios
      .put(`http://localhost:3001/api/product/${userId}/edit/${productId}`, {
        updatedItem,
      })
      .then((res) => {
        console.log(res);
      });
  }, []);

  useEffect(() => {
    const productId = localStorage.getItem("productId");
    console.log(productId);
    axios
      .get(`http://localhost:3001/api/product/${productId}`)
      .then((res) => {
        setData(...data, res.data);
      })
      .then(localStorage.removeItem("productId"));
  }, [handleClick, editProducts]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/search/product?input=${search}`)
      .then((res) => {
        setData(res.data);
      });
  }, [search, handleClick, editProducts]);

  return (
    <>
      <div className="container">
        <div className="newProductContainer">
          <Search setData={setData} setSearch={setSearch} />
          <AddButton />
        </div>
        <div className="productsContainer">
          {data
            ? data.map((item) => {
                return (
                  <div className="singularProduct">
                    <ListAdmin
                      item={item}
                      handleClick={handleClick}
                      editProducts={editProducts}
                    />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
