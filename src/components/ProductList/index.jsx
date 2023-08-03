import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AddProduct from "./addProduct/AddProduct";
import EditProduct from "./editProduct/EditProduct";
import styles from "./index.styles";

const ProductList = () => {
  const [productData, setProductData] = useState([]);
  const [showEditPanel, setShowEditPanel] = useState(false);
  //*change the state to false later
  const [showAddPanel, setShowAddPanel] = useState(true);
  const [productId, setProductId] = useState(0);
  const [formData, setFormData] = useState({});

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "title",
      headerName: "title",
      width: 170,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "image",
      headerName: "image",
      width: 100,
      headerAlign: "center",
      align: "center",
      editable: true,
      renderCell: (params) => (
        <img
          src={
            import.meta.env.VITE_BASE_URL +
            ((params.value.data != null && params.value.data?.attributes.url) ||
              "")
          }
          alt="Product"
          style={{
            height: "100%",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        />
      ),
    },
    {
      field: "oldprice",
      headerName: "oldprice",
      type: "number",
      width: 110,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "price",
      type: "number",
      width: 110,
      editable: true,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "discount",
      headerName: "discount",
      type: "number",
      width: 110,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "showinbaner",
      headerName: "showinbaner",
      width: 150,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "showincarousel",
      headerName: "showincarousel",
      width: 150,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Delete&Edit",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Stack direction="row" spacing={3}>
          <IconButton
            color="error"
            onClick={() => {
              setShowEditPanel(true);
              setProductId(params.row.id);
              setFormData(params.row);
            }}
            style={{ borderRadius: 0 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteItem(params.row.id)}
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

  const deleteItem = (itemId) => {
    if (confirm("you sure delete this item ?")) {
      fetch(import.meta.env.VITE_BASE_URL + "/api/products/" + itemId, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + import.meta.env.VITE_API_KEY,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((response) => {
          getData();
        });
    } else console.log("cancel");
  };

  return (
    <Box sx={styles.mainContainerSx()}>
      <Box sx={styles.headingContainerSx()}>
        <h2>Product</h2>
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          color="primary"
          onClick={() => {
            setShowAddPanel(true);
          }}
        >
          Create new entry
        </Button>
      </Box>

      <Box>
        <DataGrid
          sx={{
            "&.MuiDataGrid-row": {
              padding: "10px",
            },
          }}
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

      {showEditPanel && (
        <Box sx={styles.panelsContainerSx()}>
          <IconButton
            onClick={() => {
              setShowEditPanel(false);
            }}
          >
            <CloseIcon className="closeIcon" />
          </IconButton>
          <EditProduct
            formData={formData}
            productId={productId}
            refreshItem={getData}
          />
        </Box>
      )}
      {showAddPanel && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "40px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={styles.panelsContainerSx()}>
            <IconButton
              sx={{
                position: "relative",
                top: 0,
                left: 280,
              }}
              onClick={() => {
                setShowAddPanel(false);
              }}
              disableRipple
            >
              <CloseIcon className="closeIcon" />
            </IconButton>
            <AddProduct />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductList;
