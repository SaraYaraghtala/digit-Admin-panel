// import * as React from 'react';
import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { set } from "react-hook-form";
const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'title',
      width: 150,
      editable: true,
    },
    {
      field: 'oldprice',
      headerName: 'oldprice',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'price',
      headerName: 'price',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'image',
      headerName: 'image',
      width: 110,
      editable: true,
      renderCell: (params) => (
        <img src={ import.meta.env.VITE_BASE_URL +
          ((params.value.data != null &&
           params.value.data?.attributes.url) ||
            "")} alt="Product" style={{ width: 50,margin:"6px" }} />
      ),
    },
    {
      field: 'discount',
      headerName: 'discount',
      type: 'number',
      width: 110,
      editable: true,
    },
    {
      field: 'showinbaner',
      headerName: 'showinbaner',
      width: 110,
      editable: true,
    },
    {
      field: 'showincarousel',
      headerName: 'showinbaner',
      width: 110,
      editable: true,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  
  // const rows = [
  //   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  //   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  //   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  //   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  //   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  //   { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  //   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  //   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  //   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  // ];
  

const ProductList = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
   fetch( import.meta.env.VITE_BASE_URL +
    "/api/products?populate=*" ,
  {
    headers: { Authorization: "bearer " + import.meta.env.VITE_API_KEY }
  })
    .then(response => response.json())
    .then(data =>  {
    const tempRow= data.data.map((item)=>{
        return(
          {id:item.id,...item.attributes}
        )
    })
    setProductData(tempRow)
    console.log(tempRow)
    })
    .catch(error => console.log(error));
  };

  
    return (
        <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={productData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 6,
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