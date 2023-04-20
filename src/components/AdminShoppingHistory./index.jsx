import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import PurchasedProductsAdmin from "./PurchasedProducts";

const AdminShoppingHistory = () => {
  const [purchase, setPurchase] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://klimty.onrender.com/api/checkout/${id}/history`)
      .then((res) => setPurchase(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {purchase.length ? (
        <Box sx={{ margin: 15 }}>
          <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
            <Table aria-label="collapsible table">
              <TableBody>
                {purchase?.map((row, i) => (
                  <PurchasedProductsAdmin key={i} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Typography variant='h3' sx={{marginTop: '2rem',display:'flex', justifyContent:'center', alignItems:'center', width:'100%'}}>No History yet...</Typography>
      )}
    </>
  );
};

export default AdminShoppingHistory;
