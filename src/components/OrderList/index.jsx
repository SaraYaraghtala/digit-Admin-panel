import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const OrderList = () => {
  const [productData, setProductData] = useState([]);

  const [orderItems, setOrderItems] = useState([]);
  const [open, setOpen] = useState(false);
  const toggleHandler = () => {
    setOpen((prev) => !prev);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 60 },

    {
      field: "date",
      headerName: "date",
      width: 170,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
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
      headerName: "ShowDetails ",
      width: 140,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <Button variant="contained" color="warning" onClick={toggleHandler}>
          Show Details
        </Button>
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
      field: "count",
      headerName: "count",
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
      field: "totalprice",
      headerName: "totalprice",
      type: "number",
      width: 110,
      editable: true,
      headerAlign: "center",
      align: "center",
    },
  ];

  const handleEvent = (e) => {
    const result = e.row.order_items.data?.map((item) => {
      return {
        id: item.id,
        ...item.attributes,
        totalprice:
          Number(item.attributes.count) * Number(item.attributes.price),
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
          const formattedDate = new Date(
            item.attributes.createdAt
          ).toLocaleDateString();
          return {
            id: item.id,
            ...item.attributes,
            date: formattedDate,
          };
        });
        setProductData(tempRow);
        console.log(tempRow);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box sx={{ marginX: "120px", zIndex: 1300 }}>
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
      <Box sx={{ marginTop: "20px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></Box>

        <Box>
          <Modal
            open={open}
            onClose={toggleHandler}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 980,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <IconButton
                sx={{
                  position: "relative",
                  top: 0,
                  left: 880,
                }}
                onClick={toggleHandler}
              >
                <CloseIcon className="closeIcon" />
              </IconButton>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ marginBottom: "50px" }}
              >
                Items
              </Typography>
              <Box>
                <DataGrid
                  sx={{
                    "&.MuiDataGrid-row": {
                      padding: "10px",
                    },
                  }}
                  rows={orderItems}
                  columns={columnsItem}
                  pageSize={5}
                  checkboxSelection
                  disableRowSelectionOnClick
                />
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
};

export default OrderList;
