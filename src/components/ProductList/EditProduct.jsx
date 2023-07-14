import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";


const EditProduct = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

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
        setCurrentNode(-1);
        setShowAddPanel(false);
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
          <div style={{display:"flex", justifyContent:"space-between",width:"100%"}}>
          <TextField
            label="title"
            {...register("title", { required: true })}
            sx={{
              marginBottom: "10px",
              width: "40%",
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
           <TextField
            label="price"
            {...register("price", { required: true })}
            sx={{
              marginBottom: "10px",
              width: "40%",
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
          {errors.price && (
            <Alert severity="error">this field is required??</Alert>
          )}
          </div>
           <div  style={{display:"flex" ,justifyContent:"space-between",width:"100%"}}>
           <TextField
            label="oldprice"
            {...register("oldprice", { required: true })}
            sx={{
              marginBottom: "10px",
              width: "40%",
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
          {errors.oldprice && (
            <Alert severity="error">this field is required??</Alert>
          )}
           <TextField
            label="discount"
            {...register("discount", { required: true })}
            sx={{
              marginBottom: "10px",
              width: "40%",
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
          {errors.discount && (
            <Alert severity="error">this field is required??</Alert>
          )}
           </div>

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
    </div>
  );
};

export default EditProduct;
