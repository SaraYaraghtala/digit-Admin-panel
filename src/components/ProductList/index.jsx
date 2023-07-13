import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { set } from "react-hook-form";
const columns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "title",
    headerName: "title",
    width: 190,
    editable: true,
  },
  {
    field: "image",
    headerName: "image",
    width: 150,
    editable: true,
    renderCell: (params) => (
      <img
        src={
          import.meta.env.VITE_BASE_URL +
          ((params.value.data != null && params.value.data?.attributes.url) ||
            "")
        }
        alt="Product"
        style={{ width: 50, margin: "6px" }}
      />
    ),
  },
  {
    field: "oldprice",
    headerName: "oldprice",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "price",
    headerName: "price",
    type: "number",
    width: 110,
    editable: true,
  },

  {
    field: "discount",
    headerName: "discount",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "showinbaner",
    headerName: "showinbaner",
    width: 150,
    editable: true,
  },
  {
    field: "showincarousel",
    headerName: "showinbaner",
    width: 150,
    editable: true,
  },
  {
    field: "actions",
    headerName: "",
    width: 150,
    renderCell: (params) => (
      <Stack direction="row" spacing={3}>
      <IconButton
        color="error"
        onClick={() => handleEdit(params.row.id)} // Replace with your own edit function
        style={{ borderRadius: 0 }}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        color="error"
        onClick={() => handleDelete(params.row.id)} // Replace with your own delete function
        style={{ borderRadius: 0 }}
      >
        <DeleteIcon />
      </IconButton>
    </Stack>
    ),
  },
];

const ProductList = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(import.meta.env.VITE_BASE_URL + "/api/products?populate=*", {
      headers: { Authorization: "bearer " + import.meta.env.VITE_API_KEY },
    })
      .then((response) => response.json())
      .then((data) => {
        const tempRow = data.data.map((item) => {
          return { id: item.id, ...item.attributes };
        });
        setProductData(tempRow);
        console.log(tempRow);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <h2>Product</h2>
        <Button startIcon={<AddIcon />} variant="contained" color="error">
          Create new entry
        </Button>
      </Box>

      <DataGrid
        rows={productData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default ProductList;
