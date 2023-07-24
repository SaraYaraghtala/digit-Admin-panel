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
import { Category } from "@mui/icons-material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, FormHelperText, Input } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const steps = ["Upload Image", "Meta Data", "Finish"];

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageId, setImageId] = useState(undefined);
  const [imageFile, setImageFile] = useState(null);
  const [itemData, setItemData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    getData();
  }, []);

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

  const getData = () => {
    fetch(import.meta.env.VITE_BASE_URL + "/api/categories", {
      headers: { Authorization: "bearer " + import.meta.env.VITE_API_KEY },
    })
      .then((response) => response.json())
      .then((data) => {
        const tempRow = data.data.map((item) => {
          return { id: item.id, title: item.attributes.title };
        });
        setCategories(tempRow);
        console.log(tempRow);
      })
      .catch((error) => console.log(error));
  };

  const onSubmit = async (data) => {
    try {
      const formData = {
        data: {
          title: data.title,
          image: imageId.toString(),
          oldprice:Number(data.oldprice),
          price:Number(data.price) ,
          discount:Number(data.discount) ,
          showinbaner: data.showInBaner,
          showincarousel: data.showInCarousel,
          categories: data.categories,
        },
      };

      console.log(formData);

      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/products",
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
        // getData();
        // setCurrentNode(-1);
        setCurrentStep(2);
        // setShowAddPanel(false);
      } else {
        console.error("Error posting data to Strapi:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting data to Strapi:", error);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("files", imageFile);

      const response = await fetch(
        import.meta.env.VITE_BASE_URL + "/api/upload",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + import.meta.env.VITE_API_KEY,
          },
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        const imageUrl = result[0]?.url || "";
        console.log(result);

        setImageId(result[0].id);
        setCurrentStep(1);

        setItemData((prevItemData) => ({
          ...prevItemData,
          attributes: {
            ...prevItemData.attributes,
            icon: {
              data: [
                {
                  attributes: {
                    url: imageUrl,
                  },
                },
              ],
            },
          },
        }));

        console.log("Image uploaded successfully:", result);
      } else {
        console.error("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      {imageId && (
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
                <FormControlLabel
                  control={<Switch {...register("showInBaner")} />}
                />
              </div>
              <div
                style={{ width: "40%", display: "flex", alignItems: "center" }}
              >
                <Typography sx={{ marginRight: "12px" }}>
                  show in carousel
                </Typography>
                <FormControlLabel
                  control={<Switch {...register("showInCarousel")} />}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              <div>
                <InputLabel id="demo-multiple-chip-label">
                  Categories
                </InputLabel>
                <Select
                  {...register("categories")}
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={selectedCategories}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="Categories"
                    />
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
                    minWidth: 250,
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
      )}

      {!imageId && (
        <FormControl
          sx={{
            marginTop: "10px",
            width: "60%",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "8px",
          }}
        >
          <img
            style={{ width: "80px", height: "80px", marginBottom: "10px" }}
            src={
              import.meta.env.VITE_BASE_URL +
              ((itemData?.attributes?.icon?.data != null &&
                itemData.attributes.icon.data[0]?.attributes?.url) ||
                "")
            }
            alt="image"
          />
          <InputLabel htmlFor="icon-upload" shrink>
            Icon Upload
          </InputLabel>
          <Input
            id="icon-upload"
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file);
            }}
          />
          <FormHelperText>
            {imageFile ? imageFile.name : "Choose an image file"}
          </FormHelperText>
          <Button
            variant="contained"
            component="label"
            startIcon={<CloudUploadIcon />}
            onClick={uploadImage}
            disabled={!imageFile}
          >
            Upload
          </Button>
        </FormControl>
      )}
      <Stepper activeStep={currentStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default AddProduct;
