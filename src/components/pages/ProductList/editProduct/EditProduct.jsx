import { Image } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormControl, FormHelperText, Input } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../shared/productList.styles";
import ProductListTools from "../shared/productList.tools";


const EditProduct = ({ productId, formData, refreshItem }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageId, setImageId] = useState();
  const [imageFile, setImageFile] = useState(null);
  const [itemData, setItemData] = useState({});

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setImageId(formData.image.data.id);
    console.log(formData);
    setItemData(formData.image.data.attributes.url);
  }, [formData]);

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

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = async (data) => {
    try {
      const localFormData = {
        data: {
          title: data.title,
          image: imageId.toString(),
          oldprice: Number(data.oldprice),
          price: Number(data.price),
          discount: Number(data.discount),
          showinbaner: data.showInBaner,
          showincarousel: data.showInCarousel,
          categories: selectedCategories.map(Number),
        },
      };

      console.log(localFormData);

      const response = await fetch(
        import.meta.env.VITE_BASE_URL + `/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: "bearer " + import.meta.env.VITE_API_KEY,
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(localFormData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Data successfully posted to Strapi:", result);
        refreshItem();
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

        setItemData(imageUrl);

        console.log("Image uploaded successfully:", result);
      } else {
        console.error("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={styles.addProductContainerSx()}>
          <Box sx={styles.texFieldContainerSx()}>
            <TextField
              label="title"
              {...register("title", { required: true })}
              defaultValue={formData.title}
              sx={styles.textFieldSx()}
            />
            {errors.title && (
              <Alert severity="error">this field is required??</Alert>
            )}
            <TextField
              label="price"
              {...register("price", { required: true })}
              defaultValue={formData.price}
              sx={styles.textFieldSx()}
            />

            {errors.price && (
              <Alert severity="error">this field is required??</Alert>
            )}
          </Box>
          <Box sx={styles.texFieldContainerSx()}>
            <TextField
              label="oldprice"
              {...register("oldprice", { required: true })}
              defaultValue={formData.oldprice}
              sx={styles.textFieldSx()}
            />
            {errors.oldprice && (
              <Alert severity="error">this field is required??</Alert>
            )}
            <TextField
              label="discount"
              {...register("discount", { required: true })}
              defaultValue={formData.discount}
              sx={styles.textFieldSx()}
            />
            {errors.discount && (
              <Alert severity="error">this field is required??</Alert>
            )}
          </Box>

          <Box sx={styles.texFieldContainerSx()}>
            <Box sx={styles.formControlLableSx()}>
              <Typography sx={styles.showTypographySx()}>
                show in baner
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    {...register("showInBaner")}
                    defaultChecked={formData.showinbaner}
                  />
                }
              />
            </Box>
            <Box className="secondColumn" sx={styles.formControlLableSx()}>
              <Typography sx={styles.showTypographySx()}>
                show in carousel
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    {...register("showInCarousel")}
                    defaultChecked={formData.showincarousel}
                  />
                }
              />
            </Box>
          </Box>
          <Box sx={styles.categoriesContainerSx()}>
            <Box sx={{ marginRight: "40px" }}>
              <InputLabel id="demo-multiple-chip-label">Categories</InputLabel>
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
                  <Box sx={styles.chipsContainerSx()}>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={
                          categories.find((category) => category.id === value)
                            ?.title
                        }
                      />
                    ))}
                  </Box>
                )}
                MenuProps={ProductListTools.MenuProps}
                sx={styles.menuPropsSx()}
              >
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>

              <Button
                variant="outlined"
                color="info"
                startIcon={<AddIcon />}
                type="submit"
                className="secondStyle"
                sx={styles.saveButtonSx()}
              >
                Save
              </Button>
            </Box>

            <FormControl sx={styles.formControlImageSx()}>
              <Image
                sx={styles.formUploadImageSx()}
                src={import.meta.env.VITE_BASE_URL + itemData}
                alt="image"
              />
              <InputLabel
                htmlFor="icon-upload"
                shrink
                sx={{ marginTop: "10px" }}
              >
                <Typography sx={{ fontSize: "1.3rem" }} color="primary">
                  {" "}
                  Image Upload
                </Typography>
              </InputLabel>
              <Button
                variant="outlined"
                component="label"
                htmlFor="icon-upload"
              >
                <Typography
                  sx={{ fontSize: "1.1rem", textTransform: "none" }}
                  color="primary"
                >
                  {" "}
                  {imageFile ? imageFile.name : "Choose an image file"}
                </Typography>
                <Input
                  id="icon-upload"
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImageFile(file);
                  }}
                  style={{ display: "none" }}
                />
              </Button>
              <Box sx={{ marginTop: "1rem", width: "90%" }}>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  onClick={uploadImage}
                  disabled={!imageFile}
                  sx={{ width: "100%" }}
                >
                  Upload
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default EditProduct;
