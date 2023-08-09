import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormControl, Input } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../shared/productList.styles";
import { Image } from "@mui/icons-material";
import ProductListTools from "../shared/productList.tools";
import MainTextField from "../../../ui/textField/MainTextField";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageId, setImageId] = useState(undefined);
  const [imageFile, setImageFile] = useState(null);
  const [itemData, setItemData] = useState({});
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    getCategoriesData();
  }, []);

  const selectCategoriesHandleChange = (event) => {
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

  const getCategoriesData = () => {
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
          oldprice: Number(data.oldprice),
          price: Number(data.price),
          discount: Number(data.discount),
          showinbaner: data.showInBaner,
          showincarousel: data.showInCarousel,
          categories: selectedCategories.map(Number),
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

        setCurrentStep(2);
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
    <>
      <Box
        sx={{
          width: "calc(100% - 50px)",
          display: "flex",
          marginTop: "-35px",
          marginBottom: "50px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!imageId && (
          <FormControl sx={styles.formControlImageSx()}>
            <Image
              sx={styles.formUploadImageSx()}
              src={
                import.meta.env.VITE_BASE_URL +
                ((itemData?.attributes?.icon?.data != null &&
                  itemData.attributes.icon.data[0]?.attributes?.url) ||
                  "")
              }
              alt="image"
            />
            <InputLabel htmlFor="icon-upload" shrink sx={{ marginTop: "10px" }}>
              <Typography sx={{ fontSize: "1.3rem" }} color="primary">
                {" "}
                Image Upload
              </Typography>
            </InputLabel>
            <Button variant="outlined" component="label" htmlFor="icon-upload">
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
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          marginTop: "-35px",
          marginBottom: "10px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {imageId && (
          <Box sx={styles.addProductContainerSx()}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={styles.texFieldContainerSx()}>
                <TextField
                  label="title"
                  {...register("title", { required: true })}
                  sx={styles.textFieldSx()}
                />
                {errors.title && (
                  <Alert severity="error">this field is required??</Alert>
                )}
                {/* <TextField
                  label="price"
                  {...register("price", { required: true })}
                  sx={styles.textFieldSx()}
                /> */}
                <MainTextField
                  label="price"
                  {...register("price", { required: true })}
                  sx={styles.textFieldSx()}
                  icon={AttachMoneyIcon}
                />
                {errors.price && (
                  <Alert severity="error">this field is required??</Alert>
                )}
              </Box>
              <Box sx={styles.texFieldContainerSx()}>
                <TextField
                  label="oldprice"
                  {...register("oldprice", { required: true })}
                  sx={styles.textFieldSx()}
                />
                {errors.oldprice && (
                  <Alert severity="error">this field is required??</Alert>
                )}
                <TextField
                  label="discount"
                  {...register("discount", { required: true })}
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
                    control={<Switch {...register("showInBaner")} />}
                  />
                </Box>
                <Box className="secondColumn" sx={styles.formControlLableSx()}>
                  <Typography sx={styles.showTypographySx()}>
                    show in carousel
                  </Typography>
                  <FormControlLabel
                    control={<Switch {...register("showInCarousel")} />}
                  />
                </Box>
              </Box>

              <Box sx={styles.categoriesContainerSx()}>
                <Box>
                  <InputLabel id="demo-multiple-chip-label">
                    Categories
                  </InputLabel>
                  <Select
                    {...register("categories")}
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={selectedCategories}
                    onChange={selectCategoriesHandleChange}
                    input={
                      <OutlinedInput
                        id="select-multiple-chip"
                        label="Categories"
                      />
                    }
                    renderValue={(selected) => (
                      <Box sx={styles.chipsContainerSx()}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              categories.find(
                                (category) => category.id === value
                              )?.title
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
                </Box>
              </Box>
              <Button
                variant="outlined"
                color="info"
                startIcon={<AddIcon />}
                type="submit"
                sx={styles.saveButtonSx()}
              >
                Save
              </Button>
            </form>
          </Box>
        )}
      </Box>

      <Stepper
        sx={{ width: "100%", alignItems: "center" }}
        activeStep={currentStep}
        alternativeLabel
      >
        {ProductListTools.steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default AddProduct;
