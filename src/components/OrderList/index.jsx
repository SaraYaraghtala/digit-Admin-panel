import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const OrderList = () => {
  const [productData, setProductData] = useState([]);
  const [productId, setProductId] = useState(0);
  const [formData, setFormData] = useState({});
  const [orderItems, setOrderItems] = useState([]);

  const columns = [
    { field: "id", headerName: "ID", width: 60 },
    {
      field: "email",
      headerName: "email",
      width: 170,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "address",
      headerName: "address",
      width: 110,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "username",
      width: 170,
      editable: true,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "totalprice",
      headerName: "totalprice",
      type: "number",
      width: 110,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "order_items",
      headerName: "order_items",
      width: 170,
      editable: true,
      headerAlign: "center",
      align: "center",
      renderCell: (item) => <span>{item.value.data.length}</span>,
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


  const columnsItem = [
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
      field: "count",
      headerName: "count",
      type: "number",
      width: 110,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "totalprice",
      headerName: "totalprice",
      type: "number",
      width: 110,
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

  const handleEvent = (e) => {
    const result = e.row.order_items.data?.map((item) => {
      return {
        id: item.id,
        ...item.attributes,
        totalprice:Number(item.attributes.count)*Number(item.attributes.price)
      };
    });
    console.log(result);
    setOrderItems(result);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch(import.meta.env.VITE_BASE_URL + "/api/orders?populate=*", {
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
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Box>

      <Box>
        <DataGrid
          onRowClick={handleEvent}
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
      <Box sx={{marginTop:"20px"}}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      ></Box>

      <Box >
        <DataGrid
        
          sx={{
            "&.MuiDataGrid-row": {
              padding: "10px",
            },
          }}
          rows={orderItems}
          columns={columnsItem}
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
      </Box>
    </Box>

    

    
  );
};

export default OrderList;
