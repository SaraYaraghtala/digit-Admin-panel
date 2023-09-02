import React, { useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Alert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import styles from "./add.styles";

const Add = ({ parent, getData, setCurrentNode, setShowAddPanel }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [imageId, setImageId] = useState();
  function onFileChange(e) {
    const formData = new FormData();
    formData.append("files", e.target.files[0]);

    fetch(import.meta.env.VITE_BASE_URL + "/api/upload", {
      method: "POST",
      headers: {
        Authorization: "bearer " + import.meta.env.VITE_API_KEY,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((response) => {
        setImageId(response[0].id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    <>
      <CssBaseline />

      <Box sx={styles.mainContainerSx()}>
        {imageId && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={styles.innerContainerSx()}>
              <TextField
                helperText="Please enter category name"
                id="demo-helper-text-aligned"
                label="category"
                {...register("title", { required: true })}
                sx={styles.categoryNameSx()}
              />
              {errors.title && (
                <Alert severity="error">this field is required??</Alert>
              )}

              <Button
                variant="outlined"
                color="info"
                startIcon={<AddIcon />}
                type="submit"
                sx={styles.submitButtonSx()}
              >
                Save
              </Button>
            </Box>
          </form>
        )}
        {!imageId && (
          <Box sx={styles.withoutImageSx()}>
            <input onChange={onFileChange} type="file" id="iconFile" />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Add;
