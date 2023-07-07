import React, { useEffect, useState } from 'react';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

const Edit = ({itemId}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [imageId, setImageId] = useState();
  const [ itemData, setItemData]=useState([]);
  useEffect(()=>{
    getData()
  },[itemId])

  const getData =()=>{
    fetch(import.meta.env.VITE_BASE_URL + "/api/categories/"+itemId+"?populate=*", {
      headers: { Authorization: "bearer " + import.meta.env.VITE_API_KEY },
    })
      .then((response) => response.json())
      .then((result) => {
        setItemData(result.data);
        console.log (result.data);
      });
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        data: {
          title: data.title,
          icon: [imageId],
          parent: parent,
        },
      };

      console.log(formData);

      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/categories",
        {
          method: "POST",
          headers: {
            Authorization: "bearer " + import.meta.env.VITE_API_KEY,
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully posted to Strapi:", result);
        getData();
      } else {
        console.error("Error posting data to Strapi:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting data to Strapi:", error);
    }
  };
  
    return (
        <div>
           <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "2px",
                  marginLeft: "30px",
                  marginRight: "30px",
                }}
              >
                <TextField
                  helperText="Please enter category name"
                  id="demo-helper-text-aligned"
                  label="category"
                  {...register("title", { required: true })}
                  value={itemData.attributes?.title}
                  sx={{
                    marginBottom: "10px",
                    width: "60%",
                    "& .MuiFormHelperText-root": {
                      color: "#02A2E4",
                    },
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      "& fieldset": {
                        borderColor: " #73A5D3",
                      },
                    },
                  }}
                />
                {errors.title && (
                  <Alert severity="error">this field is required??</Alert>
                )}

                <Button
                  variant="outlined"
                  color="info"
                  startIcon={<AddIcon />}
                  type="submit"
                  sx={{ marginTop: "10px", width: "15%" }}
                >
                  Save
                </Button>
              </Box>
            </form>
            {/* <img src={import.meta.env.VITE_BASE_URL+(itemData.attributes?.icon.data!=null)?itemData.attributes?.icon.data[0]?.attributes.url:""} alt="" /> */}

            <img src={import.meta.env.VITE_BASE_URL + ((itemData.attributes?.icon?.data != null && itemData.attributes.icon.data[0]?.attributes.url) || '')} alt="" />

      
        </div>
    );
};

export default Edit;