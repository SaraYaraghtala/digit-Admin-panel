import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageId, setImageId] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [itemData, setItemData] = useState({});



  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

 


  useEffect(() => {
    console.log(formData) 
  }, [formData]);
  

  
   

  longestCommonPrefix( ["flower","flow","flight"])

      

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
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

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ marginRight: "12px" }}>
              show in baner
            </Typography>
            <FormControlLabel control={<Switch />} />
          </div>
          <div
            style={{ width: "40%", display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ marginRight: "12px" }}>
              show in carousel
            </Typography>
            <FormControlLabel control={<Switch />} />
          </div>
        </div>
        <div >
          <InputLabel id="demo-multiple-chip-label" >Categories</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={selectedCategories}
            onChange={handleChange}
            input={
              <OutlinedInput id="select-multiple-chip" label="Categories" />
            }
            renderValue={(selected) => (
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 0.5,
                }}
              >
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
            sx={{
              minWidth: 250, // Set a minimum width for the Select component
              marginTop: "10px",
            }}
          >
            {categories.map((item) => (
              <MenuItem key={item.id} value={item.title}>
                {item.title}
              </MenuItem>
            ))}
          </Select>
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

export default AddProduct;