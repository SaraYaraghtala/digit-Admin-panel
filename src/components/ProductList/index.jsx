import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CloseIcon from "@mui/icons-material/Close";
import { set } from "react-hook-form";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [showEditPanel, setShowEditPanel] = useState(false);
  const [showAddPanel, setShowAddPanel] = useState(false);
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
            onClick={() => setShowEditPanel(true)} // Replace with your own edit function
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
        }}
      >
        <h2>Product</h2>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="error"
          onClick={() => {
            setShowAddPanel(true);
          }}
        >
          Create new entry
        </Button>
      </Box>

      {showEditPanel && (
        <Box
          sx={{
            width:"60%",
            marginBottom: "10px" ,
            borderRadius: "20px",
            backgroundColor: "#FFF",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
           
          }}
        >
          <IconButton
            onClick={() => {
              setShowEditPanel(false);
            }}
          
          >
            <CloseIcon style={{ color: "#EE384E" }} />
          </IconButton>
          < EditProduct/>
          
        </Box>
      )}
      {showAddPanel && (
        <Box
          sx={{
            width: "60%",
            marginBottom: "10px" ,
            borderRadius: "20px",
            backgroundColor: "#FFF",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
     
          }}
        >
          <IconButton
            onClick={() => {
              setShowAddPanel(false);
            }}
   
          >
      
            <CloseIcon style={{ color: "#EE384E" }} />
          </IconButton>
          show new thing
          {/* <Add
            parent={currentNode}
            getData={getData}
            setCurrentNode={setCurrentNode}
            setShowAddPanel={setShowAddPanel}
          /> */}
        </Box>
      )}

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
