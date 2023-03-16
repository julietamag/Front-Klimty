import React, { useEffect, useState } from "react";
import ListAdmin from "../../commons/ListAdmin";
import AddButton from "../../commons/AddButton";
import EditRemoveButtons from "../../commons/EditRemoveButtons";
import FormAdmin from "../../commons/FormAdmin";
import axios from "axios";

export default function AdminView() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/product").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleClick = (item) => {
    console.log("item", item);
    const productId = item.id;
    const userId = localStorage.getItem("id");
    axios
      .delete(`http://localhost:3001/api/product/${userId}/${productId}`)
      .then((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/api/product").then((res) => {
      setProducts(res.data);
    });
  }, [handleClick]);

  return (
    <>
      <div className="container">
        <div className="newProductContainer">
          <FormAdmin />
          <AddButton />
          <EditRemoveButtons />
        </div>
        <div className="productsContainer">
          {products
            ? products.map((item) => {
                return (
                  <div className="singularProduct">
                    <ListAdmin item={item} handleClick={handleClick} />
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}
